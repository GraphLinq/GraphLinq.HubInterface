import "./_style.scss";
import { SITE_NAME } from "@constants/index";

import { Helmet } from "react-helmet-async";
import { Challenge, ChallengeStatus } from "../../model/rewards";
import Button from "@components/Button";

const seoTitle = `${SITE_NAME} — Rewards`;

function RewardsPage() {
  const challenges: Challenge[] = [
    {
      label: "Provide liquidity on Uniswap",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.CLAIMABLE,
    },
    {
      label: "Bridge ETH on the GLQ Chain",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.COMPLETED,
    },
    {
      label: "Complete a transaction with GLQ",
      reward: 1,
      progression: 0,
      status: ChallengeStatus.IN_PROGRESS,
    },
    {
      label: "Swap GLQ for another token",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.CLAIMABLE,
    },
    {
      label: "Provide liquidity on Uniswap",
      reward: 1,
      progression: 0,
      status: ChallengeStatus.IN_PROGRESS,
    },
    {
      label: "Stake GLQ in a governance pool",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.COMPLETED,
    },
    {
      label: "Bridge ETH on the GLQ Chain",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.CLAIMABLE,
    },
    {
      label: "Swap GLQ for another token",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.IN_PROGRESS,
    },
    {
      label: "Provide liquidity on Uniswap",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.CLAIMABLE,
    },
    {
      label: "Stake GLQ in a governance pool",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.IN_PROGRESS,
    },
    {
      label: "Complete a transaction with GLQ",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.COMPLETED,
    },
    {
      label: "Complete a transaction with GLQ",
      reward: 1,
      progression: 1,
      status: ChallengeStatus.IN_PROGRESS,
    },
  ];

  const collectedRewards = challenges.reduce(
    (count, challenge) =>
      challenge.status === ChallengeStatus.COMPLETED ? count + 1 : count,
    0
  );
  const collectedRewardsPerc = (collectedRewards / challenges.length) * 100;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="twitter:title" content={seoTitle} />
      </Helmet>
      <div className="home-wrapper">
        <div className="rewards">
          <div className="rewards-left">
            <div className="main-card">
              <div className="main-card-title">GLQ Rewards</div>
              <div className="main-card-content">
                <div className="rewards-total">
                  <div className="rewards-total-subtitle">
                    You have collected
                  </div>
                  <div className="rewards-total-value">
                    {collectedRewards} rewards
                  </div>
                  <div className="rewards-total-progress">
                    <div className="rewards-total-bar">
                      <div className="rewards-total-bar-bg"></div>
                      <div
                        className="rewards-total-bar-progress"
                        style={{ width: `${collectedRewardsPerc}%` }}
                      >
                        <span></span>
                      </div>
                    </div>
                    <div className="rewards-total-progress-text">
                      {collectedRewards}/{challenges.length} rewards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rewards-right">
            {challenges.map((challenge) => (
              <>
                <div
                  className="rewards-challenge"
                  data-status={challenge.status}
                >
                  <div className="rewards-challenge-bg">
                    <div className="rewards-challenge-left">
                      <div className="rewards-challenge-title">
                        {challenge.label}
                      </div>
                      <div className="rewards-challenge-progress">
                        {challenge.status === ChallengeStatus.IN_PROGRESS && (
                          <>
                            <div className="rewards-challenge-bar">
                              <div className="rewards-challenge-bar-bg"></div>
                              <div className="rewards-challenge-bar-progress"></div>
                            </div>
                            <div className="rewards-challenge-progress-text">
                              {challenge.progression * 100}%
                            </div>
                          </>
                        )}
                        {challenge.status === ChallengeStatus.CLAIMABLE && (
                          <>
                            <Button>Claim</Button>
                          </>
                        )}
                        {challenge.status === ChallengeStatus.COMPLETED && (
                          <>
                            <div className="rewards-challenge-progress-done">
                              Completed
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="rewards-challenge-right">
                      <div className="rewards-challenge-amount">
                        <div className="rewards-challenge-amount-label">
                          Reward
                        </div>
                        <div className="rewards-challenge-amount-value">
                          +{challenge.reward}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RewardsPage;
