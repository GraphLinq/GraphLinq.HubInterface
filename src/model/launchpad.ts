export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: bigint;
}

export interface FundraiserSmall {
  live: boolean;
  finished: boolean;
  verified: boolean;
  projectName: string;
  projectDescription: string;
  projectType: string;
  projectLogo: string;
  symbol: string;
  soft: number;
  hard: number;
  progress: number;
  progressPercent: number;
  raiseTokenPriceUSD: number;
  raiseTokenName: string;
  lockup: number;
  participants: number;
  type: number;
  address: string;
}

export interface Fundraiser {
  vestingStartDelta: bigint;
  vestingDuration: bigint;
  raisedAmount: bigint;
  soldAmount: bigint;
  createdTimestamp: bigint;
  finalizedTimestamp: bigint;
  saleToken: string;
  raiseToken: string;
  stateString: string;
  poolFee: bigint;
  projectInfo: [string, string, string] & {
    projectName: string;
    projectLogo: string;
    description: string;
    websiteLink: string;
  };
  campaignDetails: [string, string, string];
  pricePerToken: bigint;
  saleTokenBalance: bigint;
  raiseTokenBalance: bigint;
  config: bigint[];
  participants: bigint;
  poolAddr: string;
  owner: string;
}
