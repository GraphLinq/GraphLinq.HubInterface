import { useState } from "react";
import useChains from "./useChains";
import { WETH_TOKEN, WGLQ_TOKEN } from "@constants/index";
import { getErrorMessage } from "@utils/errors";

function useAddTokens() {
  const { isGLQChain } = useChains();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToken = async (
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number,
    tokenImage: string
  ) => {
    setLoading(true);

    try {
      const winEth = window.ethereum as any;
      
      if (!winEth) {
        throw new Error("Ethereum provider not found.");
      }

      const success = await winEth.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (success) {
        setLoading(false);
        setError(null);
      } else {
        throw new Error("Failed to add token.");
      }
    } catch (error: any) {
      setError(getErrorMessage(error.code));
      setLoading(false);
    }
  };

  const addWGLQToken = async () => {
    addToken(
      WGLQ_TOKEN.address[isGLQChain ? "glq" : "mainnet"]!,
      isGLQChain ? "WGLQ" : "GLQ",
      18,
      "https://s2.coinmarketcap.com/static/img/coins/64x64/9029.png"
    );
  };

  const addWETHToken = async () => {
    if (!isGLQChain) return;

    addToken(
      WETH_TOKEN.address.glq!,
      "WETH",
      18,
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    );
  };

  return { addWGLQToken, addWETHToken, loading, error };
}

export default useAddTokens;
