import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "./common";
export interface IVestingInterface extends Interface {
    getFunction(nameOrSignature: "addVestingSchedule" | "releasableAmount" | "releaseFor" | "vestingSchedules"): FunctionFragment;
    encodeFunctionData(functionFragment: "addVestingSchedule", values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "releasableAmount", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "releaseFor", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vestingSchedules", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "addVestingSchedule", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releasableAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releaseFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingSchedules", data: BytesLike): Result;
}
export interface IVesting extends BaseContract {
    connect(runner?: ContractRunner | null): IVesting;
    waitForDeployment(): Promise<this>;
    interface: IVestingInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addVestingSchedule: TypedContractMethod<[
        _beneficiary: AddressLike,
        _start: BigNumberish,
        _duration: BigNumberish,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
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
    vestingSchedules: TypedContractMethod<[
        beneficiary: AddressLike
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
    getFunction(nameOrSignature: "addVestingSchedule"): TypedContractMethod<[
        _beneficiary: AddressLike,
        _start: BigNumberish,
        _duration: BigNumberish,
        _amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "releasableAmount"): TypedContractMethod<[beneficiary: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "releaseFor"): TypedContractMethod<[beneficiary: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "vestingSchedules"): TypedContractMethod<[
        beneficiary: AddressLike
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
    filters: {};
}
