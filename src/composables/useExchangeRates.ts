import { formatNumberToDollars } from '@utils/number';
import { useState, useEffect } from 'react';
import useUniswap from './useUniswap';
import { WETH_TOKEN, WGLQ_TOKEN } from '@constants/index';
import useChains from './useChains';
import { useWeb3React } from '@web3-react/core';

interface CoinbaseExchangeRates {
  loading: boolean;
  error: string | null;
  eth: number | null;
  glq: number | null;
}

const useExchangeRates = () => {
  const { account } = useWeb3React();
  const [exchangeRates, setExchangeRates] = useState<CoinbaseExchangeRates>({
    loading: true,
    error: null,
    eth: null,
    glq: null,
  });
  const { isMainnet } = useChains();
  const { quoteSwap  } = useUniswap();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const ethResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
        const ethData = await ethResponse.json();
        const ethRate = parseFloat(ethData.data.rates.USD);

        const glqPerETH = await quoteSwap(
          WETH_TOKEN.address[isMainnet ? "mainnet" : "glq"],
          WGLQ_TOKEN.address[isMainnet ? "mainnet" : "glq"],
          1
        );

        if (glqPerETH) {
          const glqRate = ethRate / parseFloat(glqPerETH);

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
          error: 'Failed to fetch exchange rates',
          eth: null,
          glq: null,
        });
      }
    };

    fetchExchangeRates();
  }, [account]);

  const calculatePrice = (amount: number, currency: 'eth' | 'glq') => {
    if (!exchangeRates[currency]) {
        return;
    }
    return formatNumberToDollars(amount * exchangeRates[currency]!, 2);
  };

  return { ...exchangeRates, calculatePrice };
};

export default useExchangeRates;
