import {
  LAUNCHPAD_CUSTOM_RPC_URL,
  LAUNCHPAD_FACTORY,
} from "@constants/address";
import { ethers } from "ethers";
import { useEffect } from "react";

import { FundraiserWeb3Connect } from "../lib/fundraiserlib.es";
import { useStore } from "../store";
import { useWalletClient } from "wagmi";
import { FormData } from "@context/LaunchpadCreateContext";

function useLaunchpad() {
  const { library, setLibrary } = useStore();

  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const initializeLibrary = async () => {
      const library = new FundraiserWeb3Connect(LAUNCHPAD_FACTORY);
      const rpcProvider = new ethers.providers.JsonRpcProvider(
        LAUNCHPAD_CUSTOM_RPC_URL
      );
      await library.connectWithProvider(rpcProvider);
      setLibrary(library);
    };

    initializeLibrary();
  }, [setLibrary]);

  const submitFundraiser = async (formData: FormData) => {
    console.log(library, walletClient);
    if (!library || !walletClient) {
      console.error("Library or walletClient is not initialized.");
      return;
    }

    const ethersProvider = new ethers.providers.Web3Provider(
      walletClient.transport
    );
    console.log("1");

    const signer = await ethersProvider.getSigner();
    console.log("2");

    const raiseTokenInfo = await library.getTokenInfo(formData.raiseToken);
    console.log("3");

    const pricePerTokenDecimals = ethers.utils.parseUnits(
      formData.pricePerToken.toString(),
      raiseTokenInfo.decimals
    );
    const maxCapDecimals = ethers.utils.parseUnits(
      formData.maximumGoal.toString(),
      raiseTokenInfo.decimals
    );
    const minimumGoalDecimals = ethers.utils.parseUnits(
      formData.minimumGoal.toString(),
      raiseTokenInfo.decimals
    );

    if (formData.campaignType === "stealth") {
      console.log("stealth");
      await library.createFundraiserStealthLaunch(
        signer,
        {
          projectName: formData.projectName,
          description: formData.description,
          websiteLink: formData.websiteLink,
          logoUrl: formData.logoUrl,
          saleToken: formData.saleToken,
          raiseToken: formData.raiseToken,
          vestingStartDelta: BigInt(formData.vestingDelta),
          vestingDuration: BigInt(formData.vestingDuration),
          poolFee: BigInt(formData.poolFee),
          poolLiquidity: formData.poolLiquidity,
          liquidityLockDuration: BigInt(formData.liquidityLockDuration),
        },
        {
          maxCap: maxCapDecimals,
          pricePerToken: pricePerTokenDecimals,
        }
      );
      console.log("stealth done");
    } else if (formData.campaignType === "fair") {
      console.log("fair");

      const vestingStartDelta =
        (new Date(formData.vestingStartDate).getTime() -
          new Date(formData.endTime).getTime()) /
        1000;

      const vestingDuration =
        (new Date(formData.vestingEndDate).getTime() -
          new Date(formData.vestingStartDate).getTime()) /
        1000;

      await library.createFundraiserFairLaunch(
        signer,
        {
          projectName: formData.projectName,
          description: formData.description,
          websiteLink: formData.websiteLink,
          logoUrl: formData.logoUrl,
          saleToken: formData.saleToken,
          raiseToken: formData.raiseToken,
          vestingStartDelta: BigInt(vestingStartDelta),
          vestingDuration: BigInt(vestingDuration),
          poolFee: BigInt(formData.poolFee),
          poolLiquidity: formData.poolLiquidity,
          liquidityLockDuration: BigInt(formData.liquidityLockDuration),
        },
        {
          endTime: BigInt(new Date(formData.endTime).getTime()),
          minimumGoal: minimumGoalDecimals,
          pricePerToken: pricePerTokenDecimals,
        }
      );

      console.log("fair done");
    }
  };

  return {
    submitFundraiser,
  };
}

export default useLaunchpad;
