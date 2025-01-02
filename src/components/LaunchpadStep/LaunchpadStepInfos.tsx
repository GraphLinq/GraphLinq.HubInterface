import "./style.scss";

import Button from "@components/Button";
import InputText from "@components/InputText";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import { useQuery } from "@tanstack/react-query";
import { getTokenInfo } from "../../queries/api";

function LaunchpadStepInfos() {
  const { formData, setFormData, setActiveStep } = useLaunchpadCreateContext();

  const projectNameEmpty = formData.projectName === "";
  const descriptionEmpty = formData.description === "";
  const websiteLinkEmpty = formData.websiteLink === "";
  const logoUrlEmpty = formData.logoUrl === "";
  const raiseTokenEmpty = formData.raiseToken === "";
  const saleTokenEmpty = formData.saleToken === "";
  const disableForm =
    projectNameEmpty ||
    descriptionEmpty ||
    websiteLinkEmpty ||
    logoUrlEmpty ||
    raiseTokenEmpty ||
    saleTokenEmpty;

  const qRaiseTokenInfo = useQuery({
    queryKey: ["raiseTokenInfo"],
    queryFn: () => getTokenInfo(formData.raiseToken!),
    enabled: formData.raiseToken !== "",
  });
  const qSaleTokenInfo = useQuery({
    queryKey: ["raiseTokenInfo"],
    queryFn: () => getTokenInfo(formData.saleToken!),
    enabled: formData.saleToken !== "",
  });

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
      {JSON.stringify(qRaiseTokenInfo.data)}
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
        <div className="launchpadStep-label">Logo image url</div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter logo image url"
            value={formData.logoUrl}
            onChange={(val) => updateField("logoUrl", val)}
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
