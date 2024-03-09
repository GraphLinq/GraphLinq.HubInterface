import { GLQ_CHAIN_ID } from "@utils/chains";
import { defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

import { GLQ_EXPLORER } from "./constants";
import { GLQ_RPC_URL } from "./libs/constants";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const glqchain = defineChain({
  id: GLQ_CHAIN_ID,
  name: "GLQ Chain",
  nativeCurrency: { name: "GLQ", symbol: "GLQ", decimals: 18 },
  rpcUrls: {
    default: { http: [GLQ_RPC_URL] },
  },
  blockExplorers: {
    default: { name: "GLQ Explorer", url: GLQ_EXPLORER },
  },
});

export const config = createConfig({
  chains: [mainnet, sepolia, glqchain],
  connectors: [
    walletConnect({ projectId: "efd5e1a329c80052873b2af65f09cbed" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [glqchain.id]: http(),
    [sepolia.id]: http(),
  },
});
