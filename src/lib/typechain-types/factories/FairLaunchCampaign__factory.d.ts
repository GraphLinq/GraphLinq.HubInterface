import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BytesLike, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { FairLaunchCampaign, FairLaunchCampaignInterface } from "../FairLaunchCampaign";
type FairLaunchCampaignConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class FairLaunchCampaign__factory extends ContractFactory {
    constructor(...args: FairLaunchCampaignConstructorParams);
    getDeployTransaction(owner_: AddressLike, data: BytesLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(owner_: AddressLike, data: BytesLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<FairLaunchCampaign & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): FairLaunchCampaign__factory;
    static readonly bytecode = "0x60e060405234801561000f575f80fd5b50604051610b20380380610b2083398101604081905261002e916100ee565b816001600160a01b03811661005c57604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b6100658161008b565b508080602001905181019061007a91906101cf565b60c05260a052608052506101fa9050565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b5f52604160045260245ffd5b5f80604083850312156100ff575f80fd5b82516001600160a01b0381168114610115575f80fd5b602084810151919350906001600160401b0380821115610133575f80fd5b818601915086601f830112610146575f80fd5b815181811115610158576101586100da565b604051601f8201601f19908116603f01168101908382118183101715610180576101806100da565b816040528281528986848701011115610197575f80fd5b5f93505b828410156101b8578484018601518185018701529285019261019b565b5f8684830101528096505050505050509250929050565b5f805f606084860312156101e1575f80fd5b8351925060208401519150604084015190509250925092565b60805160a05160c0516108af6102715f395f81816101db015281816102040152818161031301526104ff01525f818161027b015281816102de015281816103fa015281816104bf01526105b601525f8181610174015281816102b30152818161038a01528181610480015261054a01526108af5ff3fe608060405234801561000f575f80fd5b50600436106100f0575f3560e01c80638da5cb5b11610093578063c59ee1dc11610063578063c59ee1dc14610265578063d54dff2d1461026e578063e518a47114610276578063f2fde38b1461029d575f80fd5b80638da5cb5b146102265780638e75e48214610240578063a8d31c7814610248578063c3f909d414610250575f80fd5b806360b0b0f0116100ce57806360b0b0f0146101bc578063715018a6146101cf5780637b1b1de6146101d9578063833b9499146101ff575f80fd5b80630c611f24146100f457806337ba682d1461016f5780635d491abb146101a4575b5f80fd5b604080518082018252600b81526a08cc2d2e44098c2eadcc6d60ab1b6020808301919091528251808401845260148152732330b4b9102630bab731b41021b0b6b830b4b3b760611b818301528351808501855260038152624e2f4160e81b928101929092529251610166939190610718565b60405180910390f35b6101967f000000000000000000000000000000000000000000000000000000000000000081565b604051908152602001610166565b6101ac6102b0565b6040519015158152602001610166565b6101966101ca366004610775565b610308565b6101d761036d565b005b7f0000000000000000000000000000000000000000000000000000000000000000610196565b6101967f000000000000000000000000000000000000000000000000000000000000000081565b5f546040516001600160a01b039091168152602001610166565b600154610196565b6101d7610380565b61025861045c565b604051610166919061079f565b61019660015481565b6101d7610540565b6101967f000000000000000000000000000000000000000000000000000000000000000081565b6101d76102ab3660046107e2565b61061d565b5f7f0000000000000000000000000000000000000000000000000000000000000000421015801561030357507f000000000000000000000000000000000000000000000000000000000000000060015410155b905090565b5f61031161065a565b7f000000000000000000000000000000000000000000000000000000000000000061034484670de0b6b3a7640000610816565b61034e9190610833565b90508260015f8282546103619190610852565b90915550909392505050565b61037561065a565b61037e5f610686565b565b61038861065a565b7f000000000000000000000000000000000000000000000000000000000000000042116103f85760405162461bcd60e51b815260206004820152601960248201527846756e6472616973696e67207374696c6c206f6e676f696e6760381b60448201526064015b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001541061037e5760405162461bcd60e51b815260206004820152601060248201526f135a5b9a5b5d5b4819dbd85b081b595d60821b60448201526064016103ef565b604080516003808252608082019092526060916020820183803683370190505090507f0000000000000000000000000000000000000000000000000000000000000000815f815181106104b1576104b1610865565b6020026020010181815250507f0000000000000000000000000000000000000000000000000000000000000000816001815181106104f1576104f1610865565b6020026020010181815250507f00000000000000000000000000000000000000000000000000000000000000008160028151811061053157610531610865565b60200260200101818152505090565b61054861065a565b7f00000000000000000000000000000000000000000000000000000000000000004210156105b45760405162461bcd60e51b815260206004820152601960248201527846756e6472616973696e67207374696c6c206f6e676f696e6760381b60448201526064016103ef565b7f0000000000000000000000000000000000000000000000000000000000000000600154101561037e5760405162461bcd60e51b8152602060048201526014602482015273135a5b9a5b5d5b4819dbd85b081b9bdd081b595d60621b60448201526064016103ef565b61062561065a565b6001600160a01b03811661064e57604051631e4fbdf760e01b81525f60048201526024016103ef565b61065781610686565b50565b5f546001600160a01b0316331461037e5760405163118cdaa760e01b81523360048201526024016103ef565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f81518084525f5b818110156106f9576020818501810151868301820152016106dd565b505f602082860101526020601f19601f83011685010191505092915050565b606081525f61072a60608301866106d5565b828103602084015261073c81866106d5565b9050828103604084015261075081856106d5565b9695505050505050565b80356001600160a01b0381168114610770575f80fd5b919050565b5f8060408385031215610786575f80fd5b823591506107966020840161075a565b90509250929050565b602080825282518282018190525f9190848201906040850190845b818110156107d6578351835292840192918401916001016107ba565b50909695505050505050565b5f602082840312156107f2575f80fd5b6107fb8261075a565b9392505050565b634e487b7160e01b5f52601160045260245ffd5b808202811582820484141761082d5761082d610802565b92915050565b5f8261084d57634e487b7160e01b5f52601260045260245ffd5b500490565b8082018082111561082d5761082d610802565b634e487b7160e01b5f52603260045260245ffdfea26469706673582212201e0afc5e6cb0129e26e66ff3a34d7a5834602912883845ee09bf5f6c65f10d4664736f6c63430008180033";
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly name: "owner_";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "END_TIME";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "MINIMUM_GOAL";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "PRICE_PER_TOKEN";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "contribute";
        readonly inputs: readonly [{
            readonly name: "contribution";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "tokens";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "getCampaignDetails";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "";
            readonly type: "string";
            readonly internalType: "string";
        }];
        readonly stateMutability: "pure";
    }, {
        readonly type: "function";
        readonly name: "getConfig";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "params";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getRaisedAmount";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "handleFailure";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "handleFinalization";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "isCampaignSuccessful";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
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
        readonly name: "pricePerToken";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "raisedAmount";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
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
    static createInterface(): FairLaunchCampaignInterface;
    static connect(address: string, runner?: ContractRunner | null): FairLaunchCampaign;
}
export {};
