import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import "./_wrapper.scss";
import { GLQ_TOKEN, SITE_NAME, WGLQ_TOKEN } from "@constants/index";
import { formatNumberToFixed } from "@utils/number";
import { ethers } from "ethers";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount, useBalance } from "wagmi";
import Spinner from "@assets/icons/spinner.svg?react";

function WrapperPage() {
  const { address: account } = useAccount();

  const [error] = useState("");
  const [pending] = useState("");
  const [success] = useState("");

  const [loading] = useState(false);
  const [formDisabled] = useState(false);

  const {
    data: glqBalanceRaw,
    isLoading: loadingGLQBalance,
  } = useBalance({
    address: account,
  });
  const glqBalance = glqBalanceRaw?.value
    ? ethers.utils.formatEther(glqBalanceRaw?.value)
    : "0";

  const [glqAmount, setGLQAmount] = useState("");

  const handleWrap = () => {};


  const {
    data: wglqBalanceRaw,
    isLoading: loadingWGLQBalance,
  } = useBalance({
    address: account,
    token: WGLQ_TOKEN.address.glq
  });
  const wglqBalance = wglqBalanceRaw?.value
    ? ethers.utils.formatEther(wglqBalanceRaw?.value)
    : "0";

  const [wglqAmount, setWGLQAmount] = useState("");

  const handleUnwrap = () => {};

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Wrapper</title>
      </Helmet>
      <div className="main-page wrapper">
        <div className="main-card">
          <div className="main-card-title">Wrapper</div>
          <div className="main-card-content">
            <div className="main-card-desc">
              To trade on the GLQ Chain, GLQ tokens need to be wrapped into
              WGLQ, as native GLQ cannot be directly exchanged.
            </div>
          </div>

          <div className="wrapper-amount">
            {/* GLQ Amount */}
            <div
              className="wrapper-amount-wrap"
              data-disabled={formDisabled || loadingGLQBalance}
            >
              <div className="wrapper-amount-subtitle">Available</div>
              <div className="wrapper-amount-value">
                {glqBalance && (
                  <span>{formatNumberToFixed(parseFloat(glqBalance), 6)}</span>
                )}
                {GLQ_TOKEN.name}
              </div>
              <div className="wrapper-amount-swap">
                <div className="wrapper-amount-swap-input">
                  <InputNumber
                    icon={GLQ_TOKEN.icon}
                    currencyText={GLQ_TOKEN.name}
                    value={glqAmount}
                    max={glqBalance ? parseFloat(glqBalance) : 0}
                    onChange={(val) => setGLQAmount(val)}
                  />
                </div>
                <div className="wrapper-amount-swap-actions">
                  <Button
                    onClick={() => {
                      if (glqBalance) {
                        setGLQAmount((parseFloat(glqBalance) / 4).toString());
                      }
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    onClick={() => {
                      if (glqBalance) {
                        setGLQAmount((parseFloat(glqBalance) / 2).toString());
                      }
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    onClick={() => {
                      if (glqBalance) {
                        setGLQAmount(parseFloat(glqBalance).toString());
                      }
                    }}
                  >
                    MAX
                  </Button>
                </div>
              </div>
              <div className="wrapper-amount-submit">
                <Button onClick={handleWrap} icon={loading && <Spinner />}>
                  Wrap
                </Button>
              </div>
            </div>

            {/* WGLQ Amount */}
            <div
              className="wrapper-amount-wrap"
              data-disabled={formDisabled || loadingWGLQBalance}
            >
              <div className="wrapper-amount-subtitle">Available</div>
              <div className="wrapper-amount-value">
                {wglqBalance && (
                  <span>{formatNumberToFixed(parseFloat(wglqBalance), 6)}</span>
                )}
                {WGLQ_TOKEN.name}
              </div>
              <div className="wrapper-amount-swap">
                <div className="wrapper-amount-swap-input">
                  <InputNumber
                    icon={WGLQ_TOKEN.icon}
                    currencyText={WGLQ_TOKEN.name}
                    value={wglqAmount}
                    max={wglqBalance ? parseFloat(wglqBalance) : 0}
                    onChange={(val) => setWGLQAmount(val)}
                  />
                </div>
                <div className="wrapper-amount-swap-actions">
                  <Button
                    onClick={() => {
                      if (wglqBalance) {
                        setWGLQAmount((parseFloat(wglqBalance) / 4).toString());
                      }
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    onClick={() => {
                      if (wglqBalance) {
                        setWGLQAmount((parseFloat(wglqBalance) / 2).toString());
                      }
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    onClick={() => {
                      if (wglqBalance) {
                        setWGLQAmount(parseFloat(wglqBalance).toString());
                      }
                    }}
                  >
                    MAX
                  </Button>
                </div>
              </div>
              <div className="wrapper-amount-submit">
                <Button onClick={handleUnwrap} icon={loading && <Spinner />}>
                  Unwrap
                </Button>
              </div>
            </div>
          </div>
          {error && (
            <Alert type="error">
              <p>{error}</p>
            </Alert>
          )}
          {!success && pending && (
            <Alert type="warning">
              <p>{pending}</p>
            </Alert>
          )}
          {success && (
            <div className="wrapper-success">
              <Alert type="success">
                <p>Successfully completed, ...</p>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WrapperPage;
