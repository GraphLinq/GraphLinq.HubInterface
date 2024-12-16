import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export declare namespace Fundraiser {
    type FundraiserParamsStruct = {
        saleToken: AddressLike;
        raiseToken: AddressLike;
        projectName: string;
        description: string;
        websiteLink: string;
        campaign: AddressLike;
        vestingStartDelta: BigNumberish;
        vestingDuration: BigNumberish;
        positionManager: AddressLike;
        vesting: AddressLike;
        poolFee: BigNumberish;
    };
    type FundraiserParamsStructOutput = [
        saleToken: string,
        raiseToken: string,
        projectName: string,
        description: string,
        websiteLink: string,
        campaign: string,
        vestingStartDelta: bigint,
        vestingDuration: bigint,
        positionManager: string,
        vesting: string,
        poolFee: bigint
    ] & {
        saleToken: string;
        raiseToken: string;
        projectName: string;
        description: string;
        websiteLink: string;
        campaign: string;
        vestingStartDelta: bigint;
        vestingDuration: bigint;
        positionManager: string;
        vesting: string;
        poolFee: bigint;
    };
}
export interface FundraiserInterface extends Interface {
    getFunction(nameOrSignature: "WETH" | "campaign" | "claimFunds" | "claimTokens" | "claimed" | "contribute" | "contributions" | "createdTimestamp" | "finalize" | "finalizedTimestamp" | "getRequiredAmountsForLiquidity" | "info" | "initialize" | "owner" | "participantsCount" | "pool" | "poolFee" | "positionManager" | "provideLiquidity" | "purchasedTokens" | "raiseToken" | "raisedAmount" | "renounceOwnership" | "saleToken" | "setFailed" | "soldAmount" | "state" | "transferOwnership" | "vesting" | "vestingDuration" | "vestingStartDelta"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Claimed" | "Contribution" | "Failed" | "Finalized" | "FundsClaimed" | "Initialized" | "LiquidityMintingFailed" | "LiquidityProvided" | "OwnershipTransferred" | "SwapPairInitialized"): EventFragment;
    encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "campaign", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimFunds", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimTokens", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimed", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "contribute", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "contributions", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "createdTimestamp", values?: undefined): string;
    encodeFunctionData(functionFragment: "finalize", values?: undefined): string;
    encodeFunctionData(functionFragment: "finalizedTimestamp", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRequiredAmountsForLiquidity", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "info", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [Fundraiser.FundraiserParamsStruct]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "participantsCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "pool", values?: undefined): string;
    encodeFunctionData(functionFragment: "poolFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "positionManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "provideLiquidity", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "purchasedTokens", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "raiseToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "raisedAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "saleToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "setFailed", values?: undefined): string;
    encodeFunctionData(functionFragment: "soldAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "state", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vesting", values?: undefined): string;
    encodeFunctionData(functionFragment: "vestingDuration", values?: undefined): string;
    encodeFunctionData(functionFragment: "vestingStartDelta", values?: undefined): string;
    decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "campaign", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimFunds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contributions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createdTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalizedTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRequiredAmountsForLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "info", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "participantsCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "poolFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "positionManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "provideLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "purchasedTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "raiseToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "raisedAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "saleToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFailed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "soldAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "state", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vesting", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingDuration", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingStartDelta", data: BytesLike): Result;
}
export declare namespace ClaimedEvent {
    type InputTuple = [claimer: AddressLike, amount: BigNumberish];
    type OutputTuple = [claimer: string, amount: bigint];
    interface OutputObject {
        claimer: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ContributionEvent {
    type InputTuple = [contributor: AddressLike, amount: BigNumberish];
    type OutputTuple = [contributor: string, amount: bigint];
    interface OutputObject {
        contributor: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace FailedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace FinalizedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace FundsClaimedEvent {
    type InputTuple = [claimer: AddressLike, amount: BigNumberish];
    type OutputTuple = [claimer: string, amount: bigint];
    interface OutputObject {
        claimer: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LiquidityMintingFailedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace LiquidityProvidedEvent {
    type InputTuple = [
        raiseTokenAmount: BigNumberish,
        saleTokenAmount: BigNumberish
    ];
    type OutputTuple = [raiseTokenAmount: bigint, saleTokenAmount: bigint];
    interface OutputObject {
        raiseTokenAmount: bigint;
        saleTokenAmount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SwapPairInitializedEvent {
    type InputTuple = [tokenId: BigNumberish, liquidity: BigNumberish];
    type OutputTuple = [tokenId: bigint, liquidity: bigint];
    interface OutputObject {
        tokenId: bigint;
        liquidity: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Fundraiser extends BaseContract {
    connect(runner?: ContractRunner | null): Fundraiser;
    waitForDeployment(): Promise<this>;
    interface: FundraiserInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    WETH: TypedContractMethod<[], [string], "view">;
    campaign: TypedContractMethod<[], [string], "view">;
    claimFunds: TypedContractMethod<[], [void], "nonpayable">;
    claimTokens: TypedContractMethod<[], [void], "nonpayable">;
    claimed: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    contribute: TypedContractMethod<[amount: BigNumberish], [void], "payable">;
    contributions: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    createdTimestamp: TypedContractMethod<[], [bigint], "view">;
    finalize: TypedContractMethod<[], [void], "nonpayable">;
    finalizedTimestamp: TypedContractMethod<[], [bigint], "view">;
    getRequiredAmountsForLiquidity: TypedContractMethod<[
        raiseTokenAmount: BigNumberish
    ], [
        [bigint, bigint] & {
            requiredSaleTokens: bigint;
        }
    ], "view">;
    info: TypedContractMethod<[
    ], [
        [
            string,
            string,
            string
        ] & {
            projectName: string;
            description: string;
            websiteLink: string;
        }
    ], "view">;
    initialize: TypedContractMethod<[
        params: Fundraiser.FundraiserParamsStruct
    ], [
        void
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    participantsCount: TypedContractMethod<[], [bigint], "view">;
    pool: TypedContractMethod<[], [string], "view">;
    poolFee: TypedContractMethod<[], [bigint], "view">;
    positionManager: TypedContractMethod<[], [string], "view">;
    provideLiquidity: TypedContractMethod<[
        desiredRaiseTokenLiquidity: BigNumberish,
        tickLower: BigNumberish,
        tickUpper: BigNumberish
    ], [
        void
    ], "payable">;
    purchasedTokens: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    raiseToken: TypedContractMethod<[], [string], "view">;
    raisedAmount: TypedContractMethod<[], [bigint], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    saleToken: TypedContractMethod<[], [string], "view">;
    setFailed: TypedContractMethod<[], [void], "nonpayable">;
    soldAmount: TypedContractMethod<[], [bigint], "view">;
    state: TypedContractMethod<[], [bigint], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    vesting: TypedContractMethod<[], [string], "view">;
    vestingDuration: TypedContractMethod<[], [bigint], "view">;
    vestingStartDelta: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "WETH"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "campaign"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "claimFunds"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "claimTokens"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "claimed"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "contribute"): TypedContractMethod<[amount: BigNumberish], [void], "payable">;
    getFunction(nameOrSignature: "contributions"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "createdTimestamp"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "finalize"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "finalizedTimestamp"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getRequiredAmountsForLiquidity"): TypedContractMethod<[
        raiseTokenAmount: BigNumberish
    ], [
        [bigint, bigint] & {
            requiredSaleTokens: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "info"): TypedContractMethod<[
    ], [
        [
            string,
            string,
            string
        ] & {
            projectName: string;
            description: string;
            websiteLink: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        params: Fundraiser.FundraiserParamsStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "participantsCount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "pool"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "poolFee"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "positionManager"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "provideLiquidity"): TypedContractMethod<[
        desiredRaiseTokenLiquidity: BigNumberish,
        tickLower: BigNumberish,
        tickUpper: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "purchasedTokens"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "raiseToken"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "raisedAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "saleToken"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setFailed"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "soldAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "state"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "vesting"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "vestingDuration"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "vestingStartDelta"): TypedContractMethod<[], [bigint], "view">;
    getEvent(key: "Claimed"): TypedContractEvent<ClaimedEvent.InputTuple, ClaimedEvent.OutputTuple, ClaimedEvent.OutputObject>;
    getEvent(key: "Contribution"): TypedContractEvent<ContributionEvent.InputTuple, ContributionEvent.OutputTuple, ContributionEvent.OutputObject>;
    getEvent(key: "Failed"): TypedContractEvent<FailedEvent.InputTuple, FailedEvent.OutputTuple, FailedEvent.OutputObject>;
    getEvent(key: "Finalized"): TypedContractEvent<FinalizedEvent.InputTuple, FinalizedEvent.OutputTuple, FinalizedEvent.OutputObject>;
    getEvent(key: "FundsClaimed"): TypedContractEvent<FundsClaimedEvent.InputTuple, FundsClaimedEvent.OutputTuple, FundsClaimedEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "LiquidityMintingFailed"): TypedContractEvent<LiquidityMintingFailedEvent.InputTuple, LiquidityMintingFailedEvent.OutputTuple, LiquidityMintingFailedEvent.OutputObject>;
    getEvent(key: "LiquidityProvided"): TypedContractEvent<LiquidityProvidedEvent.InputTuple, LiquidityProvidedEvent.OutputTuple, LiquidityProvidedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "SwapPairInitialized"): TypedContractEvent<SwapPairInitializedEvent.InputTuple, SwapPairInitializedEvent.OutputTuple, SwapPairInitializedEvent.OutputObject>;
    filters: {
        "Claimed(address,uint256)": TypedContractEvent<ClaimedEvent.InputTuple, ClaimedEvent.OutputTuple, ClaimedEvent.OutputObject>;
        Claimed: TypedContractEvent<ClaimedEvent.InputTuple, ClaimedEvent.OutputTuple, ClaimedEvent.OutputObject>;
        "Contribution(address,uint256)": TypedContractEvent<ContributionEvent.InputTuple, ContributionEvent.OutputTuple, ContributionEvent.OutputObject>;
        Contribution: TypedContractEvent<ContributionEvent.InputTuple, ContributionEvent.OutputTuple, ContributionEvent.OutputObject>;
        "Failed()": TypedContractEvent<FailedEvent.InputTuple, FailedEvent.OutputTuple, FailedEvent.OutputObject>;
        Failed: TypedContractEvent<FailedEvent.InputTuple, FailedEvent.OutputTuple, FailedEvent.OutputObject>;
        "Finalized()": TypedContractEvent<FinalizedEvent.InputTuple, FinalizedEvent.OutputTuple, FinalizedEvent.OutputObject>;
        Finalized: TypedContractEvent<FinalizedEvent.InputTuple, FinalizedEvent.OutputTuple, FinalizedEvent.OutputObject>;
        "FundsClaimed(address,uint256)": TypedContractEvent<FundsClaimedEvent.InputTuple, FundsClaimedEvent.OutputTuple, FundsClaimedEvent.OutputObject>;
        FundsClaimed: TypedContractEvent<FundsClaimedEvent.InputTuple, FundsClaimedEvent.OutputTuple, FundsClaimedEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "LiquidityMintingFailed()": TypedContractEvent<LiquidityMintingFailedEvent.InputTuple, LiquidityMintingFailedEvent.OutputTuple, LiquidityMintingFailedEvent.OutputObject>;
        LiquidityMintingFailed: TypedContractEvent<LiquidityMintingFailedEvent.InputTuple, LiquidityMintingFailedEvent.OutputTuple, LiquidityMintingFailedEvent.OutputObject>;
        "LiquidityProvided(uint256,uint256)": TypedContractEvent<LiquidityProvidedEvent.InputTuple, LiquidityProvidedEvent.OutputTuple, LiquidityProvidedEvent.OutputObject>;
        LiquidityProvided: TypedContractEvent<LiquidityProvidedEvent.InputTuple, LiquidityProvidedEvent.OutputTuple, LiquidityProvidedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "SwapPairInitialized(uint256,uint256)": TypedContractEvent<SwapPairInitializedEvent.InputTuple, SwapPairInitializedEvent.OutputTuple, SwapPairInitializedEvent.OutputObject>;
        SwapPairInitialized: TypedContractEvent<SwapPairInitializedEvent.InputTuple, SwapPairInitializedEvent.OutputTuple, SwapPairInitializedEvent.OutputObject>;
    };
}
