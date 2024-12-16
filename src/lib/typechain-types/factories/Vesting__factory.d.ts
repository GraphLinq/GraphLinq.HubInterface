import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Vesting, VestingInterface } from "../Vesting";
type VestingConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Vesting__factory extends ContractFactory {
    constructor(...args: VestingConstructorParams);
    getDeployTransaction(_token: AddressLike, owner_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_token: AddressLike, owner_: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Vesting & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Vesting__factory;
    static readonly bytecode = "0x60a060405234801561000f575f80fd5b50604051610bdf380380610bdf83398101604081905261002e9161013f565b60015f55806001600160a01b03811661006157604051631e4fbdf760e01b81525f60048201526024015b60405180910390fd5b61006a816100d3565b506001600160a01b0382166100c15760405162461bcd60e51b815260206004820152601c60248201527f546f6b656e20616464726573732063616e6e6f74206265207a65726f000000006044820152606401610058565b506001600160a01b0316608052610170565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b80516001600160a01b038116811461013a575f80fd5b919050565b5f8060408385031215610150575f80fd5b61015983610124565b915061016760208401610124565b90509250929050565b608051610a5161018e5f395f818160d101526105a90152610a515ff3fe608060405234801561000f575f80fd5b5060043610610085575f3560e01c80638da5cb5b116100585780638da5cb5b1461010b578063ec0904f71461011c578063f2fde38b1461012f578063fdb20ccb14610142575f80fd5b80631726cbc81461008957806324ef8c1b146100af578063715018a6146100c457806382bfefc8146100cc575b5f80fd5b61009c610097366004610911565b610198565b6040519081526020015b60405180910390f35b6100c26100bd36600461092a565b61021d565b005b6100c2610448565b6100f37f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016100a6565b6001546001600160a01b03166100f3565b6100c261012a366004610911565b61045b565b6100c261013d366004610911565b610621565b610178610150366004610911565b600260208190525f918252604090912080546001820154928201546003909201549092919084565b6040805194855260208501939093529183015260608201526080016100a6565b6001600160a01b0381165f90815260026020526040812080544210156101c057505f92915050565b80545f906101ce9042610974565b90505f82600101548284600201546101e69190610987565b6101f0919061099e565b90508260020154811115610205575060028201545b60038301546102149082610974565b95945050505050565b61022561065b565b6001600160a01b03841661028f5760405162461bcd60e51b815260206004820152602660248201527f42656e65666963696172792063616e6e6f7420626520746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b5f81116102de5760405162461bcd60e51b815260206004820152601f60248201527f56657374696e6720616d6f756e74206d75737420626520706f736974697665006044820152606401610286565b5f82116103375760405162461bcd60e51b815260206004820152602160248201527f56657374696e67206475726174696f6e206d75737420626520706f73697469766044820152606560f81b6064820152608401610286565b6001600160a01b0384165f90815260026020526040902054156103ad5760405162461bcd60e51b815260206004820152602860248201527f56657374696e6720616c72656164792073657420666f7220746869732062656e604482015267656669636961727960c01b6064820152608401610286565b6040805160808101825284815260208082018581528284018581525f60608086018281526001600160a01b038c168084526002808852938990209751885594516001880155925191860191909155905160039094019390935583518581529182018790529281018590527fa95063d8afe9473976f0965d552dce67e1b02d154b4fb06ff7e518f8648e93c7910160405180910390a250505050565b61045061065b565b6104595f610688565b565b6104636106d9565b6001600160a01b0381165f90815260026020526040812080549091036104d75760405162461bcd60e51b8152602060048201526024808201527f56657374696e67206e6f742073657420666f7220746869732062656e656669636044820152636961727960e01b6064820152608401610286565b80544210156105285760405162461bcd60e51b815260206004820152601b60248201527f56657374696e6720686173206e6f7420737461727465642079657400000000006044820152606401610286565b5f61053283610198565b90505f81116105835760405162461bcd60e51b815260206004820152601d60248201527f4e6f20746f6b656e73206172652064756520666f722072656c656173650000006044820152606401610286565b80826003015f82825461059691906109bd565b909155506105d090506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168483610701565b826001600160a01b03167fc7798891864187665ac6dd119286e44ec13f014527aeeb2b8eb3fd413df931798260405161060b91815260200190565b60405180910390a2505061061e60015f55565b50565b61062961065b565b6001600160a01b03811661065257604051631e4fbdf760e01b81525f6004820152602401610286565b61061e81610688565b6001546001600160a01b031633146104595760405163118cdaa760e01b8152336004820152602401610286565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b60025f54036106fb57604051633ee5aeb560e01b815260040160405180910390fd5b60025f55565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b179052610753908490610758565b505050565b5f61076c6001600160a01b038416836107b9565b905080515f1415801561079057508080602001905181019061078e91906109d0565b155b1561075357604051635274afe760e01b81526001600160a01b0384166004820152602401610286565b60606107c683835f6107cf565b90505b92915050565b6060814710156107fb5760405163cf47918160e01b815247600482015260248101839052604401610286565b5f80856001600160a01b0316848660405161081691906109ef565b5f6040518083038185875af1925050503d805f8114610850576040519150601f19603f3d011682016040523d82523d5f602084013e610855565b606091505b5091509150610865868383610871565b925050505b9392505050565b60608261088657610881826108cd565b61086a565b815115801561089d57506001600160a01b0384163b155b156108c657604051639996b31560e01b81526001600160a01b0385166004820152602401610286565b508061086a565b8051156108dd5780518082602001fd5b60405163d6bda27560e01b815260040160405180910390fd5b80356001600160a01b038116811461090c575f80fd5b919050565b5f60208284031215610921575f80fd5b6107c6826108f6565b5f805f806080858703121561093d575f80fd5b610946856108f6565b966020860135965060408601359560600135945092505050565b634e487b7160e01b5f52601160045260245ffd5b818103818111156107c9576107c9610960565b80820281158282048414176107c9576107c9610960565b5f826109b857634e487b7160e01b5f52601260045260245ffd5b500490565b808201808211156107c9576107c9610960565b5f602082840312156109e0575f80fd5b8151801515811461086a575f80fd5b5f82515f5b81811015610a0e57602081860181015185830152016109f4565b505f92019182525091905056fea2646970667358221220e91dccb1c8fc611428389f6d0a0fbd43f5f9407a494737d5d3b3c7477930061a64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly name: "_token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "owner_";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "TOKEN";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "contract IERC20";
        }];
        readonly stateMutability: "view";
    }, {
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
        readonly name: "vestingSchedules";
        readonly inputs: readonly [{
            readonly name: "";
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
        readonly type: "event";
        readonly name: "TokensReleased";
        readonly inputs: readonly [{
            readonly name: "beneficiary";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "amount";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "VestingAdded";
        readonly inputs: readonly [{
            readonly name: "beneficiary";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "totalAmount";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "start";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }, {
            readonly name: "duration";
            readonly type: "uint256";
            readonly indexed: false;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "error";
        readonly name: "AddressEmptyCode";
        readonly inputs: readonly [{
            readonly name: "target";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "FailedCall";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "InsufficientBalance";
        readonly inputs: readonly [{
            readonly name: "balance";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "needed";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
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
    }, {
        readonly type: "error";
        readonly name: "ReentrancyGuardReentrantCall";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "SafeERC20FailedOperation";
        readonly inputs: readonly [{
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }];
    static createInterface(): VestingInterface;
    static connect(address: string, runner?: ContractRunner | null): Vesting;
}
export {};
