import "./style.scss";

import Button from "@components/Button";
import InputText from "@components/InputText";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import { useQuery } from "@tanstack/react-query";
import { getTokenInfo } from "../../queries/api";
import Alert from "@components/Alert";
import Spinner from "@assets/icons/spinner.svg?react";

function LaunchpadStepInfos() {
  const { formData, setFormData, setActiveStep } = useLaunchpadCreateContext();

  const qRaiseTokenInfo = useQuery({
    queryKey: ["raiseTokenInfo", formData.raiseToken],
    queryFn: () => getTokenInfo(formData.raiseToken!),
    enabled: formData.raiseToken !== "",
  });
  const qSaleTokenInfo = useQuery({
    queryKey: ["saleTokenInfo"],
    queryFn: () => getTokenInfo(formData.saleToken!),
    enabled: formData.saleToken !== "",
  });

  const projectNameEmpty = formData.projectName === "";
  const descriptionEmpty = formData.description === "";
  const websiteLinkEmpty = formData.websiteLink === "";
  const logoUrlEmpty = formData.logoUrl === "";
  const raiseTokenEmpty =
    formData.raiseToken === "" ||
    !!qRaiseTokenInfo.error ||
    !qRaiseTokenInfo.data;
  const saleTokenEmpty =
    formData.saleToken === "" || !!qSaleTokenInfo.error || !qSaleTokenInfo.data;
  const sameToken = formData.raiseToken === formData.saleToken;
  const disableForm =
    projectNameEmpty ||
    descriptionEmpty ||
    websiteLinkEmpty ||
    logoUrlEmpty ||
    raiseTokenEmpty ||
    saleTokenEmpty ||
    sameToken;

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

    updateField("raiseTokenName", qRaiseTokenInfo.data.symbol);
    updateField("saleTokenName", qSaleTokenInfo.data.symbol);

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
        <div className="launchpadStep-label">
          <p>Raise token</p>
          {qRaiseTokenInfo.isLoading && <Spinner />}
        </div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter raise token address"
            value={formData.raiseToken}
            onChange={(val) => updateField("raiseToken", val)}
          />
        </div>
        {qRaiseTokenInfo.error && <Alert type="error">Token not found.</Alert>}
        {qRaiseTokenInfo.data && (
          <Alert type="success">
            Token found : <b>{qRaiseTokenInfo.data.symbol}</b>
          </Alert>
        )}
      </div>

      <div className="launchpadStep-field">
        <div className="launchpadStep-label">
          <p>Sale token</p>
          {qSaleTokenInfo.isLoading && <Spinner />}
        </div>
        <div className="launchpadStep-input">
          <InputText
            placeholder="Enter sale token address"
            value={formData.saleToken}
            onChange={(val) => updateField("saleToken", val)}
          />
        </div>
        {qSaleTokenInfo.error && <Alert type="error">Token not found.</Alert>}
        {qSaleTokenInfo.data && (
          <Alert type="success">
            Token found : <b>{qSaleTokenInfo.data.symbol}</b>
          </Alert>
        )}
      </div>

      {sameToken && (
        <Alert type="error">
          You can't have the same token for raise and sale.
        </Alert>
      )}

      <Button disabled={disableForm} onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
}

export default LaunchpadStepInfos;
