import "./_bridge.scss";
import BTCToken from "@assets/icons/btc-icon.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import USDTToken from "@assets/icons/usdt-icon.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import Pill from "@components/Pill";
import Select from "@components/Select";
import { CURRENCIES, SITE_NAME } from "@constants/index";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID, getChainName } from "@utils/chains";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import useNetwork from "../../composables/useNetwork";
import useTokenBalance from "../../composables/useTokenBalance";

const tokenIcons = {
  WGLQ: <GLQToken />,
  WETH: <ETHToken />,
};

function BridgePage() {
  const { chainId } = useWeb3React();
  const [switchToGraphLinqMainnet, switchToMainnet] = useNetwork();

  const [activeOption, setActiveOption] = useState(0);
  const currencyOptions = CURRENCIES.map((currency) => {
    currency.icon = tokenIcons[currency.name];
    return currency;
  });

  const tokenBalance = useTokenBalance(
    currencyOptions[activeOption].address[chainId === 1 ? "mainnet" : "glq"]
  );

    const handleSelectChange = (active: number) => {
      setActiveOption(active)
      setAmount(0)
    }

  const handleSwitchNetwork = () => {
    if (chainId === 1) {
      switchToGraphLinqMainnet();
    } else {
      switchToMainnet();
    }
  };

  const [amount, setAmount] = useState(0);

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Bridge</title>
      </Helmet>
      <div className="main-page bridge">
        <div className="main-card">
          <div className="main-card-title">Bridge</div>
          <div className="main-card-desc">
            {chainId === 1 ? (
              <>
                Transfer assets from <b>Ethereum</b> to <b>Graphlinq Chain</b>.
              </>
            ) : (
              <>
                Transfer assets from <b>Graphlinq Chain</b> to <b>Ethereum</b>.
              </>
            )}
          </div>
          {chainId && (
            <Alert type="info">
              You're currently on <b>{getChainName(chainId)}</b>.
            </Alert>
          )}
          <div className="bridge-swap">
            <Select
              options={currencyOptions.map((opt) => (
                <>
                  {opt.icon} <span>{opt.name}</span>
                  {chainId && <span>{getChainName(chainId)}</span>}
                </>
              ))}
              onChange={(active) => handleSelectChange(active)}
            />
            <div className="bridge-swap-switch">
              <Swap onClick={handleSwitchNetwork} />
            </div>
            <Pill>
              {currencyOptions[activeOption].icon}
              <span>{currencyOptions[activeOption].name}</span>
              {chainId && (
                <span>
                  {getChainName(
                    chainId === MAINNET_CHAIN_ID
                      ? GLQ_CHAIN_ID
                      : MAINNET_CHAIN_ID
                  )}
                </span>
              )}
            </Pill>
          </div>

          <div className="bridge-amount">
            <div className="bridge-amount-subtitle">Available</div>
            <div className="bridge-amount-value">
              <span>{tokenBalance}</span>
              {currencyOptions[activeOption].name}
            </div>
            <div className="bridge-amount-swap">
              <div className="bridge-amount-swap-input">
                <InputNumber
                  icon={currencyOptions[activeOption].icon}
                  currencyText={currencyOptions[activeOption].name}
                  value={amount}
                  onChange={() => {}}
                />
              </div>
              <div className="bridge-amount-swap-actions">
                <Button
                  onClick={() => {
                    if (tokenBalance) {
                      setAmount(parseFloat(tokenBalance) / 4);
                    }
                  }}
                >
                  25%
                </Button>
                <Button
                  onClick={() => {
                    if (tokenBalance) {
                      setAmount(parseFloat(tokenBalance) / 2);
                    }
                  }}
                >
                  50%
                </Button>
                <Button
                  onClick={() => {
                    if (tokenBalance) {
                      setAmount(parseFloat(tokenBalance));
                    }
                  }}
                >
                  MAX
                </Button>
              </div>
            </div>
            <div className="bridge-amount-submit">
              <Button>Send</Button>
            </div>
          </div>
        </div>
        <div className="bridge-warn">
          Your claim amount available could be taking delays (max ~72h)
          <br />
          Please wait & come back later if you don't see them!
        </div>
      </div>
    </>
  );
}

export default BridgePage;
