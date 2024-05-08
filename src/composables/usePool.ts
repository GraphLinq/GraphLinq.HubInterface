import {
  UNISWAP_POOL_FACTORY_ADDRESS,
  GLQCHAIN_POOL_NFT_ADDRESS,
  NULL_ADDRESS,
} from "@constants/address";
import { getAppTokenByAddress } from "@constants/apptoken";
import { getPoolTokenByAddress, orderedPoolTokens } from "@constants/pooltoken";
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
  TickMath,
} from "@uniswap/v3-sdk";
import { getErrorMessage } from "@utils/errors";
import Decimal from "decimal.js";
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
  // const account = "0xe87e9c55A720C89257302237B76CD5bA386d3819";
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ?? rpcProvider;

  const [ownPositionIds, setOwnPositionIds] = useState<string[]>([]);
  const [ownPositions, setOwnPositions] = useState<Position[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(false);
  const [loadedPositions, setLoadedPositions] = useState(false);
  const [loadedPositionIds, setLoadedPositionIds] = useState(false);

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
      ethers.BigNumber.from(new Decimal(amount1).toFixed()),
      ethers.BigNumber.from(new Decimal(amount0).toFixed()),
    ];
  }

  const getPositionById = async (id: string): Promise<Position | undefined> => {
    const tempPosition = await nftPositionManagerContract.positions(id);

    const firstAppToken = getAppTokenByAddress(tempPosition.token0, "glq");
    const secondAppToken = getAppTokenByAddress(tempPosition.token1, "glq");

    const poolAddress = await uniswapFactoryContract.getPool(
      tempPosition.token0,
      tempPosition.token1,
      tempPosition.fee
    );

    const poolState = await getPoolState(poolAddress);

    if (firstAppToken && secondAppToken && poolState) {
      const firstPoolToken = getPoolTokenByAddress(
        firstAppToken.address.glq!,
        "glq"
      );
      const secondPoolToken = getPoolTokenByAddress(
        secondAppToken.address.glq!,
        "glq"
      );

      if (!firstPoolToken || !secondPoolToken) {
        return;
      }

      const [token0, token1] = orderedPoolTokens(
        firstPoolToken,
        secondPoolToken
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
        id: id,
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
          first: tempPosition.tokensOwed1,
          second: tempPosition.tokensOwed0,
        },
        fees: tempPosition.fee / 10000,
        min: minPrice,
        max: maxPrice,
        status:
          currentPrice >= minPrice && currentPrice <= maxPrice
            ? PositionStatus.IN_RANGE
            : PositionStatus.CLOSED,
        poolCurrentPrice: currentPrice,
        tickUpper: tempPosition.tickUpper,
        tickLower: tempPosition.tickLower,
        poolAddress: poolAddress,
      };
    }
  };

  const getAllTokenIds = async () => {
    const balance = await nftPositionManagerContract.balanceOf(account);

    const tokenIds: string[] = [];

    for (let index = 0; index < balance; index++) {
      const tokenId = await nftPositionManagerContract.tokenOfOwnerByIndex(
        account,
        index
      );
      tokenIds.push(tokenId.toString());
    }

    return tokenIds;
  };

  const findAllPositions = async () => {
    if (!account || !provider || loadingPositions || loadedPositions) {
      return;
    }
    try {
      setLoadingPositions(true);

      const ids = await getAllTokenIds();
      setOwnPositionIds(ids);
      setLoadedPositionIds(true);

      const promises: Promise<Position | null>[] = ids.map((id) =>
        getPositionById(id).then((position) => position ?? null)
      );
      const allPositions = await Promise.all(promises);

      const positions = allPositions.filter(
        (pos): pos is Position => pos !== null
      );

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
    targetContract: ethers.Contract,
    alert = true
  ) => {
    let allowance = "0";
    const tokenContract = new Contract(tokenAddress, ERC20, provider);
    if (alert) {
      setPending("Checking token allowance...");
    }
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
        if (alert) {
          setPending("Asking for token allowance...");
        }
        const approveTx = await tokenContract.approve(
          targetContract.address,
          ethers.utils.parseEther(requiredAmount.toString())
        );
        setPending("Waiting for confirmations...");
        await approveTx.wait();
        if (alert) {
          setPending("Allowance granted successfully.");
        }
      }
    }
  };

  const deployOrGetPool = async (
    tokenA: Token,
    tokenB: Token,
    amountA: string,
    amountB: string,
    feeInPercent: string,
    alertAllowance = true
  ): Promise<string | null> => {
    let existingPoolAddress = null;

    try {
      const [token0, token1] = orderedPoolTokens(tokenA, tokenB);
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
        token0.address,
        token1.address,
        fee,
        { gasLimit: 5000000 }
      );
      if (existingPoolAddress !== NULL_ADDRESS) {
        console.log(`Pool already exists at address: ${existingPoolAddress}`);
        try {
          const poolContract = new Contract(
            existingPoolAddress,
            IUniswapV3PoolABI,
            provider
          );

          await askForAllowance(
            tokenA.address,
            amountA,
            poolContract,
            alertAllowance
          );
          await askForAllowance(
            tokenB.address,
            amountB,
            poolContract,
            alertAllowance
          );

          const sqrtPrice = univ3prices.utils.encodeSqrtRatioX96(
            amountAFormatted,
            amountBFormatted
          );
          const tx = await poolContract.initialize(sqrtPrice.toString());
          await tx.wait();

          console.log(
            `Pool successfully initialized with base price ${amountAFormatted} VS ${amountBFormatted} !`
          );
        } catch (error) {}

        return existingPoolAddress;
      } else {
        console.log("Deploying pool...");
        const tx = await uniswapFactoryContract.createPool(token0, token1, fee);
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
      // setError(getErrorMessage(error));
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
      const [token0, token1] = orderedPoolTokens(tempTokenA, tempTokenB);
      const amount0 = tempTokenA === token0 ? tempAmountA : tempAmountB;
      const amount1 = tempTokenB === token1 ? tempAmountB : tempAmountA;

      if (!state || !account) return;

      const amount0Formatted = ethers.utils.parseUnits(
        amount0,
        token0.decimals
      );
      const amount1Formatted = ethers.utils.parseUnits(
        amount1,
        token1.decimals
      );

      const amountToken0 = CurrencyAmount.fromRawAmount(
        token0,
        amount0Formatted.toString()
      );
      const amountToken1 = CurrencyAmount.fromRawAmount(
        token1,
        amount1Formatted.toString()
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
        minPriceFromCurrent === -100
          ? TickMath.MIN_TICK
          : priceToClosestTick(minTargetPrice),
        state.tickSpacing
      );
      const tickMax = nearestUsableTick(
        maxPriceFromCurrent === Infinity
          ? TickMath.MAX_TICK
          : priceToClosestTick(maxTargetPrice),
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
        token0.address,
        amount0,
        nftPositionManagerContract
      );
      await askForAllowance(
        token1.address,
        amount1,
        nftPositionManagerContract
      );

      setPending("Minting position...");
      const txResponse = await provider.sendTransaction(transaction);
      setPending("Waiting for confirmations...");
      const receipt = await txResponse.wait(1);
      setSuccess(receipt.transactionHash);
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
          liquidity: position.liquidity.total,
          amount0Min: 0,
          amount1Min: 0,
          deadline: Math.floor(Date.now() / 1000) + 60 * 10, // deadline: 10 minutes from now
        },
        { from: account, gasLimit: 5000000 }
      );

      setPending("Waiting for confirmations...");
      const receipt = await txResponse.wait(1);
      console.log(`Transaction successful: ${receipt.transactionHash}`);
      await claimFees(position, false);

      return await burnPosition(position.id);
    } catch (error) {
      setError(getErrorMessage(error));
      console.error(`Failed to withdraw liquidity: ${error}`);
    }
  };

  const increaseLiquidity = async (
    position: Position,
    tempAmountA: string,
    tempAmountB: string
  ) => {
    try {
      let tokenA, tokenB, amountA, amountB;
      if (
        position.pair.first.address.glq! > position.pair.second.address.glq!
      ) {
        tokenA = position.pair.first;
        amountA = tempAmountA;
        tokenB = position.pair.second;
        amountB = tempAmountB;
      } else {
        tokenA = position.pair.second;
        amountA = tempAmountB;
        tokenB = position.pair.first;
        amountB = tempAmountA;
      }

      const amountAFormatted = ethers.utils.parseUnits(
        amountA,
        position.pair.first.decimals
      );
      const amountBFormatted = ethers.utils.parseUnits(
        amountB,
        position.pair.second.decimals
      );

      await askForAllowance(
        tokenA.address.glq!,
        amountA,
        nftPositionManagerContract
      );
      await askForAllowance(
        tokenB.address.glq!,
        amountB,
        nftPositionManagerContract
      );

      setPending("Increasing liquidity from your position...");
      const txResponse = await nftPositionManagerContract.increaseLiquidity(
        {
          tokenId: position.id,
          amount0Desired: amountAFormatted,
          amount1Desired: amountBFormatted,
          amount0Min: 0,
          amount1Min: 0,
          deadline: Math.floor(Date.now() / 1000) + 60 * 10, // deadline: 10 minutes from now
        },
        { from: account, gasLimit: 5000000 }
      );

      setPending("Waiting for confirmations...");
      const receipt = await txResponse.wait(1);
      console.log(`Transaction successful: ${receipt.transactionHash}`);
      setSuccess(receipt.transactionHash);
      return txResponse.transactionHash;
    } catch (error) {
      setError(getErrorMessage(error));
      console.error(`Failed to increase liquidity: ${error}`);
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

  const burnPosition = async (positionId: string) => {
    try {
      // setPending("Burning your position...");

      const txResponse = await nftPositionManagerContract.burn(positionId, {
        from: account,
        gasLimit: 5000000,
      });
      // setPending("Waiting for confirmations...");
      const receipt = await txResponse.wait();
      setSuccess(receipt.transactionHash);
      return receipt.transactionHash;
    } catch (error) {
      setError(getErrorMessage(error));
      console.error(`Failed to burn your position: ${error}`);
    }
  };

  return {
    loadedPositionIds,
    loadingPositions,
    loadedPositions,
    ownPositionIds,
    ownPositions,
    getPositionById,
    getPoolState,
    deployOrGetPool,
    mintLiquidity,
    increaseLiquidity,
    withdrawLiquidity,
    claimFees,
    burnPosition,
    error,
    pending,
    success,
  };
};

export default usePool;
