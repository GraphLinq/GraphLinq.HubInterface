import "./style.scss";
import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Approved from "@assets/icons/approved.svg?react";

import SEO from "@components/SEO";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { VestingState } from "../../types/launchpad";
import { useStore } from "../../store";
import { useWalletClient } from "wagmi";
import {
  formatTimestamp,
  formatTimestampToDate,
  formatTokenDecimals,
  formatTokenSymbol,
} from "@utils/launchpad";
import { FundraiserManager } from "../../services/FundraiserManager";
import useLaunchpad from "../../composables/useLaunchpad";
import { ethers } from "ethers";
import { formatNumberToDollars } from "@utils/number";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadSinglePage() {
  const { id: fundraiserAddr } = useParams();
  useLaunchpad();

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  // Helper function to format bigint to readable number
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contribution, setContribution] = useState<string | null>(null);
  const [hasClaimed, setClaimed] = useState<boolean | null>(null);
  const [vestingInfo, setVestingInfo] = useState<VestingState | null>(null);

  const fundraiserState = useStore(
    (state) => state.fundraiserStates[fundraiserAddr as string] || null
  );
  const saleTokenInfo = useStore(
    (state) => state.tokenInfo[fundraiserState?.saleToken] || null
  );
  const raiseTokenInfo = useStore(
    (state) => state.tokenInfo[fundraiserState?.raiseToken] || null
  );

  const reloadData = () => async () => {
    const fundraiserState = await library.getFundraiserState(fundraiserAddr);
    store.getState().setFundraiseState(fundraiserAddr, fundraiserState);
    const saleToken = await library.getTokenInfo(fundraiserState.saleToken);
    store.getState().setTokenInfo(fundraiserState.saleToken, saleToken);
    const raiseToken = await library.getTokenInfo(fundraiserState.raiseToken);
    store.getState().setTokenInfo(fundraiserState.raiseToken, raiseToken);
  };

  const store: any = useStore();
  const library = store.getState().library;
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      setLoading(true); // Show loading state
      try {
        // Fetch fundraiser state if not in the store
        let state = fundraiserState;
        if (!state) {
          state = await library.getFundraiserState(fundraiserAddr);
          console.log("state", state);
          store.getState().setFundraiseState(fundraiserAddr, state);
        }

        // Fetch sale token info if missing
        if (!saleTokenInfo && state.saleToken) {
          const saleToken = await library.getTokenInfo(state.saleToken);
          store.getState().setTokenInfo(state.saleToken, saleToken);
        }

        // Fetch raise token info if missing
        if (!raiseTokenInfo && state.raiseToken) {
          const raiseToken = await library.getTokenInfo(state.raiseToken);
          store.getState().setTokenInfo(state.raiseToken, raiseToken);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchDataIfNeeded();
  }, [
    fundraiserAddr,
    fundraiserState,
    saleTokenInfo,
    raiseTokenInfo,
    library,
    store,
  ]);

  useEffect(() => {
    const fetchContribution = async () => {
      if (!library || !walletClient || !fundraiserState || !raiseTokenInfo) {
        return;
      }
      try {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(
          walletClient.transport
        );
        const signer = await ethersProvider.getSigner();

        // Fetch the contribution
        const contributionAmount = await library.getContribution(
          signer,
          fundraiserAddr
        );

        // Convert contribution amount to a readable format
        const formattedContribution = formatTokenDecimals(
          contributionAmount,
          raiseTokenInfo.decimals
        );

        setContribution(formattedContribution);
      } catch (error) {
        console.error("Error fetching contribution:", error);
        setContribution(null);
      }
    };

    fetchContribution();
  }, [library, walletClient, fundraiserState, raiseTokenInfo]);

  useEffect(() => {
    const fetchClaimed = async () => {
      if (!library || !walletClient) {
        return;
      }
      try {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(
          walletClient.transport
        );
        const signer = await ethersProvider.getSigner();

        const hasClaimed = await library.checkClaimed(signer, fundraiserAddr);
        setClaimed(hasClaimed);
      } catch (error) {
        console.error("Error fetching claimed data:", error);
        setClaimed(null);
      }
    };

    fetchClaimed();
  }, [library, walletClient, fundraiserAddr]);

  useEffect(() => {
    const fetchVestingInfo = async () => {
      if (
        !library ||
        !walletClient ||
        !fundraiserState ||
        Number(fundraiserState.vestingDuration) === 0
      ) {
        return;
      }
      try {
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(
          walletClient.transport
        );
        const signer = await ethersProvider.getSigner();

        const vestingInfo = await library.getVestingInfo(
          signer,
          fundraiserAddr
        );
        setVestingInfo(vestingInfo);
      } catch (error) {
        console.error("Error fetching vesting data:", error);
        setVestingInfo(null);
      }
    };

    fetchVestingInfo();
  }, [library, walletClient, fundraiserAddr, fundraiserState]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Initialize the manager
  const fundraiserManager = new FundraiserManager(library, walletClient);

  const isFairLaunch = fundraiserState.campaignDetails[0] === "Fair Launch";
  const isStealthLaunch =
    fundraiserState.campaignDetails[0] === "Stealth Launch";
  const isOwner = fundraiserState.owner === store.getState().address;
  const isActive = fundraiserState.stateString === "Active";
  const isFailed = fundraiserState.stateString === "Failed";
  const isFinalized = fundraiserState.stateString === "Finalized";
  const isClaimable = fundraiserState.stateString === "SwapPairCreated";
  const hasClaimableContribution =
    contribution && parseFloat(contribution) > 0 && hasClaimed === false;

  // Calculate progress percentage
  const raisedAmountDecimals = parseFloat(
    formatTokenDecimals(fundraiserState.raisedAmount, raiseTokenInfo.decimals)
  );
  const softCap = isFairLaunch ? fundraiserState.config[1] : BigInt(0);
  const hardCap = isStealthLaunch ? fundraiserState.config[0] : BigInt(0);

  const softCapDecimals = parseFloat(
    formatTokenDecimals(softCap, raiseTokenInfo.decimals)
  );
  const hardCapDecimals = parseFloat(
    formatTokenDecimals(hardCap, raiseTokenInfo.decimals)
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
  progress = Math.min(Math.max(progress, 0), 100);

  // Convert timestamps to readable dates
  const startDate = formatTimestampToDate(
    Number(fundraiserState.createdTimestamp)
  );
  let endDate = formatTimestampToDate(
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

  const isVerified = true; // @TODO

  const fail = async () => {
    await fundraiserManager.failFundraiser(fundraiserAddr);
  };

  const finalize = async () => {
    await fundraiserManager.finalizeFundraiser(
      fundraiserAddr,
      fundraiserState.saleToken,
      fundraiserState.soldAmount
    );
  };

  const createPair = async () => {
    await fundraiserManager.createSwapPair(
      fundraiserAddr,
      fundraiserState.saleToken,
      fundraiserState.raiseToken,
      raiseTokenInfo.decimals,
      raiseTokenInfo.symbol
    );
  };

  const contribute = async () => {
    await fundraiserManager.contribute(
      fundraiserAddr,
      "10",
      raiseTokenInfo.decimals
    );
  };

  const claimBack = async () => {
    await fundraiserManager.claimBack(fundraiserAddr);
  };

  const claimTokens = async () => {
    await fundraiserManager.claimTokens(fundraiserAddr);
  };

  const claimVestedTokens = async () => {
    await fundraiserManager.claimVestedTokens(fundraiserAddr);
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
                    {fundraiserState.projetInfo.projectName}{" "}
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
                    {fundraiserState.projetInfo.description}
                  </div>
                  {fundraiserState.projetInfo.websiteLink && (
                    <a
                      href={fundraiserState.projetInfo.websiteLink}
                      target="_blank"
                      className="launchpadSingle-url">
                      {fundraiserState.projetInfo.websiteLink}
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
                      fundraiserState.raisedAmount,
                      raiseTokenInfo.decimals
                    )}{" "}
                    {formatTokenSymbol(raiseTokenInfo.symbol)}
                  </span>
                </div>
                <div className="launchpadSingle-value" data-small>
                  Sold:{" "}
                  {formatTokenDecimals(
                    fundraiserState.soldAmount,
                    saleTokenInfo.decimals
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
                        }}></div>
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
                    {contribution} {formatTokenSymbol(raiseTokenInfo.symbol)}
                  </span>
                </div>
              </div>

              <div className="launchpadSingle-actions">
                {isActive && <Button onClick={contribute}>Invest</Button>}
                {isFailed && <Button onClick={claimBack}>Claim back</Button>}
                {isClaimable && hasClaimableContribution && (
                  <Button onClick={claimTokens}>
                    Claim {formatTokenSymbol(saleTokenInfo.symbol)}
                  </Button>
                )}
                {isOwner && isActive && canFail && (
                  <Button onClick={fail}>Set failed</Button>
                )}
                {isOwner && isActive && canFinalize && (
                  <Button onClick={finalize}>Finalize</Button>
                )}
                {isOwner && isFinalized && (
                  <Button onClick={createPair}>Init pair</Button>
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
