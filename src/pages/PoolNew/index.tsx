import ArrowBack from "@assets/icons/arrow-back.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import MultiRangeSlider from "multi-range-slider-react";
import Button from "@components/Button";
import "./_poolNew.scss";
import { GLQCHAIN_CURRENCIES, SITE_NAME } from "@constants/index";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount } from "wagmi";
import Spinner from "@assets/icons/spinner.svg?react";
import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import Select from "@components/Select";
import InputRadioGroup from "@components/InputRadioGroup";
import InputNumber from "@components/InputNumber";

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
    value: "0.1",
  },
  {
    label: "0.05%",
    sublabel: "Stable",
    value: "0.5",
  },
  {
    label: "0.30%",
    sublabel: "For most",
    value: "3",
  },
  {
    label: "1%",
    sublabel: "Exotic pairs",
    value: "10",
  },
];

function PoolNewPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();

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

  const [firstCurrencyBalance, setFirstCurrencyBalance] = useState("0");
  const [secondCurrencyBalance, setSecondCurrencyBalance] = useState("0");

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

  const [rangeMin, setRangeMin] = useState("35000");
  const [rangeMax, setRangeMax] = useState("45000");

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};

  const handleInput = (e) => {
    setRangeMin(e.minValue.toString());
    setRangeMax(e.maxValue.toString());
  };

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — New Pool</title>
      </Helmet>
      <div className="main-page poolNew">
        <div className="main-card">
          <div className="poolNew-header">
            <Button link="/pool" type="tertiary" icon={<ArrowBack />}>
              Back
            </Button>
            <div className="main-card-title">Add liquidity</div>
          </div>

          <div className="main-card-content">
            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please login to add your liquidity.
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
                          {firstCurrency.name} per {secondCurrency.name}
                        </span>
                      </div>
                      <div className="poolNew-block-content poolNew-range">
                        <div className="poolNew-range-price">
                          <div className="poolNew-range-value">
                            {parseFloat(rangeMin).toLocaleString("en-US")}
                          </div>
                          <div className="poolNew-range-label">Low price</div>
                        </div>
                        <div className="poolNew-range-price">
                          <div className="poolNew-range-value">
                            {parseFloat(rangeMax).toLocaleString("en-US")}
                          </div>
                          <div className="poolNew-range-label">High price</div>
                        </div>
                        <div className="poolNew-range-input">
                          <MultiRangeSlider
                            min={25000}
                            max={50000}
                            step={1000}
                            minValue={parseFloat(rangeMin)}
                            maxValue={parseFloat(rangeMax)}
                            stepOnly={true}
                            ruler={false}
                            label={false}
                            onInput={(e) => {
                              handleInput(e);
                            }}
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
