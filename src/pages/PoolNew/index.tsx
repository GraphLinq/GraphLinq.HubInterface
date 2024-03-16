import ArrowBack from "@assets/icons/arrow-back.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import SearchEmpty from "@assets/icons/search-empty.svg?react";
import VisiblityOff from "@assets/icons/visibility-off.svg?react";
import Visiblity from "@assets/icons/visibility.svg?react";
import Button from "@components/Button";
import "./_poolNew.scss";
import Pill from "@components/Pill";
import {
  ETH_TOKEN,
  GLQCHAIN_CURRENCIES,
  GLQ_TOKEN,
  SITE_NAME,
} from "@constants/index";
import { formatNumberToFixed } from "@utils/number";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import Select from "@components/Select";
import { getChainName } from "@utils/chains";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

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
                    <div className="poolNew-pair">
                    <div className="poolNew-pair-title">Pair</div>
                    <div className="poolNew-pair-wrapper">
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
