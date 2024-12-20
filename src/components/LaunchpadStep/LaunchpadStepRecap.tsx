import "./style.scss";
import Spinner from "@assets/icons/spinner.svg?react";

import Button from "@components/Button";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import { formatSecondsToReadableTime } from "@utils/number";
import { formatEthereumAddress } from "@utils/string";
import { useState } from "react";
import useLaunchpad from "../../composables/useLaunchpad";
import TransactionList from "@components/TransactionList";
import { useStore } from "../../store";

function LaunchpadStepRecap() {
  const { submitFundraiser } = useLaunchpad();
  const { formData } = useLaunchpadCreateContext();
  const store: any = useStore();
  const library = store.getState().library;
  const fundraisers = useStore((state) => state.fundraisers);

  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [createdAddress, setCreatedAddress] = useState<string | null>(null);

  const reloadData = () => async () => {
    console.log("reload");
    // update active fundraisers
    const activeFundraisers = await library.getAllFundraisers(0, 0, 0);
    // search for all the new fundraisers in the active fundraisers that are unknown yet and add them
    const newFundraisers = activeFundraisers.filter(
      (fundraiser) => !fundraisers.includes(fundraiser)
    );
    console.log("newFundraisers", newFundraisers);
    if (newFundraisers.length > 0) {
      setCreatedAddress(newFundraisers[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setFormDisabled(true);
    await submitFundraiser(formData);
    setLoading(false);
    setFormDisabled(false);
  };

  return (
    <div className="launchpadStep">
      <div className="launchpadStep-details">
        <div className="launchpadStep-details-title">Recapitulative</div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Project name</div>
          <div className="launchpadStep-details-value">
            {formData.projectName}
          </div>
        </div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Description</div>
          <div className="launchpadStep-details-value">
            {formData.description}
          </div>
        </div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Website link</div>
          <div className="launchpadStep-details-value">
            {formData.websiteLink}
          </div>
        </div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Campaign type</div>
          <div className="launchpadStep-details-value">
            {formData.campaignType === "fair" ? "Fair" : "Stealth"}
          </div>
        </div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Raise token</div>
          <div className="launchpadStep-details-value">
            {formData.raiseTokenName} -{" "}
            {formatEthereumAddress(formData.raiseToken)}
          </div>
        </div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Sale token</div>
          <div className="launchpadStep-details-value">
            {formData.saleTokenName} -{" "}
            {formatEthereumAddress(formData.saleToken)}
          </div>
        </div>
        {formData.campaignType === "fair" && (
          <div className="launchpadStep-details-row">
            <div className="launchpadStep-details-label">End time</div>
            <div className="launchpadStep-details-value">
              {new Date(formData.endTime).toLocaleString()}
            </div>
          </div>
        )}
        {formData.campaignType === "fair" && (
          <div className="launchpadStep-details-row">
            <div className="launchpadStep-details-label">Minimum goal</div>
            <div className="launchpadStep-details-value">
              {formData.minimumGoal}
            </div>
          </div>
        )}
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Price per token</div>
          <div className="launchpadStep-details-value">
            {formData.pricePerToken}
          </div>
        </div>
        <div className="launchpadStep-details-row">
          <div className="launchpadStep-details-label">Pool fee</div>
          <div className="launchpadStep-details-value">{formData.poolFee}%</div>
        </div>
        {formData.campaignType === "fair" && (
          <div className="launchpadStep-details-row">
            <div className="launchpadStep-details-label">
              Vesting start date
            </div>
            <div className="launchpadStep-details-value">
              {new Date(formData.vestingStartDate).toLocaleString()}
            </div>
          </div>
        )}
        {formData.campaignType === "fair" && (
          <div className="launchpadStep-details-row">
            <div className="launchpadStep-details-label">Vesting end date</div>
            <div className="launchpadStep-details-value">
              {new Date(formData.vestingEndDate).toLocaleString()}
            </div>
          </div>
        )}
        {formData.campaignType === "stealth" && (
          <div className="launchpadStep-details-row">
            <div className="launchpadStep-details-label">Vesting duration</div>
            <div className="launchpadStep-details-value">
              {formatSecondsToReadableTime(formData.vestingDuration)}
            </div>
          </div>
        )}
        {formData.campaignType === "stealth" && (
          <div className="launchpadStep-details-row">
            <div className="launchpadStep-details-label">Vesting delta</div>
            <div className="launchpadStep-details-value">
              {formatSecondsToReadableTime(formData.vestingDelta)}
            </div>
          </div>
        )}
      </div>
      {createdAddress ? (
        <Button link={"/launchpad/" + createdAddress}>View fundraiser</Button>
      ) : (
        <Button
          disabled={formDisabled}
          onClick={handleSubmit}
          icon={loading && <Spinner />}
        >
          Confirm creation
        </Button>
      )}

      <TransactionList library={library} onTransactionConfirmed={reloadData} />
    </div>
  );
}

export default LaunchpadStepRecap;
