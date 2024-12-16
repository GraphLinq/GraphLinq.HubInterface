import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "./common";
export interface ICampaignInterface extends Interface {
    getFunction(nameOrSignature: "contribute" | "getCampaignDetails" | "getConfig" | "getRaisedAmount" | "handleFailure" | "handleFinalization" | "isCampaignSuccessful" | "pricePerToken"): FunctionFragment;
    encodeFunctionData(functionFragment: "contribute", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getCampaignDetails", values?: undefined): string;
    encodeFunctionData(functionFragment: "getConfig", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRaisedAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "handleFailure", values?: undefined): string;
    encodeFunctionData(functionFragment: "handleFinalization", values?: undefined): string;
    encodeFunctionData(functionFragment: "isCampaignSuccessful", values?: undefined): string;
    encodeFunctionData(functionFragment: "pricePerToken", values?: undefined): string;
    decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCampaignDetails", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRaisedAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handleFailure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handleFinalization", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isCampaignSuccessful", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pricePerToken", data: BytesLike): Result;
}
export interface ICampaign extends BaseContract {
    connect(runner?: ContractRunner | null): ICampaign;
    waitForDeployment(): Promise<this>;
    interface: ICampaignInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    contribute: TypedContractMethod<[
        contribution: BigNumberish,
        contributor: AddressLike
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
    pricePerToken: TypedContractMethod<[], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "contribute"): TypedContractMethod<[
        contribution: BigNumberish,
        contributor: AddressLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "getCampaignDetails"): TypedContractMethod<[], [[string, string, string]], "view">;
    getFunction(nameOrSignature: "getConfig"): TypedContractMethod<[], [bigint[]], "view">;
    getFunction(nameOrSignature: "getRaisedAmount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "handleFailure"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "handleFinalization"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "isCampaignSuccessful"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "pricePerToken"): TypedContractMethod<[], [bigint], "view">;
    filters: {};
}
