import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { ethers } from "ethers";
import { useAccount, useChainId } from "wagmi";
import { useEthersSigner } from "./useEthersProvider";

function useTokenBalance(tokenAddress: string) {
  const { address: account} = useAccount();
  const provider = useEthersSigner();
  const chainId = useChainId();
  const [balance, setBalance] = useState<string | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const fetchBalance = async () => {
    if (!account || !provider || !chainId) return;

    setLoadingBalance(true);

    if (tokenAddress === "") {
      setBalance("0.0");
      return;
    }

    try {
      let tokenBalance;
      if (tokenAddress === "native") {
        tokenBalance = await provider.getBalance(account);
      } else {
        const tokenContract = new Contract(
          tokenAddress,
          ["function balanceOf(address) view returns (uint)"],
          provider
        );
        tokenBalance = await tokenContract.balanceOf(account);
      }

      if (typeof tokenBalance !== "bigint" && tokenBalance.isZero()) {
        setBalance("0.0");
      } else {
        const formattedBalance = ethers.utils.formatUnits(tokenBalance.toString(), 18);
        setBalance(formattedBalance);
      }
    } catch (error) {
      console.error("Error getting token balance.", error);
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account, tokenAddress]);

  return { balance, fetchBalance, loadingBalance };
}

export default useTokenBalance;
