import Button from "@components/Button";
import "./_home.scss";
import { SITE_NAME } from "@constants/index";
import { Helmet } from "react-helmet-async";
import Bridge from "@assets/icons/bridge.svg?react";
import Swap from "@assets/icons/swap-coin.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Home</title>
      </Helmet>
      <div className="main-page home">
        <div className="main-card">
          <div className="main-card-title">Dashboard</div>
          <div className="main-card-content">
            <div className="main-card-desc">
              Welcome to the <b>GraphLinq Hub</b>!
              <div className="main-card-desc-highlight">
                This is the main place for any activity within the GraphLinq Chain.
              </div>

              <div className="home-actions">
                <Button link="/bridge" icon={<Bridge/>}>Bridge</Button>
                <Button link="/swap" icon={<Swap/>}>Swap</Button>
              </div>

              <div className="home-more">
                <p>Want to know more about GraphLinq ?</p>
                <Button link="https://graphlinq.io/" icon={<GLQToken/>} target="_blank">Learn more</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
