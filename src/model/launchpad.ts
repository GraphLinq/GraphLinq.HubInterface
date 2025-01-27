export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: string;
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
  soft: bigint;
  hard: bigint;
  progress: bigint;
  progressPercent: number;
  raiseTokenPriceUSD: number;
  raiseTokenName: string;
  lockup: number;
  participants: number;
  type: number;
  address: string;
  raiseToken: string;
  saleToken: string;
  raiseTokenInfo: TokenInfo;
  saleTokenInfo: TokenInfo;
}

export interface Fundraiser {
  vestingStartDelta: string;
  vestingDuration: string;
  raisedAmount: string;
  soldAmount: string;
  createdTimestamp: string;
  finalizedTimestamp: string;
  saleToken: string;
  raiseToken: string;
  stateString: string;
  poolFee: string;
  projectInfo: {
    projectName: string;
    projectLogo: string;
    description: string;
    websiteLink: string;
  };
  campaignDetails: [string, string, string];
  pricePerToken: string;
  saleTokenBalance: string;
  raiseTokenBalance: string;
  config: string[];
  participants: string;
  poolAddr: string;
  owner: string;
}

export interface RefreshConfirmation {
  success: boolean;
}
