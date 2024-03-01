import "./_swap.scss";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Arrow from "@assets/icons/arrow.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import Select from "@components/Select";
import {
  MAINNET_CURRENCIES,
  GLQCHAIN_CURRENCIES,
  SITE_NAME,
} from "@constants/index";
import { MAINNET_CHAIN_ID } from "@utils/chains";
import { formatNumberToDollars, formatNumberToFixed } from "@utils/number";
import { useWeb3React } from "@web3-react/core";
import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";

import useTokenBalance from "../../composables/useTokenBalance";
import useExchangeRates from "../../composables/useExchangeRates";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

function SwapPage() {
  const { chainId, account } = useWeb3React();
  const { calculatePrice } = useExchangeRates();

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");
  const [tracking, setTracking] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(true);

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const [ownCurrencyOption, setOwnCurrencyOption] = useState(0);
  const [tradeCurrencyOption, setTradeCurrencyOption] = useState(0);
  const ownCurrencyOptions = (
    chainId === MAINNET_CHAIN_ID ? MAINNET_CURRENCIES : GLQCHAIN_CURRENCIES
  ).map((currency) => {
    currency.icon = tokenIcons[currency.name];
    return currency;
  });
  const tradeCurrencyOptions = ownCurrencyOptions.filter(
    (_, i) => i !== ownCurrencyOption
  );

  const ownCurrency = ownCurrencyOptions[ownCurrencyOption];
  const tradeCurrency = tradeCurrencyOptions[tradeCurrencyOption];

  const { balance: ownCurrencyBalance, fetchBalance: fetchOwnCurrencyBalance } =
    useTokenBalance(
      ownCurrency.address[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
    );
  const {
    balance: tradeCurrencyBalance,
    fetchBalance: fetchTradeCurrencyBalance,
  } = useTokenBalance(
    tradeCurrency.address[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
  );

  const [ownCurrencyAmount, setOwnCurrencyAmount] = useState(0);
  const [tradeCurrencyAmount, setTradeCurrencyAmount] = useState(0);

  const [ownCurrencyPrice, setOwnCurrencyPrice] = useState(0);
  const [tradeCurrencyPrice, setTradeCurrencyPrice] = useState(0);

  const handleCurrencySelectChange = (
    active: number,
    currency: "own" | "trade"
  ) => {
    resetFeedback();

    if (currency === "own") {
      setOwnCurrencyOption(active);
      setOwnCurrencyAmount(0);
    } else {
      setTradeCurrencyOption(active);
      setTradeCurrencyAmount(0);
    }
  };

  const handleCurrencyAmountChange = (
    evt: ChangeEvent<HTMLInputElement>,
    currency: "own" | "trade"
  ) => {
    const newValue: number = parseFloat(evt.target.value);
    if (currency === "own") {
      setOwnCurrencyAmount(newValue);
    } else {
      setTradeCurrencyAmount(newValue);
    }
  };

  const handleChange = async () => {
    resetFeedback();
  };

  const handleSend = async () => {
    resetFeedback();
  };

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Swap</title>
      </Helmet>
      <div className="main-page swap">
        <div className="main-card">
          <div className="main-card-title">Swap</div>
          {!account ? (
            <>
              <div className="main-card-notlogged">
                Please login to swap assets.
              </div>
            </>
          ) : (
            <>
              <div className="swap-amount">
                <div className="swap-amount-subtitle">Available</div>
                <div className="swap-amount-value">
                  {ownCurrencyBalance && <span>{formatNumberToFixed(parseFloat(ownCurrencyBalance), 6)}</span>}
                  {ownCurrency.name}
                </div>
              </div>
              <div className="swap-choices">
                <div className="swap-choice">
                  <div className="swap-choice-label">You pay</div>
                  <div className="swap-choice-input">
                    <div className="swap-choice-input-wrapper">
                      <input
                        type="number"
                        value={ownCurrencyAmount}
                        max={
                          ownCurrencyBalance
                            ? parseFloat(ownCurrencyBalance)
                            : 0
                        }
                        onChange={(evt) =>
                          handleCurrencyAmountChange(evt, "own")
                        }
                      />
                    </div>
                    <div className="swap-choice-input-price">
                      {formatNumberToDollars(ownCurrencyPrice, 2)}
                    </div>
                    <Select
                      options={ownCurrencyOptions.map((opt) => (
                        <>
                          {opt.icon} <span>{opt.name}</span>
                        </>
                      ))}
                      onChange={(active) =>
                        handleCurrencySelectChange(active, "own")
                      }
                    />
                  </div>
                </div>
                <div className="swap-choices-switch">
                  <Swap />
                </div>
                <div className="swap-choice">
                  <div className="swap-choice-label">You receive</div>
                  <div className="swap-choice-input">
                    <div className="swap-choice-input-wrapper">
                      <input
                        type="number"
                        value={tradeCurrencyAmount}
                        max={
                          tradeCurrencyBalance
                            ? parseFloat(tradeCurrencyBalance)
                            : 0
                        }
                        onChange={(evt) =>
                          handleCurrencyAmountChange(evt, "trade")
                        }
                      />
                    </div>
                    <div className="swap-choice-input-price">
                      {formatNumberToDollars(tradeCurrencyPrice, 2)}
                    </div>
                    <Select
                      options={tradeCurrencyOptions.map((opt) => (
                        <>
                          {opt.icon} <span>{opt.name}</span>
                        </>
                      ))}
                      onChange={(active) =>
                        handleCurrencySelectChange(active, "trade")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="swap-summary" data-open={summaryOpen}>
                <div
                  className="swap-summary-header"
                  onClick={() => setSummaryOpen(!summaryOpen)}
                >
                  <div className="swap-summary-header-info">
                    <span>1 {ownCurrency.name}</span>
                    <span>=</span>
                    <span>? {tradeCurrency.name}</span>
                    <span>{calculatePrice(1, ownCurrency.exchangeRate)}</span>
                  </div>
                  <Arrow />
                </div>
                <div className="swap-summary-details">
                  <div className="swap-summary-detail">
                    <span>Max slippage</span>
                    <span>?%</span>
                  </div>
                  <div className="swap-summary-detail">
                    <span>Fee</span>
                    <span>{formatNumberToDollars(0)}</span>
                  </div>
                  <div className="swap-summary-detail">
                    <span>Network cost</span>
                    <span>{formatNumberToDollars(0)}</span>
                  </div>
                </div>
              </div>
              <div className="swap-submit">
                <Button onClick={handleSend}>Send</Button>
              </div>
              {error && (
                <Alert type="error">
                  <p>{error}</p>
                </Alert>
              )}
              {!success && pending && (
                <Alert type="warning">
                  <p>{pending}</p>
                </Alert>
              )}
              {success && (
                <Alert type="success">
                  <p>
                    <b>Successfully completed !</b>
                  </p>
                </Alert>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SwapPage;
