import "./style.scss";
import Spinner from "@assets/icons/spinner.svg?react";

import Button from "@components/Button";
import { useLaunchpadCreateContext } from "@context/LaunchpadCreateContext";
import {
  formatSecondsToReadableTime,
  transformDataToFees,
} from "@utils/number";
import { formatEthereumAddress } from "@utils/string";
import { useState } from "react";
import useLaunchpad from "../../composables/useLaunchpad";
import TransactionList from "@components/TransactionList";
import { useStore } from "../../store";
import Alert from "@components/Alert";
import { getErrorMessage } from "@utils/errors";

function LaunchpadStepRecap() {
  const { submitFundraiser } = useLaunchpad();
  const { formData } = useLaunchpadCreateContext();
  const store: any = useStore();
  const library = store.getState().library;
  const fundraisers = useStore((state) => state.fundraisers);

  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [createdAddress, setCreatedAddress] = useState<string | null>(null);

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess(null);
  };

  const reloadData = async () => {
    const activeFundraisers = await library.getAllFundraisers(0, 0, 0);
    const newFundraisers = activeFundraisers.filter(
      (fundraiser) => !fundraisers.includes(fundraiser)
    );
    if (newFundraisers.length > 0) {
      setCreatedAddress(newFundraisers[newFundraisers.length - 1]);

      resetFeedback();
      setSuccess(true);
    }
  };

  const handleSubmit = async () => {
    resetFeedback();

    try {
      setLoading(true);
      setFormDisabled(true);

      setPending("Waiting for confirmations...");
      await submitFundraiser(formData);
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
      setFormDisabled(false);
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
          <div className="launchpadStep-details-label">Logo image url</div>
          <div className="launchpadStep-details-value">{formData.logoUrl}</div>
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
          <div className="launchpadStep-details-value">
            {transformDataToFees(formData.poolFee)}%
          </div>
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

      {(error || pending || success) && (
        <div className="popin-alert">
          {error && (
            <Alert type="error">
              <p>{error}</p>
            </Alert>
          )}
          {pending && (
            <Alert type="warning">
              <p>{pending}</p>
            </Alert>
          )}
          {success && (
            <Alert type="success">
              <p>Your fundraiser is now successfully created.</p>
            </Alert>
          )}
        </div>
      )}
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
