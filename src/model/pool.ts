import { Token } from "@constants/index";
import { ethers } from "ethers";

export interface Pool {
  firstCurrency: {
    token: Token;
    liquidity: ethers.BigNumber;
    percent: number;
    unclaimedFees: ethers.BigNumber;
  };
  secondCurrency: {
    token: Token;
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
