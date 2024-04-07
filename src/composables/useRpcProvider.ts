import { ethers } from "ethers";

import { GLQ_RPC_URL } from "../libs/constants";

const rpcProvider = new ethers.providers.JsonRpcProvider(GLQ_RPC_URL);

function useRpcProvider() {
  return rpcProvider;
}

export default useRpcProvider;
