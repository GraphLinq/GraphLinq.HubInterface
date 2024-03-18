import { useMemo } from "react";
import { useAccount } from "wagmi";

import ERC20 from "../contracts/ERC20.json";
import EVMBridge from "../contracts/EVMBridge.json";
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
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ?? rpcProvider;

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;

    try {
      const contract = getContract(
        address,
        ABI,
        provider 
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

export function useBridgeContract(
  tokenAddress: string | undefined,
  withSignerIfPossible = true
) {
  return useContract(tokenAddress, EVMBridge, withSignerIfPossible);
}
