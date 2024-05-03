import ArrowBack from "@assets/icons/arrow-back.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import InputRadioGroup from "@components/InputRadioGroup";
import Select from "@components/Select";
import { GLQCHAIN_CURRENCIES, SITE_NAME } from "@constants/index";
import { Token } from "@uniswap/sdk-core";
import { tickToPrice } from "@uniswap/v3-sdk";
import { GLQ_CHAIN_ID } from "@utils/chains";
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

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

const feesOptions = [
  {
    label: "0.01%",
    sublabel: "Very stable",
    value: "0.01",
  },
  {
    label: "0.05%",
    sublabel: "Stable",
    value: "0.05",
  },
  {
    label: "0.30%",
    sublabel: "For most",
    value: "0.3",
  },
  {
    label: "1%",
    sublabel: "Exotic pairs",
    value: "1",
  },
];

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
  const [firstCurrencyOption, setFirstCurrencyOption] = useState(0);
  const [secondCurrencyOption, setSecondCurrencyOption] = useState(1);
  const firstCurrencyOptions = GLQCHAIN_CURRENCIES.map((currency) => {
    currency.icon = tokenIcons[currency.name];
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
    // resetFeedback();

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

  const [fees, setFees] = useState(feesOptions[2].value);
  const [currentPoolPrice, setCurrentPoolPrice] = useState(0);

  const handleFees = async (val: string) => {
    setLoading(true);
    setFees(val);

    const firstToken = new Token(
      GLQ_CHAIN_ID,
      firstCurrency.address.glq!,
      firstCurrency.decimals
    );

    const secondToken = new Token(
      GLQ_CHAIN_ID,
      secondCurrency.address.glq!,
      secondCurrency.decimals
    );
    const poolAddress = await deployOrGetPool(
      firstToken,
      secondToken,
      "0",
      "0",
      val
    );

    if (poolAddress) {
      const data = await getPoolState(poolAddress);

      if (data) {
        const currentPrice = parseFloat(
          tickToPrice(secondToken, firstToken, data.tick).toSignificant()
        );

        setCurrentPoolPrice(currentPrice);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    handleFees(fees);
  }, []);

  const [rangeMin, setRangeMin] = useState(-1);
  const [rangeMax, setRangeMax] = useState(1);

  const rangeMinPerc = rangeMin * 10;
  const rangeMaxPerc = rangeMax * 10;

  const rangeMinAmount = (currentPoolPrice * (100 + rangeMinPerc)) / 100;
  const rangeMaxAmount = (currentPoolPrice * (100 + rangeMaxPerc)) / 100;

  const handleInput = (e: ChangeResult) => {
    if (rangeMin === e.minValue && rangeMax === e.maxValue) {
      return;
    }
    setRangeMin(e.minValue);
    setRangeMax(e.maxValue);
    if (firstCurrencyAmount) {
      const tempRangeMaxPerc = e.maxValue * 10;
      const tempRangeMaxAmount =
        (currentPoolPrice * (100 + tempRangeMaxPerc)) / 100;
      setSecondCurrencyAmount(
        (parseFloat(firstCurrencyAmount) / tempRangeMaxAmount).toString()
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setPending("Setting up position...");
    const poolAddress = await deployOrGetPool(
      new Token(
        GLQ_CHAIN_ID,
        firstCurrency.address.glq!,
        firstCurrency.decimals
      ),
      new Token(
        GLQ_CHAIN_ID,
        secondCurrency.address.glq!,
        secondCurrency.decimals
      ),
      firstCurrencyAmount,
      secondCurrencyAmount,
      fees
    );

    if (poolAddress) {
      await mintLiquidity(
        poolAddress,
        new Token(
          GLQ_CHAIN_ID,
          firstCurrency.address.glq!,
          firstCurrency.decimals
        ),
        new Token(
          GLQ_CHAIN_ID,
          secondCurrency.address.glq!,
          secondCurrency.decimals
        ),
        firstCurrencyAmount,
        secondCurrencyAmount,
        rangeMinPerc,
        rangeMaxPerc
      );
    }
    setLoading(false);
  };

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
                      <div className="poolNew-block">
                        <div className="poolNew-block-title">
                          Price Range{" "}
                          <span>
                            {formatNumberToFixed(currentPoolPrice, 6)}{" "}
                            {firstCurrency.name} per {secondCurrency.name}
                          </span>
                        </div>
                        <div className="poolNew-block-content poolNew-range">
                          <div className="poolNew-range-price">
                            <div className="poolNew-range-value">
                              {formatNumberToFixed(rangeMinAmount, 7)}
                            </div>
                            <div className="poolNew-range-label">Low price</div>
                          </div>
                          <div className="poolNew-range-price">
                            <div className="poolNew-range-value">
                              {formatNumberToFixed(rangeMaxAmount, 7)}
                            </div>
                            <div className="poolNew-range-label">
                              High price
                            </div>
                          </div>
                          <div className="poolNew-range-input">
                            <MultiRangeSlider
                              min={-1}
                              max={1}
                              step={0.1}
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
                                max={
                                  firstCurrencyBalance
                                    ? parseFloat(firstCurrencyBalance)
                                    : 0
                                }
                                onChange={(val) => {
                                  setFirstCurrencyAmount(val);
                                  setSecondCurrencyAmount(
                                    formatNumberToFixed(
                                      parseFloat(val) / currentPoolPrice,
                                      6
                                    )
                                  );
                                }}
                              />
                            </div>
                            <div className="poolNew-amounts-swap-actions">
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(firstCurrencyBalance) / 4,
                                        6
                                      )
                                    );
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(firstCurrencyBalance) /
                                          4 /
                                          currentPoolPrice,
                                        6
                                      )
                                    );
                                  }
                                }}
                              >
                                25%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(firstCurrencyBalance) / 2,
                                        6
                                      )
                                    );
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(firstCurrencyBalance) /
                                          2 /
                                          currentPoolPrice,
                                        6
                                      )
                                    );
                                  }
                                }}
                              >
                                50%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(firstCurrencyBalance),
                                        6
                                      )
                                    );
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(firstCurrencyBalance) /
                                          currentPoolPrice,
                                        6
                                      )
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
                                max={
                                  secondCurrencyBalance
                                    ? parseFloat(secondCurrencyBalance)
                                    : 0
                                }
                                onChange={(val) => {
                                  setSecondCurrencyAmount(val);
                                  setFirstCurrencyAmount(
                                    formatNumberToFixed(
                                      parseFloat(val) * currentPoolPrice,
                                      6
                                    )
                                  );
                                }}
                              />
                            </div>
                            <div className="poolNew-amounts-swap-actions">
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(secondCurrencyBalance) / 4,
                                        6
                                      )
                                    );
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(secondCurrencyBalance) /
                                          4 /
                                          currentPoolPrice,
                                        6
                                      )
                                    );
                                  }
                                }}
                              >
                                25%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(secondCurrencyBalance) / 2,
                                        6
                                      )
                                    );
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(secondCurrencyBalance) /
                                          2 /
                                          currentPoolPrice,
                                        6
                                      )
                                    );
                                  }
                                }}
                              >
                                50%
                              </Button>
                              <Button
                                onClick={() => {
                                  if (firstCurrencyBalance) {
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(secondCurrencyBalance),
                                        6
                                      )
                                    );
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(secondCurrencyBalance) /
                                          currentPoolPrice,
                                        6
                                      )
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
                          disabled={globalLoading || emptyAmount}
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
