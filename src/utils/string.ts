function formatEthereumAddress(address: string): string {
  if (address.substring(0, 2) !== "0x" || address.length !== 42) {
    throw new Error("Adresse Ethereum invalide");
  }
  return `${address.substring(0, 6)}...${address.substring(38)}`;
}

export { formatEthereumAddress };
