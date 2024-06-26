import "./style.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import InputRadioGroup from "@components/InputRadioGroup";
import Select from "@components/Select";
import TokenIcon from "@components/TokenIcon";
import { GLQCHAIN_SWAP_ROUTER_ADDRESS } from "@constants/address";
import { GLQCHAIN_CURRENCIES } from "@constants/apptoken";
import { GLQ_EXPLORER_URL } from "@constants/index";
import { slippageOptions } from "@constants/slippage";
import { getErrorMessage } from "@utils/errors";
import { formatBigNumberToFixed, formatNumberToFixed } from "@utils/number";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import { useTokenContract } from "../../composables/useContract";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import useSound from "../../composables/useSound";
import useTokenBalance from "../../composables/useTokenBalance";
import useUniswap from "../../composables/useUniswap";
import SEO from "@components/SEO";

const seoTitle = "GraphLinq Chain | Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the GraphLinq smart contract.";

function SwapPage() {
  const { address: account } = useAccount();

  const { calculatePrice } = useExchangeRates();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { isGLQChain } = useChains();
  const { quoteSwap, executeSwap, feeInPercent } = useUniswap();
  const { playSound } = useSound();

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [formDisabled, setFormDisabled] = useState(false);

  const [baseQuoteAmount, setBaseQuoteAmount] = useState(
    ethers.BigNumber.from(0)
  );
  const [quoteAmount, setQuoteAmount] = useState(ethers.BigNumber.from(0));
  const [loadingQuote, setLoadingQuote] = useState(false);

  const [maxSlippage, setMaxSlippage] = useState(slippageOptions[0].value);

  const [lastSwapAmount, setLastSwapAmount] = useState({
    own: "",
    trade: "",
  });

  let quoteQueue: Promise<void | unknown> = Promise.resolve();

  const getQuote = async () => {
    setLoadingQuote(true);

    const quotePromise = new Promise(async (resolve, reject) => {
      try {
        if (!ownCurrency) return;

        const base = await quoteSwap(
          ownCurrency.address.glq!,
          tradeCurrency.address.glq!,
          1
        );

        if (base) {
          setBaseQuoteAmount(base);
        }

        let result = ethers.BigNumber.from(0);
        if (
          !isNaN(parseFloat(ownCurrencyAmount)) &&
          parseFloat(ownCurrencyAmount) !== 0
        ) {
          const tempResult = await quoteSwap(
            ownCurrency.address.glq!,
            tradeCurrency.address.glq!,
            parseFloat(ownCurrencyAmount)
          );

          if (tempResult) {
            result = tempResult;
          }
        }

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
  const [tradeCurrencyOption, setTradeCurrencyOption] = useState(1);
  const ownCurrencyOptions = GLQCHAIN_CURRENCIES.map((currency) => {
    currency.icon = <TokenIcon tokenKey={currency.name} />;
    return currency;
  });
  const tradeCurrencyOptions = [...ownCurrencyOptions];

  const ownCurrency = ownCurrencyOptions[ownCurrencyOption];
  const tradeCurrency = tradeCurrencyOptions[tradeCurrencyOption];

  const {
    balance: ownCurrencyBalance,
    loadingBalance,
    fetchBalance,
  } = useTokenBalance(ownCurrency.address.glq!);

  const [ownCurrencyAmount, setOwnCurrencyAmount] = useState("");

  const activeTokenContract = useTokenContract(ownCurrency.address.glq);

  const handleCurrencySelectChange = (
    active: number,
    currency: "own" | "trade"
  ) => {
    resetFeedback();

    if (currency === "own") {
      setOwnCurrencyOption(active);

      if (tradeCurrencyOption === active) {
        setTradeCurrencyOption(ownCurrencyOption);
      }
    } else {
      setTradeCurrencyOption(active);

      if (ownCurrencyOption === active) {
        setOwnCurrencyOption(tradeCurrencyOption);
      }
    }

    setOwnCurrencyAmount("");
    setQuoteAmount(ethers.BigNumber.from(0));
  };

  const handleSwapCurrencies = () => {
    const newTradeCurrencyOption = ownCurrencyOption;
    setOwnCurrencyOption(tradeCurrencyOption);
    setTradeCurrencyOption(newTradeCurrencyOption);

    setOwnCurrencyAmount("");
    setQuoteAmount(ethers.BigNumber.from(0));
  };

  const handleSend = async () => {
    if (!quoteAmount || !account || loadingQuote || !activeTokenContract)
      return;

    resetFeedback();

    if (
      isNaN(parseFloat(ownCurrencyAmount)) ||
      parseFloat(ownCurrencyAmount) <= 0
    ) {
      setError(
        `Invalid amount to swap : ${
          ownCurrencyAmount !== "" ? ownCurrencyAmount : "0"
        } ${ownCurrency.name}`
      );
      return;
    }

    if (
      ownCurrencyBalance &&
      parseFloat(ownCurrencyAmount) > parseFloat(ownCurrencyBalance)
    ) {
      setPending("");
      setError(
        `You only have ${formatNumberToFixed(
          parseFloat(ownCurrencyBalance),
          6
        )} ${ownCurrency.name} in your wallet.`
      );
      setFormDisabled(false);
      return;
    }

    try {
      setLoading(true);
      setFormDisabled(true);

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

      const tx = await executeSwap(
        ownCurrency.address.glq!,
        tradeCurrency.address.glq!,
        parseFloat(ownCurrencyAmount),
        account,
        ethers.utils.formatEther(quoteAmount),
        maxSlippage
      );

      setPending("Waiting for confirmations...");

      const receipt = await tx.wait();

      setSuccess(receipt.transactionHash);
      setLoading(false);
      setFormDisabled(false);
      fetchBalance();

      setLastSwapAmount({
        own: `${formatNumberToFixed(parseFloat(ownCurrencyAmount), 6)} ${
          ownCurrency.name
        }`,
        trade: `${formatBigNumberToFixed(quoteAmount, 6)} ${
          tradeCurrency.name
        }`,
      });

      setOwnCurrencyAmount("");

      playSound("sound_1");
    } catch (error: any) {
      resetFeedback();
      setError(getErrorMessage(error));
      setLoading(false);
      setFormDisabled(false);
      setOwnCurrencyAmount("");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const debouncedGetQuote = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (account) {
          getQuote();
        }
      }, 500);
    };

    debouncedGetQuote();

    return () => clearTimeout(timer);
  }, [account, ownCurrency, ownCurrencyAmount]);

  const trackingExplorer = `${GLQ_EXPLORER_URL}/tx/${success}`;

  const ownAmountPriceNb = calculatePrice(
    !isNaN(parseFloat(ownCurrencyAmount)) ? parseFloat(ownCurrencyAmount) : 0,
    ownCurrency.exchangeRate,
    "number"
  );
  const quoteAmountPriceNb = calculatePrice(
    parseFloat(ethers.utils.formatEther(quoteAmount)),
    tradeCurrency.exchangeRate,
    "number"
  );

  const priceImpact =
    quoteAmountPriceNb && ownAmountPriceNb
      ? 100 -
        ((quoteAmountPriceNb as number) / (ownAmountPriceNb as number)) * 100
      : 0;

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <div className="main-page swap">
        <div className="main-card">
          <div className="main-card-title">Swap</div>
          <div
            className="main-card-content"
            data-disabled={loadingQuote || loadingBalance || formDisabled}
          >
            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please connect to swap assets.
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
                              max={Infinity}
                              onChange={(val) => setOwnCurrencyAmount(val)}
                            />
                          </div>
                          <div className="swap-choice-input-price">
                            {calculatePrice(
                              !isNaN(parseFloat(ownCurrencyAmount))
                                ? parseFloat(ownCurrencyAmount)
                                : 0,
                              ownCurrency.exchangeRate
                            )}
                          </div>
                          <Select
                            active={ownCurrencyOption}
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
                      <div
                        className="swap-choices-switch"
                        onClick={handleSwapCurrencies}
                      >
                        <Swap />
                      </div>
                      <div className="swap-choice">
                        <div className="swap-choice-label">You receive</div>
                        <div className="swap-choice-input">
                          <div className="swap-choice-input-wrapper">
                            <input
                              type="number"
                              value={formatBigNumberToFixed(quoteAmount, 6)}
                              readOnly
                            />
                          </div>
                          <div className="swap-choice-input-price">
                            {calculatePrice(
                              parseFloat(ethers.utils.formatEther(quoteAmount)),
                              tradeCurrency.exchangeRate
                            )}
                          </div>
                          <Select
                            active={tradeCurrencyOption}
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
                            {formatBigNumberToFixed(baseQuoteAmount, 6)}{" "}
                            {tradeCurrency.name}
                          </span>
                          <span className="color">
                            {calculatePrice(
                              parseFloat(
                                ethers.utils.formatEther(baseQuoteAmount)
                              ),
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
                    {parseFloat(ownCurrencyAmount) > 0 && !loadingQuote && (
                      <Alert type={priceImpact > 5 ? "error" : "info"}>
                        <p>Price impact : {(priceImpact * -1).toFixed(2)} %</p>
                      </Alert>
                    )}
                    <div className="swap-submit">
                      <Button
                        onClick={handleSend}
                        disabled={loadingQuote || loadingBalance}
                        icon={loading && <Spinner />}
                      >
                        Swap
                      </Button>
                    </div>
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
                Your swap of <b>{lastSwapAmount.own}</b> for{" "}
                <b>{lastSwapAmount.trade}</b> is now successfully completed.
              </p>
              <p className="small" style={{ marginTop: 8 }}>
                <a href={trackingExplorer} target="_blank">
                  <small>Tx hash: {success}</small>
                </a>
              </p>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

export default SwapPage;
