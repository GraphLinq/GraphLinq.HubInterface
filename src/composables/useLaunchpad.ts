import { LAUNCHPAD_CUSTOM_RPC_URL, LAUNCHPAD_FACTORY } from "@constants/address";
import { ethers } from "ethers";
import { useEffect } from "react";

import { FundraiserWeb3Connect } from "../lib/fundraiserlib.es";
import { useStore } from "../store";


function useLaunchpad() {
  const { setLibrary } = useStore();

  useEffect(() => {
    const initializeLibrary = async () => {
      const library = new FundraiserWeb3Connect(LAUNCHPAD_FACTORY);
      const rpcProvider = new ethers.providers.JsonRpcProvider(LAUNCHPAD_CUSTOM_RPC_URL);
      await library.connectWithProvider(rpcProvider);
      setLibrary(library);
    };

    initializeLibrary();
  }, [setLibrary]);

  return null;
}

export default useLaunchpad;
