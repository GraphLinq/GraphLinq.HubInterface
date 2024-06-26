import { AppToken } from "@constants/apptoken";
import { ethers } from "ethers";

export interface Pool {
  firstCurrency: {
    token: AppToken;
    liquidity: ethers.BigNumber;
    percent: number;
    unclaimedFees: ethers.BigNumber;
  };
  secondCurrency: {
    token: AppToken;
    liquidity: ethers.BigNumber;
    percent: number;
    unclaimedFees: ethers.BigNumber;
  };
  totalLiquidity: number;
  range: {
    low: number;
    high: number;
  };
}

export interface PoolState {
  liquidity: ethers.BigNumber;
  tickSpacing: number;
  fee: number;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
}

export enum PositionStatus {
  IN_RANGE = "in_range",
  OUT_OF_RANGE = "out_of_range",
}

export interface Position {
  id: string;
  liquidity: {
    total: ethers.BigNumber;
    first: ethers.BigNumber;
    second: ethers.BigNumber;
  };
  pair: {
    first: AppToken;
    second: AppToken;
  };
  claimableFees: {
    first: ethers.BigNumber;
    second: ethers.BigNumber;
  };
  fees: number;
  min: number;
  max: number;
  status: PositionStatus;
  poolCurrentPrice: number;
  tickLower: number;
  tickUpper: number;
  poolAddress: string;
}
