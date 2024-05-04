import { GLQ_RPC_URL } from "@constants/index";
import { ethers } from "ethers";

const rpcProvider = new ethers.providers.JsonRpcProvider(GLQ_RPC_URL);

function useRpcProvider() {
  return rpcProvider;
}

export default useRpcProvider;
