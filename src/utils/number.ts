import { ethers } from "ethers";

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
};

const formatBigNumberToFixed = (
  amount: ethers.BigNumber,
  decimals: number = 2
): string => {
  const amountString = ethers.utils.formatEther(amount);
  const [integerPart, decimalPart] = amountString.split(".");

  let formattedAmount = integerPart;

  if (decimals > 0 && decimalPart) {
    formattedAmount += "." + decimalPart.slice(0, decimals);
  }

  return formattedAmount;
};

export { formatNumberToDollars, formatNumberToFixed, formatBigNumberToFixed };
