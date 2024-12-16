import { type ContractRunner } from "ethers";
import type { IVesting, IVestingInterface } from "../IVesting";
export declare class IVesting__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "addVestingSchedule";
        readonly inputs: readonly [{
            readonly name: "_beneficiary";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "_start";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_duration";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_amount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "releasableAmount";
        readonly inputs: readonly [{
            readonly name: "beneficiary";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "releaseFor";
        readonly inputs: readonly [{
            readonly name: "beneficiary";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "vestingSchedules";
        readonly inputs: readonly [{
            readonly name: "beneficiary";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "vestingStart";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "vestingDuration";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "totalVestingAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "releasedAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }];
    static createInterface(): IVestingInterface;
    static connect(address: string, runner?: ContractRunner | null): IVesting;
}
