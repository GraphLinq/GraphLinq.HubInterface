import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { GLQ_RPC_URL, MAINNET_RPC_URL } from '../libs/constants';
import useChains from './useChains';

function useProvider() {
  const { address: account } = useAccount();
  const { isMainnet } = useChains();

  const provider = new ethers.providers.JsonRpcProvider(isMainnet ? MAINNET_RPC_URL : GLQ_RPC_URL);
  const signer = provider.getSigner(account);

  return { provider, signer };
}

export default useProvider;
