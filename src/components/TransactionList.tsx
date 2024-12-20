import { providers } from "ethers";
import React, { useEffect, useState } from "react";
import { FundraiserWeb3Connect } from "../lib/fundraiserlib.es";

type TransactionResponse = providers.TransactionResponse;

interface TransactionListProps {
  library: FundraiserWeb3Connect;
  onTransactionConfirmed?: (tx: TransactionResponse) => void; // Callback for confirmed transactions
}

const TransactionList: React.FC<TransactionListProps> = ({
  library,
  onTransactionConfirmed,
}) => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!library) return;

    let isMounted = true; // Track component mount status to prevent updates on unmounted components
    const confirmedTransactions = new Set<string>(); // Track confirmed transactions

    const fetchTransactions = async () => {
      try {
        // Update the library's pending transactions
        await library.updatePendingTransactions();

        // Fetch the updated list of transactions
        const txs = [...library.pending];
        if (isMounted) setTransactions(txs);

        // Update statuses for each transaction
        const statusUpdates = await Promise.all(
          txs.map(async (tx) => {
            const confirmations = await tx.confirmations();

            // Trigger the callback if the transaction is confirmed
            if (confirmations > 0 && !confirmedTransactions.has(tx.hash)) {
              confirmedTransactions.add(tx.hash); // Mark transaction as confirmed
              onTransactionConfirmed?.(tx); // Fire the callback
            }

            return {
              hash: tx.hash,
              status: confirmations > 0 ? "Confirmed" : "Pending",
            };
          })
        );

        // Map statuses by transaction hash
        const newStatuses = statusUpdates.reduce(
          (acc, { hash, status }) => {
            acc[hash] = status;
            return acc;
          },
          {} as Record<string, string>
        );

        if (isMounted) {
          // Update state without triggering a re-render loop
          setStatuses((prevStatuses) => ({
            ...prevStatuses,
            ...newStatuses,
          }));
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }

      // Remove mined transactions from the library
      await library.purgeMinedTransactions();
    };

    // Initial fetch
    fetchTransactions();

    // Poll every 5 seconds for updates
    const intervalId = setInterval(fetchTransactions, 5000);

    return () => {
      isMounted = false; // Prevent state updates if the component is unmounted
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [library, onTransactionConfirmed]);

  return (
    <div
      style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>Pending Transactions</h3>
      {transactions.length === 0 ? (
        <p>No pending transactions</p>
      ) : (
        <ul>
          {transactions.map((tx, index) => (
            <li key={tx.hash} style={{ marginBottom: "0.5rem" }}>
              <div>
                <strong>Transaction #{index + 1}</strong>
              </div>
              <div>Hash: {tx.hash}</div>
              <div>Status: {statuses[tx.hash] || "Checking..."}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
