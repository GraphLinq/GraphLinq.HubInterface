import { GLQCHAIN_SWAP_QUOTER_ADDRESS, GLQCHAIN_SWAP_ROUTER_ADDRESS } from '@constants/index';
import { abi as SWAP_ROUTER_ABI } from '@intrinsic-network/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json';
import { abi as QuoterV2ABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import { ethers } from 'ethers'

const fee = 10000; // 1% pool fee

const useUniswap = () => {
  const { provider, account } = useWeb3React();
  const swapRouter: Contract = new Contract(GLQCHAIN_SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI, provider?.getSigner(account));
  const quoter: Contract = new Contract(GLQCHAIN_SWAP_QUOTER_ADDRESS, QuoterV2ABI, provider?.getSigner(account));

  const quoteSwap = async (inputToken: string, outputToken: string, amountIn: number): Promise<string | null> => {
    if (!quoter || !account) return null;

    try {
      const amountInFormatted = ethers.utils.parseEther(amountIn.toString())
      const parameters = {
          tokenIn: inputToken,
          tokenOut: outputToken,
          fee: fee,
          amountIn: amountInFormatted,
          sqrtPriceLimitX96: "0"
      };
      const amountOut = await quoter.callStatic.quoteExactInputSingle(parameters);
      return ethers.utils.formatEther(amountOut[0]);
    } catch (error) {
      console.error('Failed to quote swap:', error);
      return null;
    }
  };

  const executeSwap = async (inputToken: string, outputToken: string, amountIn: number, recipient: string) => {
    if (!swapRouter) return;

    try {
      const amountInFormatted = ethers.utils.parseEther(amountIn.toString());
      const params = {
        tokenIn: inputToken,
        tokenOut: outputToken,
        fee: fee,
        recipient: recipient,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        amountIn: amountInFormatted,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
      };
      return await swapRouter.exactInputSingle(params, {gasLimit: 400000});
    } catch (error) {
      console.error('Failed to execute swap:', error);
    }
  };

  return { quoteSwap, executeSwap };
};

export default useUniswap;
