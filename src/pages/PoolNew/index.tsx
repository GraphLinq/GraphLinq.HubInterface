import ArrowBack from "@assets/icons/arrow-back.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import InputRadioGroup from "@components/InputRadioGroup";
import Select from "@components/Select";
import { GLQCHAIN_CURRENCIES, SITE_NAME } from "@constants/index";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./_poolNew.scss";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount, useBalance } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";

import { ethers } from "ethers";

// import { useTokenContract } from "../../composables/useContract";
import useUniswap from "../../composables/useUniswap";

import { formatBigNumberToFixed, formatNumberToFixed } from "@utils/number";

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
  const { deployOrGetPool } = usePool();
  const { quoteSwap } = useUniswap();

  const [firstCurrencyOption, setFirstCurrencyOption] = useState(0);
  const [secondCurrencyOption, setSecondCurrencyOption] = useState(1);
  const firstCurrencyOptions = GLQCHAIN_CURRENCIES.map((currency) => {
    currency.icon = tokenIcons[currency.name];
    return currency;
  });
  const secondCurrencyOptions = [...firstCurrencyOptions];

  const firstCurrency = firstCurrencyOptions[firstCurrencyOption];
  const secondCurrency = secondCurrencyOptions[secondCurrencyOption];

  // const firstCurrencyTokenContract = useTokenContract(
  //   firstCurrency.address.glq
  // );
  // const secondCurrencyTokenContract = useTokenContract(
  //   secondCurrency.address.glq
  // );

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

  const [baseQuoteAmount, setBaseQuoteAmount] = useState(
    ethers.BigNumber.from(0)
  );

  const [rangeMin, setRangeMin] = useState(-1);
  const [rangeMax, setRangeMax] = useState(1);

  const rangeMinAmount =
    (parseFloat(ethers.utils.formatEther(baseQuoteAmount)) * (100 + rangeMin)) /
    100;
  const rangeMaxAmount =
    (parseFloat(ethers.utils.formatEther(baseQuoteAmount)) * (100 + rangeMax)) /
    100;

  const handleInput = (e: ChangeResult) => {
    setRangeMin(e.minValue);
    setRangeMax(e.maxValue);
  };

  const handleSubmit = async () => {
    console.log("submit start");

    await deployOrGetPool(
      firstCurrency.address.glq!,
      secondCurrency.address.glq!,
      firstCurrencyAmount,
      secondCurrencyAmount,
      fees
    );
    console.log("submit end");
  };

  const [loadingQuote, setLoadingQuote] = useState(false);

  let quoteQueue: Promise<void | unknown> = Promise.resolve();

  const getQuote = async () => {
    setLoadingQuote(true);

    const quotePromise = new Promise(async (resolve, reject) => {
      try {
        if (!firstCurrency) return;

        const base = await quoteSwap(
          secondCurrency.address.glq!,
          firstCurrency.address.glq!,
          1
        );

        if (base) {
          setBaseQuoteAmount(base);
        }

        resolve(base);
      } catch (error) {
        reject(error);
      } finally {
        setLoadingQuote(false);
      }
    });

    quoteQueue = quoteQueue.then(() => quotePromise);

    return quotePromise;
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
  }, [account, firstCurrency, firstCurrencyAmount]);

  const loading = loadingQuote;

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
            <Button link="/pool" type="tertiary" icon={<ArrowBack />}>
              Back
            </Button>
            <div className="main-card-title">Add liquidity</div>
          </div>

          <div
            className="main-card-content poolNew-content"
            data-disabled={loading}
          >
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
                          onChange={(val) => setFees(val)}
                          defaultOption={fees}
                          type="large"
                        />
                      </div>
                    </div>
                    <div className="poolNew-block">
                      <div className="poolNew-block-title">
                        Price Range{" "}
                        <span>
                          {formatBigNumberToFixed(baseQuoteAmount, 6)}{" "}
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
                          <div className="poolNew-range-label">High price</div>
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
                            minCaption={`${rangeMin}%`}
                            maxCaption={`${
                              rangeMax > 0 ? `+${rangeMax}` : rangeMax
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
                              onChange={(val) => setFirstCurrencyAmount(val)}
                            />
                          </div>
                          <div className="poolNew-amounts-swap-actions">
                            <Button
                              onClick={() => {
                                if (firstCurrencyBalance) {
                                  setFirstCurrencyAmount(
                                    (
                                      parseFloat(firstCurrencyBalance) / 4
                                    ).toString()
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
                                    (
                                      parseFloat(firstCurrencyBalance) / 2
                                    ).toString()
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
                                    parseFloat(firstCurrencyBalance).toString()
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
                              onChange={(val) => setSecondCurrencyAmount(val)}
                            />
                          </div>
                          <div className="poolNew-amounts-swap-actions">
                            <Button
                              onClick={() => {
                                if (firstCurrencyBalance) {
                                  setSecondCurrencyAmount(
                                    (
                                      parseFloat(secondCurrencyBalance) / 4
                                    ).toString()
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
                                    (
                                      parseFloat(secondCurrencyBalance) / 2
                                    ).toString()
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
                                    parseFloat(secondCurrencyBalance).toString()
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
                        icon={loading && <Spinner />}
                      >
                        Add liquidity
                      </Button>
                    </div>
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
