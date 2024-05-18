import "./_style.scss";
import { SITE_NAME } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useAccount } from "wagmi";

import { ChallengeStatus } from "../../model/rewards";
import { getChallengesInformation } from "../../queries/api";

const seoTitle = `${SITE_NAME} — Rewards`;

function RewardsPage() {
  const { address: account } = useAccount();

  const qChallenges = useQuery({
    queryKey: ["challengesInformation"],
    queryFn: () => getChallengesInformation(account!),
    refetchInterval: 60000,
    enabled: !!account,
  });

  const challenges = qChallenges.data || [];

  const availableChallenges = challenges.reduce(
    (count, challenge) => (challenge.available ? count + 1 : count),
    0
  );
  const completedRewards = challenges.reduce(
    (count, challenge) =>
      challenge.status === ChallengeStatus.COMPLETED ? count + 1 : count,
    0
  );
  const completedRewardsPerc = (completedRewards / challenges.length) * 100;

  const leaderboard = [
    {
      address: "0x0000",
      points: 150,
    },
    {
      address: "0x0000",
      points: 120,
    },
    {
      address: "0x0000",
      points: 100,
    },
    {
      address: "0x0000",
      points: 50,
    },
    {
      address: "0x0000",
      points: 30,
    },
    {
      address: "0x0000",
      points: 10,
    },
  ];

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
            <div className="main-card" data-bg>
              <div className="main-card-title">GLQ Rewards</div>
              <div className="main-card-content">
                {!account ? (
                  <>
                    <div className="main-card-notlogged">
                      Please connect to earn rewards.
                    </div>
                  </>
                ) : (
                  <div className="rewards-total">
                    <div className="rewards-total-subtitle">
                      You have completed
                    </div>
                    <div className="rewards-total-value">
                      {completedRewards} rewards{" "}
                      {challenges.length > 0 && (
                        <>
                          <span>on {availableChallenges} available for </span>X
                          points
                        </>
                      )}
                    </div>
                    <div className="rewards-total-progress">
                      <div className="rewards-total-bar">
                        <div className="rewards-total-bar-bg"></div>
                        <div
                          className="rewards-total-bar-progress"
                          style={{
                            width: `${completedRewardsPerc}%`,
                          }}
                        >
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="main-card">
              <div className="main-card-title">Leaderboard</div>
              <div className="main-card-content"></div>
              <table className="rewards-table">
                <thead>
                  <tr>
                    <th data-rank>Rank</th>
                    <th data-address>Address</th>
                    <th data-points>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.reverse().map((user, key) => (
                    <tr key={`leader-board-${key}`}>
                      <td data-rank>{key + 1}</td>
                      <td data-address>{user.address}</td>
                      <td data-points>{user.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rewards-right">
            {!account || challenges.length === 0 ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className="rewards-challenge"
                    key={`skeleton-${index}`}
                  ></div>
                ))}
              </>
            ) : (
              <>
                {challenges.map((challenge, index) => (
                  <>
                    <div
                      className="rewards-challenge"
                      data-status={challenge.status}
                      data-disabled={!challenge.available}
                      key={`challenge-${index}`}
                    >
                      <div className="rewards-challenge-bg">
                        <div className="rewards-challenge-left">
                          <div className="rewards-challenge-title">
                            {challenge.label}
                          </div>
                          <div className="rewards-challenge-progress">
                            {challenge.status ===
                              ChallengeStatus.IN_PROGRESS && (
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RewardsPage;
