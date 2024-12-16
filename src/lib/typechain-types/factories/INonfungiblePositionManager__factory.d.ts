import { type ContractRunner } from "ethers";
import type { INonfungiblePositionManager, INonfungiblePositionManagerInterface } from "../INonfungiblePositionManager";
export declare class INonfungiblePositionManager__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "createAndInitializePoolIfNecessary";
        readonly inputs: readonly [{
            readonly name: "token0";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token1";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "sqrtPriceX96";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
        readonly outputs: readonly [{
            readonly name: "pool";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "payable";
    }, {
        readonly type: "function";
        readonly name: "mint";
        readonly inputs: readonly [{
            readonly name: "params";
            readonly type: "tuple";
            readonly internalType: "struct INonfungiblePositionManager.MintParams";
            readonly components: readonly [{
                readonly name: "token0";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "token1";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "fee";
                readonly type: "uint24";
                readonly internalType: "uint24";
            }, {
                readonly name: "tickLower";
                readonly type: "int24";
                readonly internalType: "int24";
            }, {
                readonly name: "tickUpper";
                readonly type: "int24";
                readonly internalType: "int24";
            }, {
                readonly name: "amount0Desired";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "amount1Desired";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "amount0Min";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "amount1Min";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "recipient";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "deadline";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }];
        readonly outputs: readonly [{
            readonly name: "tokenId";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidity";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "amount0";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "amount1";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "payable";
    }];
    static createInterface(): INonfungiblePositionManagerInterface;
    static connect(address: string, runner?: ContractRunner | null): INonfungiblePositionManager;
}
