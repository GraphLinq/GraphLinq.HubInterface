export interface TrackingInformation {
    blockNumber: number;
    blockTimestamp: string;
    coin: string;
    data: string;
    executionState: number;
    feesInETH: string;
    feesInToken: string;
    from: string;
    fromChain: string;
    hash: string;
    quantity: string;
    toChain: string;
}

export enum ExecutionState {
    PENDING = 1,
    IN_EXECUTION = 2,
    EXECUTED = 3,
    ERROR = 4,
    UNKNOWN_DESTINATION = 5
}