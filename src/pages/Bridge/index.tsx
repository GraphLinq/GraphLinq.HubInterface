import "./_bridge.scss";
import ETHToken from "@assets/icons/eth-icon.svg?react";
import GLQToken from "@assets/icons/glq-icon.svg?react";
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
  MAINNET_EXPLORER,
  GLQ_EXPLORER,
} from "@constants/index";
import { GLQ_CHAIN_ID, MAINNET_CHAIN_ID, getChainName } from "@utils/chains";
import { useWeb3React } from "@web3-react/core";
import { parseUnits } from "ethers";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  useEVMBridgeContract,
  useEVMBridgeERC20MinterContract,
  useEVMBridgeNativeContract,
  useTokenContract,
} from "../../composables/useContract";
import useNetwork from "../../composables/useNetwork";
import useTokenBalance from "../../composables/useTokenBalance";
import { switchNetwork } from "../../libs/connections";

const tokenIcons = {
  GLQ: <GLQToken />,
  WGLQ: <GLQToken />,
  ETH: <ETHToken />,
  WETH: <ETHToken />,
};

function BridgePage() {
  const { chainId, account } = useWeb3React();
  const [switchToGraphLinqMainnet, switchToMainnet] = useNetwork();

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  const explorer =
    chainId === MAINNET_CHAIN_ID ? MAINNET_EXPLORER : GLQ_EXPLORER;

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const [activeOption, setActiveOption] = useState(0);
  const currencyOptions = (
    chainId === MAINNET_CHAIN_ID ? MAINNET_CURRENCIES : GLQCHAIN_CURRENCIES
  ).map((currency) => {
    currency.icon = tokenIcons[currency.name];
    return currency;
  });
  const activeCurrency = currencyOptions[activeOption];

  const tokenBalance = useTokenBalance(
    activeCurrency.address[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
  );

  const activeTokenContract = useTokenContract(
    activeCurrency.address[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
  );
  const activeEVMBridgeContract = useEVMBridgeContract(
    activeCurrency.bridge &&
      activeCurrency.bridge[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
  );
  const activeEVMBridgeNativeContract = useEVMBridgeNativeContract(
    activeCurrency.bridge &&
      activeCurrency.bridge[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
  );
  const activeEVMBridgeERC20MinterContract = useEVMBridgeERC20MinterContract(
    activeCurrency.bridge &&
      activeCurrency.bridge[chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"]
  );

  const handleSelectChange = (active: number) => {
    resetFeedback();
    setActiveOption(active);
    setAmount(0);
  };

  const handleSwitchNetwork = () => {
    resetFeedback();
    if (chainId === MAINNET_CHAIN_ID) {
      switchToGraphLinqMainnet();
    } else {
      switchToMainnet();
    }
  };

  const [amount, setAmount] = useState(0);

  const handleSend = async () => {
    resetFeedback();

    if (amount <= 0) {
      setError(
        `Invalid amount to send on the contract: ${amount} ${activeCurrency.name}`
      );
      return;
    }

    let bridgeContract;
    if (chainId === MAINNET_CHAIN_ID) {
      if (activeCurrency.address.mainnet === "native") {
        bridgeContract = activeEVMBridgeNativeContract;
      } else {
        bridgeContract = activeEVMBridgeContract;
      }
    } else {
      bridgeContract = activeEVMBridgeERC20MinterContract;
    }

    if (bridgeContract) {
      const bridgeCost = await bridgeContract.getFeesInETH();

      let allowance = "0";
      if (activeCurrency.address.mainnet !== "native" && activeTokenContract) {
        const requiredAmount = amount + parseFloat(bridgeCost);
        allowance = await activeTokenContract.allowance(
          account,
          bridgeContract.address
        );

        const allowanceDecimal = parseFloat(allowance);

        if (allowanceDecimal < requiredAmount) {
          const difference = requiredAmount - allowanceDecimal;

          setPending(
            "Allowance pending, please allow the use of your token balance for the contract..."
          );
          const approveTx = await activeTokenContract.approve(
            bridgeContract.address,
            parseUnits(difference.toString(), 18)
          );
          setPending("Waiting for confirmations...");
          await approveTx.wait();
          setPending(
            "Allowance successfully increased, waiting for deposit transaction..."
          );
        }

        if (tokenBalance && amount > parseFloat(tokenBalance)) {
          setPending("");
          setError(
            `You only have ${tokenBalance} ${activeCurrency.name} in your wallet.`
          );
          return;
        }

        setPending(
          "Pending, check your wallet extension to execute the chain transaction..."
        );

        const resultTx = await bridgeContract.initTransfer(
          parseUnits(amount.toString(), 18),
          activeCurrency.chainDestination[
            chainId === MAINNET_CHAIN_ID ? "mainnet" : "glq"
          ],
          account,
          { value: bridgeCost }
        );

        setPending("Waiting for confirmations...");

        const txReceipt = await resultTx.wait();
        if (txReceipt.status === 1) {
          setSuccess(txReceipt.transactionHash);
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Bridge</title>
      </Helmet>
      <div className="main-page bridge">
        <div className="main-card">
          <div className="main-card-title">Bridge</div>
          <div className="main-card-desc">
            {chainId === MAINNET_CHAIN_ID ? (
              <>
                Transfer assets from <b>Ethereum</b> to <b>Graphlinq Chain</b>.
              </>
            ) : (
              <>
                Transfer assets from <b>Graphlinq Chain</b> to <b>Ethereum</b>.
              </>
            )}
          </div>
          {chainId && (
            <Alert type="info">
              You're currently on <b>{getChainName(chainId)}</b>.
            </Alert>
          )}
          <div className="bridge-swap">
            <Select
              options={currencyOptions.map((opt) => (
                <>
                  {opt.icon} <span>{opt.name}</span>
                  {chainId && <span>{getChainName(chainId)}</span>}
                </>
              ))}
              onChange={(active) => handleSelectChange(active)}
            />
            <div className="bridge-swap-switch">
              <Swap onClick={handleSwitchNetwork} />
            </div>
            <Pill>
              {activeCurrency.icon}
              <span>{activeCurrency.mirror}</span>
              {chainId && (
                <span>
                  {getChainName(
                    chainId === MAINNET_CHAIN_ID
                      ? GLQ_CHAIN_ID
                      : MAINNET_CHAIN_ID
                  )}
                </span>
              )}
            </Pill>
          </div>

          <div className="bridge-amount">
            <div className="bridge-amount-subtitle">Available</div>
            <div className="bridge-amount-value">
              <span>{tokenBalance}</span>
              {activeCurrency.name}
            </div>
            <div className="bridge-amount-swap">
              <div className="bridge-amount-swap-input">
                <InputNumber
                  icon={activeCurrency.icon}
                  currencyText={activeCurrency.name}
                  value={amount}
                  max={tokenBalance ? parseFloat(tokenBalance) : 0}
                  onChange={(value) => setAmount(value)}
                />
              </div>
              <div className="bridge-amount-swap-actions">
                <Button
                  onClick={() => {
                    if (tokenBalance) {
                      setAmount(parseFloat(tokenBalance) / 4);
                    }
                  }}
                >
                  25%
                </Button>
                <Button
                  onClick={() => {
                    if (tokenBalance) {
                      setAmount(parseFloat(tokenBalance) / 2);
                    }
                  }}
                >
                  50%
                </Button>
                <Button
                  onClick={() => {
                    if (tokenBalance) {
                      setAmount(parseFloat(tokenBalance));
                    }
                  }}
                >
                  MAX
                </Button>
              </div>
            </div>
            <div className="bridge-amount-submit">
              <Button onClick={handleSend}>Send</Button>
            </div>
            {error && (
              <Alert type="error">
                <i className="fal fa-times-circle"></i>
                <p>{error}</p>
              </Alert>
            )}
            {!success && pending && (
              <Alert type="warning">
                <p>{pending}</p>
              </Alert>
            )}
            {success && (
              <Alert type="success">
                <p>
                  <b>Successfully completed !</b>
                  <br />
                  <small>
                    Transaction hash : {success}
                  </small>
                </p>
              </Alert>
            )}
          </div>
        </div>
        <div className="bridge-warn">
          Your claim amount available could be taking delays (max ~72h)
          <br />
          Please wait & come back later if you don't see them!
        </div>
      </div>
    </>
  );
}

export default BridgePage;
