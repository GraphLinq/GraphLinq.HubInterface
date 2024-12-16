import { type ContractRunner } from "ethers";
import type { IERC721TokenReceiver, IERC721TokenReceiverInterface } from "../../IERC721.sol/IERC721TokenReceiver";
export declare class IERC721TokenReceiver__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "onERC721Received";
        readonly inputs: readonly [{
            readonly name: "_operator";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "_from";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "_tokenId";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes4";
            readonly internalType: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
    }];
    static createInterface(): IERC721TokenReceiverInterface;
    static connect(address: string, runner?: ContractRunner | null): IERC721TokenReceiver;
}
