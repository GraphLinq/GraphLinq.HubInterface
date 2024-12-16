import { BigNumberish, ContractTransactionResponse, Provider, TransactionResponse } from "ethers";
import { Signer } from "ethers";
import { FundraiserFactory } from "./typechain-types";
export { FundraiserFactory__factory, Fundraiser__factory } from "./typechain-types";
export declare class FundraiserWeb3Connect {
    provider: Provider;
    fundraiserFactory: FundraiserFactory;
    pending: TransactionResponse[];
    connected: boolean;
    constructor(factoryAddr: string);
    performConnectionCheck(): Promise<void>;
    connect(url: string): Promise<void>;
    connectWithProvider(provider: Provider): Promise<void>;
    disconnect(): void;
    private safeExecute;
    createFundraiserStealthLaunch(signer: Signer, params: {
        projectName: string;
        description: string;
        websiteLink: string;
        saleToken: string;
        raiseToken: string;
        vestingStartDelta: number;
        vestingDuration: number;
        poolFee: number;
    }, campaignParams: {
        maxCap: BigNumberish;
        pricePerToken: BigNumberish;
    }): Promise<ContractTransactionResponse>;
    createFundraiserFairLaunch(signer: Signer, params: {
        projectName: string;
        description: string;
        websiteLink: string;
        saleToken: string;
        raiseToken: string;
        vestingStartDelta: number;
        vestingDuration: number;
        poolFee: number;
    }, campaignParams: {
        endTime: number;
        minimumGoal: BigNumberish;
        pricePerToken: BigNumberish;
    }): Promise<ContractTransactionResponse>;
    approveERC20(signer: Signer, tokenAddr: string, spenderAddr: string, amount: BigNumberish): Promise<ContractTransactionResponse>;
    transferERC20(signer: Signer, tokenAddr: string, recipientAddr: string, amount: BigNumberish): Promise<ContractTransactionResponse>;
    checkAllowance(signer: Signer, tokenAddr: string, spenderAddr: string): Promise<any>;
    contribute(signer: Signer, fundraiserAddr: string, amount: BigNumberish): Promise<ContractTransactionResponse>;
    getContribution(signer: Signer, fundraiserAddr: string): Promise<bigint>;
    claimTokens(signer: Signer, fundraiserAddr: string): Promise<ContractTransactionResponse>;
    checkClaimed(signer: Signer, fundraiserAddr: string): Promise<boolean>;
    claimFunds(signer: Signer, fundraiserAddr: string): Promise<ContractTransactionResponse>;
    getVestingInfo(signer: Signer, fundraiserAddr: string): Promise<{
        releasableAmount: bigint;
        vestingInfo: [bigint, bigint, bigint, bigint] & {
            vestingStart: bigint;
            vestingDuration: bigint;
            totalVestingAmount: bigint;
            releasedAmount: bigint;
        };
    }>;
    claimVested(signer: Signer, fundraiserAddr: string): Promise<ContractTransactionResponse>;
    finalizeFundraiser(signer: Signer, fundraiserAddr: string): Promise<ContractTransactionResponse>;
    cancelFundraiser(signer: Signer, fundraiserAddr: string): Promise<ContractTransactionResponse>;
    getSaleTokenLiquidityInfo(fundraiserAddr: string, initialRaiseTokenLiquidity: BigNumberish): Promise<bigint>;
    initSwapPair(signer: Signer, fundraiserAddr: string, tickLower: number, tickUpper: number, desiredRaiseTokenLiquidity: BigNumberish): Promise<ContractTransactionResponse>;
    getFundraiserState(fundraiserAddr: string): Promise<{
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
        config: bigint[];
        participants: bigint;
        poolAddr: string;
        owner: string;
    }>;
    getTokenInfo(tokenAddr: string): Promise<{
        name: string;
        symbol: string;
        decimals: bigint;
    }>;
    getFundraisersCount(): Promise<bigint>;
    getAllFundraisers(startID: number, endID: number, type: number): Promise<string[]>;
    private addTx;
    updatePendingTransactions(): Promise<void>;
    purgeMinedTransactions(): Promise<void>;
    deployERC20(signer: Signer, name: string, symbol: string, totalSupply: BigNumberish): Promise<string>;
}
