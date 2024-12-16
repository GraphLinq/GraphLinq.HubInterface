import { ethers} from 'ethers';

export function formatTokenSymbol(symbol: string) {
    if (symbol === "WETH") return "GLQ";
    return symbol;
  }
  
  /**
   * Formats a bigint value based on its decimals to up to 2 decimal places.
   * Only shows decimals if necessary.
   * @param value - The token value as a bigint.
   * @param decimals - The number of decimals for the token.
   * @returns A formatted string representation of the value.
   */
  export const formatTokenDecimals = (value: bigint, decimals: number): string => {
    const formatted = parseFloat(ethers.utils.formatUnits(value, decimals));
    return formatted.toFixed(2).replace(/\.?0+$/, ""); // Removes trailing zeros and unnecessary decimal point
  };


/**
 * Formats a timestamp in seconds into a human-readable string.
 * @param seconds - The time in seconds.
 * @returns A string expressing the time in months, days, and minutes.
 */
export function formatTimestamp(seconds: number): string {
    const MINUTES_IN_HOUR = 60;
    const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
    const MINUTES_IN_MONTH = MINUTES_IN_DAY * 30; // Approximation for months
  
    const totalMinutes = Math.floor(seconds / 60);
    const months = Math.floor(totalMinutes / MINUTES_IN_MONTH);
    const days = Math.floor((totalMinutes % MINUTES_IN_MONTH) / MINUTES_IN_DAY);
    const minutes = totalMinutes % MINUTES_IN_DAY;
  
    let result = "";
  
    if (months > 0) {
      result += `${months} month${months > 1 ? "s" : ""} `;
    }
    if (days > 0) {
      result += `${days} day${days > 1 ? "s" : ""} `;
    }
    if (months === 0 && minutes > 0) {
      result += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    }
  
    return result.trim() || "less than a minute";
  }
  
  export function formatTimestampToDate(seconds: number): string {
    return new Date(seconds * 1000).toLocaleString();
  }