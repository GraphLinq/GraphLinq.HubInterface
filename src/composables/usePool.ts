import {
  GLQCHAIN_POOL_NFT_ADDRESS,
  NULL_ADDRESS,
  UNISWAP_POOL_FACTORY_ADDRESS,
  getTokenByAddress,
} from "@constants/index";
import univ3prices from "@thanpolas/univ3prices";
import {
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
import { GLQ_CHAIN_ID } from "@utils/chains";
import { getErrorMessage } from "@utils/errors";
import { Contract, ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import ERC20 from "../contracts/ERC20.json";
import { PoolState, Position, PositionStatus } from "../model/pool";

import { useEthersSigner } from "./useEthersProvider";
import useRpcProvider from "./useRpcProvider";

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
  const [loadingPositions, setLoadingPositions] = useState(false);
  const [loadedPositions, setLoadedPositions] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const Q96 = ethers.BigNumber.from(2).pow(96);

  function getTickAtSqrtPrice(sqrtPriceX96: ethers.BigNumber) {
    const tick = Math.floor(
      // @ts-ignore
      Math.log((sqrtPriceX96 / Q96) ** 2) / Math.log(1.0001)
    );
    return tick;
  }
  async function getTokenAmounts(
    liquidity: ethers.BigNumber,
    sqrtPriceX96: ethers.BigNumber,
    tickLow: number,
    tickHigh: number
  ) {
    const sqrtRatioA = Math.sqrt(1.0001 ** tickLow);
    const sqrtRatioB = Math.sqrt(1.0001 ** tickHigh);
    const currentTick = getTickAtSqrtPrice(sqrtPriceX96);
    // @ts-ignore
    const sqrtPrice = sqrtPriceX96 / Q96;

    let amount0 = 0;
    let amount1 = 0;
    if (currentTick < tickLow) {
      amount0 = Math.floor(
        // @ts-ignore
        liquidity * ((sqrtRatioB - sqrtRatioA) / (sqrtRatioA * sqrtRatioB))
      );
    } else if (currentTick >= tickHigh) {
      // @ts-ignore
      amount1 = Math.floor(liquidity * (sqrtRatioB - sqrtRatioA));
    } else if (currentTick >= tickLow && currentTick < tickHigh) {
      amount0 = Math.floor(
        // @ts-ignore
        liquidity * ((sqrtRatioB - sqrtPrice) / (sqrtPrice * sqrtRatioB))
      );
      // @ts-ignore
      amount1 = Math.floor(liquidity * (sqrtPrice - sqrtRatioA));
    }

    return [
      ethers.BigNumber.from(amount1.toString()),
      ethers.BigNumber.from(amount0.toString()),
    ];
  }

  const getPositionByIndex = async (index: number) => {
    const tokenId = await nftPositionManagerContract.tokenOfOwnerByIndex(
      account,
      index
    );
    const tempPosition = await nftPositionManagerContract.positions(tokenId);

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
        tickToPrice(token0, token1, tempPosition.tickLower).toSignificant()
      );
      const maxPrice = parseFloat(
        tickToPrice(token0, token1, tempPosition.tickUpper).toSignificant()
      );
      const currentPrice = parseFloat(
        tickToPrice(token0, token1, poolState.tick).toSignificant()
      );

      const tokenAmounts = await getTokenAmounts(
        tempPosition.liquidity,
        poolState.sqrtPriceX96,
        tempPosition.tickLower,
        tempPosition.tickUpper
      );

      return {
        id: tokenId.toString(),
        liquidity: {
          total: tempPosition.liquidity,
          first: tokenAmounts[0],
          second: tokenAmounts[1],
        },
        pair: {
          first: secondAppToken,
          second: firstAppToken,
        },
        claimableFees: {
          total: tempPosition.feeGrowthInside0LastX128.add(
            tempPosition.feeGrowthInside1LastX128
          ),
          first: tempPosition.feeGrowthInside0LastX128,
          second: tempPosition.feeGrowthInside1LastX128,
        },
        fees: tempPosition.fee / 10000,
        min: minPrice,
        max: maxPrice,
        status:
          currentPrice >= minPrice && currentPrice <= maxPrice
            ? PositionStatus.IN_RANGE
            : PositionStatus.CLOSED,
        poolCurrentPrice: currentPrice,
      };
    }
  };

  const findAllPositions = async () => {
    if (!account || !provider || loadedPositions) {
      return;
    }
    try {
      setLoadingPositions(true);
      const balance = await nftPositionManagerContract.balanceOf(account);
      const ids: string[] = [];
      const positions: Position[] = [];

      for (let index = 0; index < balance.toNumber(); index++) {
        const position = await getPositionByIndex(index);
        if (position) {
          positions.push(position);
          ids.push(position.id);
        }
      }

      setOwnPositionIds(ids);
      setOwnPositions(positions);
      setLoadingPositions(false);
      setLoadedPositions(true);
    } catch (error) {
      console.error("Error getting positions :", error);
      setError(getErrorMessage(error));
      setLoadingPositions(false);
    }
  };

  useEffect(() => {
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
      setError(getErrorMessage(error));
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
    tokenA: Token,
    tokenB: Token,
    amountA: string,
    amountB: string,
    feeInPercent: string
  ): Promise<string | null> => {
    let existingPoolAddress = null;

    try {
      const tokens =
        tokenA.address > tokenB.address
          ? [tokenA.address, tokenB.address]
          : [tokenB.address, tokenA.address];

      const fee = parseFloat(feeInPercent) * 10000;

      const amountAFormatted = ethers.utils.parseUnits(
        amountA,
        tokenA.decimals
      );
      const amountBFormatted = ethers.utils.parseUnits(
        amountB,
        tokenB.decimals
      );

      existingPoolAddress = await uniswapFactoryContract.getPool(
        tokens[0],
        tokens[1],
        fee,
        { gasLimit: 5000000 }
      );
      if (existingPoolAddress !== NULL_ADDRESS) {
        console.log(`Pool already exists at address: ${existingPoolAddress}`);
        const poolContract = new Contract(
          existingPoolAddress,
          IUniswapV3PoolABI,
          provider
        );

        await askForAllowance(tokenA.address, amountA, poolContract);
        await askForAllowance(tokenB.address, amountB, poolContract);

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
      setError(getErrorMessage(error));
      console.error("Failed to deploy/get pool:", error);
    }

    return existingPoolAddress;
  };

  const mintLiquidity = async (
    addressPool: string,
    tempTokenA: Token,
    tempTokenB: Token,
    tempAmountA: string,
    tempAmountB: string,
    minPriceFromCurrent: number,
    maxPriceFromCurrent: number
  ) => {
    try {
      const state = await getPoolState(addressPool);
      let tokenA, tokenB, amountA, amountB;
      if (tempTokenA.address > tempTokenB.address) {
        tokenA = tempTokenA;
        amountA = tempAmountA;
        tokenB = tempTokenB;
        amountB = tempAmountB;
      } else {
        tokenA = tempTokenB;
        amountA = tempAmountB;
        tokenB = tempTokenA;
        amountB = tempAmountA;
      }

      if (!state || !account) return;

      const amountAFormatted = ethers.utils.parseUnits(
        amountA,
        tokenA.decimals
      );
      const amountBFormatted = ethers.utils.parseUnits(
        amountB,
        tokenB.decimals
      );

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

      const transaction: any = {
        data: calldata,
        to: GLQCHAIN_POOL_NFT_ADDRESS,
        value: value,
        from: account,
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
      setError(getErrorMessage(error));
      console.error(`Failed to add liquidity: ${error}`);
      return null;
    }
  };

  const withdrawLiquidity = async (position: Position) => {
    try {
      setPending("Removing liquidity from your position...");
      const txResponse = await nftPositionManagerContract.decreaseLiquidity(
        {
          tokenId: position.id,
          liquidity: 0 || position.liquidity.total,
          amount0Min: 0,
          amount1Min: 0,
          deadline: Math.floor(Date.now() / 1000) + 60 * 10, // deadline: 10 minutes from now
        },
        { from: account, gasLimit: 5000000 }
      );

      setPending("Waiting for confirmations...");
      const receipt = await txResponse.wait(1);
      console.log(`Transaction successful: ${receipt.transactionHash}`);
      return await claimFees(position, false);
    } catch (error) {
      setError(getErrorMessage(error));
      console.error(`Failed to withdraw liquidity: ${error}`);
    }
  };

  const claimFees = async (position: Position, fees = true) => {
    const collectParams = {
      tokenId: position.id,
      recipient: account,
      amount0Max: ethers.utils.parseEther("100000000"),
      amount1Max: ethers.utils.parseEther("100000000"),
    };

    try {
      setPending(
        fees ? "Collecting your fees..." : "Collecting your liquidity..."
      );

      const txResponse = await nftPositionManagerContract.collect(
        collectParams,
        { gasLimit: 5000000 }
      );
      setPending("Waiting for confirmations...");
      const receipt = await txResponse.wait();
      setSuccess(receipt.transactionHash);
      return receipt.transactionHash;
    } catch (error) {
      setError(getErrorMessage(error));
      console.error(`Failed to collect fees: ${error}`);
    }
  };

  return {
    loadingPositions,
    loadedPositions,
    ownPositionIds,
    ownPositions,
    getPositionByIndex,
    getPoolState,
    deployOrGetPool,
    mintLiquidity,
    withdrawLiquidity,
    claimFees,
    error,
    pending,
    success,
  };
};

export default usePool;
