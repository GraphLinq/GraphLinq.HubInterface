import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BytesLike, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { StealthLaunchCampaign, StealthLaunchCampaignInterface } from "../StealthLaunchCampaign";
type StealthLaunchCampaignConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class StealthLaunchCampaign__factory extends ContractFactory {
    constructor(...args: StealthLaunchCampaignConstructorParams);
    getDeployTransaction(owner_: AddressLike, data: BytesLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(owner_: AddressLike, data: BytesLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<StealthLaunchCampaign & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): StealthLaunchCampaign__factory;
    static readonly bytecode = "0x60c060405234801561000f575f80fd5b5060405161085d38038061085d83398101604081905261002e916100eb565b816001600160a01b03811661005c57604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b61006581610088565b508080602001905181019061007a91906101cc565b60a052608052506101ee9050565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b5f52604160045260245ffd5b5f80604083850312156100fc575f80fd5b82516001600160a01b0381168114610112575f80fd5b602084810151919350906001600160401b0380821115610130575f80fd5b818601915086601f830112610143575f80fd5b815181811115610155576101556100d7565b604051601f8201601f19908116603f0116810190838211818310171561017d5761017d6100d7565b816040528281528986848701011115610194575f80fd5b5f93505b828410156101b55784840186015181850187015292850192610198565b5f8684830101528096505050505050509250929050565b5f80604083850312156101dd575f80fd5b505080516020909101519092909150565b60805160a05161063261022b5f395f81816101ac015281816101d501528181610284015261035a01525f8181610244015261031b01526106325ff3fe608060405234801561000f575f80fd5b50600436106100e5575f3560e01c80638e75e48211610088578063c59ee1dc11610063578063c59ee1dc14610236578063d54dff2d14610219578063d669e1d41461023f578063f2fde38b14610266575f80fd5b80638e75e48214610211578063a8d31c7814610219578063c3f909d414610221575f80fd5b8063715018a6116100c3578063715018a6146101a05780637b1b1de6146101aa578063833b9499146101d05780638da5cb5b146101f7575f80fd5b80630c611f24146100e95780635d491abb1461017057806360b0b0f01461017f575b5f80fd5b604080518082018252600e81526d0a6e8cac2d8e8d04098c2eadcc6d60931b60208083019190915282518084018452601781527f537465616c7468204c61756e63682043616d706169676e000000000000000000818301528351808501855260038152624e2f4160e81b92810192909252925161016793919061049b565b60405180910390f35b60405160018152602001610167565b61019261018d3660046104f8565b610279565b604051908152602001610167565b6101a86102de565b005b7f0000000000000000000000000000000000000000000000000000000000000000610192565b6101927f000000000000000000000000000000000000000000000000000000000000000081565b5f546040516001600160a01b039091168152602001610167565b600154610192565b6101a86102f1565b6102296102f9565b6040516101679190610522565b61019260015481565b6101927f000000000000000000000000000000000000000000000000000000000000000081565b6101a8610274366004610565565b61039b565b5f6102826103dd565b7f00000000000000000000000000000000000000000000000000000000000000006102b584670de0b6b3a7640000610599565b6102bf91906105b6565b90508260015f8282546102d291906105d5565b90915550909392505050565b6102e66103dd565b6102ef5f610409565b565b6102ef6103dd565b60408051600280825260608083018452926020830190803683370190505090507f0000000000000000000000000000000000000000000000000000000000000000815f8151811061034c5761034c6105e8565b6020026020010181815250507f00000000000000000000000000000000000000000000000000000000000000008160018151811061038c5761038c6105e8565b60200260200101818152505090565b6103a36103dd565b6001600160a01b0381166103d157604051631e4fbdf760e01b81525f60048201526024015b60405180910390fd5b6103da81610409565b50565b5f546001600160a01b031633146102ef5760405163118cdaa760e01b81523360048201526024016103c8565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f81518084525f5b8181101561047c57602081850181015186830182015201610460565b505f602082860101526020601f19601f83011685010191505092915050565b606081525f6104ad6060830186610458565b82810360208401526104bf8186610458565b905082810360408401526104d38185610458565b9695505050505050565b80356001600160a01b03811681146104f3575f80fd5b919050565b5f8060408385031215610509575f80fd5b82359150610519602084016104dd565b90509250929050565b602080825282518282018190525f9190848201906040850190845b818110156105595783518352928401929184019160010161053d565b50909695505050505050565b5f60208284031215610575575f80fd5b61057e826104dd565b9392505050565b634e487b7160e01b5f52601160045260245ffd5b80820281158282048414176105b0576105b0610585565b92915050565b5f826105d057634e487b7160e01b5f52601260045260245ffd5b500490565b808201808211156105b0576105b0610585565b634e487b7160e01b5f52603260045260245ffdfea2646970667358221220695e80395938d3e8606eff1fbd33c712ad8b38ecf62d2a26eb8d3a3b9248bd6364736f6c63430008180033";
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
        readonly name: "MAX_CAP";
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
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "handleFinalization";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "isCampaignSuccessful";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
        readonly stateMutability: "pure";
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
    static createInterface(): StealthLaunchCampaignInterface;
    static connect(address: string, runner?: ContractRunner | null): StealthLaunchCampaign;
}
export {};
