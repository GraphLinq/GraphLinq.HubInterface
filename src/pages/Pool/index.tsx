import SearchEmpty from "@assets/icons/search-empty.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import VisiblityOff from "@assets/icons/visibility-off.svg?react";
import Visiblity from "@assets/icons/visibility.svg?react";
import Button from "@components/Button";
import "./style.scss";
import Pill from "@components/Pill";
import TokenIcon from "@components/TokenIcon";
import { formatNumberToFixed, isInfinity } from "@utils/number";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";
import { PositionStatus } from "../../model/pool";
import SEO from "@components/SEO";

const seoTitle = "Pool | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function PoolPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { ownPositions, ownPositionIds, loadingPositions } = usePool();

  const [displayOORPositions, setDisplayOORPositions] = useState(true);

  const filteredPositions = !displayOORPositions
    ? ownPositions.filter((pos) => pos.status !== PositionStatus.OUT_OF_RANGE)
    : ownPositions;

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
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
                  Please connect to manage your pools.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    <div className="pool-amount">
                      {ownPositions.length === 0 ? (
                        <>
                          {loadingPositions ? (
                            <>
                              {ownPositionIds.length ? (
                                <>
                                  <div className="pool-list-header">
                                    <div className="pool-list-header-left">
                                      Your Positions{" "}
                                      <span>{ownPositionIds.length}</span>
                                    </div>
                                  </div>
                                  <div className="pool-list">
                                    {ownPositionIds.map((_, key) => (
                                      <div className="pool-list-item" key={key}>
                                        Loading position...
                                        <Spinner />
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="pool-empty">
                                  <div className="pool-empty-info">
                                    <Spinner />
                                    <div className="pool-empty-label">
                                      Loading positions...
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
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
                          )}
                        </>
                      ) : (
                        <>
                          <div className="pool-list-header">
                            <div className="pool-list-header-left">
                              Your Positions <span>{ownPositions.length}</span>
                            </div>
                            <div className="pool-list-header-right">
                              <Pill
                                onClick={() =>
                                  setDisplayOORPositions(!displayOORPositions)
                                }
                                icon={
                                  displayOORPositions ? (
                                    <VisiblityOff />
                                  ) : (
                                    <Visiblity />
                                  )
                                }
                              >
                                {displayOORPositions
                                  ? "Hide out of range positions"
                                  : "Display out of range positions"}
                              </Pill>
                            </div>
                          </div>
                          <div className="pool-list">
                            {filteredPositions.map((pos, key) => (
                              <NavLink
                                to={`/pool/${pos.id}`}
                                className="pool-list-item"
                                data-status={pos.status}
                                key={key}
                              >
                                <div className="pool-list-item-left">
                                  <div className="pool-list-item-infos">
                                    <div className="pool-list-item-icons">
                                      <TokenIcon
                                        tokenKey={pos.pair.first.name}
                                      />
                                      <TokenIcon
                                        tokenKey={pos.pair.second.name}
                                      />
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
                                        {formatNumberToFixed(pos.min, 6)}
                                      </span>
                                    </div>
                                    <div className="pool-list-item-range-max">
                                      Max:{" "}
                                      <span>
                                        {isInfinity(pos.max)
                                          ? "∞"
                                          : formatNumberToFixed(pos.max, 6)}
                                      </span>{" "}
                                      {pos.pair.second.name} per{" "}
                                      {pos.pair.first.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="pool-list-item-right">
                                  <div className="pool-list-item-status">
                                    <div
                                      className="pool-list-item-status-dot"
                                      data-status={pos.status}
                                    ></div>
                                    {pos.status === PositionStatus.IN_RANGE
                                      ? "In range"
                                      : "Out of range"}
                                  </div>
                                </div>
                              </NavLink>
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
