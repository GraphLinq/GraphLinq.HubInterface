import { isTestnet } from "@constants/index";

export enum Chain {
  MAINNET,
  GQL_CHAIN
}

interface ExampleConfig {
  chain: Chain;
  rpc: {
    mainnet: string;
    glqchain: string;
  };
}

// Example Configuration
export const CurrentConfig: ExampleConfig = {
  chain: Chain.MAINNET,
  rpc: {
    mainnet: "https://eth.llamarpc.com",
    glqchain: "https://glq-dataseed.graphlinq.io/",
  },
};

interface ChainNamed {
  chainId: number;
  name: string;
}

const mainChains: ChainNamed[] = [
  { chainId: 1, name: "Ethereum" },
  { chainId: 614, name: "GLQ Chain" },
  { chainId: 11155111, name: "Sepolia" },
];

function getChainName(chainId: number): string {
  const chain = mainChains.find((c) => c.chainId === chainId);
  return chain ? chain.name : "Unknown chain";
}

const MAINNET_CHAIN_ID = isTestnet ? 11155111 : 1;
const GLQ_CHAIN_ID = 614;

export { getChainName, MAINNET_CHAIN_ID,  GLQ_CHAIN_ID };
