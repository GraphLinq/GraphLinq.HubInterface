import { type ContractRunner } from "ethers";
import type { Script, ScriptInterface } from "../Script";
export declare class Script__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "IS_SCRIPT";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
        readonly stateMutability: "view";
    }];
    static createInterface(): ScriptInterface;
    static connect(address: string, runner?: ContractRunner | null): Script;
}
