const formatNumberToDollars = (number: number, digits = 5) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
  });
};

const formatNumberToFixed = (num: number, precision: number = 2) => {
  const fixedNum = num.toFixed(precision);
  const trimmedNum = parseFloat(fixedNum).toString();
  return trimmedNum;
}

export { formatNumberToDollars, formatNumberToFixed };
