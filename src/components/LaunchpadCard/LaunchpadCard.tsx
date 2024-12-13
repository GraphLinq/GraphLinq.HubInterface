import "./style.scss";
import React, { useState } from "react";
import Approved from "@assets/icons/approved.svg?react";

const data = {
  live: true,
  finished: false,
  verified: true,
  projectName: "Nexus Protocol",
  projectDescription: "Decentralized exchange",
  projectType: "Liquidity Pool",
  symbol: "GLQ",
  soft: 50000,
  hard: 1500000,
  progress: "72.900.000",
  raiseTokenPriceUSD: 0,
  liquidityPercent: 0,
  lockup: 0,
  participants: 0,
};

interface LaunchpadCardProps {
  address: string;
}

const LaunchpadCard: React.FC<LaunchpadCardProps> = ({ address }) => {
  return (
    <>
      <div className="launchpadCard">
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
          <div className="launchpadCard-header-right">
            {data.live && (
              <div className="launchpadCard-live">
                <div className="launchpadCard-live-dot"></div>
                Live
              </div>
            )}
          </div>
        </div>
        <div className="launchpadCard-content">
          <div className="launchpadCard-table">
            <div className="launchpadCard-range">
              <div className="launchpadCard-range-col">
                <div>
                  <span>{data.soft}</span>
                </div>
                <div>Soft cap</div>
              </div>
              <div className="launchpadCard-range-col">
                <div>
                  <span>{data.hard}</span>
                </div>
                <div>Hard cap</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchpadCard;
