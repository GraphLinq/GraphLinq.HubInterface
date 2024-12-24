import { GLQ_CHAIN_ID } from "@utils/chains";
import { defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

import { GLQ_EXPLORER_URL, GLQ_RPC_URL } from "./constants";

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
    default: { name: "GLQ Explorer", url: GLQ_EXPLORER_URL },
  },
});


export const mainnet = /*#__PURE__*/ defineChain({
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://eth.llamarpc.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://mainnet.infura.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67',
      blockCreated: 19_258_213,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14_353_601,
    },
  },
})

export const config = createConfig({
  chains: [mainnet, sepolia, glqchain],
  connectors: [
    walletConnect({ projectId: "efd5e1a329c80052873b2af65f09cbed" }),
  ],
  transports: {
    [mainnet.id]: http(''),
    [glqchain.id]: http(),
    [sepolia.id]: http(),
  },
});
