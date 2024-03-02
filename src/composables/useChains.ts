import { MAINNET_CHAIN_ID, GLQ_CHAIN_ID } from '@utils/chains';
import { useWeb3React } from '@web3-react/core';

function useChains() {
  const { chainId } = useWeb3React();

  const isMainnet = chainId === MAINNET_CHAIN_ID;
  const isGLQChain = chainId === GLQ_CHAIN_ID;

  return { isMainnet, isGLQChain };
}

export default useChains;
