export const SITE_NAME: string = "GLQ Hub";
export const TOKEN_NAME: string = "GLQ";

type Token = {
  icon: JSX.Element | null;
  name: "WGLQ" | "WETH";
  address: {
    mainnet: string;
    glq: string;
  };
};

export const WGLQ_TOKEN: Token = {
  icon: null,
  name: "WGLQ",
  address: {
    mainnet: "",
    glq: "0xEB567ec41738c2bAb2599A1070FC5B727721b3B6",
  },
};

export const WETH_TOKEN: Token = {
  icon: null,
  name: "WETH",
  address: {
    mainnet: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    glq: "0xbeED106D0f2e6950BFa1Eec74E1253CA0a643442",
  },
};

export const CURRENCIES = [WGLQ_TOKEN, WETH_TOKEN];
