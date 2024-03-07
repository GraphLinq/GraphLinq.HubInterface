import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { GLQ_RPC_URL, MAINNET_RPC_URL } from '../libs/constants';
import useChains from './useChains';

function useRpcProvider() {
  const { address: account } = useAccount();
  const { isMainnet } = useChains();

  const rpcProvider = new ethers.providers.JsonRpcProvider(isMainnet ? MAINNET_RPC_URL : GLQ_RPC_URL);
  const rpcSigner = rpcProvider.getSigner(account);

  return { rpcProvider, rpcSigner };
}

export default useRpcProvider;
