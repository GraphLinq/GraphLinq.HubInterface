import "./_header.scss";
import Bridge from "@assets/icons/bridge.svg?react";
import ChainStatus from "@assets/icons/chain.svg?react";
import CoinInfo from "@assets/icons/coin.svg?react";
import Connect from "@assets/icons/connect-wallet.svg?react";
import Dashboard from "@assets/icons/dashboard.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import LogoName from "@assets/icons/logo-name.svg?react";
import Logo from "@assets/icons/logo.svg?react";
import Wallet from "@assets/icons/wallet.svg?react";
import Button from "@components/Button";
import Pill from "@components/Pill";
import { WGLQ_TOKEN } from "@constants/index";
import { formatNumberToDollars } from "@utils/number";
import { formatEthereumAddress } from "@utils/string";
import { useWeb3React } from "@web3-react/core";
import { Link, NavLink } from "react-router-dom";

import useTokenBalance from "../../composables/useTokenBalance";
import {
  tryActivateConnector,
  getConnection,
  ConnectionType,
} from "../../libs/connections";
import { MAINNET_CHAIN_ID } from "@utils/chains";

function Header() {
  const { account, chainId } = useWeb3React();
  const {balance: GLQBalance} = useTokenBalance(
    chainId === MAINNET_CHAIN_ID ? WGLQ_TOKEN.address.mainnet : "native"
  );

  const currencies = [
    {
      icon: <GLQToken />,
      value: 0.589,
    },
    {
      icon: <ETHToken />,
      value: 2.659,
    },
  ];

  const nav = [
    {
      icon: <Dashboard />,
      label: "Dashboard",
      url: "/",
    },
    {
      icon: <CoinInfo />,
      label: "Coin Info",
      url: "/coin-info",
    },
    {
      icon: <ChainStatus />,
      label: "Chain Status",
      url: "/chain-status",
    },
    {
      icon: <Bridge />,
      label: "Bridge",
      url: "/bridge",
    },
  ];

  const handleConnect = async () => {
    await tryActivateConnector(
      getConnection(ConnectionType.INJECTED).connector
    );
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to={"/"} className="header-logo">
          <Logo />
          <LogoName />
        </Link>
        <div className="header-currencies">
          {currencies.map((currency, i) => (
            <div className="header-currencies-item" key={i}>
              {currency.icon}
              <span>{formatNumberToDollars(currency.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="header-nav">
        {nav.map((item, i) => (
          <NavLink to={item.url} key={i}>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="header-right">
        {account ? (
          <>
            {GLQBalance && (
              <Pill icon={<GLQToken />} onClick={() => {}}>
                {parseFloat(GLQBalance).toFixed(5) || "..."}
              </Pill>
            )}
            <Pill icon={<Wallet />}>{formatEthereumAddress(account)}</Pill>
          </>
        ) : (
          <Button onClick={handleConnect} icon={<Connect />}>
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
