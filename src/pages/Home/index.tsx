import "./style.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import Info from "@assets/icons/info.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap-coin.svg?react";
import HomeGraph from "@components/HomeGraph";
import { GLQ_EXPLORER_URL } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { formatNumberToDollars, formatNumberToFixed } from "@utils/number";
import { formatDistanceToNow } from "date-fns";

import { getDashboardInformation } from "../../queries/api";
import SEO from "@components/SEO";

const seoTitle = "GraphLinq Chain Hub | Complete GLQ Resource";
const seoDesc =
  "Our GraphLinq hub is a treasure trove of information that includes all the GLQ tools you will ever need.";

function HomePage() {
  const qDashboardInformation = useQuery({
    queryKey: ["dashboardInformation"],
    queryFn: getDashboardInformation,
    refetchInterval: 60000,
  });

  const glqPriceEvolution = qDashboardInformation.data
    ? parseFloat(qDashboardInformation.data.analytics.closePrice) -
      parseFloat(qDashboardInformation.data.analytics.entryPrice)
    : 0;
  const glqPriceEvolutionPerc = qDashboardInformation.data
    ? (glqPriceEvolution /
        parseFloat(qDashboardInformation.data.analytics.entryPrice)) *
      100
    : 0;
  const glqPriceEvolutionColor = glqPriceEvolution >= 0 ? "green" : "red";

  const handleOpenTx = (hash: string) => {
    const explorerUrl = `${GLQ_EXPLORER_URL}/tx/${hash}`;
    window.open(explorerUrl, "_blank");
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <div className="main-page home">
        <div className="home-bubbles">
          <div className="home-bubble" data-gradient="1">
            <div className="home-bubble-value">
              {qDashboardInformation.isLoading && <Spinner />}
              {qDashboardInformation.data?.stakingTVL &&
                formatNumberToDollars(
                  parseFloat(qDashboardInformation.data?.stakingTVL),
                  2
                )}
            </div>
            <div className="home-bubble-label">
              <span>Total Value Locked</span>
              <Info />
            </div>
            <div className="home-bubble-tooltip">
              Total Value Locked (TVL) represents the total worth of assets
              locked in the GLQ Chain, reflecting the level of user engagement
              and economic activity on the GLQ Chain
            </div>
          </div>
          <div className="home-bubble" data-gradient="2">
            <div className="home-bubble-value">
              {qDashboardInformation.isLoading && <Spinner />}

              {qDashboardInformation.data?.totalLiquidAssetsOnChain &&
                formatNumberToDollars(
                  parseFloat(
                    qDashboardInformation.data?.totalLiquidAssetsOnChain
                  ),
                  2
                )}
            </div>
            <div className="home-bubble-label">
              <span>Total On-Chain Liquid Assets</span>
              <Info />
            </div>
            <div className="home-bubble-tooltip">
              Total On-Chain Liquid Assets refers to the combined value of
              liquid assets held directly on the GLQ Chain, showcasing the
              available funds for immediate use or transactions.
            </div>
          </div>
          <div className="home-bubble">
            <div className="home-bubble-value">
              {qDashboardInformation.isLoading && <Spinner />}

              {qDashboardInformation.data?.analytics.volume &&
                formatNumberToDollars(
                  parseFloat(qDashboardInformation.data?.analytics.volume),
                  2
                )}
            </div>
            <div className="home-bubble-label">24h WGLQ swap</div>
          </div>
          <div className="home-bubble">
            <div className="home-bubble-value">
              {qDashboardInformation.isLoading && <Spinner />}

              {qDashboardInformation.data?.preferedPool}
            </div>
            <div className="home-bubble-label">Preferred pool</div>
          </div>
        </div>
        <div className="home-wrapper">
          <div className="home-left">
            <div className="main-card">
              <div className="main-card-title">Current evolution</div>
              <div className="main-card-content">
                <div className="home-stats">
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {qDashboardInformation.isLoading && <Spinner />}

                      {qDashboardInformation.data?.analytics.closePrice &&
                        formatNumberToDollars(
                          parseFloat(
                            qDashboardInformation.data?.analytics.closePrice
                          ),
                          6
                        )}
                    </div>
                    <div
                      className="home-stat-label"
                      data-color={glqPriceEvolutionColor}
                    >
                      <Arrow />
                      {glqPriceEvolutionPerc.toFixed(2)}% (
                      {formatNumberToDollars(glqPriceEvolution, 4)})
                    </div>
                  </div>
                  <div className="home-stats-sep"></div>
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {qDashboardInformation.isLoading && <Spinner />}

                      {qDashboardInformation.data?.analytics.highPrice &&
                        formatNumberToDollars(
                          qDashboardInformation.data?.analytics.highPrice
                        )}
                    </div>
                    <div className="home-stat-label">24h high</div>
                  </div>
                  <div className="home-stats-sep"></div>
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {qDashboardInformation.isLoading && <Spinner />}

                      {qDashboardInformation.data?.analytics.lowPrice &&
                        formatNumberToDollars(
                          qDashboardInformation.data?.analytics.lowPrice
                        )}
                    </div>
                    <div className="home-stat-label">24h low</div>
                  </div>
                  <div className="home-stats-sep"></div>
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {qDashboardInformation.isLoading && <Spinner />}

                      {qDashboardInformation.data?.analytics.volume &&
                        formatNumberToDollars(
                          parseFloat(
                            qDashboardInformation.data?.analytics.volume
                          ),
                          2
                        )}
                    </div>
                    <div className="home-stat-label">24h volume</div>
                  </div>
                </div>
                <HomeGraph />
              </div>
            </div>
          </div>
          <div className="home-right">
            <div className="main-card">
              <div className="main-card-title">Last transactions</div>
              <div className="main-card-content home-tx">
                {qDashboardInformation.isLoading && <Spinner />}

                {qDashboardInformation.data &&
                  qDashboardInformation.data.swaps.length > 0 && (
                    <table className="home-tx-table">
                      <thead>
                        <tr>
                          <th data-type></th>
                          <th data-date>Date</th>
                          <th data-pair>Pair</th>
                          <th data-value>Value</th>
                          <th data-gasprice>Gas price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...qDashboardInformation.data.swaps]
                          .reverse()
                          .map((swap, key) => (
                            <tr
                              key={key}
                              onClick={() => handleOpenTx(swap.hash)}
                            >
                              <td data-type={swap.type}>
                                <Swap />
                              </td>
                              <td data-date>
                                {formatDistanceToNow(
                                  new Date(swap.timestamp * 1000),
                                  { addSuffix: true }
                                )}
                              </td>
                              <td data-pair>{swap.pool}</td>
                              <td data-value>
                                {formatNumberToFixed(
                                  parseFloat(swap.amount1.amount),
                                  2
                                )}{" "}
                                {swap.amount1.currency}
                              </td>
                              <td data-gasprice>
                                {formatNumberToDollars(
                                  parseFloat(swap.gasCostUsed)
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                {(!qDashboardInformation.data ||
                  qDashboardInformation.data.swaps.length === 0) &&
                  !qDashboardInformation.isLoading && (
                    <p className="home-empty">
                      No transactions available at the moment.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
