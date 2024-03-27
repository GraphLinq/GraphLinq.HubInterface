import "./_homeGraph.scss";
import { useEffect } from "react";

function HomeGraph() {
  useEffect(() => {
    const vendor = document.createElement("script");
    vendor.src = "https://static.coinstats.app/widgets/coin-chart-widget.js";
    document.body.appendChild(vendor);
  }, []);
  return (
    <>
      <div
        className="homeGraph"
        dangerouslySetInnerHTML={{
          __html: `<coin-stats-chart-widget type="medium" coin-id="graphlinq-protocol" width="650" chart-height="300" currency="USD" locale="en" bg-color="rgba(48,43,68,0.2)" text-color="#897FAC" status-up-color="#69FFA5" status-down-color="#ff4935" buttons-color="rgba(255,255,255,0)" chart-color="#9A23E6" chart-gradient-from="rgba(154,35,230,0.2)" chart-gradient-to="rgba(85,25,238,0.2)" chart-label-background="#302B44" candle-grids-color="#302B44" border-color="rgba(255,255,255,0)" font="Roboto, Arial, Helvetica" btc-color="#F7931A" eth-color="#627EEA"></coin-stats-chart-widget>`,
        }}
      ></div>
    </>
  );
}

export default HomeGraph;
