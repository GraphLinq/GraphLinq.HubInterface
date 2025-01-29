import "./style.scss";
import React from "react";
import Approved from "@assets/icons/approved.svg?react";
import Users from "@assets/icons/users.svg?react";
import Locktime from "@assets/icons/locktime.svg?react";
import {
  formatNumberToDollars,
  formatSecondsToReadableTime,
} from "@utils/number";
import { NavLink } from "react-router-dom";
import { FundraiserSmall } from "../../model/launchpad";
import { formatTokenDecimals, formatTokenSymbol } from "@utils/launchpad";

interface LaunchpadCardProps {
  fundraiser: FundraiserSmall;
}

const LaunchpadCard: React.FC<LaunchpadCardProps> = ({ fundraiser: data }) => {
  // const data = {
  //   live: Math.random() > 0.5,
  //   finished: Math.random() > 0.2,
  //   verified: Math.random() > 0.3,
  //   projectName: "Nexus Protocol",
  //   projectDescription: "Decentralized exchange",
  //   projectType: "Liquidity Pool",
  //   symbol: "GLQ",
  //   soft: Math.round(5000 + Math.random() * 5000),
  //   hard: Math.round(30000 + Math.random() * 10000),
  //   progress: 15000 + Math.random() * 5000,
  //   progressPercent: Math.round(Math.random() * 100),
  //   raiseTokenPriceUSD: 0.092,
  //   raiseTokenName: "GLQ",
  //   lockup: new Date().getTime() - Math.random() * 100000000,
  //   participants: Math.round(Math.random() * 100),
  // };
  return (
    <>
      <NavLink to={`/launchpad/${data.address}`} className="launchpadCard">
        <div className="launchpadCard-header">
          <div className="launchpadCard-header-left">
            <div className="launchpadCard-name">
              {data.projectName}{" "}
              {data.verified && (
                <span className="launchpadCard-verified">
                  <Approved />
                </span>
              )}
            </div>
            <div className="launchpadCard-type">{data.projectType}</div>
            <div className="launchpadCard-desc">{data.projectDescription}</div>
          </div>
          {data.live && (
            <div className="launchpadCard-header-right">
              <div className="launchpadCard-live">
                <div className="launchpadCard-live-dot"></div>
                Live
              </div>
            </div>
          )}
        </div>
        <div className="launchpadCard-content">
          <div className="launchpadCard-progress">
            <div className="launchpadCard-progress-header">
              <div className="launchpadCard-progress-title">Progress</div>
              <div className="launchpadCard-progress-value">
                {formatTokenDecimals(
                  data.progress,
                  parseInt(data.raiseTokenInfo.decimals)
                )}{" "}
                {formatTokenSymbol(data.symbol)}
                <span className="color">
                  {formatNumberToDollars(
                    parseFloat(
                      formatTokenDecimals(
                        data.progress,
                        parseInt(data.raiseTokenInfo.decimals)
                      )
                    ) * data.raiseTokenPriceUSD,
                    0
                  )}
                </span>
              </div>
            </div>
            <div className="launchpadCard-progress-progress">
              <div className="launchpadCard-progress-bar">
                <div className="launchpadCard-progress-bar-bg"></div>
                <div
                  className="launchpadCard-progress-bar-progress"
                  style={{
                    width: data.progressPercent + "%",
                  }}
                ></div>
              </div>
              <div className="launchpadCard-progress-progress-text">
                {data.progressPercent}%
              </div>
            </div>
          </div>
          <div className="launchpadCard-cap launchpadCard-table">
            <div className="launchpadCard-range">
              <div className="launchpadCard-range-col">
                <div>
                  <span>
                    {formatTokenDecimals(
                      data.soft,
                      parseInt(data.raiseTokenInfo.decimals)
                    )}{" "}
                    {formatTokenSymbol(data.symbol)}{" "}
                  </span>
                  <span className="color">
                    {formatNumberToDollars(
                      parseFloat(
                        formatTokenDecimals(
                          data.soft,
                          parseInt(data.raiseTokenInfo.decimals)
                        )
                      ) * data.raiseTokenPriceUSD,
                      0
                    )}
                  </span>
                </div>
                <div>Soft cap</div>
              </div>
              <div className="launchpadCard-range-col">
                <div>
                  <span>
                    {formatTokenDecimals(
                      data.hard,
                      parseInt(data.raiseTokenInfo.decimals)
                    )}{" "}
                    {formatTokenSymbol(data.symbol)}{" "}
                    <span className="color">
                      {formatNumberToDollars(
                        parseFloat(
                          formatTokenDecimals(
                            data.hard,
                            parseInt(data.raiseTokenInfo.decimals)
                          )
                        ) * data.raiseTokenPriceUSD,
                        0
                      )}
                    </span>
                  </span>
                </div>
                <div>Hard cap</div>
              </div>
            </div>
          </div>

          <div className="launchpadCard-table">
            <div className="launchpadCard-table-row">
              <div className="launchpadCard-table-col">
                <Locktime />
                <span>Lockup time</span>
              </div>
              <div className="launchpadCard-table-col">
                {formatSecondsToReadableTime(data.lockup)}
              </div>
            </div>
            <div className="launchpadCard-table-row">
              <div className="launchpadCard-table-col">
                <Users />
                <span>Participants</span>
              </div>
              <div className="launchpadCard-table-col">{data.participants}</div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default LaunchpadCard;
