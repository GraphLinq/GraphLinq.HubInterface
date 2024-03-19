import "./_bridge.scss";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import Pill from "@components/Pill";
import Select from "@components/Select";
import {
  MAINNET_CURRENCIES,
  GLQCHAIN_CURRENCIES,
  SITE_NAME,
  GLQ_EXPLORER,
  MAINNET_EXPLORER,
} from "@constants/index";
import { useAppContext } from "@context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID, getChainName } from "@utils/chains";
import { formatNumberToFixed } from "@utils/number";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAccount, useBalance, useChainId } from "wagmi";

import useChains from "../../composables/useChains";
import {
  useBridgeContract,
  useTokenContract,
} from "../../composables/useContract";
import useExchangeRates from "../../composables/useExchangeRates";
import useNetwork from "../../composables/useNetwork";
import { ExecutionState, TrackingInformation } from "../../model/tracking";
import { getTrackingInformation } from "../../queries/api";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

let bridgeCost: number | null = null;

function BridgePage() {
  const { address: account } = useAccount();
  const chainId = useChainId();
  const { isMainnet } = useChains();
  const { switchToGraphLinqMainnet, switchToMainnet } = useNetwork();
  const { calculatePrice } = useExchangeRates();
  const { setWaitingTxData } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");
  const [tracking, setTracking] = useState<TrackingInformation | string | null>(
    null
  );

  const trackingExplorer = `${isMainnet ? GLQ_EXPLORER : MAINNET_EXPLORER}/tx/${
    tracking && typeof tracking !== "string" && tracking.bridge_tx
  }`;

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const [activeOption, setActiveOption] = useState(0);
  const currencyOptions = (
    isMainnet ? MAINNET_CURRENCIES : GLQCHAIN_CURRENCIES
  ).map((currency) => {
    currency.icon = tokenIcons[currency.name];
    return currency;
  });
  const activeCurrency = currencyOptions[activeOption];

  const {
    data: balanceRaw,
    isLoading: loadingBalance,
    refetch: fetchBalance,
  } = useBalance({
    address: account,
    token: activeCurrency.address[isMainnet ? "mainnet" : "glq"],
  });
  const tokenBalance = balanceRaw?.value
    ? ethers.utils.formatEther(balanceRaw?.value)
    : "0";

  const activeTokenContract = useTokenContract(
    activeCurrency.address[isMainnet ? "mainnet" : "glq"]
  );
  const bridgeContract = useBridgeContract(
    activeCurrency.bridge &&
      activeCurrency.bridge[isMainnet ? "mainnet" : "glq"]
  );
  useEffect(() => {
    const fetchBridgeCost = async () => {
      try {
        if (bridgeContract) {
          const value: string = await bridgeContract.getFeesInETH();
          bridgeCost = parseFloat(ethers.utils.formatEther(value));
        }
      } catch (error) {
        console.error("Error fetching bridge fee:", error);
      }
    };

    fetchBridgeCost();
  }, [bridgeContract]);

  const handleSelectChange = (active: number) => {
    resetFeedback();
    setActiveOption(active);
    setAmount("");
  };

  const handleSwitchNetwork = () => {
    resetFeedback();
    if (isMainnet) {
      switchToGraphLinqMainnet();
    } else {
      switchToMainnet();
    }
  };

  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (formDisabled || !bridgeContract) {
      return;
    }

    resetFeedback();

    if (parseFloat(amount) <= 0) {
      setError(
        `Invalid amount to send on the contract: ${amount} ${activeCurrency.name}`
      );
      return;
    }

    setFormDisabled(true);
    setLoading(true);

    try {
      const bridgeCost = await bridgeContract.getFeesInETH();

      let allowance = "0";
      if ((!isMainnet || isMainnet && activeCurrency.address.mainnet !== undefined) && activeTokenContract) {
        const requiredAmount = parseFloat(amount) + parseFloat(bridgeCost);
        allowance = await activeTokenContract.allowance(
          account,
          bridgeContract.address
        );

        const allowanceDecimal = parseFloat(
          ethers.utils.formatEther(allowance.toString())
        );

        if (allowanceDecimal < requiredAmount) {
          setPending(
            "Allowance pending, please allow the use of your token balance for the contract..."
          );
          const approveTx = await activeTokenContract.approve(
            bridgeContract.address,
            ethers.utils.parseEther(requiredAmount.toString())
          );
          setPending("Waiting for confirmations...");
          await approveTx.wait();
          setPending(
            "Allowance successfully increased, waiting for deposit transaction..."
          );
        }
      }

      if (tokenBalance && parseFloat(amount) > parseFloat(tokenBalance)) {
        setPending("");
        setError(
          `You only have ${tokenBalance} ${activeCurrency.name} in your wallet.`
        );
        setFormDisabled(false);
        setLoading(false);
        return;
      }

      // setPending(
      //   "Pending, check your wallet extension to execute the chain transaction..."
      // );

      const value =
      (!isMainnet || isMainnet && activeCurrency.address.mainnet !== undefined)
          ? parseFloat(bridgeCost)
          : ethers.utils.parseEther(amount + bridgeCost).toString();

      const resultTx = await bridgeContract.initTransfer(
        ethers.utils.parseEther(amount.toString()).toString(),
        activeCurrency.chainDestination[isMainnet ? "mainnet" : "glq"],
        {
          value: value
        }
      );

      setPending("Waiting for confirmations...");
        
      await resultTx.wait();
      // if (txReceipt.status === 1) {
      //   const transfers = await bridgeContract.getLastsTransfers(1);

      //   if (transfers[0] && transfers[0][0]) {
      //     setTracking(transfers[0][0]);
      //   }
      // }

      setPending(
        `It will take approximatively 10 minutes to execute the bridge transaction and sending ${amount.toString()} ${
          activeCurrency.name
        } on the ${isMainnet ? "GLQ Chain" : "Ethereum"} network.`
      );
      fetchBalance();
      setWaitingTxData(true);
      setFormDisabled(false);
      setLoading(false);
    } catch (error: any) {
      resetFeedback();
      setError(error.toString());
      setFormDisabled(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    resetFeedback();
  }, [chainId]);

  const qTrackingInformation = useQuery({
    queryKey: ["trackingInformation"],
    queryFn: () => getTrackingInformation(account!),
    refetchInterval: 10000,
    enabled: !!account && !!tracking,
  });

  useEffect(() => {
    const info =
      qTrackingInformation.data &&
      qTrackingInformation.data.find(
        (transfer) =>
          tracking &&
          transfer.hash ===
            (typeof tracking === "string" ? tracking : tracking.hash)
      );
    if (info) {
      setTracking(info);

      if (
        info.executionState === ExecutionState.ERROR ||
        info.executionState === ExecutionState.UNKNOWN_DESTINATION
      ) {
        setError("An error occured, please contact us for more information.");
        setTracking(null);
        setFormDisabled(false);
      }
      if (info.executionState === ExecutionState.EXECUTED) {
        setSuccess("Transfer complete.");
        setFormDisabled(false);
      }
    }
  }, [qTrackingInformation.data]);

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Bridge</title>
      </Helmet>
      <div className="main-page bridge">
        <div className="main-card">
          <div className="main-card-title">Bridge</div>
          {!account ? (
            <>
              <div className="main-card-notlogged">
                Please login to transfer assets.
              </div>
            </>
          ) : (
            <>
              <div className="main-card-desc">
                {isMainnet ? (
                  <>
                    Transfer assets from <b>Ethereum</b> to{" "}
                    <b>Graphlinq Chain</b>.
                  </>
                ) : (
                  <>
                    Transfer assets from <b>Graphlinq Chain</b> to{" "}
                    <b>Ethereum</b>.
                  </>
                )}
                <div className="main-card-desc-highlight">
                  <b>Free GLQs</b> will be sent for your first bridge.
                </div>
              </div>
              {chainId && (
                <Alert type="info">
                  You're currently on <b>{getChainName(chainId)}</b> network.
                </Alert>
              )}
              <div className="bridge-swap">
                <Select
                  active={activeOption}
                  options={currencyOptions.map((opt) => (
                    <>
                      {opt.icon} <span>{opt.name}</span>
                      {chainId && <span>{getChainName(chainId)}</span>}
                    </>
                  ))}
                  onChange={(active) => handleSelectChange(active)}
                />
                <div
                  className="bridge-swap-switch"
                  onClick={handleSwitchNetwork}
                >
                  <Swap />
                </div>
                <Pill>
                  {activeCurrency.icon}
                  <span>{activeCurrency.mirror}</span>
                  {chainId && (
                    <span>
                      {getChainName(
                        isMainnet ? GLQ_CHAIN_ID : MAINNET_CHAIN_ID
                      )}
                    </span>
                  )}
                </Pill>
              </div>

              <div className="bridge-amount">
                <div
                  className="bridge-amount-wrap"
                  data-disabled={formDisabled || loadingBalance}
                >
                  <div className="bridge-amount-subtitle">Available</div>
                  <div className="bridge-amount-value">
                    {tokenBalance && (
                      <span>
                        {formatNumberToFixed(parseFloat(tokenBalance), 6)}
                      </span>
                    )}
                    {activeCurrency.name}
                    {tokenBalance && (
                      <span>
                        {calculatePrice(
                          parseFloat(tokenBalance),
                          activeCurrency.exchangeRate
                        )}
                      </span>
                    )}
                  </div>
                  <div className="bridge-amount-swap">
                    <div className="bridge-amount-swap-input">
                      <InputNumber
                        icon={activeCurrency.icon}
                        currencyText={activeCurrency.name}
                        value={amount}
                        max={tokenBalance ? parseFloat(tokenBalance) : 0}
                        onChange={(val) => setAmount(val)}
                      />
                    </div>
                    <div className="bridge-amount-swap-actions">
                      <Button
                        onClick={() => {
                          if (tokenBalance) {
                            setAmount(
                              (parseFloat(tokenBalance) / 4).toString()
                            );
                          }
                        }}
                      >
                        25%
                      </Button>
                      <Button
                        onClick={() => {
                          if (tokenBalance) {
                            setAmount(
                              (parseFloat(tokenBalance) / 2).toString()
                            );
                          }
                        }}
                      >
                        50%
                      </Button>
                      <Button
                        onClick={() => {
                          if (tokenBalance) {
                            setAmount(parseFloat(tokenBalance).toString());
                          }
                        }}
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  <div className="bridge-amount-cost">
                    Bridge fee :{" "}
                    {bridgeCost ? calculatePrice(bridgeCost, "eth") : "$0.0000"}
                  </div>
                  <div className="bridge-amount-submit">
                    <Button onClick={handleSend} icon={loading && <Spinner />}>
                      Send
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
                <div className="bridge-success">
                  <Alert type="success">
                    <p>
                      Successfully completed,{" "}
                      <b>
                        {tracking &&
                          typeof tracking !== "string" &&
                          ethers.utils
                            .formatEther(tracking.quantity)
                            .toString()}{" "}
                        {activeCurrency.name}
                      </b>{" "}
                      has been bridged to your wallet on the{" "}
                      <b>{isMainnet ? "GLQ Chain" : "Ethereum"} network</b>,
                      just switch back network to see your tokens!
                    </p>
                    {tracking && typeof tracking !== "string" && (
                      <p className="small" style={{ marginTop: 8 }}>
                        <a href={trackingExplorer} target="_blank">
                          <small>Tx hash: {tracking.bridge_tx}</small>
                        </a>
                      </p>
                    )}
                  </Alert>
                  <Button onClick={handleSwitchNetwork}>
                    Switch to {isMainnet ? "GLQ Chain" : "Ethereum"} network
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="bridge-warn">
          Your bridged tokens will be automatically sent in less then 20 minutes
          on the other chain.
          <br />
          The same wallet will be used to transfer the coins.
        </div>
      </div>
    </>
  );
}

export default BridgePage;
