import { Token } from "@uniswap/sdk-core";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID } from "@utils/chains";

import { GLQCHAIN_CURRENCIES, MAINNET_CURRENCIES } from "./apptoken";

export const MAINNET_POOL_TOKENS = MAINNET_CURRENCIES.filter(
  (token) => token.address.mainnet
).map(
  (token) => new Token(MAINNET_CHAIN_ID, token.address.mainnet!, token.decimals)
);
export const GLQCHAIN_POOL_TOKENS = GLQCHAIN_CURRENCIES.filter(
  (token) => token.address.glq
).map((token) => new Token(GLQ_CHAIN_ID, token.address.glq!, token.decimals));

export const getPoolTokenByAddress = (
  address: `0x${string}`,
  chain: "eth" | "glq"
) => {
  const poolTokens =
    chain === "eth" ? MAINNET_POOL_TOKENS : GLQCHAIN_POOL_TOKENS;
  return poolTokens.find((token) => token.address === address);
};

export const orderedPoolTokens = (tokenA: Token, tokenB: Token) => {
  return tokenA.address < tokenB.address ? [tokenA, tokenB] : [tokenB, tokenA];
};
