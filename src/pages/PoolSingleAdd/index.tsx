/* eslint-disable react-hooks/rules-of-hooks */
import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Canceled from "@assets/icons/canceled.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import "./style.scss";
import InputNumber from "@components/InputNumber";
import { GLQ_EXPLORER, SITE_NAME } from "@constants/index";
import {
  formatBigNumberToFixed,
  formatNumberToDollars,
  formatNumberToFixed,
} from "@utils/number";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";

import useChains from "../../composables/useChains";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";
import { PositionStatus } from "../../model/pool";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

const seoTitle = `${SITE_NAME} — Pool`;

function PoolSingleAddPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { id: positionId } = useParams();
  const { calculatePrice } = useExchangeRates();
  const {
    increaseLiquidity,
    loadedPositions,
    ownPositions,
    ownPositionIds,
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
    return;
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

  const totalPrice = priceFirst + priceSecond;
  const percPartFirst = totalPrice !== 0 ? (priceFirst / totalPrice) * 100 : 0;
  const percPartSecond =
    totalPrice !== 0 ? (priceSecond / totalPrice) * 100 : 0;

  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState("");
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState("");

  const { data: firstCurrencyBalanceRaw } = useBalance({
    address: account,
    token: position?.pair.first.address.glq,
  });
  const firstCurrencyBalance = firstCurrencyBalanceRaw?.value
    ? ethers.utils.formatEther(firstCurrencyBalanceRaw?.value)
    : "0";
  const { data: secondCurrencyBalanceRaw } = useBalance({
    address: account,
    token: position?.pair.second.address.glq,
  });
  const secondCurrencyBalance = secondCurrencyBalanceRaw?.value
    ? ethers.utils.formatEther(secondCurrencyBalanceRaw?.value)
    : "0";

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
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

  const handleSubmit = async () => {
    if (position) {
      await increaseLiquidity(
        position,
        firstCurrencyAmount,
        secondCurrencyAmount
      );
    }
  };

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
          <div className="poolSingleAdd-header">
            <Button
              link={`/pool/${positionId}`}
              type="tertiary"
              icon={<ArrowBack />}
            >
              Back
            </Button>
            {position ? (
              <>
                <div className="poolSingleAdd-header-infos">
                  <div className="poolSingleAdd-header-icons">
                    {tokenIcons[position.pair.first.name]}
                    {tokenIcons[position.pair.second.name]}
                  </div>
                  <div className="poolSingleAdd-header-pair">
                    <span>{position.pair.first.name}</span>/
                    <span>{position.pair.second.name}</span>
                  </div>
                  <div className="poolSingleAdd-header-fees">
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
                        <div className="poolSingleAdd-block">
                          <div className="poolSingleAdd-subtitle">
                            Liquidity
                          </div>
                          <div className="poolSingleAdd-value">
                            <span>{formatNumberToDollars(totalPrice)}</span>
                          </div>
                          <div className="poolSingleAdd-table">
                            <div className="poolSingleAdd-table-row">
                              <div className="poolSingleAdd-table-col">
                                {tokenIcons[position.pair.first.name]}
                                <span>{position.pair.first.name}</span>
                              </div>
                              <div className="poolSingleAdd-table-col">
                                <span>
                                  {formatBigNumberToFixed(
                                    position.liquidity.first,
                                    6
                                  )}
                                </span>
                                {percPartFirst.toFixed(2)}%
                              </div>
                            </div>
                            <div className="poolSingleAdd-table-row">
                              <div className="poolSingleAdd-table-col">
                                {tokenIcons[position.pair.second.name]}
                                <span>{position.pair.second.name}</span>
                              </div>
                              <div className="poolSingleAdd-table-col">
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

                        <div className="poolSingleAdd-block">
                          <div className="poolSingleAdd-block-header">
                            <div className="poolSingleAdd-block-left">
                              <div className="poolSingleAdd-subtitle">
                                <span>Price range</span>
                                {position.pair.first.name} per{" "}
                                {position.pair.second.name}
                              </div>
                            </div>

                            <div className="poolSingleAdd-block-right">
                              <div className="poolSingleAdd-status">
                                {position.status ===
                                  PositionStatus.IN_RANGE && (
                                  <>
                                    <div className="poolSingleAdd-status-dot"></div>
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

                          <div className="poolSingleAdd-table">
                            <div className="poolSingleAdd-range">
                              <div className="poolSingleAdd-range-col">
                                <div>
                                  <span>
                                    {formatNumberToFixed(position.min, 6)}
                                  </span>
                                </div>
                                <div>Low price</div>
                              </div>
                              <div className="poolSingleAdd-range-col">
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

                        <div className="poolSingleAdd-block">
                          <div className="poolSingleAdd-subtitle">
                            Current price
                          </div>
                          <div className="poolSingleAdd-value">
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

                        <div className="poolNew-block">
                          <div className="poolNew-block-title">
                            Amount to deposit
                          </div>
                          <div className="poolNew-block-content poolNew-amounts">
                            <div className="poolNew-amounts-swap">
                              <div className="poolNew-amounts-swap-input">
                                <InputNumber
                                  icon={tokenIcons[position.pair.first.name]}
                                  currencyText={position.pair.first.name}
                                  value={firstCurrencyAmount}
                                  max={
                                    firstCurrencyBalance
                                      ? parseFloat(firstCurrencyBalance)
                                      : 0
                                  }
                                  onChange={(val) => {
                                    setFirstCurrencyAmount(val);
                                    setSecondCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(val) / position.max,
                                        6
                                      )
                                    );
                                  }}
                                />
                              </div>
                              <div className="poolNew-amounts-swap-actions">
                                <Button
                                  onClick={() => {
                                    if (firstCurrencyBalance) {
                                      setFirstCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(firstCurrencyBalance) / 4,
                                          6
                                        )
                                      );
                                      setSecondCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(firstCurrencyBalance) /
                                            4 /
                                            position.max,
                                          6
                                        )
                                      );
                                    }
                                  }}
                                >
                                  25%
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (firstCurrencyBalance) {
                                      setFirstCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(firstCurrencyBalance) / 2,
                                          6
                                        )
                                      );

                                      setSecondCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(firstCurrencyBalance) /
                                            2 /
                                            position.max,
                                          6
                                        )
                                      );
                                    }
                                  }}
                                >
                                  50%
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (firstCurrencyBalance) {
                                      setFirstCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(firstCurrencyBalance),
                                          6
                                        )
                                      );

                                      setSecondCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(firstCurrencyBalance) /
                                            position.max,
                                          6
                                        )
                                      );
                                    }
                                  }}
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                            <div className="poolNew-amounts-equal">=</div>
                            <div className="poolNew-amounts-swap">
                              <div className="poolNew-amounts-swap-input">
                                <InputNumber
                                  icon={tokenIcons[position.pair.second.name]}
                                  currencyText={position.pair.second.name}
                                  value={secondCurrencyAmount}
                                  max={
                                    secondCurrencyBalance
                                      ? parseFloat(secondCurrencyBalance)
                                      : 0
                                  }
                                  onChange={(val) => {
                                    setSecondCurrencyAmount(val);
                                    setFirstCurrencyAmount(
                                      formatNumberToFixed(
                                        parseFloat(val) * position.max,
                                        6
                                      )
                                    );
                                  }}
                                />
                              </div>
                              <div className="poolNew-amounts-swap-actions">
                                <Button
                                  onClick={() => {
                                    if (firstCurrencyBalance) {
                                      setSecondCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(secondCurrencyBalance) / 4,
                                          6
                                        )
                                      );

                                      setFirstCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(secondCurrencyBalance) /
                                            4 /
                                            position.max,
                                          6
                                        )
                                      );
                                    }
                                  }}
                                >
                                  25%
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (firstCurrencyBalance) {
                                      setSecondCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(secondCurrencyBalance) / 2,
                                          6
                                        )
                                      );
                                      setFirstCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(secondCurrencyBalance) /
                                            2 /
                                            position.max,
                                          6
                                        )
                                      );
                                    }
                                  }}
                                >
                                  50%
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (firstCurrencyBalance) {
                                      setSecondCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(secondCurrencyBalance),
                                          6
                                        )
                                      );
                                      setFirstCurrencyAmount(
                                        formatNumberToFixed(
                                          parseFloat(secondCurrencyBalance) /
                                            position.max,
                                          6
                                        )
                                      );
                                    }
                                  }}
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="poolNew-submit">
                          <Button
                            onClick={handleSubmit}
                            icon={loading && <Spinner />}
                          >
                            Add liquidity
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

export default PoolSingleAddPage;
