import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import "./_wrapper.scss";
import {
  GLQ_EXPLORER,
  GLQ_TOKEN,
  SITE_NAME,
  WGLQ_TOKEN,
} from "@constants/index";
import { formatNumberToFixed } from "@utils/number";
import { ethers } from "ethers";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount, useBalance } from "wagmi";
import Spinner from "@assets/icons/spinner.svg?react";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import useWrapper from "../../composables/useWrapper";
import useSound from "../../composables/useSound";
import { getErrorMessage } from "@utils/errors";

const seoTitle = `${SITE_NAME} — Wrapper`;

function WrapperPage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { playSound } = useSound();

  const { wrapper: wrapperContract, executeWrap, executeUnwrap } = useWrapper();

  const [errorWrap, setErrorWrap] = useState("");
  const [pendingWrap, setPendingWrap] = useState("");
  const [successWrap, setSuccessWrap] = useState("");
  const [successWrapTx, setSuccessWrapTx] = useState("");
  const [loadingWrap, setLoadingWrap] = useState(false);

  const [errorUnwrap, setErrorUnwrap] = useState("");
  const [pendingUnwrap, setPendingUnwrap] = useState("");
  const [successUnwrap, setSuccessUnwrap] = useState("");
  const [successUnwrapTx, setSuccessUnwrapTx] = useState("");
  const [loadingUnwrap, setLoadingUnwrap] = useState(false);

  const resetFeedback = () => {
    setErrorWrap("");
    setPendingWrap("");
    setSuccessWrap("");
    setSuccessWrapTx("");
    setErrorUnwrap("");
    setPendingUnwrap("");
    setSuccessUnwrap("");
    setSuccessUnwrapTx("");
  };

  const [formDisabled, setFormDisabled] = useState(false);
  const loading = loadingWrap || loadingUnwrap;

  const {
    data: glqBalanceRaw,
    isLoading: loadingGLQBalance,
    refetch: fetchGLQBalance,
  } = useBalance({
    address: account,
  });
  const glqBalance = glqBalanceRaw?.value
    ? ethers.utils.formatEther(glqBalanceRaw?.value)
    : "0";

  const [glqAmount, setGLQAmount] = useState("");

  const handleWrap = async () => {
    if (!glqAmount || !account || loading || !wrapperContract) return;

    resetFeedback();

    if (parseFloat(glqAmount) <= 0) {
      setErrorWrap(`Invalid amount to wrap : ${glqAmount} GLQ`);
      return;
    }

    try {
      setLoadingWrap(true);
      setFormDisabled(true);

      if (glqBalance && parseFloat(glqAmount) > parseFloat(glqBalance)) {
        setPendingWrap("");
        setErrorWrap(`You only have ${glqBalance} GLQ in your wallet.`);
        setFormDisabled(false);
        return;
      }

      const tx = await executeWrap(parseFloat(glqAmount));

      setPendingWrap("Waiting for confirmations...");

      const receipt = await tx.wait();

      setSuccessWrap(glqAmount);
      setSuccessWrapTx(receipt.transactionHash);
      
      await fetchGLQBalance();
      await fetchWGLQBalance();
      
      setLoadingWrap(false);
      setFormDisabled(false);
      setGLQAmount('');

      playSound('sound_3');
    } catch (error: any) {
      resetFeedback();
      setErrorWrap(error.toString());
      setLoadingWrap(false);
      setFormDisabled(false);
    }
  };

  const {
    data: wglqBalanceRaw,
    isLoading: loadingWGLQBalance,
    refetch: fetchWGLQBalance,
  } = useBalance({
    address: account,
    token: WGLQ_TOKEN.address.glq,
  });
  const wglqBalance = wglqBalanceRaw?.value
    ? ethers.utils.formatEther(wglqBalanceRaw?.value)
    : "0";

  const [wglqAmount, setWGLQAmount] = useState("");

  const handleUnwrap = async () => {
    if (!wglqAmount || !account || loading || !wrapperContract) return;

    resetFeedback();

    if (parseFloat(wglqAmount) <= 0) {
      setErrorUnwrap(`Invalid amount to unwrap : ${wglqAmount} WGLQ`);
      return;
    }

    try {
      setLoadingUnwrap(true);
      setFormDisabled(true);

      if (wglqBalance && parseFloat(wglqAmount) > parseFloat(wglqBalance)) {
        setPendingUnwrap("");
        setErrorUnwrap(`You only have ${wglqBalance} WGLQ in your wallet.`);
        setFormDisabled(false);
        return;
      }

      const tx = await executeUnwrap(parseFloat(wglqAmount));

      setPendingUnwrap("Waiting for confirmations...");

      const receipt = await tx.wait();

      setSuccessUnwrap(wglqAmount);
      setSuccessUnwrapTx(receipt.transactionHash);

      await fetchGLQBalance();
      await fetchWGLQBalance();

      setLoadingUnwrap(false);
      setFormDisabled(false);

      setWGLQAmount('');

      playSound('sound_3');
    } catch (error: any) {
      resetFeedback();
      setErrorUnwrap(getErrorMessage(error));
      setLoadingUnwrap(false);
      setFormDisabled(false);
    }
  };

  const trackingExplorer = `${GLQ_EXPLORER}/tx/${
    successWrapTx || successUnwrapTx
  }`;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="twitter:title" content={seoTitle} />
      </Helmet>
      <div className="main-page wrapper">
        <div className="main-card">
          <div className="main-card-title">Wrapper</div>
          <div className="main-card-content">
            <div className="main-card-desc">
              To trade on the GLQ Chain, GLQ tokens need to be wrapped into
              WGLQ, as native GLQ cannot be directly exchanged.
            </div>

            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please login to wrap or unwrap assets.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    <div className="wrapper-amount">
                      {/* GLQ Amount */}
                      <div
                        className="wrapper-amount-wrap"
                        data-type="wrap"
                        data-disabled={formDisabled || loadingGLQBalance}
                      >
                        <div className="wrapper-amount-subtitle">Available</div>
                        <div className="wrapper-amount-value">
                          {glqBalance && (
                            <span>
                              {formatNumberToFixed(parseFloat(glqBalance), 6)}
                            </span>
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
                                  setGLQAmount(
                                    (parseFloat(glqBalance) / 4).toString()
                                  );
                                }
                              }}
                            >
                              25%
                            </Button>
                            <Button
                              onClick={() => {
                                if (glqBalance) {
                                  setGLQAmount(
                                    (parseFloat(glqBalance) / 2).toString()
                                  );
                                }
                              }}
                            >
                              50%
                            </Button>
                            <Button
                              onClick={() => {
                                if (glqBalance) {
                                  setGLQAmount(
                                    parseFloat(glqBalance).toString()
                                  );
                                }
                              }}
                            >
                              MAX
                            </Button>
                          </div>
                        </div>
                        <div className="wrapper-amount-submit">
                          <Button
                            onClick={handleWrap}
                            icon={loadingWrap && <Spinner />}
                            disabled={loading || loadingGLQBalance}
                          >
                            Wrap
                          </Button>
                        </div>
                      </div>
                      {errorWrap && (
                        <Alert type="error">
                          <p>{errorWrap}</p>
                        </Alert>
                      )}
                      {!successWrap && pendingWrap && (
                        <Alert type="warning">
                          <p>{pendingWrap}</p>
                        </Alert>
                      )}
                      {successWrap && (
                        <Alert type="success">
                          <p>
                            You successfully wrapped for{" "}
                            <b>
                              {formatNumberToFixed(parseFloat(successWrap), 6)}{" "}
                              WGLQ
                            </b>
                            .
                          </p>
                          <p className="small" style={{ marginTop: 8 }}>
                            <a href={trackingExplorer} target="_blank">
                              <small>Tx hash: {successWrapTx}</small>
                            </a>
                          </p>
                        </Alert>
                      )}


                      {/* WGLQ Amount */}
                      <div
                        className="wrapper-amount-wrap"
                        data-type="unwrap"
                        data-disabled={formDisabled || loadingWGLQBalance}
                      >
                        <div className="wrapper-amount-subtitle">Available</div>
                        <div className="wrapper-amount-value">
                          {wglqBalance && (
                            <span>
                              {formatNumberToFixed(parseFloat(wglqBalance), 6)}
                            </span>
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
                                  setWGLQAmount(
                                    (parseFloat(wglqBalance) / 4).toString()
                                  );
                                }
                              }}
                            >
                              25%
                            </Button>
                            <Button
                              onClick={() => {
                                if (wglqBalance) {
                                  setWGLQAmount(
                                    (parseFloat(wglqBalance) / 2).toString()
                                  );
                                }
                              }}
                            >
                              50%
                            </Button>
                            <Button
                              onClick={() => {
                                if (wglqBalance) {
                                  setWGLQAmount(
                                    parseFloat(wglqBalance).toString()
                                  );
                                }
                              }}
                            >
                              MAX
                            </Button>
                          </div>
                        </div>
                        <div className="wrapper-amount-submit">
                          <Button
                            onClick={handleUnwrap}
                            icon={loadingUnwrap && <Spinner />}
                          >
                            Unwrap
                          </Button>
                        </div>
                      </div>
                      {errorUnwrap && (
                        <Alert type="error">
                          <p>{errorUnwrap}</p>
                        </Alert>
                      )}
                      {!successUnwrap && pendingUnwrap && (
                        <Alert type="warning">
                          <p>{pendingUnwrap}</p>
                        </Alert>
                      )}
                      {successUnwrap && (
                        <Alert type="success">
                          <p>
                            You successfully unwrapped for{" "}
                            <b>
                              {formatNumberToFixed(parseFloat(successUnwrap), 6)}{" "}
                              GLQ
                            </b>
                            .
                          </p>
                          <p className="small" style={{ marginTop: 8 }}>
                            <a href={trackingExplorer} target="_blank">
                              <small>Tx hash: {successUnwrapTx}</small>
                            </a>
                          </p>
                        </Alert>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="main-card-wrongnetwork">
                      Please switch to GLQ Chain network to wrap or unwrap
                      assets.
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

export default WrapperPage;
