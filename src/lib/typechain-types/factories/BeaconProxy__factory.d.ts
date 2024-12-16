import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BytesLike, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { PayableOverrides } from "../common";
import type { BeaconProxy, BeaconProxyInterface } from "../BeaconProxy";
type BeaconProxyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BeaconProxy__factory extends ContractFactory {
    constructor(...args: BeaconProxyConstructorParams);
    getDeployTransaction(beacon: AddressLike, data: BytesLike, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(beacon: AddressLike, data: BytesLike, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<BeaconProxy & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): BeaconProxy__factory;
    static readonly bytecode = "0x60a060405260405161059738038061059783398101604081905261002291610376565b61002c828261003e565b506001600160a01b0316608052610465565b610047826100fb565b6040516001600160a01b038316907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e905f90a28051156100ef576100ea826001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100c0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906100e49190610431565b82610209565b505050565b6100f761027c565b5050565b806001600160a01b03163b5f0361013557604051631933b43b60e21b81526001600160a01b03821660048201526024015b60405180910390fd5b807fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5080546001600160a01b0319166001600160a01b0392831617905560408051635c60da1b60e01b815290515f92841691635c60da1b9160048083019260209291908290030181865afa1580156101ae573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101d29190610431565b9050806001600160a01b03163b5f036100f757604051634c9c8ce360e01b81526001600160a01b038216600482015260240161012c565b60605f80846001600160a01b031684604051610225919061044a565b5f60405180830381855af49150503d805f811461025d576040519150601f19603f3d011682016040523d82523d5f602084013e610262565b606091505b50909250905061027385838361029d565b95945050505050565b341561029b5760405163b398979f60e01b815260040160405180910390fd5b565b6060826102b2576102ad826102fc565b6102f5565b81511580156102c957506001600160a01b0384163b155b156102f257604051639996b31560e01b81526001600160a01b038516600482015260240161012c565b50805b9392505050565b80511561030c5780518082602001fd5b60405163d6bda27560e01b815260040160405180910390fd5b80516001600160a01b038116811461033b575f80fd5b919050565b634e487b7160e01b5f52604160045260245ffd5b5f5b8381101561036e578181015183820152602001610356565b50505f910152565b5f8060408385031215610387575f80fd5b61039083610325565b60208401519092506001600160401b03808211156103ac575f80fd5b818501915085601f8301126103bf575f80fd5b8151818111156103d1576103d1610340565b604051601f8201601f19908116603f011681019083821181831017156103f9576103f9610340565b81604052828152886020848701011115610411575f80fd5b610422836020830160208801610354565b80955050505050509250929050565b5f60208284031215610441575f80fd5b6102f582610325565b5f825161045b818460208701610354565b9190910192915050565b60805161011b61047c5f395f601d015261011b5ff3fe6080604052600a600c565b005b60186014601a565b609d565b565b5f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156076573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906098919060ba565b905090565b365f80375f80365f845af43d5f803e80801560b6573d5ff35b3d5ffd5b5f6020828403121560c9575f80fd5b81516001600160a01b038116811460de575f80fd5b939250505056fea264697066735822122084ebe17ea435432ff8bb3bf9d93facaab7ed8079898bc5532a8c6cae52aa744864736f6c63430008180033";
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly name: "beacon";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly stateMutability: "payable";
    }, {
        readonly type: "fallback";
        readonly stateMutability: "payable";
    }, {
        readonly type: "event";
        readonly name: "BeaconUpgraded";
        readonly inputs: readonly [{
            readonly name: "beacon";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
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
    }, {
        readonly type: "error";
        readonly name: "FailedCall";
        readonly inputs: readonly [];
    }];
    static createInterface(): BeaconProxyInterface;
    static connect(address: string, runner?: ContractRunner | null): BeaconProxy;
}
export {};
