import InputNumber from "@components/InputNumber";
import "./style.scss";

import Button from "@components/Button";
import InputRadioGroup from "@components/InputRadioGroup";
import { feesOptions } from "@constants/fees";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import InputDatetime from "@components/InputDatetime";

export const campaignTypeOptions = [
  {
    label: "Stealth Launch",
    sublabel: "Strategic targeting",
    value: "stealth",
  },
  {
    label: "Fair Launch",
    sublabel: "Equal opportunity",
    value: "fair",
  },
];

function LaunchpadStepCampaign() {
  const { formData, setFormData, setActiveStep } = useLaunchpadCreateContext();

  const endTimeEmpty = formData.endTime === "";
  const minimumGoalEmpty = formData.minimumGoal === 0;
  const maximumGoalEmpty = formData.maximumGoal === 0;
  const pricePerTokenEmpty = formData.pricePerToken === 0;
  const disableForm =
    formData.campaignType === "fair"
      ? endTimeEmpty || minimumGoalEmpty || pricePerTokenEmpty
      : maximumGoalEmpty || pricePerTokenEmpty;

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

    setActiveStep("vesting");
  };

  return (
    <div className="launchpadStep">
      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Campaign type</div>
        <div className="launchpadStep-input pool-fees">
          <InputRadioGroup
            id="compaignType"
            options={campaignTypeOptions}
            onChange={(val) => updateField("campaignType", val)}
            value={formData.campaignType}
            type="large"
          />
        </div>
      </div>

      {formData.campaignType === "fair" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">End Time date</div>
          <div className="launchpadStep-input">
            <InputDatetime
              placeholder="Pick a date and time"
              onChange={(val) => updateField("endTime", val)}
              value={formData.endTime !== "" ? formData.endTime : null}
            />
          </div>
        </div>
      )}

      {formData.campaignType === "fair" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">Minimum goal</div>
          <div className="launchpadStep-input">
            <InputNumber
              value={formData.minimumGoal.toString()}
              max={Infinity}
              onChange={(val) => updateField("minimumGoal", val)}
            />
          </div>
        </div>
      )}

      {formData.campaignType === "stealth" && (
        <div className="launchpadStep-field">
          <div className="launchpadStep-label">Maximum Goal</div>
          <div className="launchpadStep-input">
            <InputNumber
              value={formData.maximumGoal.toString()}
              max={Infinity}
              onChange={(val) => updateField("maximumGoal", val)}
            />
          </div>
        </div>
      )}

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">
          Price per Token{" "}
          <span>
            {formData.raiseTokenName} per {formData.saleTokenName}
          </span>
        </div>
        <div className="launchpadStep-input">
          <InputNumber
            value={formData.pricePerToken.toString()}
            max={Infinity}
            onChange={(val) => updateField("pricePerToken", val)}
          />
        </div>
      </div>

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Fee tier</div>
        <div className="launchpadStep-input pool-fees">
          <InputRadioGroup
            id="fees"
            options={feesOptions}
            onChange={(val) => updateField("poolFee", val)}
            value={formData.poolFee.toString()}
            type="large"
          />
        </div>
      </div>

      <Button disabled={disableForm} onClick={() => handleSubmit()}>
        Next
      </Button>
    </div>
  );
}

export default LaunchpadStepCampaign;
