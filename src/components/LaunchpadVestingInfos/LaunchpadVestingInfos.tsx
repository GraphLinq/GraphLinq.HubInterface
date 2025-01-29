import "./style.scss";
import Button from "@components/Button";
import {
  formatTimestampToDate,
  formatTokenDecimals,
  formatTokenSymbol,
} from "@utils/launchpad";
import Spinner from "@assets/icons/spinner.svg?react";

import { Fundraiser, TokenInfo } from "../../model/launchpad";
import { VestingState } from "../../types/launchpad";

interface LaunchpadVestingInfosProps {
  vestingInfo: VestingState;
  fundraiser: {
    state: Fundraiser;
    saleTokenInfo: TokenInfo;
    raiseTokenInfo: TokenInfo;
  };
  formInProgress: string | null;
  claimVestedTokens: () => Promise<void>;
}

export function VestingInformation({
  vestingInfo,
  fundraiser,
  formInProgress,
  claimVestedTokens,
}: LaunchpadVestingInfosProps) {
  return (
    <>
      <div className="launchpadVestingInfos launchpadSingle-block">
        <div className="launchpadSingle-subtitle">Vesting Information</div>
        <div className="launchpadSingle-details-row">
          <div className="launchpadSingle-details-label">Vesting Start</div>
          <div className="launchpadSingle-details-value">
            {formatTimestampToDate(
              Number(vestingInfo.vestingInfo.vestingStart)
            )}
          </div>
        </div>
        <div className="launchpadSingle-details-row">
          <div className="launchpadSingle-details-label">Vesting End</div>
          <div className="launchpadSingle-details-value">
            {formatTimestampToDate(
              Number(vestingInfo.vestingInfo.vestingStart) +
                Number(vestingInfo.vestingInfo.vestingDuration)
            )}
          </div>
        </div>
        <div className="launchpadSingle-details-row">
          <div className="launchpadSingle-details-label">
            Total Vesting Amount
          </div>
          <div className="launchpadSingle-details-value">
            {formatTokenDecimals(
              vestingInfo.vestingInfo.totalVestingAmount,
              parseInt(fundraiser.saleTokenInfo.decimals)
            )}{" "}
            {formatTokenSymbol(fundraiser.saleTokenInfo.symbol)}
          </div>
        </div>
        <div className="launchpadSingle-details-row">
          <div className="launchpadSingle-details-label">Released Amount</div>
          <div className="launchpadSingle-details-value">
            {formatTokenDecimals(
              vestingInfo.vestingInfo.releasedAmount,
              parseInt(fundraiser.saleTokenInfo.decimals)
            )}{" "}
            {formatTokenSymbol(fundraiser.saleTokenInfo.symbol)}
          </div>
        </div>
        <div className="launchpadSingle-details-row">
          <div className="launchpadSingle-details-label">Releasable Amount</div>
          <div className="launchpadSingle-details-value">
            {formatTokenDecimals(
              vestingInfo.releasableAmount,
              parseInt(fundraiser.saleTokenInfo.decimals)
            )}{" "}
            {formatTokenSymbol(fundraiser.saleTokenInfo.symbol)}
          </div>
        </div>

        {vestingInfo && vestingInfo.releasableAmount > 0n && (
          <div className="launchpadVestingInfos-actions">
            <Button
              onClick={claimVestedTokens}
              disabled={formInProgress != null}
              icon={formInProgress === "claimBack" && <Spinner />}
            >
              Claim Vested Tokens
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
