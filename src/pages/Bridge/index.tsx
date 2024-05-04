import "./style.scss";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
import Spinner from "@assets/icons/spinner.svg?react";
import Swap from "@assets/icons/swap.svg?react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import InputNumber from "@components/InputNumber";
import Pill from "@components/Pill";
import Select from "@components/Select";
import { MAINNET_CURRENCIES, GLQCHAIN_CURRENCIES } from "@constants/apptoken";
import {
  SITE_NAME,
  GLQ_EXPLORER_URL,
  MAINNET_EXPLORER_URL,
} from "@constants/index";
import { useAppContext } from "@context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID, getChainName } from "@utils/chains";
import { getErrorMessage } from "@utils/errors";
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
import useSound from "../../composables/useSound";
import { ExecutionState, TrackingInformation } from "../../model/tracking";
import { getTrackingInformation } from "../../queries/api";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

let bridgeCost = ethers.BigNumber.from(0);

const seoTitle = `${SITE_NAME} — Bridge`;

function BridgePage() {
  const { address: account } = useAccount();
  const chainId = useChainId();
  const { isMainnet } = useChains();
  const { switchToGraphLinqMainnet, switchToMainnet } = useNetwork();
  const { calculatePrice } = useExchangeRates();
  const { setWaitingTxData, isTxInProgress } = useAppContext();
  const { playSound } = useSound();

  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    setFormDisabled(isTxInProgress);
  }, [isTxInProgress]);

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");
  const [tracking, setTracking] = useState<TrackingInformation | string | null>(
    null
  );

  const trackingExplorer = `${
    isMainnet ? GLQ_EXPLORER_URL : MAINNET_EXPLORER_URL
  }/tx/${tracking && typeof tracking !== "string" && tracking.bridge_tx}`;

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
          const value: ethers.BigNumber = await bridgeContract.getFeesInETH();
          bridgeCost = value;
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

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError(
        `Invalid amount to send on the contract: ${
          amount !== "" ? amount : "0"
        } ${
          activeCurrency.name === "WGLQ" && isMainnet
            ? "GLQ"
            : activeCurrency.name
        }`
      );
      return;
    }

    setFormDisabled(true);
    setLoading(true);

    try {
      if (tokenBalance && parseFloat(amount) > parseFloat(tokenBalance)) {
        setPending("");
        setError(
          `You only have ${tokenBalance} ${activeCurrency.name} in your wallet.`
        );
        setFormDisabled(false);
        setLoading(false);
        return;
      }

      bridgeCost = await bridgeContract.getFeesInETH();

      let allowance = ethers.BigNumber.from(0);
      if (
        (!isMainnet ||
          (isMainnet && activeCurrency.address.mainnet !== undefined)) &&
        activeTokenContract
      ) {
        const requiredAmount = ethers.utils.parseEther(amount.toString());

        allowance = await activeTokenContract.allowance(
          account,
          bridgeContract.address
        );

        if (allowance.lt(requiredAmount)) {
          setPending(
            "Allowance pending, please allow the use of your token balance for the contract..."
          );
          const approveTx = await activeTokenContract.approve(
            bridgeContract.address,
            requiredAmount
          );

          setPending("Waiting for confirmations...");
          await approveTx.wait();
          setPending(
            "Allowance successfully increased, waiting for deposit transaction..."
          );
        }
      }

      let value: string;
      if (
        !isMainnet ||
        (isMainnet && activeCurrency.address.mainnet !== undefined)
      ) {
        value = bridgeCost.toString();
      } else {
        const amountInWei = ethers.utils.parseEther(amount.toString());
        const totalAmountInWei = amountInWei.add(bridgeCost);
        value = totalAmountInWei.toString();
      }

      const resultTx = await bridgeContract.initTransfer(
        ethers.utils.parseEther(amount.toString()).toString(),
        activeCurrency.chainDestination[isMainnet ? "mainnet" : "glq"],
        {
          value: value,
        }
      );

      setPending("Waiting for confirmations...");

      await resultTx.wait();

      setPending(
        `It will take approximatively 10 minutes to execute the bridge transaction and sending ${amount.toString()} ${
          activeCurrency.name
        } on the ${isMainnet ? "GLQ Chain" : "Ethereum"} network.`
      );
      fetchBalance();
      setWaitingTxData(true);
      // setFormDisabled(false);
      setLoading(false);
    } catch (error: any) {
      resetFeedback();
      setError(getErrorMessage(error));
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
        playSound("sound_2");
      }
    }
  }, [qTrackingInformation.data]);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="twitter:title" content={seoTitle} />
      </Helmet>
      <div className="main-page bridge">
        <div className="main-card">
          <div className="main-card-title">Bridge</div>
          {!account ? (
            <>
              <div className="main-card-notlogged">
                Please connect to transfer assets.
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
                      {opt.icon}{" "}
                      <span>
                        {opt.name === "WGLQ" && isMainnet ? "GLQ" : opt.name}
                      </span>
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
                    {activeCurrency.name === "WGLQ" && isMainnet
                      ? "GLQ"
                      : activeCurrency.name}
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
                              formatNumberToFixed(
                                parseFloat(tokenBalance) / 4,
                                6
                              )
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
                              formatNumberToFixed(
                                parseFloat(tokenBalance) / 2,
                                6
                              )
                            );
                          }
                        }}
                      >
                        50%
                      </Button>
                      <Button
                        onClick={() => {
                          if (tokenBalance) {
                            setAmount(
                              formatNumberToFixed(parseFloat(tokenBalance), 6)
                            );
                          }
                        }}
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  <div className="bridge-amount-cost">
                    Bridge fee :{" "}
                    {bridgeCost
                      ? calculatePrice(
                          parseFloat(ethers.utils.formatEther(bridgeCost)),
                          isMainnet ? "eth" : "glq"
                        )
                      : "$0.0000"}
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
