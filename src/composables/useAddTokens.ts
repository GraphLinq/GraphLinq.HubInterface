import { useState } from "react";
import useChains from "./useChains";
import { WGLQ_TOKEN } from "@constants/index";

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
      if (!window.ethereum || !window.ethereum.request) {
        throw new Error("Ethereum provider not found.");
      }

      const success = await window.ethereum.request({
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
      console.error("Error adding token:", error);
      setError(error.message || "An error occurred while adding token.");
      setLoading(false);
    }
  };

  const addWGLQToken = async () => {
    addToken(
      WGLQ_TOKEN.address[isGLQChain ? "glq" : "mainnet"],
      isGLQChain ? "WGLQ" : "GLQ",
      18,
      "https://s2.coinmarketcap.com/static/img/coins/64x64/9029.png"
    );
  };

  const addWETHToken = async () => {
    if (!isGLQChain) return;

    addToken(
      WGLQ_TOKEN.address.glq,
      "WETH",
      18,
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    );
  };

  return { addWGLQToken, addWETHToken, loading, error };
}

export default useAddTokens;
