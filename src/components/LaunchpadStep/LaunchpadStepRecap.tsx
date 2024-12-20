import "./style.scss";

import Button from "@components/Button";
import InputDatetime from "@components/InputDatetime";
import InputNumber from "@components/InputNumber";
import Select from "@components/Select";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import { formatSecondsToReadableTime } from "@utils/number";
import { formatEthereumAddress } from "@utils/string";
import { useState } from "react";

function LaunchpadStepRecap() {
  const { formData, setFormData, setActiveStep } = useLaunchpadCreateContext();

  const vestingStartDateEmpty = formData.vestingStartDate === "";
  const vestingEndDateEmpty = formData.vestingEndDate === "";
  const vestingDurationEmpty = formData.vestingDuration === 0;
  const vestingDeltaEmpty = formData.vestingDelta === 0;
  const disableForm =
    formData.campaignType === "stealth"
      ? vestingDurationEmpty || vestingDeltaEmpty
      : vestingStartDateEmpty || vestingEndDateEmpty;

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (disableForm) {
      return;
    }
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
      <Button disabled={disableForm} onClick={handleSubmit}>
        Confirm creation
      </Button>
    </div>
  );
}

export default LaunchpadStepRecap;
