import { GLQCHAIN_BRIDGE_OUT_WGLQ } from "@constants/index";
import { Contract } from "ethers";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

import WRAPPER_ABI from "../contracts/EVMBridgeERC20Minter.json";

import { useEthersSigner } from "./useEthersProvider";
import useRpcProvider from "./useRpcProvider";

const useWrapper = () => {
  const { address: account } = useAccount();
  const rpcProvider = useRpcProvider();
  const provider = useEthersSigner();

  const wrapper = new Contract(
    GLQCHAIN_BRIDGE_OUT_WGLQ,
    WRAPPER_ABI,
    provider ? provider : rpcProvider
  );

  const executeWrap = async (amountIn: number) => {
    if (!wrapper) return;

    try {
      const amountInFormatted = ethers.utils.parseEther(amountIn.toString());
      const txOptions = {
        from: account,
        value: amountInFormatted,
      };
      return await wrapper.wrap(txOptions);
    } catch (error) {
      console.error("Failed to wrap assets:", error);
    }
  };

  const executeUnwrap = async (amountIn: number) => {
    if (!wrapper) return;

    try {
      const amountInFormatted = ethers.utils.parseEther(amountIn.toString());
      const txOptions = {
        from: account,
      };
      return await wrapper.unwrap(amountInFormatted, txOptions);
    } catch (error: any) {
      console.error("Failed to unwrap assets:", error);
      throw new Error(error);
    }
  };

  return { wrapper, executeWrap, executeUnwrap };
};

export default useWrapper;
