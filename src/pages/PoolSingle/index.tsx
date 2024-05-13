/* eslint-disable react-hooks/rules-of-hooks */
import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Canceled from "@assets/icons/canceled.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import "./style.scss";
import Popin from "@components/Popin";
import TokenIcon from "@components/TokenIcon";
import { GLQ_EXPLORER_URL, SITE_NAME } from "@constants/index";
import {
  formatBigNumberToFixed,
  formatNumberToDollars,
  formatNumberToFixed,
  isInfinity,
} from "@utils/number";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InputRange from "react-input-range";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";
import { Position, PositionStatus } from "../../model/pool";
import "react-input-range/lib/css/index.css";

const seoTitle = `${SITE_NAME} — Pool`;

function PoolSinglePage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { id: positionId } = useParams();
  const { calculatePrice } = useExchangeRates();
  const {
    getPositionById,
    loadedPositionIds,
    ownPositionIds,
    withdrawLiquidity,
    claimFees,
    pending: poolPending,
    error: poolError,
    success: poolSuccess,
  } = usePool();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [isWithdrawPopinOpen, setWithdrawPopinOpen] = useState(false);
  const [withdrawPerc, setWithdrawPerc] = useState(100);

  const updatePosition = async () => {
    if (!positionId) {
      return;
    }

    const tempPosition = await getPositionById(positionId);
    if (tempPosition) {
      setPosition(tempPosition);
    }
  };

  useEffect(() => {
    if (positionId && !isWithdrawPopinOpen) {
      updatePosition();
    }
  }, [positionId, isWithdrawPopinOpen]);

  const priceFirst = position
    ? (calculatePrice(
        parseFloat(ethers.utils.formatEther(position.liquidity.first)),
        "glq", // TODO Dynamiser
        "number"
      ) as number)
    : 0;
  const priceSecond = position
    ? (calculatePrice(
        parseFloat(ethers.utils.formatEther(position.liquidity.second)),
        "eth", // TODO Dynamiser
        "number"
      ) as number)
    : 0;
  const totalPrice = priceFirst + priceSecond;
  // const percPartFirst = totalPrice !== 0 ? (priceFirst / totalPrice) * 100 : 0;
  // const percPartSecond =
  //   totalPrice !== 0 ? (priceSecond / totalPrice) * 100 : 0;

  //     50/23134.9 = 0.00216123692
  // Quantité WETH * 100 / 0.00216123692
  // (0.002160 * 100 / 0.00216123692) / 2 = 49.9xxxx

  const amountFirst = position
    ? parseFloat(ethers.utils.formatEther(position!.liquidity.first))
    : 0;
  const amountSecond = position
    ? parseFloat(ethers.utils.formatEther(position!.liquidity.second))
    : 0;
  const percPartSecond = position
    ? (amountSecond * 100) / (amountFirst / position.poolCurrentPrice) / 2
    : 0;
  const percPartFirst = 100 - percPartSecond;

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
      await withdrawLiquidity(position, withdrawPerc);
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

  const trackingExplorer = `${GLQ_EXPLORER_URL}/tx/${success}`;

  const feesFirst = position
    ? (calculatePrice(
        parseFloat(ethers.utils.formatEther(position.claimableFees.first)),
        "glq",
        "number"
      ) as number)
    : 0;
  const feesSecond = position
    ? (calculatePrice(
        parseFloat(ethers.utils.formatEther(position.claimableFees.second)),
        "eth",
        "number"
      ) as number)
    : 0;
  const totalFees = feesFirst + feesSecond;

  const isPersonalPosition =
    loadedPositionIds && positionId && ownPositionIds.includes(positionId);

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
                    <TokenIcon tokenKey={position.pair.first.name} />
                    <TokenIcon tokenKey={position.pair.second.name} />
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
                                <TokenIcon
                                  tokenKey={position.pair.first.name}
                                />
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
                                <TokenIcon
                                  tokenKey={position.pair.second.name}
                                />
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
                                <span>{formatNumberToDollars(totalFees)}</span>
                              </div>
                            </div>

                            <div className="poolSingle-block-right">
                              {isPersonalPosition && (
                                <Button
                                  onClick={handleClaim}
                                  type="tertiary"
                                  disabled={formDisabled}
                                >
                                  Collect fees
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="poolSingle-table">
                            <div className="poolSingle-table-row">
                              <div className="poolSingle-table-col">
                                <TokenIcon
                                  tokenKey={position.pair.first.name}
                                />
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
                                <TokenIcon
                                  tokenKey={position.pair.second.name}
                                />
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
                                    {isInfinity(position.max)
                                      ? "∞"
                                      : formatNumberToFixed(position.max, 6)}
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
                        {isPersonalPosition && (
                          <div
                            className="poolSingle-actions"
                            data-disabled={formDisabled}
                          >
                            <Button
                              link={`/pool/${positionId}/add`}
                              type="tertiary"
                              disabled={formDisabled}
                            >
                              Increase liquidity
                            </Button>
                            <Button
                              onClick={() => setWithdrawPopinOpen(true)}
                              disabled={formDisabled}
                              icon={loading && <Spinner />}
                            >
                              Remove liquidity
                            </Button>
                          </div>
                        )}
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
                        {isWithdrawPopinOpen && (
                          <Popin
                            title="Remove liquidity"
                            onClose={() => setWithdrawPopinOpen(false)}
                          >
                            <div className="poolSingle-block">
                              <div className="poolSingle-subtitle">Amount</div>
                              <div className="poolSingle-value">
                                <span>{withdrawPerc} %</span>
                              </div>
                              <InputRange
                                step={1}
                                value={withdrawPerc}
                                minValue={1}
                                maxValue={100}
                                onChange={(value) =>
                                  setWithdrawPerc(value as number)
                                }
                              />
                              <div className="popin-actions">
                                <Button
                                  onClick={handleWithdraw}
                                  disabled={formDisabled}
                                  icon={loading && <Spinner />}
                                >
                                  Remove
                                </Button>
                              </div>

                              {(error || pending || success) && (
                                <div className="popin-alert">
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
                                        Your withdrawal is now successfully
                                        completed.
                                      </p>
                                      <p
                                        className="small"
                                        style={{ marginTop: 8 }}
                                      >
                                        <a
                                          href={trackingExplorer}
                                          target="_blank"
                                        >
                                          <small>Tx hash: {success}</small>
                                        </a>
                                      </p>
                                    </Alert>
                                  )}
                                </div>
                              )}
                            </div>
                          </Popin>
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
