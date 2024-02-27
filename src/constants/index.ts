/* Commons */
export const SITE_NAME = "GLQ Hub";
export const TOKEN_NAME = "GLQ";
export const MAINNET_EXPLORER = "https://etherscan.io";
export const GLQ_EXPLORER = "https://explorer.graphlinq.io";
export const BRIDGE_API_URL = "https://api-bridge.graphlinq.io/api/v1";

/* Bridges */
export const MAINNET_BRIDGE_OUT_ETH =
  "0x64f3Ed55b8CaE69b27905288a597A66f122f7965"; // Sepolia
export const MAINNET_BRIDGE_OUT_WGLQ =
  "0x379D5fDD6808CE6Fc7E1450F85c98c8312CC82ca"; // Sepolia

// export const MAINNET_BRIDGE_OUT_ETH = "0x427cce714b14825a1b1ac78660c48c0256ec2cd4";
// export const MAINNET_BRIDGE_OUT_WGLQ = "0x68C46be29102850d85786f2c3C01Cf2bEDb48db5";

export const GLQCHAIN_BRIDGE_OUT_WETH =
  "0xbeED106D0f2e6950BFa1Eec74E1253CA0a643442";
export const GLQCHAIN_BRIDGE_OUT_WGLQ =
  "0xEB567ec41738c2bAb2599A1070FC5B727721b3B6";

/* Tokens */
type Token = {
  icon: JSX.Element | null;
  name: "GLQ" | "WGLQ" | "ETH" | "WETH";
  address: {
    mainnet: string;
    glq: string;
  };
  mirror: "GLQ" | "WGLQ" | "ETH" | "WETH";
  bridge?: {
    mainnet: string;
    glq: string;
  };
  chainDestination: {
    mainnet: string;
    glq: string;
  };
};

export const GLQ_TOKEN: Token = {
  icon: null,
  name: "GLQ",
  address: {
    // mainnet: "",
    mainnet: "0x1973006F6bA037e70967A1bB2A15c5432361c5fE", // Sepolia
    glq: "native",
  },
  mirror: "WGLQ",
  chainDestination: {
    glq: "WGLQ_ETH",
    mainnet: "WGLQ_GLQCHAIN"
  }
};

export const WGLQ_TOKEN: Token = {
  icon: null,
  name: "WGLQ",
  address: {
    // mainnet: "",
    mainnet: "0x1973006F6bA037e70967A1bB2A15c5432361c5fE", // Sepolia
    glq: "0xEB567ec41738c2bAb2599A1070FC5B727721b3B6",
  },
  mirror: "WGLQ",
  bridge: {
    mainnet: MAINNET_BRIDGE_OUT_WGLQ,
    glq: GLQCHAIN_BRIDGE_OUT_WGLQ,
  },
  chainDestination: {
    glq: "WGLQ_ETH",
    mainnet: "WGLQ_GLQCHAIN"
  }
};

export const ETH_TOKEN: Token = {
  icon: null,
  name: "ETH",
  address: {
    // mainnet: "native",
    mainnet: "native", // Sepolia
    glq: "",
  },
  mirror: "WETH",
  bridge: {
    mainnet: MAINNET_BRIDGE_OUT_ETH,
    glq: GLQCHAIN_BRIDGE_OUT_WETH,
  },
  chainDestination: {
    glq: "ETH_ETH",
    mainnet: "WETH_GLQCHAIN"
  }
};

export const WETH_TOKEN: Token = {
  icon: null,
  name: "WETH",
  address: {
    // mainnet: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    mainnet: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9", // Sepolia
    glq: "0xbeED106D0f2e6950BFa1Eec74E1253CA0a643442",
  },
  mirror: "ETH",
  bridge: {
    mainnet: MAINNET_BRIDGE_OUT_ETH,
    glq: GLQCHAIN_BRIDGE_OUT_WETH,
  },
  chainDestination: {
    glq: "ETH_ETH",
    mainnet: "WETH_GLQCHAIN"
  }
};

export const MAINNET_CURRENCIES = [ETH_TOKEN, WGLQ_TOKEN];
export const GLQCHAIN_CURRENCIES = [WGLQ_TOKEN, WETH_TOKEN];
