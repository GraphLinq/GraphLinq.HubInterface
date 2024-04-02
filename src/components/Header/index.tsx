import "./style.scss";
import Bridge from "@assets/icons/bridge.svg?react";
import Connect from "@assets/icons/connect-wallet.svg?react";
import Dashboard from "@assets/icons/dashboard.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import LogoName from "@assets/icons/logo-name.svg?react";
import Logo from "@assets/icons/logo.svg?react";
import Medal from "@assets/icons/medal.svg?react";
import Metamask from "@assets/icons/metamask.svg?react";
import Pool from "@assets/icons/pool.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap-coin.svg?react";
import Wallet from "@assets/icons/wallet.svg?react";
import WalletConnect from "@assets/icons/walletconnect.svg?react";
import Wrapper from "@assets/icons/wrapper.svg?react";
import Button from "@components/Button";
import Pill from "@components/Pill";
import { WGLQ_TOKEN } from "@constants/index";
import { formatNumberToDollars, formatNumberToFixed } from "@utils/number";
import { formatEthereumAddress } from "@utils/string";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAccount, useBalance, useConnect } from "wagmi";

import useChains from "../../composables/useChains";
import useExchangeRates from "../../composables/useExchangeRates";

function Header() {
  const { connectors, connect } = useConnect();
  const { address: account } = useAccount();
  const { isMainnet } = useChains();
  const { glq, eth } = useExchangeRates();
  const { data: balanceRaw, isLoading: loadingBalance } = useBalance({
    address: account,
    token: isMainnet ? WGLQ_TOKEN.address.mainnet : undefined,
  });
  const GLQBalance = balanceRaw?.value
    ? ethers.utils.formatEther(balanceRaw?.value)
    : "0";

  const currencies = [
    {
      icon: <GLQToken />,
      value: glq,
    },
    {
      icon: <ETHToken />,
      value: eth,
    },
  ];

  const nav = [
    {
      icon: <Dashboard />,
      label: "Dashboard",
      url: "/",
    },
    {
      icon: <Pool />,
      label: "Pool",
      url: "/pool",
    },
    // {
    //   icon: <CoinInfo />,
    //   label: "Coin Info",
    //   url: "/coin-info",
    // },
    // {
    //   icon: <ChainStatus />,
    //   label: "Chain Status",
    //   url: "/chain-status",
    // },
    {
      icon: <Bridge />,
      label: "Bridge",
      url: "/bridge",
    },
    {
      icon: <Swap />,
      label: "Swap",
      url: "/swap",
    },
    {
      icon: <Wrapper />,
      label: "Wrapper",
      url: "/wrapper",
    },
    {
      icon: <Medal />,
      label: "Rewards",
      url: "/rewards",
    },
  ];

  const [scroll, setScroll] = useState(false);
  const [displayConnectors, setDisplayConnectors] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scroll ? "scrolled" : ""}`}>
      <div className="header-left">
        <Link to={"/"} className="header-logo">
          <Logo />
          <LogoName />
        </Link>
        <div className="header-currencies">
          {currencies.map((currency, i) => (
            <div className="header-currencies-item" key={i}>
              {currency.icon}
              {currency.value && (
                <span>{formatNumberToDollars(currency.value, 4)}</span>
              )}
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
              <Pill icon={<GLQToken />} add={true}>
                {loadingBalance ? (
                  <Spinner />
                ) : (
                  formatNumberToFixed(parseFloat(GLQBalance), 6) || "..."
                )}
              </Pill>
            )}
            <Pill icon={<Wallet />}>{formatEthereumAddress(account)}</Pill>
          </>
        ) : (
          <>
            <Button
              onClick={() => setDisplayConnectors(!displayConnectors)}
              icon={<Connect />}
            >
              Connect Wallet
            </Button>
            {displayConnectors && (
              <div className="header-right-connect">
                {connectors.map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    type="secondary"
                    icon={
                      connector.id === "walletConnect" ? (
                        <WalletConnect />
                      ) : (
                        <Metamask />
                      )
                    }
                  >
                    {connector.name}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
