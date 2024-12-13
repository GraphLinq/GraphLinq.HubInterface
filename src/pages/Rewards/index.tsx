import "./style.scss";
import { SITE_NAME } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import Spinner from "@assets/icons/spinner.svg?react";

import { ChallengeStatus } from "../../model/rewards";
import {
  getChallengesInformation,
  getChallengesLadder,
} from "../../queries/api";
import SEO from "@components/SEO";

const seoTitle = `${SITE_NAME} — Rewards`;

function RewardsPage() {
  const { address: account } = useAccount();

  const qChallengeLadder = useQuery({
    queryKey: ["challengesLadder"],
    queryFn: () => getChallengesLadder(),
    refetchInterval: 600000,
  });

  const leaderboard = qChallengeLadder.data
    ? qChallengeLadder.data.sort((a, b) => b.position - a.position)
    : [];

  const qChallenges = useQuery({
    queryKey: ["challengesInformation"],
    queryFn: () => getChallengesInformation(account!),
    refetchInterval: 60000,
    enabled: !!account,
  });

  const challenges = qChallenges.data?.challenges || [];
  const points = qChallenges.data?.points || 0;

  const availableChallenges = challenges.reduce(
    (count, challenge) => (challenge.available ? count + 1 : count),
    0
  );
  const completedRewards = challenges.reduce(
    (count, challenge) =>
      challenge.status === ChallengeStatus.COMPLETED ? count + 1 : count,
    0
  );
  const completedRewardsPerc = (completedRewards / availableChallenges) * 100;

  return (
    <>
      <SEO title={seoTitle} />
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
                    <div className="rewards-total-subtitle">You have</div>
                    <div className="rewards-total-value">
                      {points} {points > 1 ? "points" : "point"}
                    </div>
                    <div className="rewards-total-subtitle">
                      after collected
                    </div>
                    <div className="rewards-total-value">
                      {completedRewards}{" "}
                      {completedRewards > 1 ? "rewards" : "reward"}{" "}
                      {challenges.length > 0 && (
                        <>
                          <span>on {availableChallenges} available</span>
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
            <div className="main-card leaderboard">
              <div className="main-card-title">Leaderboard</div>
              <div className="main-card-content">
                {qChallengeLadder.isLoading ? (
                  <div className="rewards-table-loader">
                    <Spinner />
                  </div>
                ) : (
                  <div className="rewards-table-wrapper">
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
                            <td data-rank>{user.position}</td>
                            <td data-address>{user.address}</td>
                            <td data-points>{user.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
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
                                  <div
                                    className="rewards-challenge-bar-progress"
                                    style={{
                                      width: challenge.progression + "%",
                                    }}
                                  ></div>
                                </div>
                                <div className="rewards-challenge-progress-text">
                                  {challenge.progression.toFixed(2)}%
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
