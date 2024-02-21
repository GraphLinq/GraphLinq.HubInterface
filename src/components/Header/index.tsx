import "./_header.scss";
import Bridge from "@assets/icons/bridge.svg?react";
import ChainStatus from "@assets/icons/chain.svg?react";
import CoinInfo from "@assets/icons/coin.svg?react";
import Dashboard from "@assets/icons/dashboard.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import LogoName from "@assets/icons/logo-name.svg?react";
import Logo from "@assets/icons/logo.svg?react";
import Connect from "@assets/icons/connect-wallet.svg?react";
import { formatNumberToDollars } from "@utils/number";
import { useWeb3React } from "@web3-react/core";
import { Link, NavLink } from "react-router-dom";
import Button from "@components/Button";
import {
  tryActivateConnector,
  getConnection,
  ConnectionType,
} from "../../libs/connections";

function Header() {
  const { account } = useWeb3React();

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
          {currencies.map((currency) => (
            <div className="header-currencies-item">
              {currency.icon}
              <span>{formatNumberToDollars(currency.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="header-nav">
        {nav.map((item) => (
          <NavLink to={item.url}>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="header-right">
        {account ? (
          <>{account}</>
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
