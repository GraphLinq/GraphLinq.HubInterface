import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract, formatUnits } from "ethers";

function useTokenBalance(tokenAddress: string) {
  const { account, provider, chainId } = useWeb3React();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account || !provider || !chainId) return;

      if (tokenAddress === '') {
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
          const formattedBalance = formatUnits(tokenBalance.toString(), 18);
          setBalance(formattedBalance);
        }
      } catch (error) {
        console.error("Error getting token balance.", error);
      }
    };

    fetchBalance();
  }, [account, provider, tokenAddress]);

  return balance;
}

export default useTokenBalance;
