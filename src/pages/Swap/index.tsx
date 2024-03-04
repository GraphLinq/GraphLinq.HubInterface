import "./_swap.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import InputRadioGroup from "@components/InputRadioGroup";
import Select from "@components/Select";
import {
  MAINNET_CURRENCIES,
  GLQCHAIN_CURRENCIES,
  SITE_NAME,
  GLQCHAIN_SWAP_ROUTER_ADDRESS,
  GLQ_EXPLORER,
} from "@constants/index";
import { formatNumberToFixed } from "@utils/number";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import useChains from "../../composables/useChains";
import { useTokenContract } from "../../composables/useContract";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import useTokenBalance from "../../composables/useTokenBalance";
import useUniswap from "../../composables/useUniswap";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

const slippageOptions = [
  {
    label: "0.5%",
    value: "5",
  },
  {
    label: "1%",
    value: "10",
  },
  {
    label: "2%",
    value: "20",
  },
  {
    label: "3%",
    value: "30",
  },
];

function SwapPage() {
  const { account } = useWeb3React();
  const { calculatePrice } = useExchangeRates();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { isGLQChain, isMainnet } = useChains();
  const { quoteSwap, executeSwap, feeInPercent } = useUniswap();

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(true);

  const [baseQuoteAmount, setBaseQuoteAmount] = useState<string | null>("0");
  const [quoteAmount, setQuoteAmount] = useState<string | null>("0");
  const [loadingQuote, setLoadingQuote] = useState(false);

  const [maxSlippage, setMaxSlippage] = useState(slippageOptions[0].value);

  let quoteQueue = Promise.resolve();

  const getQuote = async () => {
    setLoadingQuote(true);

    const quotePromise = new Promise(async (resolve, reject) => {
      try {
        if (!ownCurrency) return;

        const base = await quoteSwap(
          ownCurrency.address[isMainnet ? "mainnet" : "glq"],
          tradeCurrency.address[isMainnet ? "mainnet" : "glq"],
          1
        );
        setBaseQuoteAmount(base);

        if (parseFloat(ownCurrencyAmount) === 0) return;

        const result = await quoteSwap(
          ownCurrency.address[isMainnet ? "mainnet" : "glq"],
          tradeCurrency.address[isMainnet ? "mainnet" : "glq"],
          parseFloat(ownCurrencyAmount)
        );
        setQuoteAmount(result);

        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        setLoadingQuote(false);
      }
    });

    quoteQueue = quoteQueue.then(() => quotePromise);

    return quotePromise;
  };

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const [ownCurrencyOption, setOwnCurrencyOption] = useState(0);
  const [tradeCurrencyOption, setTradeCurrencyOption] = useState(0);
  const ownCurrencyOptions = (
    isMainnet ? MAINNET_CURRENCIES : GLQCHAIN_CURRENCIES
  ).map((currency) => {
    currency.icon = tokenIcons[currency.name];
    return currency;
  });
  const tradeCurrencyOptions = ownCurrencyOptions.filter(
    (_, i) => i !== ownCurrencyOption
  );

  const ownCurrency = ownCurrencyOptions[ownCurrencyOption];
  const tradeCurrency = tradeCurrencyOptions[tradeCurrencyOption];

  const { balance: ownCurrencyBalance, loadingBalance } = useTokenBalance(
    ownCurrency.address[isMainnet ? "mainnet" : "glq"]
  );

  const [ownCurrencyAmount, setOwnCurrencyAmount] = useState("0");

  const activeTokenContract = useTokenContract(
    ownCurrency.address[isMainnet ? "mainnet" : "glq"]
  );

  const handleCurrencySelectChange = (
    active: number,
    currency: "own" | "trade"
  ) => {
    resetFeedback();

    if (currency === "own") {
      setOwnCurrencyOption(active);
    } else {
      setTradeCurrencyOption(active);
    }

    setOwnCurrencyAmount("0");
    setQuoteAmount("0");
  };

  const handleSend = async () => {
    if (!quoteAmount || !account || loadingQuote || !activeTokenContract)
      return;

    resetFeedback();

    if (parseFloat(ownCurrencyAmount) <= 0) {
      setError(
        `Invalid amount to swap : ${ownCurrencyAmount} ${ownCurrency.name}`
      );
      return;
    }

    let allowance = "0";
    allowance = await activeTokenContract.allowance(
      account,
      GLQCHAIN_SWAP_ROUTER_ADDRESS
    );

    const allowanceDecimal = parseFloat(
      ethers.utils.formatEther(allowance.toString())
    );

    if (allowanceDecimal < parseFloat(ownCurrencyAmount)) {
      setPending(
        "Allowance pending, please allow the use of your token balance for the contract..."
      );
      const approveTx = await activeTokenContract.approve(
        GLQCHAIN_SWAP_ROUTER_ADDRESS,
        ethers.utils.parseEther(ownCurrencyAmount)
      );
      setPending("Waiting for confirmations...");
      await approveTx.wait();
      setPending(
        "Allowance successfully increased, waiting for swap transaction..."
      );
    }

    if (
      ownCurrencyBalance &&
      parseFloat(ownCurrencyAmount) > parseFloat(ownCurrencyBalance)
    ) {
      setPending("");
      setError(
        `You only have ${ownCurrencyBalance} ${ownCurrency.name} in your wallet.`
      );
      return;
    }

    setPending(
      "Pending, check your wallet extension to execute the chain transaction..."
    );

    const tx = await executeSwap(
      ownCurrency.address[isMainnet ? "mainnet" : "glq"],
      tradeCurrency.address[isMainnet ? "mainnet" : "glq"],
      parseFloat(ownCurrencyAmount),
      account,
      quoteAmount,
      maxSlippage
    );

    setPending("Waiting for confirmations...");

    const receipt = await tx.wait();

    setSuccess(receipt.transactionHash);
  };

  useEffect(() => {
    if (account) {
      getQuote();
    }
  }, [account, ownCurrency, ownCurrencyAmount]);

  const trackingExplorer = `${GLQ_EXPLORER}/tx/${success}`;

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Swap</title>
      </Helmet>
      <div className="main-page swap">
        <div className="main-card">
          <div className="main-card-title">Swap</div>
          <div
            className="main-card-content"
            data-disabled={loadingQuote || loadingBalance}
          >
            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please login to swap assets.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    <div className="swap-amount">
                      <div className="swap-amount-subtitle">Available</div>
                      <div className="swap-amount-value">
                        {ownCurrencyBalance && (
                          <span>
                            {formatNumberToFixed(
                              parseFloat(ownCurrencyBalance),
                              6
                            )}
                          </span>
                        )}
                        {ownCurrency.name}
                      </div>
                    </div>
                    <div className="swap-choices">
                      <div className="swap-choice">
                        <div className="swap-choice-label">You pay</div>
                        <div className="swap-choice-input">
                          <div className="swap-choice-input-wrapper">
                            <InputNumber
                              value={ownCurrencyAmount}
                              max={
                                ownCurrencyBalance
                                  ? parseFloat(ownCurrencyBalance)
                                  : 0
                              }
                              onChange={(val) => setOwnCurrencyAmount(val)}
                            />
                          </div>
                          <div className="swap-choice-input-price">
                            {calculatePrice(
                              parseFloat(ownCurrencyAmount),
                              ownCurrency.exchangeRate
                            )}
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
                              value={formatNumberToFixed(
                                quoteAmount ? parseFloat(quoteAmount) : 0,
                                6
                              )}
                              readOnly
                            />
                          </div>
                          <div className="swap-choice-input-price">
                            {calculatePrice(
                              quoteAmount ? parseFloat(quoteAmount) : 0,
                              tradeCurrency.exchangeRate
                            )}
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
                          <span className="color">
                            {calculatePrice(1, ownCurrency.exchangeRate)}
                          </span>
                          <span className="color">=</span>
                          <span>
                            {baseQuoteAmount
                              ? formatNumberToFixed(
                                  parseFloat(baseQuoteAmount),
                                  6
                                )
                              : 0}{" "}
                            {tradeCurrency.name}
                          </span>
                          <span className="color">
                            {calculatePrice(
                              baseQuoteAmount ? parseFloat(baseQuoteAmount) : 0,
                              tradeCurrency.exchangeRate
                            )}
                          </span>
                        </div>
                        <Arrow />
                      </div>
                      <div className="swap-summary-details">
                        <div className="swap-summary-detail">
                          <span>Max slippage</span>
                          <span className="bridge-amount-swap-actions">
                            <InputRadioGroup
                              options={slippageOptions}
                              onChange={(val) => setMaxSlippage(val)}
                              defaultOption={maxSlippage}
                            />
                          </span>
                        </div>
                        <div className="swap-summary-detail">
                          <span>Fee + Network cost</span>
                          <span>~{feeInPercent}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="swap-submit">
                      <Button
                        onClick={handleSend}
                        disabled={loadingQuote || loadingBalance}
                      >
                        Send
                      </Button>
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
                          Your swap of{" "}
                          <b>
                            {formatNumberToFixed(
                              parseFloat(ownCurrencyAmount),
                              6
                            )}{" "}
                            {ownCurrency.name}
                          </b>{" "}
                          for{" "}
                          <b>
                            {formatNumberToFixed(
                              quoteAmount ? parseFloat(quoteAmount) : 0,
                              6
                            )}{" "}
                            {tradeCurrency.name}
                          </b>{" "}
                          is now successfully completed.
                        </p>
                        <p className="small" style={{ marginTop: 8 }}>
                          <a href={trackingExplorer} target="_blank">
                            <small>Tx hash: {success}</small>
                          </a>
                        </p>
                      </Alert>
                    )}
                  </>
                ) : (
                  <>
                    <div className="main-card-wrongnetwork">
                      Please switch to GLQ Chain network to swap assets.
                      <Button onClick={switchToGraphLinqMainnet}>
                        Switch to GLQ Chain network
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SwapPage;
