import {
  MAINNET_BRIDGE_OUT_WGLQ,
  GLQCHAIN_BRIDGE_OUT_WGLQ,
  MAINNET_BRIDGE_OUT_ETH,
  GLQCHAIN_BRIDGE_OUT_WETH,
} from "./address";

import { isTestnet } from ".";

/* Tokens */
export type AppToken = {
  icon: JSX.Element | null;
  name: "GLQ" | "WGLQ" | "ETH" | "WETH";
  address: {
    mainnet: `0x${string}` | undefined;
    glq: `0x${string}` | undefined;
  };
  mirror: "GLQ" | "WGLQ" | "ETH" | "WETH";
  bridge?: {
    mainnet: `0x${string}`;
    glq: `0x${string}`;
  };
  chainDestination: {
    mainnet: string;
    glq: string;
  };
  exchangeRate: "eth" | "glq";
  decimals: number;
};

export const GLQ_TOKEN: AppToken = {
  icon: null,
  name: "GLQ",
  address: {
    mainnet: isTestnet
      ? "0xD74aB112c6D5e643E1D48E7e2Aa8E59f1A21E37A"
      : "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24",
    glq: undefined,
  },
  mirror: "WGLQ",
  chainDestination: {
    glq: "WGLQ_ETH",
    mainnet: "WGLQ_GLQCHAIN",
  },
  exchangeRate: "glq",
  decimals: 18,
};

export const WGLQ_TOKEN: AppToken = {
  icon: null,
  name: "WGLQ",
  address: {
    mainnet: isTestnet
      ? "0xD74aB112c6D5e643E1D48E7e2Aa8E59f1A21E37A"
      : "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24",
    glq: "0xEB567ec41738c2bAb2599A1070FC5B727721b3B6",
  },
  mirror: "WGLQ",
  bridge: {
    mainnet: MAINNET_BRIDGE_OUT_WGLQ,
    glq: GLQCHAIN_BRIDGE_OUT_WGLQ,
  },
  chainDestination: {
    glq: "WGLQ_ETH",
    mainnet: "WGLQ_GLQCHAIN",
  },
  exchangeRate: "glq",
  decimals: 18,
};

export const ETH_TOKEN: AppToken = {
  icon: null,
  name: "ETH",
  address: {
    mainnet: undefined,
    glq: "0xbeED106D0f2e6950BFa1Eec74E1253CA0a643442",
  },
  mirror: "WETH",
  bridge: {
    mainnet: MAINNET_BRIDGE_OUT_ETH,
    glq: GLQCHAIN_BRIDGE_OUT_WETH,
  },
  chainDestination: {
    glq: "ETH_ETH",
    mainnet: "WETH_GLQCHAIN",
  },
  exchangeRate: "eth",
  decimals: 18,
};

export const WETH_TOKEN: AppToken = {
  icon: null,
  name: "WETH",
  address: {
    mainnet: undefined,
    glq: "0xbeED106D0f2e6950BFa1Eec74E1253CA0a643442",
  },
  mirror: "ETH",
  bridge: {
    mainnet: MAINNET_BRIDGE_OUT_ETH,
    glq: GLQCHAIN_BRIDGE_OUT_WETH,
  },
  chainDestination: {
    glq: "ETH_ETH",
    mainnet: "WETH_GLQCHAIN",
  },
  exchangeRate: "eth",
  decimals: 18,
};

export const MAINNET_CURRENCIES = [ETH_TOKEN, WGLQ_TOKEN];
export const GLQCHAIN_CURRENCIES = [WGLQ_TOKEN, WETH_TOKEN];

export const getAppTokenByAddress = (
  address: `0x${string}`,
  chain: "eth" | "glq"
) => {
  const currencies = chain === "eth" ? MAINNET_CURRENCIES : GLQCHAIN_CURRENCIES;
  return currencies.find(
    (currency) =>
      currency.address[chain === "eth" ? "mainnet" : "glq"] === address
  );
};
