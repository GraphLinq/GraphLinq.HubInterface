import "./_txProgress.scss";
import { useQuery } from "@tanstack/react-query";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers";
import { useEffect, useState } from "react";

import useNetwork from "../../composables/useNetwork";
import { ExecutionState, TrackingInformation } from "../../model/tracking";
import { getTrackingInformation } from "../../queries/api";
import Alert from "@components/Alert";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID } from "@utils/chains";

const TxProgress = () => {
  const { chainId, account } = useWeb3React();
  const [switchToGraphLinqMainnet, switchToMainnet] = useNetwork();

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

    let info;

    if (trackingInfo) {
      info = qTrackingInformation.data.find(
        (transfer) => trackingInfo.hash === transfer.hash
      );
    } else {
      info = qTrackingInformation.data.find(
        (transfer) =>
          transfer.executionState === ExecutionState.PENDING ||
          transfer.executionState === ExecutionState.IN_EXECUTION
      );
    }

    if (info) {
      setTrackingInfo(info);
    }
  }, [qTrackingInformation.data]);

  if (!trackingInfo) {
    return;
  }

  const currency = trackingInfo.fromChain.split("_")[0];
  const amount = formatEther(trackingInfo.quantity).toString();
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

  return (
    <div className="txProgress" data-state={trackingInfo.executionState}>
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
          {needSwitch && (
            <span className="underline" onClick={handleSwitchNetwork}>
              Switch to <b>{networkDestination}</b> network
            </span>
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
