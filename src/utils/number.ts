const formatNumberToDollars = (number: number, digits = 5) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
  });
};

export { formatNumberToDollars };
