import { ethers } from "ethers";
import { useState, useEffect } from "react";

import useRpcProvider from "./useRpcProvider";

interface TokenInfo {
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  loading: boolean;
  error: string | null;
}

function useTokenInfo(tokenAddress: string): TokenInfo {
  const rpcProvider = useRpcProvider();

  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenDecimals, setTokenDecimals] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        setLoading(true);
        const ERC20_ABI = [
          "function name() view returns (string)",
          "function symbol() view returns (string)",
          "function decimals() view returns (uint8)",
        ];
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20_ABI,
          rpcProvider
        );

        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const decimals = await tokenContract.decimals();

        setTokenName(name);
        setTokenSymbol(symbol);
        setTokenDecimals(decimals);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (tokenAddress) {
      fetchTokenInfo();
    }
  }, [tokenAddress]);

  return { tokenName, tokenSymbol, tokenDecimals, loading, error };
}

export default useTokenInfo;
