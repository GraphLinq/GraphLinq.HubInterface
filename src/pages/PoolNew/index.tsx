import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import InputRadioGroup from "@components/InputRadioGroup";
import InputToggle from "@components/InputToggle";
import Select from "@components/Select";
import TokenIcon from "@components/TokenIcon";
import { GLQCHAIN_CURRENCIES } from "@constants/apptoken";
import { feesOptions } from "@constants/fees";
import { SITE_NAME } from "@constants/index";
import { getPoolTokenByAddress, orderedPoolTokens } from "@constants/pooltoken";
import { tickToPrice } from "@uniswap/v3-sdk";
import { formatNumberToFixed } from "@utils/number";
import { ethers } from "ethers";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./style.scss";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";

const seoTitle = `${SITE_NAME} — Create pool`;

function PoolNewPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const {
    getPoolState,
    deployOrGetPool,
    mintLiquidity,
    pending: poolPending,
    error: poolError,
    success: poolSuccess,
  } = usePool();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fullRange, setFullRange] = useState(false);
  const [isNewPool, setNewPool] = useState(false);
  const [firstCurrencyOption, setFirstCurrencyOption] = useState(0);
  const [secondCurrencyOption, setSecondCurrencyOption] = useState(1);
  const firstCurrencyOptions = GLQCHAIN_CURRENCIES.map((currency) => {
    currency.icon = <TokenIcon tokenKey={currency.name} />;
    return currency;
  });
  const secondCurrencyOptions = [...firstCurrencyOptions];

  const firstCurrency = firstCurrencyOptions[firstCurrencyOption];
  const secondCurrency = secondCurrencyOptions[secondCurrencyOption];

  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState("");
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState("");

  const { data: firstCurrencyBalanceRaw } = useBalance({
    address: account,
    token: firstCurrency.address.glq,
  });
  const firstCurrencyBalance = firstCurrencyBalanceRaw?.value
    ? ethers.utils.formatEther(firstCurrencyBalanceRaw?.value)
    : "0";
  const { data: secondCurrencyBalanceRaw } = useBalance({
    address: account,
    token: secondCurrency.address.glq,
  });
  const secondCurrencyBalance = secondCurrencyBalanceRaw?.value
    ? ethers.utils.formatEther(secondCurrencyBalanceRaw?.value)
    : "0";

  const handleCurrencySelectChange = (
    active: number,
    currency: "first" | "second"
  ) => {
    resetFeedback();

    if (currency === "first") {
      setFirstCurrencyOption(active);

      if (secondCurrencyOption === active) {
        setSecondCurrencyOption(firstCurrencyOption);
      }
    } else {
      setSecondCurrencyOption(active);

      if (firstCurrencyOption === active) {
        setFirstCurrencyOption(secondCurrencyOption);
      }
    }

    setFirstCurrencyAmount("");
    setSecondCurrencyAmount("");
  };

  const handleSwapCurrencies = () => {
    const newSecondCurrencyOption = firstCurrencyOption;
    setFirstCurrencyOption(secondCurrencyOption);
    setSecondCurrencyOption(newSecondCurrencyOption);

    setFirstCurrencyAmount("");
    setSecondCurrencyAmount("");
  };

  const [fees, setFees] = useState(feesOptions[3].value);
  const [currentPoolPrice, setCurrentPoolPrice] = useState(0);
  const [currentPoolPriceReversed, setCurrentPoolPriceReversed] = useState(0);

  const handleFees = async (val: string) => {
    if (!firstPoolToken || !secondPoolToken) {
      return;
    }

    setLoading(true);
    setFees(val);
    setFirstCurrencyAmount("");
    setSecondCurrencyAmount("");
    setNewPool(false);

    const poolAddress = await deployOrGetPool(
      firstPoolToken,
      secondPoolToken,
      "0",
      "0",
      val,
      false
    );

    if (poolAddress) {
      const poolState = await getPoolState(poolAddress);

      if (poolState) {
        const [token0, token1] = orderedPoolTokens(
          firstPoolToken,
          secondPoolToken
        );

        const currentPrice = parseFloat(
          tickToPrice(token0, token1, poolState.tick).toSignificant()
        );
        const currentPriceReversed = parseFloat(
          tickToPrice(token1, token0, poolState.tick).toSignificant()
        );
        if (firstPoolToken.address === token0.address) {
          setCurrentPoolPrice(currentPriceReversed);
          setCurrentPoolPriceReversed(currentPrice);
        } else {
          setCurrentPoolPrice(currentPrice);
          setCurrentPoolPriceReversed(currentPriceReversed);
        }
      }
    } else {
      setNewPool(true);
      setCurrentPoolPrice(0);
      setCurrentPoolPriceReversed(0);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleFees(fees);
  }, [firstCurrency, secondCurrency]);

  const rangeConfig = {
    minRange: {
      min: -0.95,
      max: 0,
    },
    maxRange: {
      min: 0,
      max: 1,
    },
    step: 0.05,
  };

  const [rangeMin, setRangeMin] = useState(-0.5);
  const [rangeMax, setRangeMax] = useState(1);

  const rangeMinPerc = rangeMin * 100;
  const rangeMaxPerc = rangeMax * 100;

  const rangeMinAmount = (currentPoolPrice * (100 + rangeMinPerc)) / 100;
  const rangeMaxAmount = (currentPoolPrice * (100 + rangeMaxPerc)) / 100;
  const rangeMinReversedAmount =
    (currentPoolPriceReversed * (100 + rangeMinPerc)) / 100;
  const rangeMaxReversedAmount =
    (currentPoolPriceReversed * (100 + rangeMaxPerc)) / 100;

  const firstPoolToken = getPoolTokenByAddress(
    firstCurrency.address.glq!,
    "glq"
  );
  const secondPoolToken = getPoolTokenByAddress(
    secondCurrency.address.glq!,
    "glq"
  );

  const handleInput = (e: ChangeResult) => {
    if (rangeMin === e.minValue && rangeMax === e.maxValue) {
      return;
    }
    setRangeMin(e.minValue);
    setRangeMax(e.maxValue);
  };

  useEffect(() => {
    if (firstCurrencyAmount) {
      setSecondCurrencyAmount(calculateY(parseFloat(firstCurrencyAmount)));
    }
  }, [rangeMin, rangeMax]);

  const handleSubmit = async () => {
    if (!firstPoolToken || !secondPoolToken) {
      return;
    }

    if (parseFloat(firstCurrencyBalance) < parseFloat(firstCurrencyAmount)) {
      setPending("");
      setError(
        `You only have ${formatNumberToFixed(
          parseFloat(firstCurrencyBalance),
          6
        )} ${firstCurrency.name} in your wallet.`
      );
      setLoading(false);
      return;
    }

    if (parseFloat(secondCurrencyBalance) < parseFloat(secondCurrencyAmount)) {
      setPending("");
      setError(
        `You only have ${formatNumberToFixed(
          parseFloat(secondCurrencyBalance),
          6
        )} ${secondCurrency.name} in your wallet.`
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setPending("Setting up position...");

    const poolAddress = await deployOrGetPool(
      firstPoolToken,
      secondPoolToken,
      firstCurrencyAmount,
      secondCurrencyAmount,
      fees,
      true,
      true
    );

    if (poolAddress) {
      await mintLiquidity(
        poolAddress,
        firstPoolToken,
        secondPoolToken,
        firstCurrencyAmount,
        secondCurrencyAmount,
        !fullRange ? rangeMinPerc : 0,
        !fullRange ? rangeMaxPerc : Infinity
      );
    }
    setLoading(false);
  };

  function calculateY(x: number) {
    if (fullRange) {
      return formatNumberToFixed(x / currentPoolPrice, 6);
    }

    const a = Math.sqrt(currentPoolPriceReversed);
    const b = Math.sqrt(rangeMinReversedAmount);
    const c = Math.sqrt(rangeMaxReversedAmount);

    const L = (x * a * c) / (c - a);
    const y = L * (a - b);
    return formatNumberToFixed(y, 6);
  }

  function calculateX(y: number) {
    if (fullRange) {
      return formatNumberToFixed(y / currentPoolPriceReversed, 6);
    }

    const a = Math.sqrt(currentPoolPriceReversed);
    const b = Math.sqrt(rangeMinReversedAmount);
    const c = Math.sqrt(rangeMaxReversedAmount);

    const L = y / (a - b);
    const x = (L * (c - a)) / (a * c);
    return formatNumberToFixed(x, 6);
  }

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  useEffect(() => {
    resetFeedback();
    setPending(poolPending);
  }, [poolPending]);

  useEffect(() => {
    resetFeedback();
    setError(poolError);
  }, [poolError]);

  useEffect(() => {
    resetFeedback();
    setSuccess(poolSuccess);
  }, [poolSuccess]);

  const globalLoading = loading;
  const emptyAmount = [firstCurrencyAmount, secondCurrencyAmount].some(
    (value) => value === "" || value === "0"
  );

  useEffect(() => {
    setFirstCurrencyAmount("0");
    setSecondCurrencyAmount("0");
  }, [fullRange]);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="twitter:title" content={seoTitle} />
      </Helmet>
      <div className="main-page poolNew">
        <div className="main-card">
          <div className="poolNew-header">
            <Button
              link="/pool"
              type="tertiary"
              icon={<ArrowBack />}
              disabled={globalLoading}
            >
              Back
            </Button>
            <div className="main-card-title">Add liquidity</div>
          </div>

          <div className="main-card-content poolNew-content">
            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please connect to add your liquidity.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    <div data-disabled={globalLoading}>
                      <div className="poolNew-block">
                        <div className="poolNew-block-title">Pair</div>
                        <div className="poolNew-block-content poolNew-pair">
                          <Select
                            active={firstCurrencyOption}
                            options={firstCurrencyOptions.map((opt) => (
                              <>
                                {opt.icon} <span>{opt.name}</span>
                              </>
                            ))}
                            onChange={(active) =>
                              handleCurrencySelectChange(active, "first")
                            }
                          />
                          <div
                            className="bridge-swap-switch"
                            onClick={handleSwapCurrencies}
                          >
                            <Swap />
                          </div>
                          <Select
                            active={secondCurrencyOption}
                            options={secondCurrencyOptions.map((opt) => (
                              <>
                                {opt.icon} <span>{opt.name}</span>
                              </>
                            ))}
                            onChange={(active) =>
                              handleCurrencySelectChange(active, "second")
                            }
                          />
                        </div>
                      </div>
                      <div className="poolNew-block">
                        <div className="poolNew-block-title">Fee Tier</div>
                        <div className="poolNew-block-content pool-fees">
                          <InputRadioGroup
                            options={feesOptions}
                            onChange={(val) => handleFees(val)}
                            defaultOption={fees}
                            type="large"
                          />
                        </div>
                      </div>
                      {isNewPool && (
                        <div className="poolNew-block">
                          <div className="poolSingle-block-header">
                            <div className="poolNew-block-title">
                              Starting Price{" "}
                              <span>
                                {firstCurrency.name} per {secondCurrency.name}
                              </span>
                            </div>
                          </div>
                          <div className="poolNew-block-content poolNew-initPrice">
                            <Alert type="info">
                              <p>
                                This pool must be initialized before liquidity
                                can be added. To initialize, select a starting
                                price for the pool. Then enter your liquidity
                                price range and deposit amount. Gas charges will
                                be higher than usual due to the initialization
                                transaction.
                              </p>
                            </Alert>

                            <InputNumber
                              icon={firstCurrency.icon}
                              currencyText={firstCurrency.name}
                              value={currentPoolPrice.toString()}
                              max={Infinity}
                              onChange={(val) => {
                                setCurrentPoolPrice(parseFloat(val));
                                setCurrentPoolPriceReversed(parseFloat(val));
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="poolNew-block">
                        <div className="poolSingle-block-header">
                          <div className="poolSingle-block-left">
                            <div className="poolNew-block-title">
                              Price Range{" "}
                              <span>
                                {formatNumberToFixed(currentPoolPrice, 6)}{" "}
                                {firstCurrency.name} per {secondCurrency.name}
                              </span>
                            </div>
                          </div>

                          <div className="poolSingle-block-right">
                            <InputToggle
                              label="Full range"
                              checked={fullRange}
                              onChange={setFullRange}
                            />
                          </div>
                        </div>

                        <div className="poolNew-block-content poolNew-range">
                          <div className="poolNew-range-price">
                            <div className="poolNew-range-value">
                              {!fullRange
                                ? formatNumberToFixed(rangeMinAmount, 7)
                                : "0"}
                            </div>
                            <div className="poolNew-range-label">Low price</div>
                          </div>
                          <div className="poolNew-range-price">
                            <div className="poolNew-range-value">
                              {!fullRange
                                ? formatNumberToFixed(rangeMaxAmount, 7)
                                : "∞"}
                            </div>
                            <div className="poolNew-range-label">
                              High price
                            </div>
                          </div>
                          {!fullRange && (
                            <div className="poolNew-range-input">
                              <MultiRangeSlider
                                min={rangeConfig.minRange.min}
                                max={rangeConfig.maxRange.max}
                                step={rangeConfig.step}
                                minValue={rangeMin}
                                maxValue={rangeMax}
                                stepOnly={true}
                                ruler={false}
                                label={false}
                                onInput={(e: ChangeResult) => {
                                  handleInput(e);
                                }}
                                minCaption={`${rangeMinPerc.toFixed(2)}%`}
                                maxCaption={`${
                                  rangeMax > 0
                                    ? `+${rangeMaxPerc.toFixed(2)}`
                                    : rangeMaxPerc.toFixed(2)
                                }%`}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="poolNew-block">
                        <div className="poolNew-block-title">
                          Amount to deposit
                        </div>
                        <div className="poolNew-block-content poolNew-amounts">
                          <div className="poolNew-amounts-swap">
                            <div className="poolNew-amounts-swap-input">
                              <InputNumber
                                icon={firstCurrency.icon}
                                currencyText={firstCurrency.name}
                                value={firstCurrencyAmount}
                                max={Infinity}
                                onChange={(val) => {
                                  setFirstCurrencyAmount(val);
                                  setSecondCurrencyAmount(
                                    calculateY(parseFloat(val))
                                  );
                                }}
                              />
                            </div>
                            <div className="poolNew-amounts-swap-actions">
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    const val = formatNumberToFixed(
                                      parseFloat(firstCurrencyBalance) / 4,
                                      6
                                    );
                                    setFirstCurrencyAmount(val);
                                    setSecondCurrencyAmount(
                                      calculateY(parseFloat(val))
                                    );
                                  }
                                }}
                              >
                                25%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    const val = formatNumberToFixed(
                                      parseFloat(firstCurrencyBalance) / 2,
                                      6
                                    );
                                    setFirstCurrencyAmount(val);
                                    setSecondCurrencyAmount(
                                      calculateY(parseFloat(val))
                                    );
                                  }
                                }}
                              >
                                50%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    const val = formatNumberToFixed(
                                      parseFloat(firstCurrencyBalance),
                                      6
                                    );
                                    setFirstCurrencyAmount(val);
                                    setSecondCurrencyAmount(
                                      calculateY(parseFloat(val))
                                    );
                                  }
                                }}
                              >
                                MAX
                              </Button>
                            </div>
                          </div>
                          <div className="poolNew-amounts-equal">=</div>
                          <div className="poolNew-amounts-swap">
                            <div className="poolNew-amounts-swap-input">
                              <InputNumber
                                icon={secondCurrency.icon}
                                currencyText={secondCurrency.name}
                                value={secondCurrencyAmount}
                                max={Infinity}
                                onChange={(val) => {
                                  setSecondCurrencyAmount(val);
                                  setFirstCurrencyAmount(
                                    calculateX(parseFloat(val))
                                  );
                                }}
                              />
                            </div>
                            <div className="poolNew-amounts-swap-actions">
                              <Button
                                onClick={() => {
                                  if (secondCurrencyBalance) {
                                    const val = formatNumberToFixed(
                                      parseFloat(secondCurrencyBalance) / 4,
                                      6
                                    );
                                    setSecondCurrencyAmount(val);
                                    setFirstCurrencyAmount(
                                      calculateX(parseFloat(val))
                                    );
                                  }
                                }}
                              >
                                25%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (secondCurrencyBalance) {
                                    const val = formatNumberToFixed(
                                      parseFloat(secondCurrencyBalance) / 2,
                                      6
                                    );
                                    setSecondCurrencyAmount(val);
                                    setFirstCurrencyAmount(
                                      calculateX(parseFloat(val))
                                    );
                                  }
                                }}
                              >
                                50%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (secondCurrencyBalance) {
                                    const val = formatNumberToFixed(
                                      parseFloat(secondCurrencyBalance),
                                      6
                                    );
                                    setSecondCurrencyAmount(val);
                                    setFirstCurrencyAmount(
                                      calculateX(parseFloat(val))
                                    );
                                  }
                                }}
                              >
                                MAX
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="poolNew-submit">
                        <Button
                          onClick={handleSubmit}
                          icon={globalLoading && <Spinner />}
                          disabled={
                            globalLoading ||
                            emptyAmount ||
                            (isNewPool && currentPoolPrice === 0)
                          }
                        >
                          Add liquidity
                        </Button>
                      </div>
                    </div>
                    {error && (
                      <Alert type="error">
                        <p>{error}</p>
                      </Alert>
                    )}
                    {pending && (
                      <Alert type="warning">
                        <p>{pending}</p>
                      </Alert>
                    )}
                    {success && (
                      <Alert type="success">
                        <p>Your position is now successfully created.</p>
                        <p className="small" style={{ marginTop: 8 }}>
                          <Link to={"/pool"}>
                            <small>Go to your pools</small>
                          </Link>
                        </p>
                      </Alert>
                    )}
                  </>
                ) : (
                  <>
                    <div className="main-card-wrongnetwork">
                      Please switch to GLQ Chain network to add your liquidity.
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

export default PoolNewPage;
