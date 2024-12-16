import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface StealthLaunchCampaignInterface extends Interface {
    getFunction(nameOrSignature: "MAX_CAP" | "PRICE_PER_TOKEN" | "contribute" | "getCampaignDetails" | "getConfig" | "getRaisedAmount" | "handleFailure" | "handleFinalization" | "isCampaignSuccessful" | "owner" | "pricePerToken" | "raisedAmount" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "MAX_CAP", values?: undefined): string;
    encodeFunctionData(functionFragment: "PRICE_PER_TOKEN", values?: undefined): string;
    encodeFunctionData(functionFragment: "contribute", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getCampaignDetails", values?: undefined): string;
    encodeFunctionData(functionFragment: "getConfig", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRaisedAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "handleFailure", values?: undefined): string;
    encodeFunctionData(functionFragment: "handleFinalization", values?: undefined): string;
    encodeFunctionData(functionFragment: "isCampaignSuccessful", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pricePerToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "raisedAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "MAX_CAP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PRICE_PER_TOKEN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCampaignDetails", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRaisedAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handleFailure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handleFinalization", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isCampaignSuccessful", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pricePerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "raisedAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
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
export interface StealthLaunchCampaign extends BaseContract {
    connect(runner?: ContractRunner | null): StealthLaunchCampaign;
    waitForDeployment(): Promise<this>;
    interface: StealthLaunchCampaignInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    MAX_CAP: TypedContractMethod<[], [bigint], "view">;
    PRICE_PER_TOKEN: TypedContractMethod<[], [bigint], "view">;
    contribute: TypedContractMethod<[
        contribution: BigNumberish,
        arg1: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getCampaignDetails: TypedContractMethod<[
    ], [
        [string, string, string]
    ], "view">;
    getConfig: TypedContractMethod<[], [bigint[]], "view">;
    getRaisedAmount: TypedContractMethod<[], [bigint], "view">;
    handleFailure: TypedContractMethod<[], [void], "nonpayable">;
    handleFinalization: TypedContractMethod<[], [void], "nonpayable">;
    isCampaignSuccessful: TypedContractMethod<[], [boolean], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    pricePerToken: TypedContractMethod<[], [bigint], "view">;
    raisedAmount: TypedContractMethod<[], [bigint], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "MAX_CAP"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "PRICE_PER_TOKEN"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "contribute"): TypedContractMethod<[
        contribution: BigNumberish,
        arg1: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "getCampaignDetails"): TypedContractMethod<[], [[string, string, string]], "view">;
    getFunction(nameOrSignature: "getConfig"): TypedContractMethod<[], [bigint[]], "view">;
    getFunction(nameOrSignature: "getRaisedAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "handleFailure"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "handleFinalization"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "isCampaignSuccessful"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pricePerToken"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "raisedAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
