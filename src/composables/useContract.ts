import { useMemo } from "react";
import { useAccount } from "wagmi";

import ERC20 from "../contracts/ERC20.json";
import EVMBridge from "../contracts/EVMBridge.json";
import EVMBridgeERC20Minter from "../contracts/EVMBridgeERC20Minter.json";
import EVMBridgeNative from "../contracts/EVMBridgeNative.json";
import { getContract } from "../utils/contracts";

import { useEthersSigner } from "./useEthersProvider";
import useRpcProvider from "./useRpcProvider";

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: object,
  withSignerIfPossible = true
) {
  const { address: account } = useAccount();
  const provider = useEthersSigner();
  const rpcProvider = useRpcProvider();

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;

    try {
      const contract = getContract(
        address,
        ABI,
        account ? provider : rpcProvider
      );
      return contract;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, provider, withSignerIfPossible, account]);
}

// Tokens
export function useTokenContract(
  tokenAddress: string | undefined,
  withSignerIfPossible = true
) {
  return useContract(tokenAddress, ERC20, withSignerIfPossible);
}

// Bridge GLQChain tokens
export function useEVMBridgeERC20MinterContract(
  tokenAddress: string | undefined,
  withSignerIfPossible = true
) {
  return useContract(tokenAddress, EVMBridgeERC20Minter, withSignerIfPossible);
}
// Bridge Mainnet native token
export function useEVMBridgeNativeContract(
  tokenAddress: string | undefined,
  withSignerIfPossible = true
) {
  return useContract(tokenAddress, EVMBridgeNative, withSignerIfPossible);
}
// Bridge Mainnet other tokens
export function useEVMBridgeContract(
  tokenAddress: string | undefined,
  withSignerIfPossible = true
) {
  return useContract(tokenAddress, EVMBridge, withSignerIfPossible);
}
