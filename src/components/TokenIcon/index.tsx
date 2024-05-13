import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import React from "react";

interface TokenIcons {
  [key: string]: JSX.Element | null;
}

const tokenIcons: TokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
  WBTC: <></>,
};

interface TokenIconProps {
  tokenKey: string;
}

const TokenIcon: React.FC<TokenIconProps> = ({ tokenKey }) => {
  if (tokenIcons[tokenKey]) {
    return tokenIcons[tokenKey];
  } else {
    return null;
  }
};

export default TokenIcon;
