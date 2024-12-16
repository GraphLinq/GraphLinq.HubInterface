import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { ERC1967Utils, ERC1967UtilsInterface } from "../ERC1967Utils";
type ERC1967UtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC1967Utils__factory extends ContractFactory {
    constructor(...args: ERC1967UtilsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ERC1967Utils & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ERC1967Utils__factory;
    static readonly bytecode = "0x60556032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f80fdfea2646970667358221220dcd31d1dc59af4b10809919001fe98f47e72bdd155c543cc9ce9631ebf71ec5464736f6c63430008180033";
    static readonly abi: readonly [{
        readonly type: "error";
        readonly name: "ERC1967InvalidAdmin";
        readonly inputs: readonly [{
            readonly name: "admin";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "ERC1967InvalidBeacon";
        readonly inputs: readonly [{
            readonly name: "beacon";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "ERC1967InvalidImplementation";
        readonly inputs: readonly [{
            readonly name: "implementation";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "ERC1967NonPayable";
        readonly inputs: readonly [];
    }];
    static createInterface(): ERC1967UtilsInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC1967Utils;
}
export {};
