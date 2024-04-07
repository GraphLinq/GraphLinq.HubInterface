import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Canceled from "@assets/icons/canceled.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Button from "@components/Button";
import "./style.scss";
import { SITE_NAME } from "@constants/index";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";
import { formatBigNumberToFixed, formatNumberToFixed } from "@utils/number";
import { PositionStatus } from "../../model/pool";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

const seoTitle = `${SITE_NAME} — Pool`;

function PoolSinglePage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { id: poolId } = useParams();
  const {
    loadedPositions,
    ownPositionIds,
    ownPositions,
    widthdrawLiquidity,
    claimFees,
  } = usePool();
  const navigate = useNavigate();

  if (loadedPositions && poolId && !ownPositionIds.includes(poolId)) {
    navigate("/pool");
  }
  const position = ownPositions.find((pos) => pos.id === poolId);

  const handleClaim = async () => {
    if (position) {
      console.log("claim start");
      await claimFees(position);
      console.log("claim end");
    }
  };

  const handleWithdraw = async () => {
    if (position) {
      console.log("withdraw start");
      await widthdrawLiquidity(position);
      console.log("withdraw end");
    }
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="twitter:title" content={seoTitle} />
      </Helmet>
      <div className="main-page pool">
        <div className="main-card">
          <div className="poolSingle-header">
            <Button link="/pool" type="tertiary" icon={<ArrowBack />}>
              Back
            </Button>
            {position ? (
              <>
                <div className="poolSingle-header-infos">
                  <div className="poolSingle-header-icons">
                    {tokenIcons[position.pair.first.name]}
                    {tokenIcons[position.pair.second.name]}
                  </div>
                  <div className="poolSingle-header-pair">
                    <span>{position.pair.first.name}</span>/
                    <span>{position.pair.second.name}</span>
                  </div>
                  <div className="poolSingle-header-fees">
                    {position.fees.toFixed(2)}%
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="main-card-title">Pool</div>
              </>
            )}
          </div>
          <div className="main-card-content">
            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please connect to manage your pool.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    {position && (
                      <>
                        <div className="poolSingle-block">
                          <div className="poolSingle-subtitle">Liquidity</div>
                          <div className="poolSingle-value">
                            <span>
                              {formatBigNumberToFixed(
                                position.liquidity.total,
                                2
                              )}
                            </span>
                          </div>
                          <div className="poolSingle-table">
                            <div className="poolSingle-table-row">
                              <div className="poolSingle-table-col">
                                {tokenIcons[position.pair.first.name]}
                                <span>{position.pair.first.name}</span>
                              </div>
                              <div className="poolSingle-table-col">
                                <span>
                                  {formatBigNumberToFixed(
                                    position.liquidity.first,
                                    6
                                  )}
                                </span>
                                {position.liquidity.first
                                  .div(position.liquidity.total)
                                  .mul(100)
                                  .toString()}
                                %
                              </div>
                            </div>
                            <div className="poolSingle-table-row">
                              <div className="poolSingle-table-col">
                                {tokenIcons[position.pair.second.name]}
                                <span>{position.pair.second.name}</span>
                              </div>
                              <div className="poolSingle-table-col">
                                <span>
                                  {formatBigNumberToFixed(
                                    position.liquidity.second,
                                    6
                                  )}
                                </span>
                                {position.liquidity.second
                                  .div(position.liquidity.total)
                                  .mul(100)
                                  .toString()}
                                %
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="poolSingle-block">
                          <div className="poolSingle-block-header">
                            <div className="poolSingle-block-left">
                              <div className="poolSingle-subtitle">
                                Unclaimed fees
                              </div>
                              <div className="poolSingle-value">
                                <span>
                                  {formatBigNumberToFixed(
                                    position.claimableFees.total,
                                    2
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="poolSingle-block-right">
                              <Button onClick={handleClaim} type="tertiary">
                                Collect fees
                              </Button>
                            </div>
                          </div>

                          <div className="poolSingle-table">
                            <div className="poolSingle-table-row">
                              <div className="poolSingle-table-col">
                                {tokenIcons[position.pair.first.name]}
                                <span>{position.pair.first.name}</span>
                              </div>
                              <div className="poolSingle-table-col">
                                <span>
                                  {formatBigNumberToFixed(
                                    position.claimableFees.first,
                                    6
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="poolSingle-table-row">
                              <div className="poolSingle-table-col">
                                {tokenIcons[position.pair.second.name]}
                                <span>{position.pair.second.name}</span>
                              </div>
                              <div className="poolSingle-table-col">
                                <span>
                                  {formatBigNumberToFixed(
                                    position.claimableFees.second,
                                    6
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="poolSingle-block">
                          <div className="poolSingle-block-header">
                            <div className="poolSingle-block-left">
                              <div className="poolSingle-subtitle">
                                <span>Price range</span>
                                {position.pair.first.name} per{" "}
                                {position.pair.second.name}
                              </div>
                            </div>

                            <div className="poolSingle-block-right">
                              <div className="poolSingle-status">
                                {position.status ===
                                  PositionStatus.IN_RANGE && (
                                  <>
                                    <div className="poolSingle-status-dot"></div>
                                    In range
                                  </>
                                )}
                                {position.status === PositionStatus.CLOSED && (
                                  <>
                                    <Canceled />
                                    Closed
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="poolSingle-table">
                            <div className="poolSingle-range">
                              <div className="poolSingle-range-col">
                                <div>
                                  <span>
                                    {formatNumberToFixed(position.min, 6)}
                                  </span>
                                </div>
                                <div>Low price</div>
                              </div>
                              <div className="poolSingle-range-col">
                                <div>
                                  <span>
                                    {formatNumberToFixed(position.max, 6)}
                                  </span>
                                </div>
                                <div>High price</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="poolSingle-block">
                          <div className="poolSingle-subtitle">
                            Current price
                          </div>
                          <div className="poolSingle-value">
                            <span>
                              {formatNumberToFixed(
                                position.poolCurrentPrice,
                                6
                              )}
                            </span>
                            {position.pair.first.name} per{" "}
                            {position.pair.second.name}
                          </div>
                        </div>

                        <div className="poolSingle-actions">
                          <Button link={"/pool/new"} type="tertiary">
                            Increase liquidity
                          </Button>
                          <Button onClick={handleWithdraw}>
                            Remove liquidity
                          </Button>
                        </div>
                      </>
                    )}
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

export default PoolSinglePage;
