import { formatNumberToDollars } from "@utils/number";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { getDashboardInformation } from "../queries/api";

import { useEthersSigner } from "./useEthersProvider";
import useRpcProvider from "./useRpcProvider";
import { getErrorMessage } from "@utils/errors";

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
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ?? rpcProvider;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const ethResponse = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
        );
        const ethData = await ethResponse.json();
        const ethRate = parseFloat(ethData.data.rates.USD);

        const glqData = await getDashboardInformation();
        const glqRate = parseFloat(glqData.analytics.closePrice);

        setExchangeRates({
          loading: false,
          error: null,
          eth: ethRate,
          glq: glqRate,
        });
      } catch (error) {
        setError(getErrorMessage(error));
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

  return { ...exchangeRates, calculatePrice, error };
};

export default useExchangeRates;
