import "./_bridge.scss";
import { SITE_NAME } from "@constants/index";
import { Helmet } from "react-helmet-async";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import BTCToken from "@assets/icons/btc-icon.svg?react";
import USDTToken from "@assets/icons/usdt-icon.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import { useWeb3React } from "@web3-react/core";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID, getChainName } from "@utils/chains";
import Select from "@components/Select";
import Alert from "@components/Alert";
import Pill from "@components/Pill";
import { useState } from "react";

function BridgePage() {
  const { chainId } = useWeb3React();

  const [activeOption, setActiveOption] = useState(0);
  const currencyOptions = [
    {
      icon: <GLQToken />,
      name: "GLQ",
    },
    {
      icon: <ETHToken />,
      name: "ETH",
    },
    {
      icon: <BTCToken />,
      name: "BTC",
    },
    {
      icon: <USDTToken />,
      name: "USDT",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Bridge</title>
      </Helmet>
      <div className="main-page bridge">
        <div className="main-card">
          <div className="main-card-title">Bridge</div>
          <div className="main-card-desc">
            {chainId === 1
              ? <>Transfer assets from <b>Ethereum</b> to <b>Graphlinq Chain</b>.</>
              : <>Transfer assets from <b>Graphlinq Chain</b> to <b>Ethereum</b>.</>}
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
              onChange={(active) => setActiveOption(active)}
            />
            <div className="bridge-swap-switch">
              <Swap />
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
        </div>
      </div>
    </>
  );
}

export default BridgePage;
