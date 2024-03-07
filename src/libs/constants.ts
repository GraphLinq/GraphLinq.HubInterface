import { GLQ_EXPLORER, MAINNET_EXPLORER } from "@constants/index"
import { CurrentConfig, GLQ_CHAIN_ID, MAINNET_CHAIN_ID } from "../utils/chains"

export const CHAIN_TO_URL_MAP = {
  [MAINNET_CHAIN_ID]: CurrentConfig.rpc.mainnet,
  [GLQ_CHAIN_ID]: CurrentConfig.rpc.glqchain
}

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [MAINNET_CHAIN_ID]: {
    explorer: MAINNET_EXPLORER,
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: CurrentConfig.rpc.mainnet
  },
  [GLQ_CHAIN_ID]: {
    explorer: GLQ_EXPLORER,
    label: "GLQ Chain",
    nativeCurrency: { name: "GLQ", symbol: "GLQ", decimals: 18 },
    rpcUrl: CurrentConfig.rpc.glqchain
  }
}

// URLs
export const METAMASK_URL = "https://metamask.io/"
export const GLQ_RPC_URL = "https://glq-dataseed.graphlinq.io";
export const MAINNET_RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
