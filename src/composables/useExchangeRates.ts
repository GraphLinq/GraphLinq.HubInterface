import { getErrorMessage } from "@utils/errors";
import { formatNumberToDollars } from "@utils/number";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { getDashboardInformation } from "../queries/api";

import { useEthersSigner } from "./useEthersProvider";
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
  const rpcProvider = useRpcProvider();
  const injectedProvider = useEthersSigner();
  const provider = injectedProvider ?? rpcProvider;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const data = await getDashboardInformation();
        const glqRate = parseFloat(data.analytics.closePrice);
        const ethRate = data.prices.ETH;

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
