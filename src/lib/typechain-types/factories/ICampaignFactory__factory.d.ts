import { type ContractRunner } from "ethers";
import type { ICampaignFactory, ICampaignFactoryInterface } from "../ICampaignFactory";
export declare class ICampaignFactory__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "createCampaign";
        readonly inputs: readonly [{
            readonly name: "owner";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "contract ICampaign";
        }];
        readonly stateMutability: "nonpayable";
    }];
    static createInterface(): ICampaignFactoryInterface;
    static connect(address: string, runner?: ContractRunner | null): ICampaignFactory;
}
