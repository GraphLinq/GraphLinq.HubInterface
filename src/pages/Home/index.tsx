import "./_home.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import Bridge from "@assets/icons/bridge.svg?react";
import Swap from "@assets/icons/swap-coin.svg?react";
import HomeGraph from "@components/HomeGraph";
import { SITE_NAME } from "@constants/index";
import { formatNumberToDollars } from "@utils/number";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function HomePage() {


  const [glqPrice] = useState("208.4546466");
  const [glqPreviousPrice] = useState("203.79893566");

  const glqPriceEvolution = parseFloat(glqPrice) - parseFloat(glqPreviousPrice);
  const glqPriceEvolutionPerc =
    (glqPriceEvolution / parseFloat(glqPreviousPrice)) * 100;
  const glqPriceEvolutionColor = glqPriceEvolution > 0 ? "green" : "red";

  const [glqPriceHigh] = useState("318.4878163");
  const [glqPriceLow] = useState("192.9766984");
  const [glqPriceVolume] = useState("192976516");

  const [tvlPrice] = useState("2146008");
  const [totalSwap] = useState("7699854");
  const [preferredPool] = useState("WETH/WGLQ");

  const [lastTx] = useState([
    {
      type: "swap",
      date: new Date(),
      pair: "ETH/WETH",
      value: "2000 ETH",
      gasPrice: "1.5",
    },
    {
      type: "bridge",
      date: new Date(),
      pair: "GLQ/WGLQ",
      value: "15000 GLQ",
      gasPrice: "1.3",
    },
    {
      type: "swap",
      date: new Date(),
      pair: "BTC/ETH",
      value: "3000 BTC",
      gasPrice: "1.6",
    },
    {
      type: "swap",
      date: new Date(),
      pair: "XRP/USD",
      value: "5000 XRP",
      gasPrice: "1.5",
    },
    {
      type: "bridge",
      date: new Date(),
      pair: "BNB/WBNB",
      value: "8000 BNB",
      gasPrice: "1.4",
    },
    {
      type: "bridge",
      date: new Date(),
      pair: "DOT/GBP",
      value: "6000 DOT",
      gasPrice: "1.4",
    },
    {
      type: "bridge",
      date: new Date(),
      pair: "LTC/USD",
      value: "7000 LTC",
      gasPrice: "1.3",
    },
    {
      type: "swap",
      date: new Date(),
      pair: "ADA/EUR",
      value: "4000 ADA",
      gasPrice: "1.6",
    },
  ]);

  const dateFormatterUS = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Home</title>
      </Helmet>
      <div className="main-page home">
        <div className="home-wrapper">
          <div className="home-left">
            <div className="home-bubbles">
              <div className="home-bubble" data-gradient="1">
                <div className="home-bubble-value">
                  {formatNumberToDollars(parseFloat(tvlPrice), 2)}
                </div>
                <div className="home-bubble-label">Total Value Locked</div>
              </div>
              <div className="home-bubble" data-gradient="2">
                <div className="home-bubble-value">
                  {parseFloat(totalSwap).toLocaleString("en-US")}
                </div>
                <div className="home-bubble-label">24h WGLQ swap</div>
              </div>
              <div className="home-bubble">
                <div className="home-bubble-value">{preferredPool}</div>
                <div className="home-bubble-label">Preferred pool</div>
              </div>
            </div>
            <div className="main-card">
              <div className="main-card-title">Current evolution</div>
              <div className="main-card-content">
                <div className="home-stats">
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {formatNumberToDollars(parseFloat(glqPrice))}
                    </div>
                    <div
                      className="home-stat-label"
                      data-color={glqPriceEvolutionColor}
                    >
                      <Arrow />
                      {glqPriceEvolutionPerc.toFixed(2)}% (
                      {formatNumberToDollars(glqPriceEvolution, 2)})
                    </div>
                  </div>
                  <div className="home-stats-sep"></div>
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {formatNumberToDollars(parseFloat(glqPriceHigh))}
                    </div>
                    <div className="home-stat-label">24h high</div>
                  </div>
                  <div className="home-stats-sep"></div>
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {formatNumberToDollars(parseFloat(glqPriceLow))}
                    </div>
                    <div className="home-stat-label">24h low</div>
                  </div>
                  <div className="home-stats-sep"></div>
                  <div className="home-stat">
                    <div className="home-stat-value">
                      {formatNumberToDollars(parseFloat(glqPriceVolume), 2)}
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
                <table className="home-tx-table">
                  <thead>
                    <th data-type></th>
                    <th data-date>Date</th>
                    <th data-pair>Pair</th>
                    <th data-value>Value</th>
                    <th data-gasprice>Gas price</th>
                  </thead>
                  <tbody>
                    {lastTx.map((tx) => (
                      <tr>
                        <td data-type={tx.type}>
                          {tx.type === "swap" ? <Swap /> : <Bridge />}
                        </td>
                        <td data-date>{dateFormatterUS.format(tx.date)}</td>
                        <td data-pair>{tx.pair}</td>
                        <td data-value>{tx.value}</td>
                        <td data-gasprice>
                          {formatNumberToDollars(parseFloat(tx.gasPrice))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default HomePage;
