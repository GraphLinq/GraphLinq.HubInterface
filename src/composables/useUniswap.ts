import { abi as SWAP_ROUTER_ABI } from '@intrinsic-network/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json';
import { abi as QuoterV2ABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json';
import { JsonRpcProvider, Wallet, Contract, formatEther, parseEther } from 'ethers';
import { useEffect, useState } from 'react';

const providerUrl = 'https://glq-dataseed.graphlinq.io';
const privateKey = '';
const SWAP_ROUTER_ADDRESS = '0x47AB4F709b5C250026C4DA83cde56fc2C81a311c';
const QUOTER_ADDRESS = '0x287a7beF47684D388fa56BFaB859501f9e515B9D';
const fee = 10000; // 1% pool fee

const useUniswap = () => {
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [swapRouter, setSwapRouter] = useState<Contract | null>(null);
  const [quoter, setQuoter] = useState<Contract | null>(null);

  useEffect(() => {
    const initializeProvider = () => {
      const providerInstance = new JsonRpcProvider(providerUrl);
      setProvider(providerInstance);
    };

    const initializeWallet = () => {
      if (provider && privateKey) {
        const walletInstance = new Wallet(privateKey, provider);
        setWallet(walletInstance);
      }
    };

    const initializeSwapRouter = () => {
      if (wallet) {
        const swapRouterInstance = new Contract(SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI, wallet);
        setSwapRouter(swapRouterInstance);
      }
    };

    const initializeQuoter = () => {
      if (wallet) {
        const quoterInstance = new Contract(QUOTER_ADDRESS, QuoterV2ABI, wallet);
        setQuoter(quoterInstance);
      }
    };

    initializeProvider();
    initializeWallet();
    initializeSwapRouter();
    initializeQuoter();
  }, [privateKey, provider, wallet]);

  const quoteSwap = async (inputToken: string, outputToken: string, amountIn: number): Promise<string | null> => {
    if (!quoter) return null;

    try {
      const amountInFormatted = parseEther(amountIn.toString());
      const parameters = {
          tokenIn: inputToken,
          tokenOut: outputToken,
          fee: fee,
          amountIn: amountInFormatted,
          sqrtPriceLimitX96: "0"
      };
      const amountOut = await quoter.callStatic.quoteExactInputSingle(parameters);
      return formatEther(amountOut[0]);
    } catch (error) {
      console.error('Failed to quote swap:', error);
      return null;
    }
  };

  const executeSwap = async (inputToken: string, outputToken: string, amountIn: number, recipient: string): Promise<void> => {
    if (!swapRouter) return;

    try {
      const amountInFormatted = parseEther(amountIn.toString());
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
      const tx = await swapRouter.exactInputSingle(params);
      await tx.wait();
      console.log(`Swap executed`);
    } catch (error) {
      console.error('Failed to execute swap:', error);
    }
  };

  return { quoteSwap, executeSwap };
};

export default useUniswap;
