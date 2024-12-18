import "./style.scss";

import SEO from "@components/SEO";
import Check from "@assets/icons/check.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Pill from "@components/Pill";
import LaunchpadStepInfos from "@components/LaunchpadStep/LaunchpadStepInfos";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import LaunchpadStepCampaign from "@components/LaunchpadStep/LaunchpadStepCampaign";
import LaunchpadStepVesting from "@components/LaunchpadStep/LaunchpadStepVesting";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadCreatePage() {
  const { activeStep, setActiveStep } = useLaunchpadCreateContext();

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <div className="main-page launchpadCreate">
        <div className="main-card">
          <div className="main-card-title">Project creation</div>
          <div className="main-card-content">
            <div className="launchpadCreate-steps">
              <Pill
                data-active={activeStep === "infos"}
                data-done={["campaign", "vesting", "recap"].includes(
                  activeStep
                )}
                onClick={
                  ["campaign", "vesting", "recap"].includes(activeStep)
                    ? () => setActiveStep("infos")
                    : undefined
                }
                icon={activeStep === "infos" ? <Spinner /> : <Check />}>
                Informations
              </Pill>
              <div className="launchpadCreate-steps-sep"></div>
              <Pill
                data-active={activeStep === "campaign"}
                data-done={["vesting", "recap"].includes(activeStep)}
                onClick={
                  ["vesting", "recap"].includes(activeStep)
                    ? () => setActiveStep("campaign")
                    : undefined
                }
                icon={
                  activeStep === "campaign" ? (
                    <Spinner />
                  ) : (
                    ["vesting", "recap"].includes(activeStep) && <Check />
                  )
                }>
                Campaign
              </Pill>
              <div className="launchpadCreate-steps-sep"></div>
              <Pill
                data-active={activeStep === "vesting"}
                data-done={["recap"].includes(activeStep)}
                onClick={
                  ["recap"].includes(activeStep)
                    ? () => setActiveStep("vesting")
                    : undefined
                }
                icon={
                  activeStep === "vesting" ? (
                    <Spinner />
                  ) : (
                    ["recap"].includes(activeStep) && <Check />
                  )
                }>
                Vesting
              </Pill>
            </div>

            {activeStep === 'infos' && <LaunchpadStepInfos/>}
            {activeStep === 'campaign' && <LaunchpadStepCampaign/>}
            {activeStep === 'vesting' && <LaunchpadStepVesting/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default LaunchpadCreatePage;
