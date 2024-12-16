import { type ContractRunner } from "ethers";
import type { IProxyAdmin, IProxyAdminInterface } from "../IProxyAdmin";
export declare class IProxyAdmin__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "upgrade";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "upgradeAndCall";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
    }];
    static createInterface(): IProxyAdminInterface;
    static connect(address: string, runner?: ContractRunner | null): IProxyAdmin;
}
