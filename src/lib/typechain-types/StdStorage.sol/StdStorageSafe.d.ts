import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener } from "../common";
export interface StdStorageSafeInterface extends Interface {
    getEvent(nameOrSignatureOrTopic: "SlotFound" | "WARNING_UninitedSlot"): EventFragment;
}
export declare namespace SlotFoundEvent {
    type InputTuple = [
        who: AddressLike,
        fsig: BytesLike,
        keysHash: BytesLike,
        slot: BigNumberish
    ];
    type OutputTuple = [
        who: string,
        fsig: string,
        keysHash: string,
        slot: bigint
    ];
    interface OutputObject {
        who: string;
        fsig: string;
        keysHash: string;
        slot: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WARNING_UninitedSlotEvent {
    type InputTuple = [who: AddressLike, slot: BigNumberish];
    type OutputTuple = [who: string, slot: bigint];
    interface OutputObject {
        who: string;
        slot: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface StdStorageSafe extends BaseContract {
    connect(runner?: ContractRunner | null): StdStorageSafe;
    waitForDeployment(): Promise<this>;
    interface: StdStorageSafeInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getEvent(key: "SlotFound"): TypedContractEvent<SlotFoundEvent.InputTuple, SlotFoundEvent.OutputTuple, SlotFoundEvent.OutputObject>;
    getEvent(key: "WARNING_UninitedSlot"): TypedContractEvent<WARNING_UninitedSlotEvent.InputTuple, WARNING_UninitedSlotEvent.OutputTuple, WARNING_UninitedSlotEvent.OutputObject>;
    filters: {
        "SlotFound(address,bytes4,bytes32,uint256)": TypedContractEvent<SlotFoundEvent.InputTuple, SlotFoundEvent.OutputTuple, SlotFoundEvent.OutputObject>;
        SlotFound: TypedContractEvent<SlotFoundEvent.InputTuple, SlotFoundEvent.OutputTuple, SlotFoundEvent.OutputObject>;
        "WARNING_UninitedSlot(address,uint256)": TypedContractEvent<WARNING_UninitedSlotEvent.InputTuple, WARNING_UninitedSlotEvent.OutputTuple, WARNING_UninitedSlotEvent.OutputObject>;
        WARNING_UninitedSlot: TypedContractEvent<WARNING_UninitedSlotEvent.InputTuple, WARNING_UninitedSlotEvent.OutputTuple, WARNING_UninitedSlotEvent.OutputObject>;
    };
}
