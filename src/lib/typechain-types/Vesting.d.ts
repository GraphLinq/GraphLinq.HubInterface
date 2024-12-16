import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface VestingInterface extends Interface {
    getFunction(nameOrSignature: "TOKEN" | "addVestingSchedule" | "owner" | "releasableAmount" | "releaseFor" | "renounceOwnership" | "transferOwnership" | "vestingSchedules"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred" | "TokensReleased" | "VestingAdded"): EventFragment;
    encodeFunctionData(functionFragment: "TOKEN", values?: undefined): string;
    encodeFunctionData(functionFragment: "addVestingSchedule", values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "releasableAmount", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "releaseFor", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vestingSchedules", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "TOKEN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addVestingSchedule", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releasableAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releaseFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingSchedules", data: BytesLike): Result;
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
export declare namespace TokensReleasedEvent {
    type InputTuple = [beneficiary: AddressLike, amount: BigNumberish];
    type OutputTuple = [beneficiary: string, amount: bigint];
    interface OutputObject {
        beneficiary: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VestingAddedEvent {
    type InputTuple = [
        beneficiary: AddressLike,
        totalAmount: BigNumberish,
        start: BigNumberish,
        duration: BigNumberish
    ];
    type OutputTuple = [
        beneficiary: string,
        totalAmount: bigint,
        start: bigint,
        duration: bigint
    ];
    interface OutputObject {
        beneficiary: string;
        totalAmount: bigint;
        start: bigint;
        duration: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Vesting extends BaseContract {
    connect(runner?: ContractRunner | null): Vesting;
    waitForDeployment(): Promise<this>;
    interface: VestingInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    TOKEN: TypedContractMethod<[], [string], "view">;
    addVestingSchedule: TypedContractMethod<[
        _beneficiary: AddressLike,
        _start: BigNumberish,
        _duration: BigNumberish,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    releasableAmount: TypedContractMethod<[
        beneficiary: AddressLike
    ], [
        bigint
    ], "view">;
    releaseFor: TypedContractMethod<[
        beneficiary: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    vestingSchedules: TypedContractMethod<[
        arg0: AddressLike
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            vestingStart: bigint;
            vestingDuration: bigint;
            totalVestingAmount: bigint;
            releasedAmount: bigint;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "TOKEN"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "addVestingSchedule"): TypedContractMethod<[
        _beneficiary: AddressLike,
        _start: BigNumberish,
        _duration: BigNumberish,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "releasableAmount"): TypedContractMethod<[beneficiary: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "releaseFor"): TypedContractMethod<[beneficiary: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "vestingSchedules"): TypedContractMethod<[
        arg0: AddressLike
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            vestingStart: bigint;
            vestingDuration: bigint;
            totalVestingAmount: bigint;
            releasedAmount: bigint;
        }
    ], "view">;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "TokensReleased"): TypedContractEvent<TokensReleasedEvent.InputTuple, TokensReleasedEvent.OutputTuple, TokensReleasedEvent.OutputObject>;
    getEvent(key: "VestingAdded"): TypedContractEvent<VestingAddedEvent.InputTuple, VestingAddedEvent.OutputTuple, VestingAddedEvent.OutputObject>;
    filters: {
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "TokensReleased(address,uint256)": TypedContractEvent<TokensReleasedEvent.InputTuple, TokensReleasedEvent.OutputTuple, TokensReleasedEvent.OutputObject>;
        TokensReleased: TypedContractEvent<TokensReleasedEvent.InputTuple, TokensReleasedEvent.OutputTuple, TokensReleasedEvent.OutputObject>;
        "VestingAdded(address,uint256,uint256,uint256)": TypedContractEvent<VestingAddedEvent.InputTuple, VestingAddedEvent.OutputTuple, VestingAddedEvent.OutputObject>;
        VestingAdded: TypedContractEvent<VestingAddedEvent.InputTuple, VestingAddedEvent.OutputTuple, VestingAddedEvent.OutputObject>;
    };
}
