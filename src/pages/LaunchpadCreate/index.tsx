import "./style.scss";

import SEO from "@components/SEO";
import { useState } from "react";
import useLaunchpad from "../../composables/useLaunchpad";
import Check from "@assets/icons/check.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Pill from "@components/Pill";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadCreatePage() {
  const steps = ["Informations", "Campaign", "Vesting"];
  const [activeStep, setActiveStep] = useState(0);

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <div className="main-page launchpadCreate">
        <div className="main-card">
          <div className="main-card-title">Project creation</div>
          <div className="main-card-content">
            <div className="main-card-desc">TODO DESC</div>
            <div className="launchpadCreate-steps">
              {steps.map((step, index) => (
                <>
                {index !== 0 && (<div className="launchpadCreate-steps-sep"></div>)}
                <Pill
                  data-active={activeStep === index}
                  data-done={index < activeStep}
                  onClick={index < activeStep ? () => setActiveStep(index) : undefined}
                  icon={
                    activeStep === index ? (
                      <Spinner />
                    ) : (
                      index < activeStep && <Check />
                    )
                  }>
                  {step}
                </Pill>

                </>
              ))}
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
}

export default LaunchpadCreatePage;
