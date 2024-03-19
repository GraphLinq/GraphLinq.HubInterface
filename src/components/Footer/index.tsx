import "./_footer.scss";
import Arrow from "@assets/icons/arrow.svg?react";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Network from "@assets/icons/network.svg?react";
import Button from "@components/Button";

import useAddTokens from "../../composables/useAddTokens";
import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";

function Footer() {
  const { addWETHToken, addWGLQToken } = useAddTokens();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { isGLQChain } = useChains();

  return (
    <footer className="footer">
      <div className="footer-more">
        <a href="https://graphlinq.io/" target="_blank">
          Want to know more about GraphLinq ?
        </a>
      </div>
      <div className="footer-add">
        <p>Here you can add GraphLinq chains and tokens.</p>
        <div className="footer-add-row">
          <div className="footer-add-col">
            <div className="footer-add-col-title">
              Tokens
              <Arrow />
            </div>
            <div className="footer-add-col-actions">
              <Button
                onClick={addWGLQToken}
                icon={<GLQToken />}
                type="secondary"
              >
                {isGLQChain ? "WGLQ" : "GLQ"}
              </Button>
              {isGLQChain && (
                <Button
                  onClick={addWETHToken}
                  icon={<ETHToken />}
                  type="secondary"
                >
                  WETH
                </Button>
              )}
            </div>
          </div>
          <div className="footer-add-col">
            <div className="footer-add-col-title">
              Network
              <Arrow />
            </div>
            <div className="footer-add-col-actions">
              <Button
                onClick={switchToGraphLinqMainnet}
                icon={<Network />}
                type="secondary"
              >
                GLQ Chain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
