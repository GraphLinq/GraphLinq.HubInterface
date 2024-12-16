export declare class FundraiserError extends Error {
    constructor(message: string);
}
export declare class UnknownError extends FundraiserError {
    constructor(message: string);
}
export declare class InvalidArgument extends FundraiserError {
    constructor(message: string);
}
export declare class AllowanceError extends FundraiserError {
    constructor(message: string);
}
export declare class FinalizationError extends FundraiserError {
    constructor(message: string);
}
export declare class ClaimingError extends FundraiserError {
    constructor(message: string);
}
export declare class InitSwapPairError extends FundraiserError {
    constructor(message: string);
}
export declare function mapRevertReasonToError(reason: string): FundraiserError;
