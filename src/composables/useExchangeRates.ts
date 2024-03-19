import { WETH_TOKEN, WGLQ_TOKEN } from "@constants/index";
import { formatNumberToDollars } from "@utils/number";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { useEthersSigner } from "./useEthersProvider";
import useUniswap from "./useUniswap";
import useRpcProvider from "./useRpcProvider";

interface CoinbaseExchangeRates {
  loading: boolean;
  error: string | null;
  eth: number | null;
  glq: number | null;
}

const useExchangeRates = () => {
  const { address: account } = useAccount();
  const [exchangeRates, setExchangeRates] = useState<CoinbaseExchangeRates>({
    loading: true,
    error: null,
    eth: null,
    glq: null,
  });
  const { quoteSwap } = useUniswap();
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ?? rpcProvider;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const ethResponse = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
        );
        const ethData = await ethResponse.json();
        const ethRate = parseFloat(ethData.data.rates.USD);

        const glqPerETH = await quoteSwap(
          WETH_TOKEN.address.glq!,
          WGLQ_TOKEN.address.glq!,
          0.01
        );

        if (glqPerETH) {
          const glqRate = ethRate / (parseFloat(glqPerETH) * 100);

          setExchangeRates({
            loading: false,
            error: null,
            eth: ethRate,
            glq: glqRate,
          });
        }
      } catch (error) {
        setExchangeRates({
          loading: false,
          error: "Failed to fetch exchange rates",
          eth: null,
          glq: null,
        });
      }
    };

    fetchExchangeRates();

    const intervalId = setInterval(fetchExchangeRates, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [account, provider]);

  const calculatePrice = (amount: number, currency: "eth" | "glq") => {
    if (!exchangeRates[currency]) {
      return;
    }
    return formatNumberToDollars(amount * exchangeRates[currency]!, 4);
  };

  return { ...exchangeRates, calculatePrice };
};

export default useExchangeRates;
