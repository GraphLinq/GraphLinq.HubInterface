import "./style.scss";
import Spinner from "@assets/icons/spinner.svg?react";
import Alert from "@components/Alert";
import { GLQ_EXPLORER_URL, MAINNET_EXPLORER_URL } from "@constants/index";
import { useAppContext } from "@context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID } from "@utils/chains";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";
import { ExecutionState, TrackingInformation } from "../../model/tracking";
import { getTrackingInformation } from "../../queries/api";

const TxProgress = () => {
  const { address: account } = useAccount();
  const { isMainnet } = useChains();
  const chainId = useChainId();
  const { switchToGraphLinqMainnet, switchToMainnet } = useNetwork();
  const { isWaitingTxData, setWaitingTxData, setTxInProgress } =
    useAppContext();

  const [trackingInfo, setTrackingInfo] = useState<TrackingInformation | null>(
    null
  );

  const qTrackingInformation = useQuery({
    queryKey: ["trackingInformation"],
    queryFn: () => getTrackingInformation(account!),
    refetchInterval: 3000,
    enabled: !!account,
  });

  useEffect(() => {
    if (!qTrackingInformation.data) {
      return;
    }

    let info: TrackingInformation | undefined;

    if (trackingInfo) {
      info = qTrackingInformation.data.find(
        (transfer) => trackingInfo.hash === transfer.hash
      );
    } else {
      info = qTrackingInformation.data.find(
        (transfer) =>
          transfer.from === account &&
          (transfer.executionState === ExecutionState.PENDING ||
            transfer.executionState === ExecutionState.IN_EXECUTION)
      );
    }

    if (info) {
      setTrackingInfo(info);
      setTxInProgress(
        info.executionState === ExecutionState.PENDING ||
          info.executionState === ExecutionState.IN_EXECUTION
      );
      setWaitingTxData(false);
    }
  }, [qTrackingInformation.data]);

  if (!trackingInfo) {
    if (isWaitingTxData) {
      return (
        <div className="txProgress">
          {isWaitingTxData && (
            <Alert type="warning">
              <Spinner /> <span>Waiting for tx data...</span>
            </Alert>
          )}
        </div>
      );
    }

    return;
  }

  const currency = trackingInfo.fromChain.split("_")[0];
  const amount = ethers.utils.formatEther(trackingInfo.quantity).toString();
  const networkDestination =
    trackingInfo.toChain.split("_")[1] === "ETH" ? "Ethereum" : "GLQ Chain";

  const needSwitch =
    (networkDestination === "Ethereum" && chainId !== MAINNET_CHAIN_ID) ||
    (networkDestination === "GLQ Chain" && chainId !== GLQ_CHAIN_ID);

  const handleSwitchNetwork = () => {
    if (networkDestination === "Ethereum") {
      switchToMainnet();
    } else {
      switchToGraphLinqMainnet();
    }
  };

  const trackingExplorer = `${
    isMainnet ? GLQ_EXPLORER_URL : MAINNET_EXPLORER_URL
  }/tx/${trackingInfo && trackingInfo.bridge_tx}`;

  return (
    <div className="txProgress">
      {trackingInfo.executionState === ExecutionState.PENDING && (
        <Alert type="warning">
          Your transfer of{" "}
          <b>
            {amount} {currency}
          </b>{" "}
          to <b>{networkDestination}</b> network is <b>pending</b>.
        </Alert>
      )}
      {trackingInfo.executionState === ExecutionState.IN_EXECUTION && (
        <Alert type="warning">
          Your transfer of{" "}
          <b>
            {amount} {currency}
          </b>{" "}
          to <b>{networkDestination}</b> network is <b>in progress</b>.
        </Alert>
      )}
      {trackingInfo.executionState === ExecutionState.EXECUTED && (
        <Alert type="success">
          Your transfer of{" "}
          <b>
            {amount} {currency}
          </b>{" "}
          to <b>{networkDestination}</b> network is now <b>completed</b>.
          <br />
          <p className="small" style={{ marginTop: 8 }}>
            <a href={trackingExplorer} target="_blank">
              <small>Tx hash: {trackingInfo.bridge_tx}</small>
            </a>
          </p>
          {needSwitch && (
            <>
              <br />
              <span className="underline" onClick={handleSwitchNetwork}>
                Switch to <b>{networkDestination}</b> network
              </span>
            </>
          )}
        </Alert>
      )}
      {(trackingInfo.executionState === ExecutionState.ERROR ||
        trackingInfo.executionState === ExecutionState.UNKNOWN_DESTINATION) && (
        <Alert type="error">
          Your transfer of{" "}
          <b>
            {amount} {currency}
          </b>{" "}
          to <b>{networkDestination}</b> had an <b>error</b>. <br />
          Please contact us for more information.
        </Alert>
      )}
    </div>
  );
};

export default TxProgress;
