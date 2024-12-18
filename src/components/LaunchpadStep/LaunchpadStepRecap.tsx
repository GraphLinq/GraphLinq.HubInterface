import "./style.scss";

import Button from "@components/Button";
import InputDatetime from "@components/InputDatetime";
import InputNumber from "@components/InputNumber";
import Select from "@components/Select";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
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
      ...
      

      <Button disabled={disableForm} onClick={handleSubmit}>
        Confirm
      </Button>
    </div>
  );
}

export default LaunchpadStepRecap;
