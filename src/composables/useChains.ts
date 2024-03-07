import { MAINNET_CHAIN_ID, GLQ_CHAIN_ID } from '@utils/chains';
import { useChainId } from 'wagmi';

function useChains() {
  const chainId = useChainId();

  const isMainnet = chainId == MAINNET_CHAIN_ID;
  const isGLQChain = chainId == GLQ_CHAIN_ID;

  return { isMainnet, isGLQChain };
}

export default useChains;
