import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import EVMBridgeABI from "../contracts/EVMBridge.json";

import { useEthersSigner } from "./useEthersProvider";

const useBridge = () => {
  const injectedProvider = useEthersSigner();

  const [provider, setProvider] = useState<
    ethers.providers.JsonRpcProvider | ethers.providers.JsonRpcSigner | null
  >(null);

  useEffect(() => {
    if (injectedProvider) {
      setProvider(injectedProvider);
    }
  }, [injectedProvider]);

  const getBridgeContract = (bridgeAddress: `0x${string}`) => {
    if (!provider) return null;

    return new Contract(bridgeAddress, EVMBridgeABI, provider);
  };

  const getBridgeCost = async (bridgeAddress: `0x${string}`) => {
    if (!provider) return null;

    let bridgeCost: ethers.BigNumber | null = null;
    const bridgeContract = getBridgeContract(bridgeAddress);
    try {
      if (bridgeContract) {
        bridgeCost = await bridgeContract.getFeesInETH();
      }
    } catch (error) {
      console.error("Error getting bridge cost:", error);
    }

    return bridgeCost;
  };

  return {
    getBridgeContract,
    getBridgeCost,
    provider,
  };
};

export default useBridge;
