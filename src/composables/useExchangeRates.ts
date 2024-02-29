import { formatNumberToDollars } from '@utils/number';
import { useState, useEffect } from 'react';

interface CoinbaseExchangeRates {
  loading: boolean;
  error: string | null;
  eth: number | null;
  glq: number | null;
}

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<CoinbaseExchangeRates>({
    loading: true,
    error: null,
    eth: null,
    glq: null,
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const ethResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
        const ethData = await ethResponse.json();
        const ethRate = parseFloat(ethData.data.rates.USD);

        const glqResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=GLQ');
        const glqData = await glqResponse.json();
        const glqRate = parseFloat(glqData.data.rates.USD);

        setExchangeRates({
          loading: false,
          error: null,
          eth: ethRate,
          glq: glqRate,
        });
      } catch (error) {
        setExchangeRates({
          loading: false,
          error: 'Failed to fetch exchange rates',
          eth: null,
          glq: null,
        });
      }
    };

    fetchExchangeRates();
  }, []);

  const calculatePrice = (amount: number, currency: 'eth' | 'glq') => {
    if (!exchangeRates[currency]) {
        return;
    }
    return formatNumberToDollars(amount * exchangeRates[currency]!, 2);
  };

  return { ...exchangeRates, calculatePrice };
};

export default useExchangeRates;
