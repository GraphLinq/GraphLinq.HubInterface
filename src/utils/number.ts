import { formatDuration, intervalToDuration } from "date-fns";
import { ethers } from "ethers";

const formatNumberToDollars = (number: number, digits = 5) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
  });
};

const formatNumberToFixed = (num: number, precision: number = 2) => {
  const fixedNum = toFixedFloor(num, precision);
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

const isInfinity = (value: number) => {
  return value > 1e26;
};

const toFixedFloor = (value: number, decimals: number) => {
  const factor = Math.pow(10, decimals);
  return (Math.floor(value * factor) / factor).toFixed(decimals);
};

const formatSecondsToReadableTime = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  return formatDuration(duration, {
    format: ["days", "hours", "minutes"],
    delimiter: ", ",
  });
};

export {
  formatNumberToDollars,
  formatNumberToFixed,
  formatBigNumberToFixed,
  formatSecondsToReadableTime,
  isInfinity,
};
