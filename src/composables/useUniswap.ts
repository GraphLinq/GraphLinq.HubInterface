import {
  GLQCHAIN_SWAP_QUOTER_ADDRESS,
  GLQCHAIN_SWAP_ROUTER_ADDRESS,
} from "@constants/index";
import { abi as SWAP_ROUTER_ABI } from "@intrinsic-network/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json";
import { abi as QuoterV2ABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json";
import { Contract } from "ethers";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

import useRpcProvider from "./useRpcProvider";

const useUniswap = () => {
  const { address: account } = useAccount();
  const rpcProvider = useRpcProvider();

  const swapRouter: Contract = new Contract(
    GLQCHAIN_SWAP_ROUTER_ADDRESS,
    SWAP_ROUTER_ABI,
    account ? rpcProvider.getSigner(account) : rpcProvider
  );

  const quoter: Contract = new Contract(
    GLQCHAIN_SWAP_QUOTER_ADDRESS,
    QuoterV2ABI,
    account ? rpcProvider.getSigner(account) : rpcProvider
  );

  const feeInPercent = 1;
  const fee = feeInPercent * 10000;

  const quoteSwap = async (
    inputToken: string,
    outputToken: string,
    amountIn: number
  ): Promise<string | null> => {
    if (!quoter) return null;

    try {
      const amountInFormatted = ethers.utils.parseEther(amountIn.toString());
      const parameters = {
        tokenIn: inputToken,
        tokenOut: outputToken,
        fee: fee,
        amountIn: amountInFormatted,
        sqrtPriceLimitX96: "0",
      };
      const amountOut =
        await quoter.callStatic.quoteExactInputSingle(parameters);
      return ethers.utils.formatEther(amountOut[0]);
    } catch (error) {
      console.error("Failed to quote swap:", error);
      return null;
    }
  };

  const executeSwap = async (
    inputToken: string,
    outputToken: string,
    amountIn: number,
    recipient: string,
    amountQuoted: string,
    maxSlippage: string
  ) => {
    if (!swapRouter) return;

    try {
      const amountInFormatted = ethers.utils.parseEther(amountIn.toString());
      const slippageAmount = ethers.utils
        .parseEther(amountQuoted)
        .mul(ethers.BigNumber.from(parseFloat(maxSlippage)))
        .div(ethers.BigNumber.from(1000));
      const amountOutMinimum = ethers.utils
        .parseEther(amountQuoted)
        .sub(slippageAmount);
      const params = {
        tokenIn: inputToken,
        tokenOut: outputToken,
        fee: fee,
        recipient: recipient,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        amountIn: amountInFormatted,
        amountOutMinimum: amountOutMinimum,
        sqrtPriceLimitX96: 0,
      };

      return await swapRouter.exactInputSingle(params, { gasLimit: 400000 });
    } catch (error) {
      console.error("Failed to execute swap:", error);
    }
  };

  return { quoteSwap, executeSwap, feeInPercent };
};

export default useUniswap;
