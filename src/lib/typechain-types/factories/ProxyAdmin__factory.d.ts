import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { ProxyAdmin, ProxyAdminInterface } from "../ProxyAdmin";
type ProxyAdminConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ProxyAdmin__factory extends ContractFactory {
    constructor(...args: ProxyAdminConstructorParams);
    getDeployTransaction(initialOwner: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(initialOwner: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ProxyAdmin & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ProxyAdmin__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506040516104fc3803806104fc83398101604081905261002e916100bb565b806001600160a01b03811661005c57604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b6100658161006c565b50506100e8565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f602082840312156100cb575f80fd5b81516001600160a01b03811681146100e1575f80fd5b9392505050565b610407806100f55f395ff3fe608060405260043610610049575f3560e01c8063715018a61461004d5780638da5cb5b146100635780639623609d1461008e578063ad3cb1cc146100a1578063f2fde38b146100de575b5f80fd5b348015610058575f80fd5b506100616100fd565b005b34801561006e575f80fd5b505f546040516001600160a01b0390911681526020015b60405180910390f35b61006161009c366004610260565b610110565b3480156100ac575f80fd5b506100d1604051806040016040528060058152602001640352e302e360dc1b81525081565b6040516100859190610372565b3480156100e9575f80fd5b506100616100f836600461038b565b61017b565b6101056101bd565b61010e5f6101e9565b565b6101186101bd565b60405163278f794360e11b81526001600160a01b03841690634f1ef28690349061014890869086906004016103a6565b5f604051808303818588803b15801561015f575f80fd5b505af1158015610171573d5f803e3d5ffd5b5050505050505050565b6101836101bd565b6001600160a01b0381166101b157604051631e4fbdf760e01b81525f60048201526024015b60405180910390fd5b6101ba816101e9565b50565b5f546001600160a01b0316331461010e5760405163118cdaa760e01b81523360048201526024016101a8565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146101ba575f80fd5b634e487b7160e01b5f52604160045260245ffd5b5f805f60608486031215610272575f80fd5b833561027d81610238565b9250602084013561028d81610238565b9150604084013567ffffffffffffffff808211156102a9575f80fd5b818601915086601f8301126102bc575f80fd5b8135818111156102ce576102ce61024c565b604051601f8201601f19908116603f011681019083821181831017156102f6576102f661024c565b8160405282815289602084870101111561030e575f80fd5b826020860160208301375f6020848301015280955050505050509250925092565b5f81518084525f5b8181101561035357602081850181015186830182015201610337565b505f602082860101526020601f19601f83011685010191505092915050565b602081525f610384602083018461032f565b9392505050565b5f6020828403121561039b575f80fd5b813561038481610238565b6001600160a01b03831681526040602082018190525f906103c99083018461032f565b94935050505056fea26469706673582212203c7fee90178521a9d237e1d5b56257fc42f134d9543326e28d00fb20dbae279264736f6c63430008180033";
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly name: "initialOwner";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "UPGRADE_INTERFACE_VERSION";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "string";
            readonly internalType: "string";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "owner";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "renounceOwnership";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "transferOwnership";
        readonly inputs: readonly [{
            readonly name: "newOwner";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "upgradeAndCall";
        readonly inputs: readonly [{
            readonly name: "proxy";
            readonly type: "address";
            readonly internalType: "contract ITransparentUpgradeableProxy";
        }, {
            readonly name: "implementation";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
    }, {
        readonly type: "event";
        readonly name: "OwnershipTransferred";
        readonly inputs: readonly [{
            readonly name: "previousOwner";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "newOwner";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "error";
        readonly name: "OwnableInvalidOwner";
        readonly inputs: readonly [{
            readonly name: "owner";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "OwnableUnauthorizedAccount";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }];
    static createInterface(): ProxyAdminInterface;
    static connect(address: string, runner?: ContractRunner | null): ProxyAdmin;
}
export {};
