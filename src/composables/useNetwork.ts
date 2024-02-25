function useNetwork() {
  const switchToGraphLinqMainnet = async () => {
    const windowObject = window;

    windowObject.ethereum ? await windowObject.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: '0x266',
            rpcUrls: ["https://glq-dataseed.graphlinq.io/"],
            chainName: "GraphLinq Chain Mainnet",
            nativeCurrency: {
                name: "GLQ",
                symbol: "GLQ",
                decimals: 18
            },
            blockExplorerUrls: ['https://explorer.graphlinq.io/']
        }]
    }) : null;
  };

  
  const switchToMainnet = async () => {
    const windowObject = window;

    windowObject.ethereum ? await windowObject.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
    }) : null;
  };

  return [switchToGraphLinqMainnet, switchToMainnet];
}

export default useNetwork;
