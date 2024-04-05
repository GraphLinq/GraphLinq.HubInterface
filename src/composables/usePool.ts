import {
  GLQCHAIN_POOL_NFT_ADDRESS,
  NULL_ADDRESS,
  UNISWAP_POOL_FACTORY_ADDRESS,
  getTokenByAddress,
} from "@constants/index";
import univ3prices from "@thanpolas/univ3prices";
import {
  Currency,
  CurrencyAmount,
  Fraction,
  Percent,
  Price,
  Token,
} from "@uniswap/sdk-core";
import { abi as IUniswapV3FactoryABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { abi as NonfungiblePositionManagerABI } from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import {
  NonfungiblePositionManager,
  Pool,
  Position as UniPosition,
  nearestUsableTick,
  priceToClosestTick,
  tickToPrice,
} from "@uniswap/v3-sdk";
import { Contract, ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import ERC20 from "../contracts/ERC20.json";
import { PoolState, Position, PositionStatus } from "../model/pool";

import { useEthersSigner } from "./useEthersProvider";
import useRpcProvider from "./useRpcProvider";
import { GLQ_CHAIN_ID } from "@utils/chains";

// const nftContractABI = [
//   "function balanceOf(address owner) external view returns (uint256 balance)",
//   "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId)",
// ];

const usePool = () => {
  const { address: account } = useAccount();
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ?? rpcProvider;

  const [ownPositionIds, setOwnPositionIds] = useState<string[]>([]);
  const [ownPositions, setOwnPositions] = useState<Position[]>([]);

  const uniswapFactoryContract = new Contract(
    UNISWAP_POOL_FACTORY_ADDRESS,
    IUniswapV3FactoryABI,
    provider
  );
  const nftPositionManagerContract = new Contract(
    GLQCHAIN_POOL_NFT_ADDRESS,
    NonfungiblePositionManagerABI,
    provider
  );

  useEffect(() => {
    const findAllPositions = async () => {
      try {
        const balance = await nftPositionManagerContract.balanceOf(account);
        const ids: string[] = [];
        const positions: Position[] = [];

        for (let index = 0; index < balance.toNumber(); index++) {
          const tokenId = await nftPositionManagerContract.tokenOfOwnerByIndex(
            account,
            index
          );
          ids.push(tokenId.toString());

          const tempPosition =
            await nftPositionManagerContract.positions(tokenId);

          const firstAppToken = getTokenByAddress(tempPosition.token0, "glq");
          const secondAppToken = getTokenByAddress(tempPosition.token1, "glq");

          const poolAddress = uniswapFactoryContract.getPool(
            tempPosition.token0,
            tempPosition.token1,
            tempPosition.fee
          );
          const poolState = await getPoolState(poolAddress);
          if (firstAppToken && secondAppToken && poolState) {
            const token0 = new Token(
              GLQ_CHAIN_ID,
              firstAppToken.address.glq!,
              firstAppToken.decimals
            );
            const token1 = new Token(
              GLQ_CHAIN_ID,
              secondAppToken.address.glq!,
              secondAppToken.decimals
            );

            const minPrice = parseFloat(
              tickToPrice(
                token0,
                token1,
                tempPosition.tickLower
              ).toSignificant()
            );
            const maxPrice = parseFloat(
              tickToPrice(
                token0,
                token1,
                tempPosition.tickUpper
              ).toSignificant()
            );
            const currentPrice = parseFloat(
              tickToPrice(token0, token1, poolState.tick).toSignificant()
            );

            console.log(poolAddress);
            console.log(minPrice, currentPrice, maxPrice);

            positions.push({
              pair: {
                first: secondAppToken,
                second: firstAppToken,
              },
              fees: tempPosition.fee / 10000,
              min: minPrice,
              max: maxPrice,
              status:
                currentPrice >= minPrice && currentPrice <= maxPrice
                  ? PositionStatus.IN_RANGE
                  : PositionStatus.CLOSED,
            });
          }
        }

        setOwnPositionIds(ids);
        setOwnPositions(positions);
      } catch (error) {
        console.error("Error getting positions :", error);
      }
    };

    findAllPositions();
  }, [account, provider]);

  const getPoolState = async (
    poolAddress: string
  ): Promise<PoolState | null> => {
    try {
      const poolContract = new Contract(
        poolAddress,
        IUniswapV3PoolABI,
        provider
      );

      const [liquidity, slot, fee, tickSpacing] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
        poolContract.fee(),
        poolContract.tickSpacing(),
      ]);

      return {
        liquidity: ethers.BigNumber.from(liquidity),
        tickSpacing: Number(tickSpacing),
        fee: Number(fee),
        sqrtPriceX96: ethers.BigNumber.from(slot[0]),
        tick: Number(slot[1]),
      };
    } catch (error) {
      console.error("Error getting pool state:", error);
      return null;
    }
  };

  const askForAllowance = async (
    tokenAddress: string,
    amount: string,
    targetContract: ethers.Contract
  ) => {
    let allowance = "0";
    const tokenContract = new Contract(tokenAddress, ERC20, provider);
    if (tokenContract) {
      const requiredAmount = parseFloat(amount);
      allowance = await tokenContract.allowance(
        account,
        targetContract.address
      );

      const allowanceDecimal = parseFloat(
        ethers.utils.formatEther(allowance.toString())
      );

      if (allowanceDecimal < requiredAmount) {
        const approveTx = await tokenContract.approve(
          targetContract.address,
          ethers.utils.parseEther(requiredAmount.toString())
        );
        await approveTx.wait();
      }
    }
  };

  const deployOrGetPool = async (
    tokenA: string,
    tokenB: string,
    amountA: string,
    amountB: string,
    feeInPercent: string
  ): Promise<string | null> => {
    let existingPoolAddress = null;

    try {
      const tokens = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];

      const fee = parseFloat(feeInPercent) * 10000;

      const amountAFormatted = ethers.utils.parseEther(amountA);
      const amountBFormatted = ethers.utils.parseEther(amountB);

      existingPoolAddress = await uniswapFactoryContract.getPool(
        tokens[0],
        tokens[1],
        fee,
        { gasLimit: 40000 }
      );
      if (existingPoolAddress !== NULL_ADDRESS) {
        console.log(`Pool already exists at address: ${existingPoolAddress}`);
        const poolContract = new Contract(
          existingPoolAddress,
          IUniswapV3PoolABI,
          provider
        );

        await askForAllowance(tokenA, amountA, poolContract);
        await askForAllowance(tokenB, amountB, poolContract);

        const sqrtPrice = univ3prices.utils.encodeSqrtRatioX96(
          amountAFormatted,
          amountBFormatted
        );
        const tx = await poolContract.initialize(sqrtPrice.toString());
        await tx.wait();

        console.log(
          `Pool successfully initialized with base price ${amountAFormatted} VS ${amountBFormatted} !`
        );

        return existingPoolAddress;
      } else {
        console.log("Deploying pool...");
        const tx = await uniswapFactoryContract.createPool(
          tokens[0],
          tokens[1],
          fee
        );
        console.log("Wait..", tx);
        const receipt = await tx.wait();

        const poolAddressEvent = receipt.events?.find(
          (e: any) => e.event === "PoolCreated"
        );
        if (poolAddressEvent) {
          console.log(
            `Pool deployed at address: ${poolAddressEvent.args.pool}`
          );
          return poolAddressEvent.args.pool;
        } else {
          console.log("PoolCreated event not found in transaction receipt.");
        }
      }
    } catch (error) {
      console.error("Failed to deploy/get pool:", error);
    }

    return existingPoolAddress;
  };

  const mintLiquidity = async (
    addressPool: string,
    tokenA: Token,
    tokenB: Token,
    amountA: string,
    amountB: string,
    minPriceFromCurrent: number,
    maxPriceFromCurrent: number
  ) => {
    try {
      const state = await getPoolState(addressPool);

      if (!state || !account) return;

      const amountAFormatted = ethers.utils.parseEther(amountA);
      const amountBFormatted = ethers.utils.parseEther(amountB);

      const amountToken0 = CurrencyAmount.fromRawAmount(
        tokenA,
        amountAFormatted.toString()
      );
      const amountToken1 = CurrencyAmount.fromRawAmount(
        tokenB,
        amountBFormatted.toString()
      );

      const pool = new Pool(
        amountToken0.currency,
        amountToken1.currency,
        state.fee,
        state.sqrtPriceX96.toString(),
        state.liquidity.toString(),
        state.tick
      );

      const currentPrice = pool.token0Price;

      const minTargetFraction = currentPrice.asFraction.multiply(
        new Fraction(100 + minPriceFromCurrent, 100)
      );
      const maxTargetFraction = currentPrice.asFraction.multiply(
        new Fraction(100 + maxPriceFromCurrent, 100)
      );

      const minTargetPrice = new Price(
        currentPrice.baseCurrency,
        currentPrice.quoteCurrency,
        minTargetFraction.denominator,
        minTargetFraction.numerator
      );
      const maxTargetPrice = new Price(
        currentPrice.baseCurrency,
        currentPrice.quoteCurrency,
        maxTargetFraction.denominator,
        maxTargetFraction.numerator
      );

      const tickMin = nearestUsableTick(
        priceToClosestTick(minTargetPrice),
        state.tickSpacing
      );
      const tickMax = nearestUsableTick(
        priceToClosestTick(maxTargetPrice),
        state.tickSpacing
      );

      const position = UniPosition.fromAmounts({
        pool,
        tickLower: tickMin,
        tickUpper: tickMax,
        amount0: amountToken0.quotient,
        amount1: amountToken1.quotient,
        useFullPrecision: true,
      });

      const mintOptions = {
        recipient: account,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        slippageTolerance: new Percent(50, 10000), // 0.5% slippage tolerance
      };

      const { calldata, value } = NonfungiblePositionManager.addCallParameters(
        position,
        mintOptions
      );

      const transaction = {
        from: account,
        to: GLQCHAIN_POOL_NFT_ADDRESS,
        value: value,
        data: calldata,
      };

      await askForAllowance(
        tokenA.address,
        amountA,
        nftPositionManagerContract
      );
      await askForAllowance(
        tokenB.address,
        amountB,
        nftPositionManagerContract
      );

      const txResponse = await provider.sendTransaction(transaction);
      const receipt = await txResponse.wait(1);
      console.log(`Transaction successful: ${receipt.transactionHash}`);
      return receipt.transactionHash;
    } catch (error) {
      console.error(`Failed to add liquidity: ${error}`);
      return null;
    }
  };

  return {
    ownPositionIds,
    ownPositions,
    getPoolState,
    deployOrGetPool,
    mintLiquidity,
  };
};

export default usePool;
