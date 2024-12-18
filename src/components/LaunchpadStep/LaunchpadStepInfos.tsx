import "./style.scss";

import Button from "@components/Button";
import InputText from "@components/InputText";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";

function LaunchpadStepInfos() {
  const { formData, setFormData, setActiveStep } = useLaunchpadCreateContext();

  const projectNameEmpty = formData.projectName === "";
  const descriptionEmpty = formData.description === "";
  const websiteLinkEmpty = formData.websiteLink === "";
  const raiseTokenEmpty = formData.raiseToken === "";
  const saleTokenEmpty = formData.saleToken === "";
  const disableForm =
    projectNameEmpty ||
    descriptionEmpty ||
    websiteLinkEmpty ||
    raiseTokenEmpty ||
    saleTokenEmpty;

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

  return (
    <div className="launchpadStep">
      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Project name</div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter project name"
            value={formData.projectName}
            onChange={(val) => updateField("projectName", val)}
          />
        </div>
      </div>

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Description</div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter project description"
            value={formData.description}
            onChange={(val) => updateField("description", val)}
          />
        </div>
      </div>

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Website link</div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter website link"
            value={formData.websiteLink}
            onChange={(val) => updateField("websiteLink", val)}
          />
        </div>
      </div>

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Raise token</div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter raise token address"
            value={formData.raiseToken}
            onChange={(val) => updateField("raiseToken", val)}
          />
        </div>
        <div className="launchpadStep-extra">TODO token info</div>
      </div>

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">Sale token</div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter sale token address"
            value={formData.saleToken}
            onChange={(val) => updateField("saleToken", val)}
          />
        </div>
        <div className="launchpadStep-extra">TODO token info</div>
      </div>

      <Button disabled={disableForm} onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
}

export default LaunchpadStepInfos;
