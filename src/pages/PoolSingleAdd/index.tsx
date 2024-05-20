/* eslint-disable react-hooks/rules-of-hooks */
import ArrowBack from "@assets/icons/arrow-back.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import "./style.scss";
import InputNumber from "@components/InputNumber";
import TokenIcon from "@components/TokenIcon";
import { GLQ_EXPLORER_URL, SITE_NAME } from "@constants/index";
import { getPoolTokenByAddress, orderedPoolTokens } from "@constants/pooltoken";
import { tickToPrice } from "@uniswap/v3-sdk";
import {
  formatBigNumberToFixed,
  formatNumberToDollars,
  formatNumberToFixed,
  isInfinity,
} from "@utils/number";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";

import useChains from "../../composables/useChains";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import usePool from "../../composables/usePool";
import { Position, PositionStatus } from "../../model/pool";

const seoTitle = `${SITE_NAME} — Pool`;

function PoolSingleAddPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { id: positionId } = useParams();
  const { calculatePrice } = useExchangeRates();
  const {
    loadedPositionIds,
    ownPositionIds,
    increaseLiquidity,
    getPositionById,
    getPoolState,
    pending: poolPending,
    error: poolError,
    success: poolSuccess,
  } = usePool();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);

  const [currentPoolPrice, setCurrentPoolPrice] = useState(0);
  const [currentPoolPriceReversed, setCurrentPoolPriceReversed] = useState(0);

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
    if (positionId) {
      updatePosition();
    }
  }, [positionId, success]);

  const firstPoolToken = position
    ? getPoolTokenByAddress(position.pair.first.address.glq!, "glq")
    : null;
  const secondPoolToken = position
    ? getPoolTokenByAddress(position.pair.second.address.glq!, "glq")
    : null;

  const updateCurrentPoolPrice = async () => {
    if (!firstPoolToken || !secondPoolToken) {
      return;
    }

    setLoading(true);
    setFirstCurrencyAmount("");
    setSecondCurrencyAmount("");

    if (position) {
      const poolState = await getPoolState(position.poolAddress);

      if (poolState) {
        const [token0, token1] = orderedPoolTokens(
          firstPoolToken,
          secondPoolToken
        );

        const currentPrice = parseFloat(
          tickToPrice(token0, token1, poolState.tick).toSignificant()
        );
        const currentPriceReversed = parseFloat(
          tickToPrice(token1, token0, poolState.tick).toSignificant()
        );
        if (firstPoolToken.address === token0.address) {
          setCurrentPoolPrice(currentPriceReversed);
          setCurrentPoolPriceReversed(currentPrice);
        } else {
          setCurrentPoolPrice(currentPrice);
          setCurrentPoolPriceReversed(currentPriceReversed);
        }
      }
    } else {
      setCurrentPoolPrice(0);
      setCurrentPoolPriceReversed(0);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (position) {
      updateCurrentPoolPrice();
    }
  }, [position]);

  const amountFirst = position
    ? parseFloat(ethers.utils.formatEther(position!.liquidity.first))
    : 0;
  const amountSecond = position
    ? parseFloat(ethers.utils.formatEther(position!.liquidity.second))
    : 0;

  const percPartFirst =
    position && amountFirst !== 0
      ? (amountFirst * 100) / (amountSecond / position.poolCurrentPrice) / 2
      : 0;
  const percPartSecond = amountSecond !== 0 ? 100 - percPartFirst : 0;

  const hasWGLQInPosition = position
    ? [position.pair.first.name, position.pair.second.name].includes("WGLQ")
    : false;

  const WGLQTokenPosition =
    position && hasWGLQInPosition && position.pair.first.name === "WGLQ"
      ? "first"
      : "second";

  const priceFirst =
    position && hasWGLQInPosition
      ? (calculatePrice(
          WGLQTokenPosition === "first"
            ? parseFloat(ethers.utils.formatEther(position.liquidity.first))
            : parseFloat(ethers.utils.formatEther(position.liquidity.first)) *
                position.poolCurrentPrice,
          "glq",
          "number"
        ) as number)
      : 0;
  const priceSecond =
    position && hasWGLQInPosition
      ? (calculatePrice(
          WGLQTokenPosition === "second"
            ? parseFloat(ethers.utils.formatEther(position.liquidity.second))
            : parseFloat(ethers.utils.formatEther(position.liquidity.second)) *
                position.poolCurrentPrice,
          "glq",
          "number"
        ) as number)
      : 0;
  const totalPrice = priceFirst + priceSecond;

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

  const fullRange = position ? isInfinity(position.max) : false;

  const rangeMinReversedAmount = position
    ? (position.min / position.poolCurrentPrice) * currentPoolPriceReversed
    : 0;
  const rangeMaxReversedAmount = position
    ? (position.max / position.poolCurrentPrice) * currentPoolPriceReversed
    : 0;

  function calculateY(x: number) {
    if (fullRange) {
      return formatNumberToFixed(x / currentPoolPrice, 6);
    }

    const a = Math.sqrt(currentPoolPriceReversed);
    const b = Math.sqrt(rangeMinReversedAmount);
    const c = Math.sqrt(rangeMaxReversedAmount);

    const L = (x * a * c) / (c - a);
    const y = L * (a - b);
    return formatNumberToFixed(y, 6);
  }

  function calculateX(y: number) {
    if (fullRange) {
      return formatNumberToFixed(y / currentPoolPriceReversed, 6);
    }

    const a = Math.sqrt(currentPoolPriceReversed);
    const b = Math.sqrt(rangeMinReversedAmount);
    const c = Math.sqrt(rangeMaxReversedAmount);

    const L = y / (a - b);
    const x = (L * (c - a)) / (a * c);
    return formatNumberToFixed(x, 6);
  }

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
    if (!position) return;

    if (parseFloat(firstCurrencyBalance) < parseFloat(firstCurrencyAmount)) {
      setPending("");
      setError(
        `You only have ${formatNumberToFixed(
          parseFloat(firstCurrencyBalance),
          6
        )} ${position.pair.first.name} in your wallet.`
      );
      setLoading(false);
      return;
    }

    if (parseFloat(secondCurrencyBalance) < parseFloat(secondCurrencyAmount)) {
      setPending("");
      setError(
        `You only have ${formatNumberToFixed(
          parseFloat(secondCurrencyBalance),
          6
        )} ${position.pair.second.name} in your wallet.`
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    await increaseLiquidity(
      position,
      firstCurrencyAmount,
      secondCurrencyAmount
    );
    setLoading(false);
  };

  const trackingExplorer = `${GLQ_EXPLORER_URL}/tx/${success}`;

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
                    <TokenIcon tokenKey={position.pair.first.name} />
                    <TokenIcon tokenKey={position.pair.second.name} />
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
                                <TokenIcon
                                  tokenKey={position.pair.first.name}
                                />
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
                                <TokenIcon
                                  tokenKey={position.pair.second.name}
                                />
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
                                {position.pair.second.name} per{" "}
                                {position.pair.first.name}
                              </div>
                            </div>

                            <div className="poolSingleAdd-block-right">
                              <div className="poolSingleAdd-status">
                                <div
                                  className="pool-list-item-status-dot"
                                  data-status={position.status}
                                ></div>
                                {position.status === PositionStatus.IN_RANGE
                                  ? "In range"
                                  : "Out of range"}
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
                            {position.pair.second.name} per{" "}
                            {position.pair.first.name}
                          </div>
                        </div>

                        {isPersonalPosition && (
                          <>
                            <div className="poolNew-block">
                              <div className="poolNew-block-title">
                                Amount to deposit
                              </div>
                              <div className="poolNew-block-content poolNew-amounts">
                                <div className="poolNew-amounts-swap">
                                  <div className="poolNew-amounts-swap-input">
                                    <InputNumber
                                      icon={
                                        <TokenIcon
                                          tokenKey={position.pair.first.name}
                                        />
                                      }
                                      currencyText={position.pair.first.name}
                                      value={firstCurrencyAmount}
                                      max={Infinity}
                                      onChange={(val) => {
                                        setFirstCurrencyAmount(val);
                                        setSecondCurrencyAmount(
                                          calculateY(parseFloat(val))
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="poolNew-amounts-swap-actions">
                                    <Button
                                      onClick={() => {
                                        if (firstCurrencyBalance) {
                                          const val = formatNumberToFixed(
                                            parseFloat(firstCurrencyBalance) /
                                              4,
                                            6
                                          );
                                          setFirstCurrencyAmount(val);
                                          setSecondCurrencyAmount(
                                            calculateY(parseFloat(val))
                                          );
                                        }
                                      }}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        if (firstCurrencyBalance) {
                                          const val = formatNumberToFixed(
                                            parseFloat(firstCurrencyBalance) /
                                              2,
                                            6
                                          );
                                          setFirstCurrencyAmount(val);
                                          setSecondCurrencyAmount(
                                            calculateY(parseFloat(val))
                                          );
                                        }
                                      }}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        if (firstCurrencyBalance) {
                                          const val = formatNumberToFixed(
                                            parseFloat(firstCurrencyBalance),
                                            6
                                          );
                                          setFirstCurrencyAmount(val);
                                          setSecondCurrencyAmount(
                                            calculateY(parseFloat(val))
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
                                      icon={
                                        <TokenIcon
                                          tokenKey={position.pair.second.name}
                                        />
                                      }
                                      currencyText={position.pair.second.name}
                                      value={secondCurrencyAmount}
                                      max={Infinity}
                                      onChange={(val) => {
                                        setSecondCurrencyAmount(val);
                                        setFirstCurrencyAmount(
                                          calculateX(parseFloat(val))
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="poolNew-amounts-swap-actions">
                                    <Button
                                      onClick={() => {
                                        if (secondCurrencyBalance) {
                                          const val = formatNumberToFixed(
                                            parseFloat(secondCurrencyBalance) /
                                              4,
                                            6
                                          );
                                          setSecondCurrencyAmount(val);
                                          setFirstCurrencyAmount(
                                            calculateX(parseFloat(val))
                                          );
                                        }
                                      }}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        if (secondCurrencyBalance) {
                                          const val = formatNumberToFixed(
                                            parseFloat(secondCurrencyBalance) /
                                              2,
                                            6
                                          );
                                          setSecondCurrencyAmount(val);
                                          setFirstCurrencyAmount(
                                            calculateX(parseFloat(val))
                                          );
                                        }
                                      }}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        if (secondCurrencyBalance) {
                                          const val = formatNumberToFixed(
                                            parseFloat(secondCurrencyBalance),
                                            6
                                          );
                                          setSecondCurrencyAmount(val);
                                          setFirstCurrencyAmount(
                                            calculateX(parseFloat(val))
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
                          </>
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
                            <p>Your liquidity is now successfully added.</p>
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
