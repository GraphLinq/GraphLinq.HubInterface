import "./style.scss";
import Approved from "@assets/icons/approved.svg?react";
import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Button from "@components/Button";
import SEO from "@components/SEO";
import { useQuery } from "@tanstack/react-query";
import {
  formatTimestamp,
  formatTimestampToDate,
  formatTokenDecimals,
  formatTokenSymbol,
} from "@utils/launchpad";
import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useWalletClient } from "wagmi";

import { useEthersSigner } from "../../composables/useEthersProvider";
import useLaunchpad from "../../composables/useLaunchpad";
import {
  getFundraiser,
  getFundraiserRefresh,
  getTokenInfo,
} from "../../queries/api";
import { FundraiserManager } from "../../services/FundraiserManager";
import { useStore } from "../../store";
import { VestingInformation } from "@components/LaunchpadVestingInfos/LaunchpadVestingInfos";
import Alert from "@components/Alert";
import { getErrorMessage } from "@utils/errors";
import InputNumber from "@components/InputNumber";
import TokenIcon from "@components/TokenIcon";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadSinglePage() {
  const { id: fundraiserAddr } = useParams();
  const navigate = useNavigate();
  const { address: account } = useAccount();
  const provider = useEthersSigner();
  const store: any = useStore();
  const library = store.getState().library;
  const { data: walletClient } = useWalletClient();

  useLaunchpad();

  const [formInProgress, setFormInProgress] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  const [contributeAmount, setContributeAmount] = useState("");

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const qFundraiser = useQuery({
    queryKey: ["fundraiser", fundraiserAddr],
    queryFn: () => getFundraiser(fundraiserAddr!),
    enabled: () => !!fundraiserAddr,
  });

  const qFundraiserRefresh = useQuery({
    queryKey: ["fundraiser", fundraiserAddr],
    queryFn: () => getFundraiserRefresh(fundraiserAddr!),
    enabled: () => false,
  });

  const qRaiseTokenInfo = useQuery({
    queryKey: ["raiseTokenInfo", qFundraiser.data?.raiseToken],
    queryFn: () => getTokenInfo(qFundraiser.data!.raiseToken),
    enabled: qFundraiser.data && qFundraiser.data.raiseToken !== "",
  });
  const qSaleTokenInfo = useQuery({
    queryKey: ["saleTokenInfo", qFundraiser.data?.saleToken],
    queryFn: () => getTokenInfo(qFundraiser.data!.saleToken!),
    enabled: qFundraiser.data && qFundraiser.data.saleToken !== "",
  });

  const fundraiserState = qFundraiser.data;
  const raiseTokenInfo = qRaiseTokenInfo.data;
  const saleTokenInfo = qSaleTokenInfo.data;

  const qContribution = useQuery({
    queryKey: ["contribution", fundraiserAddr],
    queryFn: async () => {
      const amount = await library.getContribution(account, fundraiserAddr);
      return formatTokenDecimals(amount, parseInt(raiseTokenInfo!.decimals));
    },
    enabled: !!library && !!raiseTokenInfo,
  });

  const { data: hasClaimed }: { data?: boolean } = useQuery({
    queryKey: ["hasClaimed", fundraiserAddr],
    queryFn: () => library.checkClaimed(provider, fundraiserAddr),
    enabled: !!library,
  });

  const qVestingInfo = useQuery({
    queryKey: ["vestingInfo", fundraiserAddr],
    queryFn: () => library.getVestingInfo(provider, fundraiserAddr),
    enabled:
      !!library &&
      fundraiserState &&
      parseInt(fundraiserState.vestingDuration) > 0,
  });

  if (!fundraiserAddr || !ethers.utils.isAddress(fundraiserAddr)) {
    navigate("/launchpad");
    return null;
  }

  const loading =
    qFundraiser.isLoading ||
    qRaiseTokenInfo.isLoading ||
    qSaleTokenInfo.isLoading;
  const noData = !fundraiserState || !raiseTokenInfo || !saleTokenInfo;

  if (loading || noData) {
    return (
      <div className="launchpad-list-empty">
        <div className="launchpad-empty">
          <div className="launchpad-empty-info">
            <Spinner />
            <div className="launchpad-empty-label">Loading project...</div>
          </div>
        </div>
      </div>
    );
  }

  // Initialize the manager
  const fundraiserManager = new FundraiserManager(library, walletClient);

  const isFairLaunch = fundraiserState.campaignDetails[0] === "Fair Launch";
  const isStealthLaunch =
    fundraiserState.campaignDetails[0] === "Stealth Launch";
  const isOwner = fundraiserState.owner === account;
  const isActive = fundraiserState.stateString === "Active";
  const isFailed = fundraiserState.stateString === "Failed";
  const isFinalized = fundraiserState.stateString === "Finalized";
  const isClaimable = fundraiserState.stateString === "SwapPairCreated";
  const hasClaimableContribution =
    qContribution.data &&
    parseFloat(qContribution.data) > 0 &&
    hasClaimed === false;

  // Calculate progress percentage
  const raisedAmountDecimals = parseFloat(
    formatTokenDecimals(
      BigInt(fundraiserState.raisedAmount),
      parseInt(raiseTokenInfo.decimals)
    )
  );
  const softCap = isFairLaunch ? fundraiserState.config[1] : BigInt(0);
  const hardCap = isStealthLaunch ? fundraiserState.config[0] : BigInt(0);

  const softCapDecimals = parseFloat(
    formatTokenDecimals(BigInt(softCap), parseInt(raiseTokenInfo.decimals))
  );
  const hardCapDecimals = parseFloat(
    formatTokenDecimals(BigInt(hardCap), parseInt(raiseTokenInfo.decimals))
  );

  let progress = 100; // Default to 100% if no caps are set

  if (hardCapDecimals > 0) {
    // Use hard cap if it's set
    progress = (raisedAmountDecimals / hardCapDecimals) * 100;
  } else if (softCapDecimals > 0) {
    // Use soft cap if no hard cap is set but soft cap exists
    progress = (raisedAmountDecimals / softCapDecimals) * 100;
  }

  // Clamp the progress value to ensure it's between 0 and 100
  progress = Math.max(progress, 0);

  // Convert timestamps to readable dates
  const startDate = formatTimestampToDate(
    Number(fundraiserState.createdTimestamp)
  );
  let endDate: string | null = formatTimestampToDate(
    Number(fundraiserState.finalizedTimestamp)
  );

  if (isFairLaunch) {
    // in case of fair launch we know the end date since the beginning
    endDate = formatTimestampToDate(Number(fundraiserState.config[0]));
  }
  if (isStealthLaunch && !isFinalized && !isClaimable) {
    // no end date
    endDate = null;
  }

  const currentDateTime = Math.floor(new Date().getTime() / 1000);

  const canFail =
    (isActive &&
      isFairLaunch &&
      currentDateTime > Number(fundraiserState.config[0]) &&
      fundraiserState.raisedAmount < fundraiserState.config[1]) ||
    isStealthLaunch;
  const canFinalize =
    (isActive &&
      isFairLaunch &&
      currentDateTime > Number(fundraiserState.config[0]) &&
      fundraiserState.raisedAmount >= fundraiserState.config[1]) ||
    isStealthLaunch;

  const isVerified = false; // @TODO

  const fail = async () => {
    resetFeedback();

    try {
      setFormInProgress("fail");

      setPending("Waiting for confirmations...");
      await fundraiserManager.failFundraiser(fundraiserAddr!);
      await qFundraiserRefresh.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("The fundraiser has been set to failed.");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  const finalize = async () => {
    resetFeedback();

    try {
      setFormInProgress("finalize");

      setPending("Waiting for confirmations...");
      await fundraiserManager.finalizeFundraiser(
        fundraiserAddr!,
        fundraiserState.saleToken,
        BigInt(fundraiserState.soldAmount)
      );
      await qFundraiserRefresh.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("The fundraiser has been finalized.");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  const createPair = async () => {
    resetFeedback();

    try {
      setFormInProgress("createPair");

      setPending("Waiting for confirmations...");
      await fundraiserManager.createSwapPair(
        fundraiserAddr!,
        fundraiserState.saleToken,
        fundraiserState.raiseToken,
        parseInt(raiseTokenInfo.decimals),
        raiseTokenInfo.symbol
      );
      await qFundraiserRefresh.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("The pair has been initialized.");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  const contribute = async () => {
    resetFeedback();

    if (
      isNaN(parseFloat(contributeAmount)) ||
      parseFloat(contributeAmount) <= 0
    ) {
      return;
    }

    try {
      setFormInProgress("contribute");

      setPending("Waiting for confirmations...");
      await fundraiserManager.contribute(
        fundraiserAddr!,
        contributeAmount,
        parseInt(raiseTokenInfo.decimals)
      );
      await qFundraiserRefresh.refetch();
      await qContribution.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("Your contribution is confirmed.");
      setContributeAmount("");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  const claimBack = async () => {
    resetFeedback();

    try {
      setFormInProgress("claimBack");

      setPending("Waiting for confirmations...");
      await fundraiserManager.claimBack(fundraiserAddr!);
      await qFundraiserRefresh.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("Your tokens has been successfully claimed.");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  const claimTokens = async () => {
    resetFeedback();

    try {
      setFormInProgress("claimTokens");

      setPending("Waiting for confirmations...");
      await fundraiserManager.claimTokens(fundraiserAddr!);
      await qFundraiserRefresh.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("Your tokens has been successfully claimed.");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  const claimVestedTokens = async () => {
    resetFeedback();

    try {
      setFormInProgress("claimVestedTokens");

      setPending("Waiting for confirmations...");
      await fundraiserManager.claimVestedTokens(fundraiserAddr!);
      await qFundraiserRefresh.refetch();
      await qFundraiser.refetch();

      resetFeedback();
      setSuccess("Your vested tokens has been successfully claimed.");
    } catch (error) {
      resetFeedback();
      setError(getErrorMessage(error));
    } finally {
      setFormInProgress(null);
    }
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <div className="main-page launchpadSingle">
        <div className="main-card">
          <div className="launchpadSingle-topheader">
            <Button link="/launchpad" type="tertiary" icon={<ArrowBack />}>
              Back to projects
            </Button>
          </div>

          <div className="launchpadSingle-wrapper">
            <div className="launchpadSingle-left">
              <div className="launchpadSingle-header">
                <div className="launchpadSingle-header-left">
                  <div className="main-card-title launchpadSingle-name">
                    {fundraiserState.projectInfo.projectName}{" "}
                    {isVerified && (
                      <span className="launchpadSingle-verified">
                        <Approved />
                      </span>
                    )}
                  </div>
                  <div className="launchpadSingle-type">
                    {fundraiserState.campaignDetails[0]}
                  </div>
                  <div className="launchpadSingle-desc">
                    {fundraiserState.projectInfo.description}
                  </div>
                  {fundraiserState.projectInfo.websiteLink && (
                    <a
                      href={fundraiserState.projectInfo.websiteLink}
                      target="_blank"
                      className="launchpadSingle-url"
                    >
                      {fundraiserState.projectInfo.websiteLink}
                    </a>
                  )}
                </div>
                {isActive && (
                  <div className="launchpadSingle-header-right">
                    <div className="launchpadSingle-live">
                      <div className="launchpadSingle-live-dot"></div>
                      Live
                    </div>
                  </div>
                )}
              </div>

              <div className="launchpadSingle-details">
                <div className="launchpadSingle-details-title">Details</div>
                <div className="launchpadSingle-details-row">
                  <div className="launchpadSingle-details-label">Pool Fee</div>
                  <div className="launchpadSingle-details-value">
                    {Number(fundraiserState.poolFee) / 10000}%
                  </div>
                </div>
                <div className="launchpadSingle-details-row">
                  <div className="launchpadSingle-details-label">
                    Vesting duration
                  </div>
                  <div className="launchpadSingle-details-value">
                    {formatTimestamp(Number(fundraiserState.vestingDuration))}
                  </div>
                </div>
                <div className="launchpadSingle-details-row">
                  <div className="launchpadSingle-details-label">
                    Sale/Raise Token
                  </div>
                  <div className="launchpadSingle-details-value">
                    {`${formatTokenSymbol(
                      saleTokenInfo.symbol
                    )}/${formatTokenSymbol(raiseTokenInfo.symbol)}`}
                  </div>
                </div>
                {hardCapDecimals && (
                  <div className="launchpadSingle-details-row">
                    <div className="launchpadSingle-details-label">
                      Hard cap
                    </div>
                    <div className="launchpadSingle-details-value">
                      {`${hardCapDecimals} ${formatTokenSymbol(
                        raiseTokenInfo.symbol
                      )}`}
                    </div>
                  </div>
                )}

                {!hardCapDecimals && softCapDecimals && (
                  <div className="launchpadSingle-details-row">
                    <div className="launchpadSingle-details-label">
                      Soft cap
                    </div>
                    <div className="launchpadSingle-details-value">
                      {`${softCapDecimals} ${formatTokenSymbol(
                        raiseTokenInfo.symbol
                      )}`}
                    </div>
                  </div>
                )}
                <div className="launchpadSingle-details-row">
                  <div className="launchpadSingle-details-label">
                    Pool Address
                  </div>
                  <div className="launchpadSingle-details-value">
                    {fundraiserState.poolAddr}
                  </div>
                </div>
                <div className="launchpadSingle-details-row">
                  <div className="launchpadSingle-details-label">
                    Start Time
                  </div>
                  <div className="launchpadSingle-details-value">
                    {startDate}
                  </div>
                </div>
                {endDate && (
                  <div className="launchpadSingle-details-row">
                    <div className="launchpadSingle-details-label">
                      End Time
                    </div>
                    <div className="launchpadSingle-details-value">
                      {endDate}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="launchpadSingle-right">
              <div className="launchpadSingle-block">
                <div className="launchpadSingle-subtitle">Current state</div>
                <div className="launchpadSingle-value">
                  <span>{fundraiserState.stateString}</span>
                </div>
              </div>
              <div className="launchpadSingle-block">
                <div className="launchpadSingle-subtitle">Progress</div>
                <div className="launchpadSingle-value">
                  <span>
                    {" "}
                    {formatTokenDecimals(
                      BigInt(fundraiserState.raisedAmount),
                      parseInt(raiseTokenInfo.decimals)
                    )}{" "}
                    {formatTokenSymbol(raiseTokenInfo.symbol)}
                  </span>
                </div>
                <div className="launchpadSingle-value" data-small>
                  Sold:{" "}
                  {formatTokenDecimals(
                    BigInt(fundraiserState.soldAmount),
                    parseInt(saleTokenInfo.decimals)
                  )}{" "}
                  {saleTokenInfo.symbol}
                </div>
                <div className="launchpadCard-progress">
                  <div className="launchpadCard-progress-progress">
                    <div className="launchpadCard-progress-bar">
                      <div className="launchpadCard-progress-bar-bg"></div>
                      <div
                        className="launchpadCard-progress-bar-progress"
                        style={{
                          width: progress + "%",
                        }}
                      ></div>
                    </div>
                    <div className="launchpadCard-progress-progress-text">
                      {progress.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="launchpadSingle-block">
                <div className="launchpadSingle-subtitle">
                  Your contribution
                </div>
                <div className="launchpadSingle-value">
                  <span>
                    {qContribution.data || 0}{" "}
                    {formatTokenSymbol(raiseTokenInfo.symbol)}
                  </span>
                </div>
              </div>
              {qVestingInfo.data && (
                <VestingInformation
                  vestingInfo={qVestingInfo.data}
                  fundraiser={{
                    state: fundraiserState,
                    saleTokenInfo,
                    raiseTokenInfo,
                  }}
                  formInProgress={formInProgress}
                  claimVestedTokens={claimVestedTokens}
                />
              )}
              <div className="launchpadSingle-actions">
                {isActive && (
                  <>
                    <InputNumber
                      value={contributeAmount}
                      max={Infinity}
                      onChange={(val) => setContributeAmount(val)}
                      icon={<TokenIcon tokenKey={"GLQ"} />}
                    />
                    <Button
                      onClick={contribute}
                      disabled={
                        formInProgress != null ||
                        isNaN(parseFloat(contributeAmount)) ||
                        parseFloat(contributeAmount) <= 0
                      }
                      icon={formInProgress === "contribute" && <Spinner />}
                    >
                      Invest
                    </Button>
                  </>
                )}
                {isFailed && (
                  <Button
                    onClick={claimBack}
                    disabled={formInProgress != null}
                    icon={formInProgress === "claimBack" && <Spinner />}
                  >
                    Claim back
                  </Button>
                )}
                {isClaimable && hasClaimableContribution && (
                  <Button
                    onClick={claimTokens}
                    disabled={formInProgress != null}
                    icon={formInProgress === "claimTokens" && <Spinner />}
                  >
                    Claim {formatTokenSymbol(saleTokenInfo.symbol)}
                  </Button>
                )}
                {isOwner && isActive && canFail && (
                  <Button
                    onClick={fail}
                    disabled={formInProgress != null}
                    icon={formInProgress === "fail" && <Spinner />}
                    type="secondary"
                  >
                    Set failed
                  </Button>
                )}
                {isOwner && isActive && canFinalize && (
                  <Button
                    onClick={finalize}
                    disabled={formInProgress != null}
                    icon={formInProgress === "finalize" && <Spinner />}
                  >
                    Finalize
                  </Button>
                )}
                {isOwner && isFinalized && (
                  <Button
                    onClick={createPair}
                    disabled={formInProgress != null}
                    icon={formInProgress === "createPair" && <Spinner />}
                  >
                    Init pair
                  </Button>
                )}

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
                        <p>{success}</p>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LaunchpadSinglePage;
