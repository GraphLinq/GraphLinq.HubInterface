import { type ContractRunner } from "ethers";
import type { IUpgradeableBeacon, IUpgradeableBeaconInterface } from "../IUpgradeableBeacon";
export declare class IUpgradeableBeacon__factory {
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
    }];
    static createInterface(): IUpgradeableBeaconInterface;
    static connect(address: string, runner?: ContractRunner | null): IUpgradeableBeacon;
}
