export const isTestnet = false;

/* Commons */
export const SITE_NAME = "Graphlinq Hub";
export const TOKEN_NAME = "GLQ";
export const MAINNET_EXPLORER = "https://etherscan.io";
export const GLQ_EXPLORER = "https://explorer.graphlinq.io";
export const BRIDGE_API_URL = "https://api-bridge.graphlinq.io/api/v1";
export const DASHBOARD_API_URL = "https://api-hub.graphlinq.io";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

/* Swap */
export const GLQCHAIN_SWAP_QUOTER_ADDRESS =
  "0x287a7beF47684D388fa56BFaB859501f9e515B9D";
export const GLQCHAIN_SWAP_ROUTER_ADDRESS =
  "0x47AB4F709b5C250026C4DA83cde56fc2C81a311c";

/* Pool */
export const GLQCHAIN_POOL_NFT_ADDRESS =
  "0x9527542236724B2D1e54F97FC62375a72Bc950cE";
export const UNISWAP_POOL_FACTORY_ADDRESS =
  "0x0E70926aE867D4dE6E056C29FaB16b0896B731Bf";

/* Bridges */
export const MAINNET_BRIDGE_OUT_ETH = isTestnet
  ? "0xF18e157028DA2Bd8D63725ba14128fc1a72C44f8"
  : "0x1973006F6bA037e70967A1bB2A15c5432361c5fE";
export const MAINNET_BRIDGE_OUT_WGLQ = isTestnet
  ? "0xD74aB112c6D5e643E1D48E7e2Aa8E59f1A21E37A"
  : "0x379D5fDD6808CE6Fc7E1450F85c98c8312CC82ca";

export const GLQCHAIN_BRIDGE_OUT_WETH =
  "0x991Dd4aaeE99b175226C7B22885564780dE46141";
export const GLQCHAIN_BRIDGE_OUT_WGLQ =
  "0x2Cc11d0be3c9d3Ed82F033065821a2250f99885F";

/* Wrapper */
export const GLQCHAIN_WRAPPER = "0xEB567ec41738c2bAb2599A1070FC5B727721b3B6";

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

export const getTokenByAddress = (
  address: `0x${string}`,
  chain: "eth" | "glq"
) => {
  if (chain === "eth") {
    return MAINNET_CURRENCIES.find(
      (currency) => currency.address.mainnet === address
    );
  } else {
    return GLQCHAIN_CURRENCIES.find(
      (currency) => currency.address.glq === address
    );
  }
};
