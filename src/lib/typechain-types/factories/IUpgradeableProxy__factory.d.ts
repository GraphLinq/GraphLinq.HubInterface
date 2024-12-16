import { type ContractRunner } from "ethers";
import type { IUpgradeableProxy, IUpgradeableProxyInterface } from "../IUpgradeableProxy";
export declare class IUpgradeableProxy__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "upgradeTo";
        readonly inputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "upgradeToAndCall";
        readonly inputs: readonly [{
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
    static createInterface(): IUpgradeableProxyInterface;
    static connect(address: string, runner?: ContractRunner | null): IUpgradeableProxy;
}
