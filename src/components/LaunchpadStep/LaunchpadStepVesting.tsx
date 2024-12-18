import "./style.scss";

import Button from "@components/Button";
import InputDatetime from "@components/InputDatetime";
import InputNumber from "@components/InputNumber";
import Select from "@components/Select";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import { useState } from "react";

const durationLabels = ["days", "hours"];
const durations = [86400, 3600];

function LaunchpadStepVesting() {
  const { formData, setFormData, setActiveStep } = useLaunchpadCreateContext();
  const [activeDurationOption, setActiveDurationOption] = useState(0);
  const [activeDeltaOption, setActiveDeltaOption] = useState(0);

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

    setActiveStep("campaign");
  };

  const transformToSeconds = (val: string, ratio: number) => {
    if (val === '') return 0;

    return parseInt(val) * ratio;
  }
  const transformToDaysOrHours = (val: number, ratio: number) => {
    return val / ratio;
  }

  return (
    <div className="launchpadStep">
      {formData.campaignType === "fair" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">Vesting Start date</div>
          <div className="launchpadStep-input">
            <InputDatetime
              placeholder="Pick a date and time"
              onChange={(val) => updateField("vestingStartDate", val)}
              value={
                formData.vestingStartDate !== ""
                  ? formData.vestingStartDate
                  : null
              }
            />
          </div>
        </div>
      )}
      {formData.campaignType === "fair" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">Vesting End date</div>
          <div className="launchpadStep-input">
            <InputDatetime
              placeholder="Pick a date and time"
              onChange={(val) => updateField("vestingEndDate", val)}
              value={
                formData.vestingEndDate !== "" ? formData.vestingEndDate : null
              }
            />
          </div>
        </div>
      )}

      {formData.campaignType === "stealth" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">Vesting duration</div>
          <div className="launchpadStep-input launchpadStep-row">
            <InputNumber
              value={transformToDaysOrHours(formData.vestingDuration, durations[activeDurationOption]).toString()}
              max={Infinity}
              onChange={(val) => updateField("vestingDuration", transformToSeconds(val, durations[activeDurationOption]))}
            />
            <Select
              active={activeDurationOption}
              options={durationLabels.map((label) => (
                <span>{label}</span>
              ))}
              onChange={(active) => {
                updateField("vestingDuration", 0);
                setActiveDurationOption(active);
              }}
            />
          </div>
        </div>
      )}

      {formData.campaignType === "stealth" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">Vesting delta</div>
          <div className="launchpadStep-input launchpadStep-row">
            <InputNumber
              value={transformToDaysOrHours(formData.vestingDelta, durations[activeDeltaOption]).toString()}
              max={Infinity}
              onChange={(val) => updateField("vestingDelta", transformToSeconds(val, durations[activeDeltaOption]))}
            />
            <Select
              active={activeDeltaOption}
              options={durationLabels.map((label) => (
                <span>{label}</span>
              ))}
              onChange={(active) => {
                updateField("vestingDelta", 0);
                setActiveDeltaOption(active);
              }}
            />
          </div>
        </div>
      )}

      <Button disabled={disableForm} onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
}

export default LaunchpadStepVesting;
