import { useEffect } from "react";

function HomeGraph() {
  const applyCss = () => {
    setTimeout(() => {
      const host = (document as any)?.querySelector(
        "coingecko-coin-compare-chart-widget"
      )?.shadowRoot;
      if (
        host == null ||
        host.querySelector(".highcharts-background") == null
      ) {
        applyCss();
        return;
      }
      const sheet = new CSSStyleSheet();
      host.adoptedStyleSheets = [sheet];
      host.querySelector(
        ".cg-container .cg-widget .cg-absolute"
      ).style.display = "none";
      host.querySelector("style").innerHTML += `
                .cg-container{border:0 !important;margin-top: -40px;}
                .highcharts-credits,
                .highcharts-scrollbar,
                .highcharts-title, 
                .highcharts-subtitle, 
                .highcharts-exporting-group{display:none!important;}
                .highcharts-yaxis-grid .highcharts-grid-line{stroke:#201b40!important;}
                .highcharts-series path{stroke:#9A23E6!important;fill:none!important;stroke-width:1px!important}
                .highcharts-tick{stroke:#897FAC!important;fill:none!important;stroke-width:1px!important;}
                .highcharts-axis-line,
                .highcharts-plot-lines-0 path{stroke:none!important;fill:none!important;stroke-width:0!important}
                .highcharts-background{fill:none!important;}
                .highcharts-button rect{stroke:#302B44!important;}
                .highcharts-button text{fill:#897FAC!important;}
                .highcharts-button-pressed rect{fill:#302B44!important;}
                .highcharts-button-pressed text{fill:#ffffff!important;}
                .highcharts-xaxis-labels{transform:translateY(4px)!important}
                .highcharts-axis-labels text{fill:#897FAC!important}
                .highcharts-halo{fill:#9A23E6!important}
                .highcharts-crosshair{stroke:#DED2FF!important}
                .highcharts-markers > *{stroke:none!important}
                .highcharts-markers > *{fill:#DED2FF!important}
                .highcharts-tooltip-box > *:not(text){fill:#201b40!important;stroke:none;!important;}
                .highcharts-tooltip-box > text{fill:#DED2FF!important;stroke:none!important;}
                .highcharts-tooltip-box > text tspan:last-child{fill:#DED2FF!important;stroke:none!important;}
            `;
    }, 10);

    setTimeout(() => {
      const property = (document as any).querySelector(".grph");
      if (property != null) {
        property.style.opacity = 1;
      }
    }, 1000);
  };
  useEffect(() => {
    const vendor = document.createElement("script");
    vendor.src =
      "https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js";
    document.body.appendChild(vendor);
    applyCss();
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: `<coingecko-coin-compare-chart-widget
        coin-ids="graphlinq-protocol"
        currency="usd"
        locale="us"
      ></coingecko-coin-compare-chart-widget>`}}></div>
    </>
  );
}

export default HomeGraph;
