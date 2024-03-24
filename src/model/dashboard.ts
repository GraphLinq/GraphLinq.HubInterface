interface Amount {
  currency: string;
  amount: string;
}

interface Swap {
  pool: string;
  hash: string;
  timestamp: number;
  sender: string;
  recipient: string;
  type: "buy" | "sell"; // Type can only be 'buy' or 'sell'
  amount0: Amount;
  amount1: Amount;
  price: string;
  gasCostUsed: string;
}

interface Analytics {
  entryPrice: string;
  closePrice: string;
  highPrice: number;
  lowPrice: number;
  volume: string;
  WGLQSwap24h: number;
}

export interface DashboardInformation {
  analytics: Analytics;
  swaps: Swap[];
  totalLiquidAssetsOnChain: string;
  stakingTVL: string;
  preferedPool: string;
}
