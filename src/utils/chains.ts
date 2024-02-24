// Sets if the example should run locally or on chain
export enum Chain {
  POLYGON,
  MAINNET,
}

// Inputs that configure this example to run
interface ExampleConfig {
  chain: Chain;
  rpc: {
    polygon: string;
    mainnet: string;
  };
}

// Example Configuration
export const CurrentConfig: ExampleConfig = {
  chain: Chain.MAINNET,
  rpc: {
    polygon: "",
    mainnet: "",
  },
};

interface ChainNamed {
  chainId: number;
  name: string;
}

const mainChains: ChainNamed[] = [
  { chainId: 1, name: "Ethereum Mainnet" },
  { chainId: 3, name: "Ropsten Testnet" },
  { chainId: 4, name: "Rinkeby Testnet" },
  { chainId: 5, name: "Goerli Testnet" },
  { chainId: 614, name: "GLQ Mainnet" },
];

function getChainName(chainId: number): string {
  const chain = mainChains.find((c) => c.chainId === chainId);
  return chain ? chain.name : "Chaîne inconnue";
}

const MAINNET_CHAIN_ID = 1;
const GLQ_CHAIN_ID = 614;

export { getChainName, MAINNET_CHAIN_ID,  GLQ_CHAIN_ID };
