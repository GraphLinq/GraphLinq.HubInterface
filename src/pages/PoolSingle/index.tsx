import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Canceled from "@assets/icons/canceled.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Button from "@components/Button";
import "./style.scss";
import { GLQ_EXPLORER, SITE_NAME } from "@constants/index";
import {
  formatBigNumberToFixed,
  formatNumberToDollars,
  formatNumberToFixed,
} from "@utils/number";
import { ethers } from "ethers";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";
import { PositionStatus } from "../../model/pool";
import { useEffect, useState } from "react";
import Alert from "@components/Alert";

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
  const { id: positionId } = useParams();
  const { calculatePrice } = useExchangeRates();
  const {
    loadedPositions,
    ownPositions,
    ownPositionIds,
    withdrawLiquidity,
    claimFees,
    pending: poolPending,
    error: poolError,
    success: poolSuccess,
  } = usePool();
  const navigate = useNavigate();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  if (loadedPositions && positionId && !ownPositionIds.includes(positionId)) {
    navigate("/pool");
  }

  const position = ownPositions.find((pos) => pos.id === positionId);
  const priceFirst = position
    ? (calculatePrice(
        parseFloat(ethers.utils.formatEther(position.liquidity.first)),
        "glq",
        "number"
      ) as number)
    : 0;
  const priceSecond = position
    ? (calculatePrice(
        parseFloat(ethers.utils.formatEther(position.liquidity.second)),
        "eth",
        "number"
      ) as number)
    : 0;
  const totalPrice = position ? priceFirst + priceSecond : 0;
  const percPartFirst = (priceFirst / totalPrice) * 100;
  const percPartSecond = (priceSecond / totalPrice) * 100;

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const handleClaim = async () => {
    resetFeedback();

    if (position) {
      setLoading(true);
      setFormDisabled(true);
      await claimFees(position);
      setLoading(false);
      setFormDisabled(false);
    }
  };

  const handleWithdraw = async () => {
    resetFeedback();

    if (position) {
      setLoading(true);
      setFormDisabled(true);
      await withdrawLiquidity(position);
      setLoading(false);
      setFormDisabled(false);
    }
  };

  useEffect(() => {
    resetFeedback();
    setPending(poolPending);
  }, [poolPending]);

  useEffect(() => {
    resetFeedback();
    setError(poolError);
  }, [poolError]);

  useEffect(() => {
    resetFeedback();
    setSuccess(poolSuccess);
  }, [poolSuccess]);

  const trackingExplorer = `${GLQ_EXPLORER}/tx/${success}`;

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
                <div className="main-card-title">Position</div>
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
                    {position ? (
                      <>
                        <div className="poolSingle-block">
                          <div className="poolSingle-subtitle">Liquidity</div>
                          <div className="poolSingle-value">
                            <span>{formatNumberToDollars(totalPrice)}</span>
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
                                {percPartFirst.toFixed(2)}%
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
                                {percPartSecond.toFixed(2)}%
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
                                  {formatNumberToDollars(
                                    parseFloat(
                                      formatBigNumberToFixed(
                                        position.claimableFees.total,
                                        2
                                      )
                                    ),
                                    2
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="poolSingle-block-right">
                              <Button
                                onClick={handleClaim}
                                type="tertiary"
                                disabled={formDisabled}
                              >
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

                        <div
                          className="poolSingle-actions"
                          data-disabled={formDisabled}
                        >
                          <Button
                            link={"/pool/new"}
                            type="tertiary"
                            disabled={formDisabled}
                          >
                            Increase liquidity
                          </Button>
                          <Button
                            onClick={handleWithdraw}
                            disabled={formDisabled}
                            icon={loading && <Spinner />}
                          >
                            Remove liquidity
                          </Button>
                        </div>

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
                            <p>
                              Your withdrawal is now successfully completed.
                            </p>
                            <p className="small" style={{ marginTop: 8 }}>
                              <a href={trackingExplorer} target="_blank">
                                <small>Tx hash: {success}</small>
                              </a>
                            </p>
                          </Alert>
                        )}
                      </>
                    ) : (
                      <div className="pool-empty">
                        <div className="pool-empty-info">
                          <Spinner />
                          <div className="pool-empty-label">
                            Loading position...
                          </div>
                        </div>
                      </div>
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
