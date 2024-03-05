function useNetwork() {
  const switchToGraphLinqMainnet = async () => {
    const winEth = window.ethereum as any;

    if (winEth) {
        const chainId = '0x266';
        const isChainAlreadyAdded = await winEth.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainId }]
        }).catch(() => false);

        if (!isChainAlreadyAdded) {
            await winEth.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: chainId,
                    rpcUrls: ["https://glq-dataseed.graphlinq.io/"],
                    chainName: "GraphLinq Chain Mainnet",
                    nativeCurrency: {
                        name: "GLQ",
                        symbol: "GLQ",
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://explorer.graphlinq.io/']
                }]
            });
        }
    }
  };

  
  const switchToMainnet = async () => {
    const winEth = window.ethereum as any;

    winEth ? await winEth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
    }) : null;
  };

  return {switchToGraphLinqMainnet, switchToMainnet};
}

export default useNetwork;
