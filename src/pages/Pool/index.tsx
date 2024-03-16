import Canceled from "@assets/icons/canceled.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import SearchEmpty from "@assets/icons/search-empty.svg?react";
import VisiblityOff from "@assets/icons/visibility-off.svg?react";
import Visiblity from "@assets/icons/visibility.svg?react";
import Button from "@components/Button";
import "./_pool.scss";
import Pill from "@components/Pill";
import {
  ETH_TOKEN,
  GLQ_TOKEN,
  SITE_NAME,
} from "@constants/index";
import { formatNumberToFixed } from "@utils/number";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

function PoolPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();

  enum PositionStatus {
    IN_RANGE,
    CLOSED,
  }

  const positions = [
    {
      pair: {
        first: GLQ_TOKEN,
        second: ETH_TOKEN,
      },
      fees: 1,
      min: 0,
      max: Infinity,
      status: PositionStatus.IN_RANGE,
    },
    {
      pair: {
        first: GLQ_TOKEN,
        second: ETH_TOKEN,
      },
      fees: 0.3,
      min: 54990.2,
      max: 1000000,
      status: PositionStatus.CLOSED,
    },
  ];

  const [displayClosedPositions, setDisplayClosedPositions] = useState(true);

  const filteredPositions = !displayClosedPositions ? positions.filter((pos) => pos.status !== PositionStatus.CLOSED) : positions;

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Pool</title>
      </Helmet>
      <div className="main-page pool">
        <div className="main-card">
          <div className="main-card-title">Pool</div>
          <div className="main-card-content">
            <div className="main-card-desc">
              Your active liquidity positions will appear here.
            </div>

            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please login to manage your pools.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    <div className="pool-amount">
                      {positions.length === 0 ? (
                        <>
                          <div className="pool-empty">
                            <div className="pool-empty-info">
                              <SearchEmpty />
                              <div className="pool-empty-label">
                                No active positions
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pool-list-header">
                            <div className="pool-list-header-left">
                              Your Positions <span>{positions.length}</span>
                            </div>
                            <div className="pool-list-header-right">
                              <Pill
                                onClick={() =>
                                  setDisplayClosedPositions(
                                    !displayClosedPositions
                                  )
                                }
                                icon={
                                  displayClosedPositions ? (
                                    <VisiblityOff />
                                  ) : (
                                    <Visiblity />
                                  )
                                }
                              >
                                {displayClosedPositions
                                  ? "Hide closed positions"
                                  : "Display closed positions"}
                              </Pill>
                            </div>
                          </div>
                          <div className="pool-list">
                            {filteredPositions.map((pos, key) => (
                              <>
                                <div
                                  className="pool-list-item"
                                  data-status={pos.status}
                                  key={key}
                                >
                                  <div className="pool-list-item-left">
                                    <div className="pool-list-item-infos">
                                      <div className="pool-list-item-icons">
                                        {tokenIcons[pos.pair.first.name]}
                                        {tokenIcons[pos.pair.second.name]}
                                      </div>
                                      <div className="pool-list-item-pair">
                                        <span>{pos.pair.first.name}</span> /{" "}
                                        <span>{pos.pair.second.name}</span>
                                      </div>
                                      <div className="pool-list-item-fees">
                                        {pos.fees.toFixed(2)}% Fee Tier
                                      </div>
                                    </div>
                                    <div className="pool-list-item-range">
                                      <div className="pool-list-item-range-min">
                                        Min:{" "}
                                        <span>
                                          {formatNumberToFixed(pos.min)}
                                        </span>
                                      </div>
                                      <div className="pool-list-item-range-max">
                                        Max:{" "}
                                        <span>
                                          {pos.max === Infinity ? "∞" : formatNumberToFixed(pos.max)}
                                        </span>{" "}
                                        {pos.pair.first.name} per{" "}
                                        {pos.pair.second.name}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pool-list-item-right">
                                    <div className="pool-list-item-status">
                                      {pos.status ===
                                        PositionStatus.IN_RANGE && (
                                        <>
                                          <div className="pool-list-item-status-dot"></div>
                                          In range
                                        </>
                                      )}
                                      {pos.status === PositionStatus.CLOSED && (
                                        <>
                                          <Canceled />
                                          Closed
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="pool-create">
                        <Button link="/pool/new">New position</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="main-card-wrongnetwork">
                      Please switch to GLQ Chain network to manage your pools.
                      <Button onClick={switchToGraphLinqMainnet}>
                        Switch to GLQ Chain network
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PoolPage;
