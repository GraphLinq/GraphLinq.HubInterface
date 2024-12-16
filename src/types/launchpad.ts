export interface FundraiserState {
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
    projetInfo: [string, string, string] & {
      projectName: string;
      description: string;
      websiteLink: string;
    };
    campaignDetails: [string, string, string];
    pricePerToken: bigint;
    saleTokenBalance: bigint;
    raiseTokenBalance: bigint;
    poolAddr: string;
    config: bigint[];
    participants: bigint;
    owner: string;
  }

  export interface Fundraiser {
    fundraiserAddr: string;
  }

  export interface VestingInfo {
    vestingStart: bigint;
    vestingDuration: bigint;
    totalVestingAmount: bigint;
    releasedAmount: bigint;
  }

  export interface VestingState {
    releasableAmount: bigint;
    vestingInfo: VestingInfo;
  }