const formatNumberToDollars = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 5,
  });
};

export { formatNumberToDollars };
