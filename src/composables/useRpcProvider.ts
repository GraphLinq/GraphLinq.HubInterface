import { ethers } from "ethers";

import { GLQ_RPC_URL } from "../libs/constants";

function useRpcProvider() {
  const rpcProvider = new ethers.providers.JsonRpcProvider(GLQ_RPC_URL);
  return rpcProvider;
}

export default useRpcProvider;
