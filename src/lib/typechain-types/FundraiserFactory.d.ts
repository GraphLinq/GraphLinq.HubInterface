import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface FundraiserFactoryInterface extends Interface {
    getFunction(nameOrSignature: "POSITION_MANAGER" | "UPGRADE_INTERFACE_VERSION" | "campaignID" | "campaigns" | "createFundraiser" | "fundraiserID" | "fundraisers" | "initialize" | "listFundraisers" | "owner" | "proxiableUUID" | "registerCampaign" | "renounceOwnership" | "transferOwnership" | "upgradeToAndCall"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "CampaignRegistered" | "FundraiserCreated" | "Initialized" | "OwnershipTransferred" | "Upgraded"): EventFragment;
    encodeFunctionData(functionFragment: "POSITION_MANAGER", values?: undefined): string;
    encodeFunctionData(functionFragment: "UPGRADE_INTERFACE_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "campaignID", values?: undefined): string;
    encodeFunctionData(functionFragment: "campaigns", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "createFundraiser", values: [BytesLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "fundraiserID", values?: undefined): string;
    encodeFunctionData(functionFragment: "fundraisers", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "initialize", values?: undefined): string;
    encodeFunctionData(functionFragment: "listFundraisers", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "registerCampaign", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall", values: [AddressLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "POSITION_MANAGER", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UPGRADE_INTERFACE_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "campaignID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "campaigns", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createFundraiser", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fundraiserID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fundraisers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "listFundraisers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerCampaign", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
}
export declare namespace CampaignRegisteredEvent {
    type InputTuple = [id: BigNumberish];
    type OutputTuple = [id: bigint];
    interface OutputObject {
        id: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace FundraiserCreatedEvent {
    type InputTuple = [
        fundraiser: AddressLike,
        owner: AddressLike,
        id: BigNumberish
    ];
    type OutputTuple = [fundraiser: string, owner: string, id: bigint];
    interface OutputObject {
        fundraiser: string;
        owner: string;
        id: bigint;
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
export declare namespace UpgradedEvent {
    type InputTuple = [implementation: AddressLike];
    type OutputTuple = [implementation: string];
    interface OutputObject {
        implementation: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface FundraiserFactory extends BaseContract {
    connect(runner?: ContractRunner | null): FundraiserFactory;
    waitForDeployment(): Promise<this>;
    interface: FundraiserFactoryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    POSITION_MANAGER: TypedContractMethod<[], [string], "view">;
    UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;
    campaignID: TypedContractMethod<[], [bigint], "view">;
    campaigns: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    createFundraiser: TypedContractMethod<[
        fundraiserParams: BytesLike,
        campaignParams: BytesLike,
        campaignTypeID: BigNumberish
    ], [
        string
    ], "nonpayable">;
    fundraiserID: TypedContractMethod<[], [bigint], "view">;
    fundraisers: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    initialize: TypedContractMethod<[], [void], "nonpayable">;
    listFundraisers: TypedContractMethod<[
        startID: BigNumberish,
        endID: BigNumberish,
        state: BigNumberish
    ], [
        string[]
    ], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    proxiableUUID: TypedContractMethod<[], [string], "view">;
    registerCampaign: TypedContractMethod<[
        factory: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    upgradeToAndCall: TypedContractMethod<[
        newImplementation: AddressLike,
        data: BytesLike
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "POSITION_MANAGER"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "UPGRADE_INTERFACE_VERSION"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "campaignID"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "campaigns"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "createFundraiser"): TypedContractMethod<[
        fundraiserParams: BytesLike,
        campaignParams: BytesLike,
        campaignTypeID: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "fundraiserID"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "fundraisers"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "listFundraisers"): TypedContractMethod<[
        startID: BigNumberish,
        endID: BigNumberish,
        state: BigNumberish
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "proxiableUUID"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "registerCampaign"): TypedContractMethod<[factory: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
        newImplementation: AddressLike,
        data: BytesLike
    ], [
        void
    ], "payable">;
    getEvent(key: "CampaignRegistered"): TypedContractEvent<CampaignRegisteredEvent.InputTuple, CampaignRegisteredEvent.OutputTuple, CampaignRegisteredEvent.OutputObject>;
    getEvent(key: "FundraiserCreated"): TypedContractEvent<FundraiserCreatedEvent.InputTuple, FundraiserCreatedEvent.OutputTuple, FundraiserCreatedEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    filters: {
        "CampaignRegistered(uint8)": TypedContractEvent<CampaignRegisteredEvent.InputTuple, CampaignRegisteredEvent.OutputTuple, CampaignRegisteredEvent.OutputObject>;
        CampaignRegistered: TypedContractEvent<CampaignRegisteredEvent.InputTuple, CampaignRegisteredEvent.OutputTuple, CampaignRegisteredEvent.OutputObject>;
        "FundraiserCreated(address,address,uint256)": TypedContractEvent<FundraiserCreatedEvent.InputTuple, FundraiserCreatedEvent.OutputTuple, FundraiserCreatedEvent.OutputObject>;
        FundraiserCreated: TypedContractEvent<FundraiserCreatedEvent.InputTuple, FundraiserCreatedEvent.OutputTuple, FundraiserCreatedEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
        Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
    };
}
