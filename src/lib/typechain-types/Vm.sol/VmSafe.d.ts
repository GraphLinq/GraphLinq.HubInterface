import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../common";
export declare namespace VmSafe {
    type WalletStruct = {
        addr: AddressLike;
        publicKeyX: BigNumberish;
        publicKeyY: BigNumberish;
        privateKey: BigNumberish;
    };
    type WalletStructOutput = [
        addr: string,
        publicKeyX: bigint,
        publicKeyY: bigint,
        privateKey: bigint
    ] & {
        addr: string;
        publicKeyX: bigint;
        publicKeyY: bigint;
        privateKey: bigint;
    };
    type EthGetLogsStruct = {
        emitter: AddressLike;
        topics: BytesLike[];
        data: BytesLike;
        blockHash: BytesLike;
        blockNumber: BigNumberish;
        transactionHash: BytesLike;
        transactionIndex: BigNumberish;
        logIndex: BigNumberish;
        removed: boolean;
    };
    type EthGetLogsStructOutput = [
        emitter: string,
        topics: string[],
        data: string,
        blockHash: string,
        blockNumber: bigint,
        transactionHash: string,
        transactionIndex: bigint,
        logIndex: bigint,
        removed: boolean
    ] & {
        emitter: string;
        topics: string[];
        data: string;
        blockHash: string;
        blockNumber: bigint;
        transactionHash: string;
        transactionIndex: bigint;
        logIndex: bigint;
        removed: boolean;
    };
    type FsMetadataStruct = {
        isDir: boolean;
        isSymlink: boolean;
        length: BigNumberish;
        readOnly: boolean;
        modified: BigNumberish;
        accessed: BigNumberish;
        created: BigNumberish;
    };
    type FsMetadataStructOutput = [
        isDir: boolean,
        isSymlink: boolean,
        length: bigint,
        readOnly: boolean,
        modified: bigint,
        accessed: bigint,
        created: bigint
    ] & {
        isDir: boolean;
        isSymlink: boolean;
        length: bigint;
        readOnly: boolean;
        modified: bigint;
        accessed: bigint;
        created: bigint;
    };
    type LogStruct = {
        topics: BytesLike[];
        data: BytesLike;
        emitter: AddressLike;
    };
    type LogStructOutput = [
        topics: string[],
        data: string,
        emitter: string
    ] & {
        topics: string[];
        data: string;
        emitter: string;
    };
    type GasStruct = {
        gasLimit: BigNumberish;
        gasTotalUsed: BigNumberish;
        gasMemoryUsed: BigNumberish;
        gasRefunded: BigNumberish;
        gasRemaining: BigNumberish;
    };
    type GasStructOutput = [
        gasLimit: bigint,
        gasTotalUsed: bigint,
        gasMemoryUsed: bigint,
        gasRefunded: bigint,
        gasRemaining: bigint
    ] & {
        gasLimit: bigint;
        gasTotalUsed: bigint;
        gasMemoryUsed: bigint;
        gasRefunded: bigint;
        gasRemaining: bigint;
    };
    type DirEntryStruct = {
        errorMessage: string;
        path: string;
        depth: BigNumberish;
        isDir: boolean;
        isSymlink: boolean;
    };
    type DirEntryStructOutput = [
        errorMessage: string,
        path: string,
        depth: bigint,
        isDir: boolean,
        isSymlink: boolean
    ] & {
        errorMessage: string;
        path: string;
        depth: bigint;
        isDir: boolean;
        isSymlink: boolean;
    };
    type RpcStruct = {
        key: string;
        url: string;
    };
    type RpcStructOutput = [key: string, url: string] & {
        key: string;
        url: string;
    };
    type ChainInfoStruct = {
        forkId: BigNumberish;
        chainId: BigNumberish;
    };
    type ChainInfoStructOutput = [forkId: bigint, chainId: bigint] & {
        forkId: bigint;
        chainId: bigint;
    };
    type StorageAccessStruct = {
        account: AddressLike;
        slot: BytesLike;
        isWrite: boolean;
        previousValue: BytesLike;
        newValue: BytesLike;
        reverted: boolean;
    };
    type StorageAccessStructOutput = [
        account: string,
        slot: string,
        isWrite: boolean,
        previousValue: string,
        newValue: string,
        reverted: boolean
    ] & {
        account: string;
        slot: string;
        isWrite: boolean;
        previousValue: string;
        newValue: string;
        reverted: boolean;
    };
    type AccountAccessStruct = {
        chainInfo: VmSafe.ChainInfoStruct;
        kind: BigNumberish;
        account: AddressLike;
        accessor: AddressLike;
        initialized: boolean;
        oldBalance: BigNumberish;
        newBalance: BigNumberish;
        deployedCode: BytesLike;
        value: BigNumberish;
        data: BytesLike;
        reverted: boolean;
        storageAccesses: VmSafe.StorageAccessStruct[];
        depth: BigNumberish;
    };
    type AccountAccessStructOutput = [
        chainInfo: VmSafe.ChainInfoStructOutput,
        kind: bigint,
        account: string,
        accessor: string,
        initialized: boolean,
        oldBalance: bigint,
        newBalance: bigint,
        deployedCode: string,
        value: bigint,
        data: string,
        reverted: boolean,
        storageAccesses: VmSafe.StorageAccessStructOutput[],
        depth: bigint
    ] & {
        chainInfo: VmSafe.ChainInfoStructOutput;
        kind: bigint;
        account: string;
        accessor: string;
        initialized: boolean;
        oldBalance: bigint;
        newBalance: bigint;
        deployedCode: string;
        value: bigint;
        data: string;
        reverted: boolean;
        storageAccesses: VmSafe.StorageAccessStructOutput[];
        depth: bigint;
    };
    type FfiResultStruct = {
        exitCode: BigNumberish;
        stdout: BytesLike;
        stderr: BytesLike;
    };
    type FfiResultStructOutput = [
        exitCode: bigint,
        stdout: string,
        stderr: string
    ] & {
        exitCode: bigint;
        stdout: string;
        stderr: string;
    };
}
export interface VmSafeInterface extends Interface {
    getFunction(nameOrSignature: "accesses" | "addr" | "assertApproxEqAbs(uint256,uint256,uint256)" | "assertApproxEqAbs(int256,int256,uint256)" | "assertApproxEqAbs(int256,int256,uint256,string)" | "assertApproxEqAbs(uint256,uint256,uint256,string)" | "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256)" | "assertApproxEqAbsDecimal(int256,int256,uint256,uint256)" | "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256,string)" | "assertApproxEqAbsDecimal(int256,int256,uint256,uint256,string)" | "assertApproxEqRel(uint256,uint256,uint256,string)" | "assertApproxEqRel(uint256,uint256,uint256)" | "assertApproxEqRel(int256,int256,uint256,string)" | "assertApproxEqRel(int256,int256,uint256)" | "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256)" | "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256,string)" | "assertApproxEqRelDecimal(int256,int256,uint256,uint256)" | "assertApproxEqRelDecimal(int256,int256,uint256,uint256,string)" | "assertEq(bytes32[],bytes32[])" | "assertEq(int256[],int256[],string)" | "assertEq(address,address,string)" | "assertEq(string,string,string)" | "assertEq(address[],address[])" | "assertEq(address[],address[],string)" | "assertEq(bool,bool,string)" | "assertEq(address,address)" | "assertEq(uint256[],uint256[],string)" | "assertEq(bool[],bool[])" | "assertEq(int256[],int256[])" | "assertEq(int256,int256,string)" | "assertEq(bytes32,bytes32)" | "assertEq(uint256,uint256,string)" | "assertEq(uint256[],uint256[])" | "assertEq(bytes,bytes)" | "assertEq(uint256,uint256)" | "assertEq(bytes32,bytes32,string)" | "assertEq(string[],string[])" | "assertEq(bytes32[],bytes32[],string)" | "assertEq(bytes,bytes,string)" | "assertEq(bool[],bool[],string)" | "assertEq(bytes[],bytes[])" | "assertEq(string[],string[],string)" | "assertEq(string,string)" | "assertEq(bytes[],bytes[],string)" | "assertEq(bool,bool)" | "assertEq(int256,int256)" | "assertEqDecimal(uint256,uint256,uint256)" | "assertEqDecimal(int256,int256,uint256)" | "assertEqDecimal(int256,int256,uint256,string)" | "assertEqDecimal(uint256,uint256,uint256,string)" | "assertFalse(bool,string)" | "assertFalse(bool)" | "assertGe(int256,int256)" | "assertGe(int256,int256,string)" | "assertGe(uint256,uint256)" | "assertGe(uint256,uint256,string)" | "assertGeDecimal(uint256,uint256,uint256)" | "assertGeDecimal(int256,int256,uint256,string)" | "assertGeDecimal(uint256,uint256,uint256,string)" | "assertGeDecimal(int256,int256,uint256)" | "assertGt(int256,int256)" | "assertGt(uint256,uint256,string)" | "assertGt(uint256,uint256)" | "assertGt(int256,int256,string)" | "assertGtDecimal(int256,int256,uint256,string)" | "assertGtDecimal(uint256,uint256,uint256,string)" | "assertGtDecimal(int256,int256,uint256)" | "assertGtDecimal(uint256,uint256,uint256)" | "assertLe(int256,int256,string)" | "assertLe(uint256,uint256)" | "assertLe(int256,int256)" | "assertLe(uint256,uint256,string)" | "assertLeDecimal(int256,int256,uint256)" | "assertLeDecimal(uint256,uint256,uint256,string)" | "assertLeDecimal(int256,int256,uint256,string)" | "assertLeDecimal(uint256,uint256,uint256)" | "assertLt(int256,int256)" | "assertLt(uint256,uint256,string)" | "assertLt(int256,int256,string)" | "assertLt(uint256,uint256)" | "assertLtDecimal(uint256,uint256,uint256)" | "assertLtDecimal(int256,int256,uint256,string)" | "assertLtDecimal(uint256,uint256,uint256,string)" | "assertLtDecimal(int256,int256,uint256)" | "assertNotEq(bytes32[],bytes32[])" | "assertNotEq(int256[],int256[])" | "assertNotEq(bool,bool,string)" | "assertNotEq(bytes[],bytes[],string)" | "assertNotEq(bool,bool)" | "assertNotEq(bool[],bool[])" | "assertNotEq(bytes,bytes)" | "assertNotEq(address[],address[])" | "assertNotEq(int256,int256,string)" | "assertNotEq(uint256[],uint256[])" | "assertNotEq(bool[],bool[],string)" | "assertNotEq(string,string)" | "assertNotEq(address[],address[],string)" | "assertNotEq(string,string,string)" | "assertNotEq(address,address,string)" | "assertNotEq(bytes32,bytes32)" | "assertNotEq(bytes,bytes,string)" | "assertNotEq(uint256,uint256,string)" | "assertNotEq(uint256[],uint256[],string)" | "assertNotEq(address,address)" | "assertNotEq(bytes32,bytes32,string)" | "assertNotEq(string[],string[],string)" | "assertNotEq(uint256,uint256)" | "assertNotEq(bytes32[],bytes32[],string)" | "assertNotEq(string[],string[])" | "assertNotEq(int256[],int256[],string)" | "assertNotEq(bytes[],bytes[])" | "assertNotEq(int256,int256)" | "assertNotEqDecimal(int256,int256,uint256)" | "assertNotEqDecimal(int256,int256,uint256,string)" | "assertNotEqDecimal(uint256,uint256,uint256)" | "assertNotEqDecimal(uint256,uint256,uint256,string)" | "assertTrue(bool)" | "assertTrue(bool,string)" | "assume" | "breakpoint(string)" | "breakpoint(string,bool)" | "broadcast()" | "broadcast(address)" | "broadcast(uint256)" | "closeFile" | "computeCreate2Address(bytes32,bytes32)" | "computeCreate2Address(bytes32,bytes32,address)" | "computeCreateAddress" | "copyFile" | "createDir" | "createWallet(string)" | "createWallet(uint256)" | "createWallet(uint256,string)" | "deriveKey(string,string,uint32,string)" | "deriveKey(string,uint32,string)" | "deriveKey(string,uint32)" | "deriveKey(string,string,uint32)" | "ensNamehash" | "envAddress(string)" | "envAddress(string,string)" | "envBool(string)" | "envBool(string,string)" | "envBytes(string)" | "envBytes(string,string)" | "envBytes32(string,string)" | "envBytes32(string)" | "envExists" | "envInt(string,string)" | "envInt(string)" | "envOr(string,string,bytes32[])" | "envOr(string,string,int256[])" | "envOr(string,bool)" | "envOr(string,address)" | "envOr(string,uint256)" | "envOr(string,string,bytes[])" | "envOr(string,string,uint256[])" | "envOr(string,string,string[])" | "envOr(string,bytes)" | "envOr(string,bytes32)" | "envOr(string,int256)" | "envOr(string,string,address[])" | "envOr(string,string)" | "envOr(string,string,bool[])" | "envString(string,string)" | "envString(string)" | "envUint(string)" | "envUint(string,string)" | "eth_getLogs" | "exists" | "ffi" | "fsMetadata" | "getBlobBaseFee" | "getBlockNumber" | "getBlockTimestamp" | "getCode" | "getDeployedCode" | "getLabel" | "getMappingKeyAndParentOf" | "getMappingLength" | "getMappingSlotAt" | "getNonce(address)" | "getNonce((address,uint256,uint256,uint256))" | "getRecordedLogs" | "indexOf" | "isContext" | "isDir" | "isFile" | "keyExists" | "keyExistsJson" | "keyExistsToml" | "label" | "lastCallGas" | "load" | "parseAddress" | "parseBool" | "parseBytes" | "parseBytes32" | "parseInt" | "parseJson(string)" | "parseJson(string,string)" | "parseJsonAddress" | "parseJsonAddressArray" | "parseJsonBool" | "parseJsonBoolArray" | "parseJsonBytes" | "parseJsonBytes32" | "parseJsonBytes32Array" | "parseJsonBytesArray" | "parseJsonInt" | "parseJsonIntArray" | "parseJsonKeys" | "parseJsonString" | "parseJsonStringArray" | "parseJsonUint" | "parseJsonUintArray" | "parseToml(string,string)" | "parseToml(string)" | "parseTomlAddress" | "parseTomlAddressArray" | "parseTomlBool" | "parseTomlBoolArray" | "parseTomlBytes" | "parseTomlBytes32" | "parseTomlBytes32Array" | "parseTomlBytesArray" | "parseTomlInt" | "parseTomlIntArray" | "parseTomlKeys" | "parseTomlString" | "parseTomlStringArray" | "parseTomlUint" | "parseTomlUintArray" | "parseUint" | "pauseGasMetering" | "projectRoot" | "prompt" | "promptAddress" | "promptSecret" | "promptUint" | "readDir(string,uint64)" | "readDir(string,uint64,bool)" | "readDir(string)" | "readFile" | "readFileBinary" | "readLine" | "readLink" | "record" | "recordLogs" | "rememberKey" | "removeDir" | "removeFile" | "replace" | "resumeGasMetering" | "rpc" | "rpcUrl" | "rpcUrlStructs" | "rpcUrls" | "serializeAddress(string,string,address[])" | "serializeAddress(string,string,address)" | "serializeBool(string,string,bool[])" | "serializeBool(string,string,bool)" | "serializeBytes(string,string,bytes[])" | "serializeBytes(string,string,bytes)" | "serializeBytes32(string,string,bytes32[])" | "serializeBytes32(string,string,bytes32)" | "serializeInt(string,string,int256)" | "serializeInt(string,string,int256[])" | "serializeJson" | "serializeString(string,string,string[])" | "serializeString(string,string,string)" | "serializeUint(string,string,uint256)" | "serializeUint(string,string,uint256[])" | "serializeUintToHex" | "setEnv" | "sign(bytes32)" | "sign(address,bytes32)" | "sign((address,uint256,uint256,uint256),bytes32)" | "sign(uint256,bytes32)" | "signP256" | "sleep" | "split" | "startBroadcast()" | "startBroadcast(address)" | "startBroadcast(uint256)" | "startMappingRecording" | "startStateDiffRecording" | "stopAndReturnStateDiff" | "stopBroadcast" | "stopMappingRecording" | "toBase64(string)" | "toBase64(bytes)" | "toBase64URL(string)" | "toBase64URL(bytes)" | "toLowercase" | "toString(address)" | "toString(uint256)" | "toString(bytes)" | "toString(bool)" | "toString(int256)" | "toString(bytes32)" | "toUppercase" | "trim" | "tryFfi" | "unixTime" | "writeFile" | "writeFileBinary" | "writeJson(string,string,string)" | "writeJson(string,string)" | "writeLine" | "writeToml(string,string,string)" | "writeToml(string,string)"): FunctionFragment;
    encodeFunctionData(functionFragment: "accesses", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addr", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbs(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbs(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbs(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbs(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbsDecimal(int256,int256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqAbsDecimal(int256,int256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRel(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRel(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRel(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRel(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRelDecimal(int256,int256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertApproxEqRelDecimal(int256,int256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes32[],bytes32[])", values: [BytesLike[], BytesLike[]]): string;
    encodeFunctionData(functionFragment: "assertEq(int256[],int256[],string)", values: [BigNumberish[], BigNumberish[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(address,address,string)", values: [AddressLike, AddressLike, string]): string;
    encodeFunctionData(functionFragment: "assertEq(string,string,string)", values: [string, string, string]): string;
    encodeFunctionData(functionFragment: "assertEq(address[],address[])", values: [AddressLike[], AddressLike[]]): string;
    encodeFunctionData(functionFragment: "assertEq(address[],address[],string)", values: [AddressLike[], AddressLike[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(bool,bool,string)", values: [boolean, boolean, string]): string;
    encodeFunctionData(functionFragment: "assertEq(address,address)", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "assertEq(uint256[],uint256[],string)", values: [BigNumberish[], BigNumberish[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(bool[],bool[])", values: [boolean[], boolean[]]): string;
    encodeFunctionData(functionFragment: "assertEq(int256[],int256[])", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "assertEq(int256,int256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes32,bytes32)", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "assertEq(uint256,uint256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertEq(uint256[],uint256[])", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes,bytes)", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "assertEq(uint256,uint256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes32,bytes32,string)", values: [BytesLike, BytesLike, string]): string;
    encodeFunctionData(functionFragment: "assertEq(string[],string[])", values: [string[], string[]]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes32[],bytes32[],string)", values: [BytesLike[], BytesLike[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes,bytes,string)", values: [BytesLike, BytesLike, string]): string;
    encodeFunctionData(functionFragment: "assertEq(bool[],bool[],string)", values: [boolean[], boolean[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes[],bytes[])", values: [BytesLike[], BytesLike[]]): string;
    encodeFunctionData(functionFragment: "assertEq(string[],string[],string)", values: [string[], string[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "assertEq(bytes[],bytes[],string)", values: [BytesLike[], BytesLike[], string]): string;
    encodeFunctionData(functionFragment: "assertEq(bool,bool)", values: [boolean, boolean]): string;
    encodeFunctionData(functionFragment: "assertEq(int256,int256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertEqDecimal(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertEqDecimal(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertEqDecimal(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertEqDecimal(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertFalse(bool,string)", values: [boolean, string]): string;
    encodeFunctionData(functionFragment: "assertFalse(bool)", values: [boolean]): string;
    encodeFunctionData(functionFragment: "assertGe(int256,int256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGe(int256,int256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGe(uint256,uint256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGe(uint256,uint256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGeDecimal(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGeDecimal(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGeDecimal(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGeDecimal(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGt(int256,int256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGt(uint256,uint256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGt(uint256,uint256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGt(int256,int256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGtDecimal(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGtDecimal(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertGtDecimal(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertGtDecimal(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLe(int256,int256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLe(uint256,uint256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLe(int256,int256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLe(uint256,uint256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLeDecimal(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLeDecimal(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLeDecimal(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLeDecimal(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLt(int256,int256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLt(uint256,uint256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLt(int256,int256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLt(uint256,uint256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLtDecimal(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertLtDecimal(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLtDecimal(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertLtDecimal(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes32[],bytes32[])", values: [BytesLike[], BytesLike[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(int256[],int256[])", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bool,bool,string)", values: [boolean, boolean, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes[],bytes[],string)", values: [BytesLike[], BytesLike[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bool,bool)", values: [boolean, boolean]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bool[],bool[])", values: [boolean[], boolean[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes,bytes)", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "assertNotEq(address[],address[])", values: [AddressLike[], AddressLike[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(int256,int256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(uint256[],uint256[])", values: [BigNumberish[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bool[],bool[],string)", values: [boolean[], boolean[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(address[],address[],string)", values: [AddressLike[], AddressLike[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(string,string,string)", values: [string, string, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(address,address,string)", values: [AddressLike, AddressLike, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes32,bytes32)", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes,bytes,string)", values: [BytesLike, BytesLike, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(uint256,uint256,string)", values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(uint256[],uint256[],string)", values: [BigNumberish[], BigNumberish[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(address,address)", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes32,bytes32,string)", values: [BytesLike, BytesLike, string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(string[],string[],string)", values: [string[], string[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(uint256,uint256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes32[],bytes32[],string)", values: [BytesLike[], BytesLike[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(string[],string[])", values: [string[], string[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(int256[],int256[],string)", values: [BigNumberish[], BigNumberish[], string]): string;
    encodeFunctionData(functionFragment: "assertNotEq(bytes[],bytes[])", values: [BytesLike[], BytesLike[]]): string;
    encodeFunctionData(functionFragment: "assertNotEq(int256,int256)", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertNotEqDecimal(int256,int256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertNotEqDecimal(int256,int256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertNotEqDecimal(uint256,uint256,uint256)", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "assertNotEqDecimal(uint256,uint256,uint256,string)", values: [BigNumberish, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "assertTrue(bool)", values: [boolean]): string;
    encodeFunctionData(functionFragment: "assertTrue(bool,string)", values: [boolean, string]): string;
    encodeFunctionData(functionFragment: "assume", values: [boolean]): string;
    encodeFunctionData(functionFragment: "breakpoint(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "breakpoint(string,bool)", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "broadcast()", values?: undefined): string;
    encodeFunctionData(functionFragment: "broadcast(address)", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "broadcast(uint256)", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "closeFile", values: [string]): string;
    encodeFunctionData(functionFragment: "computeCreate2Address(bytes32,bytes32)", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "computeCreate2Address(bytes32,bytes32,address)", values: [BytesLike, BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "computeCreateAddress", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "copyFile", values: [string, string]): string;
    encodeFunctionData(functionFragment: "createDir", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "createWallet(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "createWallet(uint256)", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "createWallet(uint256,string)", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "deriveKey(string,string,uint32,string)", values: [string, string, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "deriveKey(string,uint32,string)", values: [string, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "deriveKey(string,uint32)", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "deriveKey(string,string,uint32)", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "ensNamehash", values: [string]): string;
    encodeFunctionData(functionFragment: "envAddress(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envAddress(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envBool(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envBool(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envBytes(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envBytes(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envBytes32(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envBytes32(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envExists", values: [string]): string;
    encodeFunctionData(functionFragment: "envInt(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envInt(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,bytes32[])", values: [string, string, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,int256[])", values: [string, string, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "envOr(string,bool)", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "envOr(string,address)", values: [string, AddressLike]): string;
    encodeFunctionData(functionFragment: "envOr(string,uint256)", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,bytes[])", values: [string, string, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,uint256[])", values: [string, string, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,string[])", values: [string, string, string[]]): string;
    encodeFunctionData(functionFragment: "envOr(string,bytes)", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "envOr(string,bytes32)", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "envOr(string,int256)", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,address[])", values: [string, string, AddressLike[]]): string;
    encodeFunctionData(functionFragment: "envOr(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envOr(string,string,bool[])", values: [string, string, boolean[]]): string;
    encodeFunctionData(functionFragment: "envString(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "envString(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envUint(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "envUint(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "eth_getLogs", values: [BigNumberish, BigNumberish, AddressLike, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "exists", values: [string]): string;
    encodeFunctionData(functionFragment: "ffi", values: [string[]]): string;
    encodeFunctionData(functionFragment: "fsMetadata", values: [string]): string;
    encodeFunctionData(functionFragment: "getBlobBaseFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "getBlockNumber", values?: undefined): string;
    encodeFunctionData(functionFragment: "getBlockTimestamp", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCode", values: [string]): string;
    encodeFunctionData(functionFragment: "getDeployedCode", values: [string]): string;
    encodeFunctionData(functionFragment: "getLabel", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getMappingKeyAndParentOf", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "getMappingLength", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "getMappingSlotAt", values: [AddressLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getNonce(address)", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getNonce((address,uint256,uint256,uint256))", values: [VmSafe.WalletStruct]): string;
    encodeFunctionData(functionFragment: "getRecordedLogs", values?: undefined): string;
    encodeFunctionData(functionFragment: "indexOf", values: [string, string]): string;
    encodeFunctionData(functionFragment: "isContext", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isDir", values: [string]): string;
    encodeFunctionData(functionFragment: "isFile", values: [string]): string;
    encodeFunctionData(functionFragment: "keyExists", values: [string, string]): string;
    encodeFunctionData(functionFragment: "keyExistsJson", values: [string, string]): string;
    encodeFunctionData(functionFragment: "keyExistsToml", values: [string, string]): string;
    encodeFunctionData(functionFragment: "label", values: [AddressLike, string]): string;
    encodeFunctionData(functionFragment: "lastCallGas", values?: undefined): string;
    encodeFunctionData(functionFragment: "load", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "parseAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "parseBool", values: [string]): string;
    encodeFunctionData(functionFragment: "parseBytes", values: [string]): string;
    encodeFunctionData(functionFragment: "parseBytes32", values: [string]): string;
    encodeFunctionData(functionFragment: "parseInt", values: [string]): string;
    encodeFunctionData(functionFragment: "parseJson(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "parseJson(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonAddress", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonAddressArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonBool", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonBoolArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonBytes", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonBytes32", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonBytes32Array", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonBytesArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonInt", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonIntArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonKeys", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonString", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonStringArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonUint", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseJsonUintArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseToml(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseToml(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "parseTomlAddress", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlAddressArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlBool", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlBoolArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlBytes", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlBytes32", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlBytes32Array", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlBytesArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlInt", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlIntArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlKeys", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlString", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlStringArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlUint", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseTomlUintArray", values: [string, string]): string;
    encodeFunctionData(functionFragment: "parseUint", values: [string]): string;
    encodeFunctionData(functionFragment: "pauseGasMetering", values?: undefined): string;
    encodeFunctionData(functionFragment: "projectRoot", values?: undefined): string;
    encodeFunctionData(functionFragment: "prompt", values: [string]): string;
    encodeFunctionData(functionFragment: "promptAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "promptSecret", values: [string]): string;
    encodeFunctionData(functionFragment: "promptUint", values: [string]): string;
    encodeFunctionData(functionFragment: "readDir(string,uint64)", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "readDir(string,uint64,bool)", values: [string, BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: "readDir(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "readFile", values: [string]): string;
    encodeFunctionData(functionFragment: "readFileBinary", values: [string]): string;
    encodeFunctionData(functionFragment: "readLine", values: [string]): string;
    encodeFunctionData(functionFragment: "readLink", values: [string]): string;
    encodeFunctionData(functionFragment: "record", values?: undefined): string;
    encodeFunctionData(functionFragment: "recordLogs", values?: undefined): string;
    encodeFunctionData(functionFragment: "rememberKey", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeDir", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "removeFile", values: [string]): string;
    encodeFunctionData(functionFragment: "replace", values: [string, string, string]): string;
    encodeFunctionData(functionFragment: "resumeGasMetering", values?: undefined): string;
    encodeFunctionData(functionFragment: "rpc", values: [string, string]): string;
    encodeFunctionData(functionFragment: "rpcUrl", values: [string]): string;
    encodeFunctionData(functionFragment: "rpcUrlStructs", values?: undefined): string;
    encodeFunctionData(functionFragment: "rpcUrls", values?: undefined): string;
    encodeFunctionData(functionFragment: "serializeAddress(string,string,address[])", values: [string, string, AddressLike[]]): string;
    encodeFunctionData(functionFragment: "serializeAddress(string,string,address)", values: [string, string, AddressLike]): string;
    encodeFunctionData(functionFragment: "serializeBool(string,string,bool[])", values: [string, string, boolean[]]): string;
    encodeFunctionData(functionFragment: "serializeBool(string,string,bool)", values: [string, string, boolean]): string;
    encodeFunctionData(functionFragment: "serializeBytes(string,string,bytes[])", values: [string, string, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "serializeBytes(string,string,bytes)", values: [string, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "serializeBytes32(string,string,bytes32[])", values: [string, string, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "serializeBytes32(string,string,bytes32)", values: [string, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "serializeInt(string,string,int256)", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "serializeInt(string,string,int256[])", values: [string, string, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "serializeJson", values: [string, string]): string;
    encodeFunctionData(functionFragment: "serializeString(string,string,string[])", values: [string, string, string[]]): string;
    encodeFunctionData(functionFragment: "serializeString(string,string,string)", values: [string, string, string]): string;
    encodeFunctionData(functionFragment: "serializeUint(string,string,uint256)", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "serializeUint(string,string,uint256[])", values: [string, string, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "serializeUintToHex", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setEnv", values: [string, string]): string;
    encodeFunctionData(functionFragment: "sign(bytes32)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "sign(address,bytes32)", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "sign((address,uint256,uint256,uint256),bytes32)", values: [VmSafe.WalletStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "sign(uint256,bytes32)", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "signP256", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "sleep", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "split", values: [string, string]): string;
    encodeFunctionData(functionFragment: "startBroadcast()", values?: undefined): string;
    encodeFunctionData(functionFragment: "startBroadcast(address)", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "startBroadcast(uint256)", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "startMappingRecording", values?: undefined): string;
    encodeFunctionData(functionFragment: "startStateDiffRecording", values?: undefined): string;
    encodeFunctionData(functionFragment: "stopAndReturnStateDiff", values?: undefined): string;
    encodeFunctionData(functionFragment: "stopBroadcast", values?: undefined): string;
    encodeFunctionData(functionFragment: "stopMappingRecording", values?: undefined): string;
    encodeFunctionData(functionFragment: "toBase64(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "toBase64(bytes)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "toBase64URL(string)", values: [string]): string;
    encodeFunctionData(functionFragment: "toBase64URL(bytes)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "toLowercase", values: [string]): string;
    encodeFunctionData(functionFragment: "toString(address)", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "toString(uint256)", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "toString(bytes)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "toString(bool)", values: [boolean]): string;
    encodeFunctionData(functionFragment: "toString(int256)", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "toString(bytes32)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "toUppercase", values: [string]): string;
    encodeFunctionData(functionFragment: "trim", values: [string]): string;
    encodeFunctionData(functionFragment: "tryFfi", values: [string[]]): string;
    encodeFunctionData(functionFragment: "unixTime", values?: undefined): string;
    encodeFunctionData(functionFragment: "writeFile", values: [string, string]): string;
    encodeFunctionData(functionFragment: "writeFileBinary", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "writeJson(string,string,string)", values: [string, string, string]): string;
    encodeFunctionData(functionFragment: "writeJson(string,string)", values: [string, string]): string;
    encodeFunctionData(functionFragment: "writeLine", values: [string, string]): string;
    encodeFunctionData(functionFragment: "writeToml(string,string,string)", values: [string, string, string]): string;
    encodeFunctionData(functionFragment: "writeToml(string,string)", values: [string, string]): string;
    decodeFunctionResult(functionFragment: "accesses", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbs(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbs(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbs(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbs(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbsDecimal(int256,int256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqAbsDecimal(int256,int256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRel(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRel(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRel(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRel(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRelDecimal(int256,int256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertApproxEqRelDecimal(int256,int256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes32[],bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(int256[],int256[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(address,address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(address[],address[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(address[],address[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bool,bool,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(uint256[],uint256[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bool[],bool[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(int256[],int256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(int256,int256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(uint256[],uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes32,bytes32,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(string[],string[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes32[],bytes32[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes,bytes,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bool[],bool[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes[],bytes[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(string[],string[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bytes[],bytes[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(bool,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEq(int256,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEqDecimal(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEqDecimal(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEqDecimal(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertEqDecimal(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertFalse(bool,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertFalse(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGe(int256,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGe(int256,int256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGe(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGe(uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGeDecimal(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGeDecimal(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGeDecimal(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGeDecimal(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGt(int256,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGt(uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGt(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGt(int256,int256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGtDecimal(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGtDecimal(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGtDecimal(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertGtDecimal(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLe(int256,int256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLe(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLe(int256,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLe(uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLeDecimal(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLeDecimal(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLeDecimal(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLeDecimal(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLt(int256,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLt(uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLt(int256,int256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLt(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLtDecimal(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLtDecimal(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLtDecimal(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertLtDecimal(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes32[],bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(int256[],int256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bool,bool,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes[],bytes[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bool,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bool[],bool[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(address[],address[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(int256,int256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(uint256[],uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bool[],bool[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(address[],address[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(address,address,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes,bytes,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(uint256[],uint256[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes32,bytes32,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(string[],string[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes32[],bytes32[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(string[],string[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(int256[],int256[],string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(bytes[],bytes[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEq(int256,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEqDecimal(int256,int256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEqDecimal(int256,int256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEqDecimal(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertNotEqDecimal(uint256,uint256,uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertTrue(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assertTrue(bool,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assume", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "breakpoint(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "breakpoint(string,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "broadcast()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "broadcast(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "broadcast(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "closeFile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "computeCreate2Address(bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "computeCreate2Address(bytes32,bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "computeCreateAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "copyFile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createDir", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createWallet(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createWallet(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createWallet(uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deriveKey(string,string,uint32,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deriveKey(string,uint32,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deriveKey(string,uint32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deriveKey(string,string,uint32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ensNamehash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envAddress(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envAddress(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envBool(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envBool(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envBytes(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envBytes(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envBytes32(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envBytes32(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envInt(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envInt(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,int256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,bytes[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,string[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,address[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envOr(string,string,bool[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envString(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envString(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envUint(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "envUint(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eth_getLogs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ffi", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fsMetadata", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBlobBaseFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBlockNumber", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBlockTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeployedCode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLabel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMappingKeyAndParentOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMappingLength", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMappingSlotAt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNonce(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNonce((address,uint256,uint256,uint256))", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRecordedLogs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "indexOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isContext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isDir", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isFile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "keyExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "keyExistsJson", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "keyExistsToml", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "label", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lastCallGas", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "load", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseBool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseBytes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseBytes32", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseInt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJson(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJson(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonAddressArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonBool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonBoolArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonBytes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonBytes32", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonBytes32Array", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonBytesArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonInt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonIntArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonKeys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonString", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonStringArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonUint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseJsonUintArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseToml(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseToml(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlAddressArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlBool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlBoolArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlBytes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlBytes32", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlBytes32Array", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlBytesArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlInt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlIntArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlKeys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlString", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlStringArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlUint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseTomlUintArray", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseUint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pauseGasMetering", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "projectRoot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "prompt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "promptAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "promptSecret", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "promptUint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readDir(string,uint64)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readDir(string,uint64,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readDir(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readFile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readFileBinary", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readLine", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readLink", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "record", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recordLogs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rememberKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeDir", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeFile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "replace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resumeGasMetering", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rpc", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rpcUrl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rpcUrlStructs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rpcUrls", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeAddress(string,string,address[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeAddress(string,string,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeBool(string,string,bool[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeBool(string,string,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeBytes(string,string,bytes[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeBytes(string,string,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeBytes32(string,string,bytes32[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeBytes32(string,string,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeInt(string,string,int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeInt(string,string,int256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeJson", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeString(string,string,string[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeString(string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeUint(string,string,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeUint(string,string,uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serializeUintToHex", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setEnv", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sign(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sign(address,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sign((address,uint256,uint256,uint256),bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sign(uint256,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "signP256", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sleep", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "split", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startBroadcast()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startBroadcast(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startBroadcast(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startMappingRecording", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startStateDiffRecording", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stopAndReturnStateDiff", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stopBroadcast", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stopMappingRecording", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toBase64(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toBase64(bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toBase64URL(string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toBase64URL(bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toLowercase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toString(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toString(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toString(bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toString(bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toString(int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toString(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toUppercase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tryFfi", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unixTime", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeFile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeFileBinary", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeJson(string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeJson(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeLine", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeToml(string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "writeToml(string,string)", data: BytesLike): Result;
}
export interface VmSafe extends BaseContract {
    connect(runner?: ContractRunner | null): VmSafe;
    waitForDeployment(): Promise<this>;
    interface: VmSafeInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    accesses: TypedContractMethod<[
        target: AddressLike
    ], [
        [string[], string[]] & {
            readSlots: string[];
            writeSlots: string[];
        }
    ], "nonpayable">;
    addr: TypedContractMethod<[privateKey: BigNumberish], [string], "view">;
    "assertApproxEqAbs(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqAbs(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqAbs(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqAbs(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqAbsDecimal(int256,int256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqAbsDecimal(int256,int256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqRel(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqRel(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqRel(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqRel(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertApproxEqRelDecimal(int256,int256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertApproxEqRelDecimal(int256,int256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bytes32[],bytes32[])": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    "assertEq(int256[],int256[],string)": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(address,address,string)": TypedContractMethod<[
        left: AddressLike,
        right: AddressLike,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(string,string,string)": TypedContractMethod<[
        left: string,
        right: string,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(address[],address[])": TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[]
    ], [
        void
    ], "view">;
    "assertEq(address[],address[],string)": TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bool,bool,string)": TypedContractMethod<[
        left: boolean,
        right: boolean,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(address,address)": TypedContractMethod<[
        left: AddressLike,
        right: AddressLike
    ], [
        void
    ], "view">;
    "assertEq(uint256[],uint256[],string)": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bool[],bool[])": TypedContractMethod<[
        left: boolean[],
        right: boolean[]
    ], [
        void
    ], "view">;
    "assertEq(int256[],int256[])": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    "assertEq(int256,int256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bytes32,bytes32)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike
    ], [
        void
    ], "view">;
    "assertEq(uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(uint256[],uint256[])": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    "assertEq(bytes,bytes)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike
    ], [
        void
    ], "view">;
    "assertEq(uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertEq(bytes32,bytes32,string)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(string[],string[])": TypedContractMethod<[
        left: string[],
        right: string[]
    ], [
        void
    ], "view">;
    "assertEq(bytes32[],bytes32[],string)": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bytes,bytes,string)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bool[],bool[],string)": TypedContractMethod<[
        left: boolean[],
        right: boolean[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bytes[],bytes[])": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    "assertEq(string[],string[],string)": TypedContractMethod<[
        left: string[],
        right: string[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(string,string)": TypedContractMethod<[
        left: string,
        right: string
    ], [
        void
    ], "view">;
    "assertEq(bytes[],bytes[],string)": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    "assertEq(bool,bool)": TypedContractMethod<[
        left: boolean,
        right: boolean
    ], [
        void
    ], "view">;
    "assertEq(int256,int256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertEqDecimal(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertEqDecimal(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertEqDecimal(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertEqDecimal(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertFalse(bool,string)": TypedContractMethod<[
        condition: boolean,
        error: string
    ], [
        void
    ], "view">;
    "assertFalse(bool)": TypedContractMethod<[
        condition: boolean
    ], [
        void
    ], "view">;
    "assertGe(int256,int256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertGe(int256,int256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGe(uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertGe(uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGeDecimal(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertGeDecimal(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGeDecimal(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGeDecimal(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertGt(int256,int256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertGt(uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGt(uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertGt(int256,int256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGtDecimal(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGtDecimal(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertGtDecimal(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertGtDecimal(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertLe(int256,int256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLe(uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertLe(int256,int256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertLe(uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLeDecimal(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertLeDecimal(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLeDecimal(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLeDecimal(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertLt(int256,int256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertLt(uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLt(int256,int256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLt(uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertLtDecimal(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertLtDecimal(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLtDecimal(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertLtDecimal(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertNotEq(bytes32[],bytes32[])": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    "assertNotEq(int256[],int256[])": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    "assertNotEq(bool,bool,string)": TypedContractMethod<[
        left: boolean,
        right: boolean,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(bytes[],bytes[],string)": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(bool,bool)": TypedContractMethod<[
        left: boolean,
        right: boolean
    ], [
        void
    ], "view">;
    "assertNotEq(bool[],bool[])": TypedContractMethod<[
        left: boolean[],
        right: boolean[]
    ], [
        void
    ], "view">;
    "assertNotEq(bytes,bytes)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike
    ], [
        void
    ], "view">;
    "assertNotEq(address[],address[])": TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[]
    ], [
        void
    ], "view">;
    "assertNotEq(int256,int256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(uint256[],uint256[])": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    "assertNotEq(bool[],bool[],string)": TypedContractMethod<[
        left: boolean[],
        right: boolean[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(string,string)": TypedContractMethod<[
        left: string,
        right: string
    ], [
        void
    ], "view">;
    "assertNotEq(address[],address[],string)": TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(string,string,string)": TypedContractMethod<[
        left: string,
        right: string,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(address,address,string)": TypedContractMethod<[
        left: AddressLike,
        right: AddressLike,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(bytes32,bytes32)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike
    ], [
        void
    ], "view">;
    "assertNotEq(bytes,bytes,string)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(uint256[],uint256[],string)": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(address,address)": TypedContractMethod<[
        left: AddressLike,
        right: AddressLike
    ], [
        void
    ], "view">;
    "assertNotEq(bytes32,bytes32,string)": TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(string[],string[],string)": TypedContractMethod<[
        left: string[],
        right: string[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertNotEq(bytes32[],bytes32[],string)": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(string[],string[])": TypedContractMethod<[
        left: string[],
        right: string[]
    ], [
        void
    ], "view">;
    "assertNotEq(int256[],int256[],string)": TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    "assertNotEq(bytes[],bytes[])": TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    "assertNotEq(int256,int256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    "assertNotEqDecimal(int256,int256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertNotEqDecimal(int256,int256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertNotEqDecimal(uint256,uint256,uint256)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    "assertNotEqDecimal(uint256,uint256,uint256,string)": TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    "assertTrue(bool)": TypedContractMethod<[condition: boolean], [void], "view">;
    "assertTrue(bool,string)": TypedContractMethod<[
        condition: boolean,
        error: string
    ], [
        void
    ], "view">;
    assume: TypedContractMethod<[condition: boolean], [void], "view">;
    "breakpoint(string)": TypedContractMethod<[
        char: string
    ], [
        void
    ], "nonpayable">;
    "breakpoint(string,bool)": TypedContractMethod<[
        char: string,
        value: boolean
    ], [
        void
    ], "nonpayable">;
    "broadcast()": TypedContractMethod<[], [void], "nonpayable">;
    "broadcast(address)": TypedContractMethod<[
        signer: AddressLike
    ], [
        void
    ], "nonpayable">;
    "broadcast(uint256)": TypedContractMethod<[
        privateKey: BigNumberish
    ], [
        void
    ], "nonpayable">;
    closeFile: TypedContractMethod<[path: string], [void], "nonpayable">;
    "computeCreate2Address(bytes32,bytes32)": TypedContractMethod<[
        salt: BytesLike,
        initCodeHash: BytesLike
    ], [
        string
    ], "view">;
    "computeCreate2Address(bytes32,bytes32,address)": TypedContractMethod<[
        salt: BytesLike,
        initCodeHash: BytesLike,
        deployer: AddressLike
    ], [
        string
    ], "view">;
    computeCreateAddress: TypedContractMethod<[
        deployer: AddressLike,
        nonce: BigNumberish
    ], [
        string
    ], "view">;
    copyFile: TypedContractMethod<[
        from: string,
        to: string
    ], [
        bigint
    ], "nonpayable">;
    createDir: TypedContractMethod<[
        path: string,
        recursive: boolean
    ], [
        void
    ], "nonpayable">;
    "createWallet(string)": TypedContractMethod<[
        walletLabel: string
    ], [
        VmSafe.WalletStructOutput
    ], "nonpayable">;
    "createWallet(uint256)": TypedContractMethod<[
        privateKey: BigNumberish
    ], [
        VmSafe.WalletStructOutput
    ], "nonpayable">;
    "createWallet(uint256,string)": TypedContractMethod<[
        privateKey: BigNumberish,
        walletLabel: string
    ], [
        VmSafe.WalletStructOutput
    ], "nonpayable">;
    "deriveKey(string,string,uint32,string)": TypedContractMethod<[
        mnemonic: string,
        derivationPath: string,
        index: BigNumberish,
        language: string
    ], [
        bigint
    ], "view">;
    "deriveKey(string,uint32,string)": TypedContractMethod<[
        mnemonic: string,
        index: BigNumberish,
        language: string
    ], [
        bigint
    ], "view">;
    "deriveKey(string,uint32)": TypedContractMethod<[
        mnemonic: string,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    "deriveKey(string,string,uint32)": TypedContractMethod<[
        mnemonic: string,
        derivationPath: string,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    ensNamehash: TypedContractMethod<[name: string], [string], "view">;
    "envAddress(string)": TypedContractMethod<[name: string], [string], "view">;
    "envAddress(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        string[]
    ], "view">;
    "envBool(string)": TypedContractMethod<[name: string], [boolean], "view">;
    "envBool(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        boolean[]
    ], "view">;
    "envBytes(string)": TypedContractMethod<[name: string], [string], "view">;
    "envBytes(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        string[]
    ], "view">;
    "envBytes32(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        string[]
    ], "view">;
    "envBytes32(string)": TypedContractMethod<[name: string], [string], "view">;
    envExists: TypedContractMethod<[name: string], [boolean], "view">;
    "envInt(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        bigint[]
    ], "view">;
    "envInt(string)": TypedContractMethod<[name: string], [bigint], "view">;
    "envOr(string,string,bytes32[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BytesLike[]
    ], [
        string[]
    ], "view">;
    "envOr(string,string,int256[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    "envOr(string,bool)": TypedContractMethod<[
        name: string,
        defaultValue: boolean
    ], [
        boolean
    ], "view">;
    "envOr(string,address)": TypedContractMethod<[
        name: string,
        defaultValue: AddressLike
    ], [
        string
    ], "view">;
    "envOr(string,uint256)": TypedContractMethod<[
        name: string,
        defaultValue: BigNumberish
    ], [
        bigint
    ], "view">;
    "envOr(string,string,bytes[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BytesLike[]
    ], [
        string[]
    ], "view">;
    "envOr(string,string,uint256[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    "envOr(string,string,string[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: string[]
    ], [
        string[]
    ], "view">;
    "envOr(string,bytes)": TypedContractMethod<[
        name: string,
        defaultValue: BytesLike
    ], [
        string
    ], "view">;
    "envOr(string,bytes32)": TypedContractMethod<[
        name: string,
        defaultValue: BytesLike
    ], [
        string
    ], "view">;
    "envOr(string,int256)": TypedContractMethod<[
        name: string,
        defaultValue: BigNumberish
    ], [
        bigint
    ], "view">;
    "envOr(string,string,address[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: AddressLike[]
    ], [
        string[]
    ], "view">;
    "envOr(string,string)": TypedContractMethod<[
        name: string,
        defaultValue: string
    ], [
        string
    ], "view">;
    "envOr(string,string,bool[])": TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: boolean[]
    ], [
        boolean[]
    ], "view">;
    "envString(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        string[]
    ], "view">;
    "envString(string)": TypedContractMethod<[name: string], [string], "view">;
    "envUint(string)": TypedContractMethod<[name: string], [bigint], "view">;
    "envUint(string,string)": TypedContractMethod<[
        name: string,
        delim: string
    ], [
        bigint[]
    ], "view">;
    eth_getLogs: TypedContractMethod<[
        fromBlock: BigNumberish,
        toBlock: BigNumberish,
        target: AddressLike,
        topics: BytesLike[]
    ], [
        VmSafe.EthGetLogsStructOutput[]
    ], "nonpayable">;
    exists: TypedContractMethod<[path: string], [boolean], "nonpayable">;
    ffi: TypedContractMethod<[commandInput: string[]], [string], "nonpayable">;
    fsMetadata: TypedContractMethod<[
        path: string
    ], [
        VmSafe.FsMetadataStructOutput
    ], "view">;
    getBlobBaseFee: TypedContractMethod<[], [bigint], "view">;
    getBlockNumber: TypedContractMethod<[], [bigint], "view">;
    getBlockTimestamp: TypedContractMethod<[], [bigint], "view">;
    getCode: TypedContractMethod<[artifactPath: string], [string], "view">;
    getDeployedCode: TypedContractMethod<[
        artifactPath: string
    ], [
        string
    ], "view">;
    getLabel: TypedContractMethod<[account: AddressLike], [string], "view">;
    getMappingKeyAndParentOf: TypedContractMethod<[
        target: AddressLike,
        elementSlot: BytesLike
    ], [
        [
            boolean,
            string,
            string
        ] & {
            found: boolean;
            key: string;
            parent: string;
        }
    ], "nonpayable">;
    getMappingLength: TypedContractMethod<[
        target: AddressLike,
        mappingSlot: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    getMappingSlotAt: TypedContractMethod<[
        target: AddressLike,
        mappingSlot: BytesLike,
        idx: BigNumberish
    ], [
        string
    ], "nonpayable">;
    "getNonce(address)": TypedContractMethod<[
        account: AddressLike
    ], [
        bigint
    ], "view">;
    "getNonce((address,uint256,uint256,uint256))": TypedContractMethod<[
        wallet: VmSafe.WalletStruct
    ], [
        bigint
    ], "nonpayable">;
    getRecordedLogs: TypedContractMethod<[
    ], [
        VmSafe.LogStructOutput[]
    ], "nonpayable">;
    indexOf: TypedContractMethod<[input: string, key: string], [bigint], "view">;
    isContext: TypedContractMethod<[context: BigNumberish], [boolean], "view">;
    isDir: TypedContractMethod<[path: string], [boolean], "nonpayable">;
    isFile: TypedContractMethod<[path: string], [boolean], "nonpayable">;
    keyExists: TypedContractMethod<[
        json: string,
        key: string
    ], [
        boolean
    ], "view">;
    keyExistsJson: TypedContractMethod<[
        json: string,
        key: string
    ], [
        boolean
    ], "view">;
    keyExistsToml: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        boolean
    ], "view">;
    label: TypedContractMethod<[
        account: AddressLike,
        newLabel: string
    ], [
        void
    ], "nonpayable">;
    lastCallGas: TypedContractMethod<[], [VmSafe.GasStructOutput], "view">;
    load: TypedContractMethod<[
        target: AddressLike,
        slot: BytesLike
    ], [
        string
    ], "view">;
    parseAddress: TypedContractMethod<[
        stringifiedValue: string
    ], [
        string
    ], "view">;
    parseBool: TypedContractMethod<[stringifiedValue: string], [boolean], "view">;
    parseBytes: TypedContractMethod<[stringifiedValue: string], [string], "view">;
    parseBytes32: TypedContractMethod<[
        stringifiedValue: string
    ], [
        string
    ], "view">;
    parseInt: TypedContractMethod<[stringifiedValue: string], [bigint], "view">;
    "parseJson(string)": TypedContractMethod<[json: string], [string], "view">;
    "parseJson(string,string)": TypedContractMethod<[
        json: string,
        key: string
    ], [
        string
    ], "view">;
    parseJsonAddress: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string
    ], "view">;
    parseJsonAddressArray: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseJsonBool: TypedContractMethod<[
        json: string,
        key: string
    ], [
        boolean
    ], "view">;
    parseJsonBoolArray: TypedContractMethod<[
        json: string,
        key: string
    ], [
        boolean[]
    ], "view">;
    parseJsonBytes: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string
    ], "view">;
    parseJsonBytes32: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string
    ], "view">;
    parseJsonBytes32Array: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseJsonBytesArray: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseJsonInt: TypedContractMethod<[
        json: string,
        key: string
    ], [
        bigint
    ], "view">;
    parseJsonIntArray: TypedContractMethod<[
        json: string,
        key: string
    ], [
        bigint[]
    ], "view">;
    parseJsonKeys: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseJsonString: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string
    ], "view">;
    parseJsonStringArray: TypedContractMethod<[
        json: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseJsonUint: TypedContractMethod<[
        json: string,
        key: string
    ], [
        bigint
    ], "view">;
    parseJsonUintArray: TypedContractMethod<[
        json: string,
        key: string
    ], [
        bigint[]
    ], "view">;
    "parseToml(string,string)": TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string
    ], "view">;
    "parseToml(string)": TypedContractMethod<[toml: string], [string], "view">;
    parseTomlAddress: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string
    ], "view">;
    parseTomlAddressArray: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseTomlBool: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        boolean
    ], "view">;
    parseTomlBoolArray: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        boolean[]
    ], "view">;
    parseTomlBytes: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string
    ], "view">;
    parseTomlBytes32: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string
    ], "view">;
    parseTomlBytes32Array: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseTomlBytesArray: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseTomlInt: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        bigint
    ], "view">;
    parseTomlIntArray: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        bigint[]
    ], "view">;
    parseTomlKeys: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseTomlString: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string
    ], "view">;
    parseTomlStringArray: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        string[]
    ], "view">;
    parseTomlUint: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        bigint
    ], "view">;
    parseTomlUintArray: TypedContractMethod<[
        toml: string,
        key: string
    ], [
        bigint[]
    ], "view">;
    parseUint: TypedContractMethod<[stringifiedValue: string], [bigint], "view">;
    pauseGasMetering: TypedContractMethod<[], [void], "nonpayable">;
    projectRoot: TypedContractMethod<[], [string], "view">;
    prompt: TypedContractMethod<[promptText: string], [string], "nonpayable">;
    promptAddress: TypedContractMethod<[
        promptText: string
    ], [
        string
    ], "nonpayable">;
    promptSecret: TypedContractMethod<[
        promptText: string
    ], [
        string
    ], "nonpayable">;
    promptUint: TypedContractMethod<[promptText: string], [bigint], "nonpayable">;
    "readDir(string,uint64)": TypedContractMethod<[
        path: string,
        maxDepth: BigNumberish
    ], [
        VmSafe.DirEntryStructOutput[]
    ], "view">;
    "readDir(string,uint64,bool)": TypedContractMethod<[
        path: string,
        maxDepth: BigNumberish,
        followLinks: boolean
    ], [
        VmSafe.DirEntryStructOutput[]
    ], "view">;
    "readDir(string)": TypedContractMethod<[
        path: string
    ], [
        VmSafe.DirEntryStructOutput[]
    ], "view">;
    readFile: TypedContractMethod<[path: string], [string], "view">;
    readFileBinary: TypedContractMethod<[path: string], [string], "view">;
    readLine: TypedContractMethod<[path: string], [string], "view">;
    readLink: TypedContractMethod<[linkPath: string], [string], "view">;
    record: TypedContractMethod<[], [void], "nonpayable">;
    recordLogs: TypedContractMethod<[], [void], "nonpayable">;
    rememberKey: TypedContractMethod<[
        privateKey: BigNumberish
    ], [
        string
    ], "nonpayable">;
    removeDir: TypedContractMethod<[
        path: string,
        recursive: boolean
    ], [
        void
    ], "nonpayable">;
    removeFile: TypedContractMethod<[path: string], [void], "nonpayable">;
    replace: TypedContractMethod<[
        input: string,
        from: string,
        to: string
    ], [
        string
    ], "view">;
    resumeGasMetering: TypedContractMethod<[], [void], "nonpayable">;
    rpc: TypedContractMethod<[
        method: string,
        params: string
    ], [
        string
    ], "nonpayable">;
    rpcUrl: TypedContractMethod<[rpcAlias: string], [string], "view">;
    rpcUrlStructs: TypedContractMethod<[], [VmSafe.RpcStructOutput[]], "view">;
    rpcUrls: TypedContractMethod<[], [[string, string][]], "view">;
    "serializeAddress(string,string,address[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: AddressLike[]
    ], [
        string
    ], "nonpayable">;
    "serializeAddress(string,string,address)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: AddressLike
    ], [
        string
    ], "nonpayable">;
    "serializeBool(string,string,bool[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: boolean[]
    ], [
        string
    ], "nonpayable">;
    "serializeBool(string,string,bool)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: boolean
    ], [
        string
    ], "nonpayable">;
    "serializeBytes(string,string,bytes[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BytesLike[]
    ], [
        string
    ], "nonpayable">;
    "serializeBytes(string,string,bytes)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BytesLike
    ], [
        string
    ], "nonpayable">;
    "serializeBytes32(string,string,bytes32[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BytesLike[]
    ], [
        string
    ], "nonpayable">;
    "serializeBytes32(string,string,bytes32)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BytesLike
    ], [
        string
    ], "nonpayable">;
    "serializeInt(string,string,int256)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BigNumberish
    ], [
        string
    ], "nonpayable">;
    "serializeInt(string,string,int256[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BigNumberish[]
    ], [
        string
    ], "nonpayable">;
    serializeJson: TypedContractMethod<[
        objectKey: string,
        value: string
    ], [
        string
    ], "nonpayable">;
    "serializeString(string,string,string[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: string[]
    ], [
        string
    ], "nonpayable">;
    "serializeString(string,string,string)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: string
    ], [
        string
    ], "nonpayable">;
    "serializeUint(string,string,uint256)": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BigNumberish
    ], [
        string
    ], "nonpayable">;
    "serializeUint(string,string,uint256[])": TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BigNumberish[]
    ], [
        string
    ], "nonpayable">;
    serializeUintToHex: TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BigNumberish
    ], [
        string
    ], "nonpayable">;
    setEnv: TypedContractMethod<[
        name: string,
        value: string
    ], [
        void
    ], "nonpayable">;
    "sign(bytes32)": TypedContractMethod<[
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "view">;
    "sign(address,bytes32)": TypedContractMethod<[
        signer: AddressLike,
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "view">;
    "sign((address,uint256,uint256,uint256),bytes32)": TypedContractMethod<[
        wallet: VmSafe.WalletStruct,
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "nonpayable">;
    "sign(uint256,bytes32)": TypedContractMethod<[
        privateKey: BigNumberish,
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "view">;
    signP256: TypedContractMethod<[
        privateKey: BigNumberish,
        digest: BytesLike
    ], [
        [string, string] & {
            r: string;
            s: string;
        }
    ], "view">;
    sleep: TypedContractMethod<[duration: BigNumberish], [void], "nonpayable">;
    split: TypedContractMethod<[
        input: string,
        delimiter: string
    ], [
        string[]
    ], "view">;
    "startBroadcast()": TypedContractMethod<[], [void], "nonpayable">;
    "startBroadcast(address)": TypedContractMethod<[
        signer: AddressLike
    ], [
        void
    ], "nonpayable">;
    "startBroadcast(uint256)": TypedContractMethod<[
        privateKey: BigNumberish
    ], [
        void
    ], "nonpayable">;
    startMappingRecording: TypedContractMethod<[], [void], "nonpayable">;
    startStateDiffRecording: TypedContractMethod<[], [void], "nonpayable">;
    stopAndReturnStateDiff: TypedContractMethod<[
    ], [
        VmSafe.AccountAccessStructOutput[]
    ], "nonpayable">;
    stopBroadcast: TypedContractMethod<[], [void], "nonpayable">;
    stopMappingRecording: TypedContractMethod<[], [void], "nonpayable">;
    "toBase64(string)": TypedContractMethod<[data: string], [string], "view">;
    "toBase64(bytes)": TypedContractMethod<[data: BytesLike], [string], "view">;
    "toBase64URL(string)": TypedContractMethod<[data: string], [string], "view">;
    "toBase64URL(bytes)": TypedContractMethod<[
        data: BytesLike
    ], [
        string
    ], "view">;
    toLowercase: TypedContractMethod<[input: string], [string], "view">;
    "toString(address)": TypedContractMethod<[
        value: AddressLike
    ], [
        string
    ], "view">;
    "toString(uint256)": TypedContractMethod<[
        value: BigNumberish
    ], [
        string
    ], "view">;
    "toString(bytes)": TypedContractMethod<[value: BytesLike], [string], "view">;
    "toString(bool)": TypedContractMethod<[value: boolean], [string], "view">;
    "toString(int256)": TypedContractMethod<[
        value: BigNumberish
    ], [
        string
    ], "view">;
    "toString(bytes32)": TypedContractMethod<[
        value: BytesLike
    ], [
        string
    ], "view">;
    toUppercase: TypedContractMethod<[input: string], [string], "view">;
    trim: TypedContractMethod<[input: string], [string], "view">;
    tryFfi: TypedContractMethod<[
        commandInput: string[]
    ], [
        VmSafe.FfiResultStructOutput
    ], "nonpayable">;
    unixTime: TypedContractMethod<[], [bigint], "nonpayable">;
    writeFile: TypedContractMethod<[
        path: string,
        data: string
    ], [
        void
    ], "nonpayable">;
    writeFileBinary: TypedContractMethod<[
        path: string,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    "writeJson(string,string,string)": TypedContractMethod<[
        json: string,
        path: string,
        valueKey: string
    ], [
        void
    ], "nonpayable">;
    "writeJson(string,string)": TypedContractMethod<[
        json: string,
        path: string
    ], [
        void
    ], "nonpayable">;
    writeLine: TypedContractMethod<[
        path: string,
        data: string
    ], [
        void
    ], "nonpayable">;
    "writeToml(string,string,string)": TypedContractMethod<[
        json: string,
        path: string,
        valueKey: string
    ], [
        void
    ], "nonpayable">;
    "writeToml(string,string)": TypedContractMethod<[
        json: string,
        path: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "accesses"): TypedContractMethod<[
        target: AddressLike
    ], [
        [string[], string[]] & {
            readSlots: string[];
            writeSlots: string[];
        }
    ], "nonpayable">;
    getFunction(nameOrSignature: "addr"): TypedContractMethod<[privateKey: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbs(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbs(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbs(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbs(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbsDecimal(int256,int256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbsDecimal(uint256,uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqAbsDecimal(int256,int256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRel(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRel(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRel(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRel(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRelDecimal(uint256,uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRelDecimal(int256,int256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertApproxEqRelDecimal(int256,int256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        maxPercentDelta: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bytes32[],bytes32[])"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(int256[],int256[],string)"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(address,address,string)"): TypedContractMethod<[
        left: AddressLike,
        right: AddressLike,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(string,string,string)"): TypedContractMethod<[
        left: string,
        right: string,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(address[],address[])"): TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(address[],address[],string)"): TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bool,bool,string)"): TypedContractMethod<[
        left: boolean,
        right: boolean,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(address,address)"): TypedContractMethod<[
        left: AddressLike,
        right: AddressLike
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(uint256[],uint256[],string)"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bool[],bool[])"): TypedContractMethod<[left: boolean[], right: boolean[]], [void], "view">;
    getFunction(nameOrSignature: "assertEq(int256[],int256[])"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(int256,int256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bytes32,bytes32)"): TypedContractMethod<[left: BytesLike, right: BytesLike], [void], "view">;
    getFunction(nameOrSignature: "assertEq(uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(uint256[],uint256[])"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bytes,bytes)"): TypedContractMethod<[left: BytesLike, right: BytesLike], [void], "view">;
    getFunction(nameOrSignature: "assertEq(uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bytes32,bytes32,string)"): TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(string[],string[])"): TypedContractMethod<[left: string[], right: string[]], [void], "view">;
    getFunction(nameOrSignature: "assertEq(bytes32[],bytes32[],string)"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bytes,bytes,string)"): TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bool[],bool[],string)"): TypedContractMethod<[
        left: boolean[],
        right: boolean[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bytes[],bytes[])"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(string[],string[],string)"): TypedContractMethod<[
        left: string[],
        right: string[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(string,string)"): TypedContractMethod<[left: string, right: string], [void], "view">;
    getFunction(nameOrSignature: "assertEq(bytes[],bytes[],string)"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEq(bool,bool)"): TypedContractMethod<[left: boolean, right: boolean], [void], "view">;
    getFunction(nameOrSignature: "assertEq(int256,int256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEqDecimal(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEqDecimal(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEqDecimal(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertEqDecimal(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertFalse(bool,string)"): TypedContractMethod<[condition: boolean, error: string], [void], "view">;
    getFunction(nameOrSignature: "assertFalse(bool)"): TypedContractMethod<[condition: boolean], [void], "view">;
    getFunction(nameOrSignature: "assertGe(int256,int256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGe(int256,int256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGe(uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGe(uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGeDecimal(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGeDecimal(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGeDecimal(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGeDecimal(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGt(int256,int256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGt(uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGt(uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGt(int256,int256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGtDecimal(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGtDecimal(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGtDecimal(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertGtDecimal(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLe(int256,int256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLe(uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLe(int256,int256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLe(uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLeDecimal(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLeDecimal(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLeDecimal(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLeDecimal(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLt(int256,int256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLt(uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLt(int256,int256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLt(uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLtDecimal(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLtDecimal(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLtDecimal(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertLtDecimal(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes32[],bytes32[])"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(int256[],int256[])"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bool,bool,string)"): TypedContractMethod<[
        left: boolean,
        right: boolean,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes[],bytes[],string)"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bool,bool)"): TypedContractMethod<[left: boolean, right: boolean], [void], "view">;
    getFunction(nameOrSignature: "assertNotEq(bool[],bool[])"): TypedContractMethod<[left: boolean[], right: boolean[]], [void], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes,bytes)"): TypedContractMethod<[left: BytesLike, right: BytesLike], [void], "view">;
    getFunction(nameOrSignature: "assertNotEq(address[],address[])"): TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(int256,int256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(uint256[],uint256[])"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bool[],bool[],string)"): TypedContractMethod<[
        left: boolean[],
        right: boolean[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(string,string)"): TypedContractMethod<[left: string, right: string], [void], "view">;
    getFunction(nameOrSignature: "assertNotEq(address[],address[],string)"): TypedContractMethod<[
        left: AddressLike[],
        right: AddressLike[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(string,string,string)"): TypedContractMethod<[
        left: string,
        right: string,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(address,address,string)"): TypedContractMethod<[
        left: AddressLike,
        right: AddressLike,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes32,bytes32)"): TypedContractMethod<[left: BytesLike, right: BytesLike], [void], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes,bytes,string)"): TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(uint256[],uint256[],string)"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(address,address)"): TypedContractMethod<[
        left: AddressLike,
        right: AddressLike
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes32,bytes32,string)"): TypedContractMethod<[
        left: BytesLike,
        right: BytesLike,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(string[],string[],string)"): TypedContractMethod<[
        left: string[],
        right: string[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes32[],bytes32[],string)"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(string[],string[])"): TypedContractMethod<[left: string[], right: string[]], [void], "view">;
    getFunction(nameOrSignature: "assertNotEq(int256[],int256[],string)"): TypedContractMethod<[
        left: BigNumberish[],
        right: BigNumberish[],
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(bytes[],bytes[])"): TypedContractMethod<[
        left: BytesLike[],
        right: BytesLike[]
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEq(int256,int256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEqDecimal(int256,int256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEqDecimal(int256,int256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEqDecimal(uint256,uint256,uint256)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertNotEqDecimal(uint256,uint256,uint256,string)"): TypedContractMethod<[
        left: BigNumberish,
        right: BigNumberish,
        decimals: BigNumberish,
        error: string
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "assertTrue(bool)"): TypedContractMethod<[condition: boolean], [void], "view">;
    getFunction(nameOrSignature: "assertTrue(bool,string)"): TypedContractMethod<[condition: boolean, error: string], [void], "view">;
    getFunction(nameOrSignature: "assume"): TypedContractMethod<[condition: boolean], [void], "view">;
    getFunction(nameOrSignature: "breakpoint(string)"): TypedContractMethod<[char: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "breakpoint(string,bool)"): TypedContractMethod<[char: string, value: boolean], [void], "nonpayable">;
    getFunction(nameOrSignature: "broadcast()"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "broadcast(address)"): TypedContractMethod<[signer: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "broadcast(uint256)"): TypedContractMethod<[privateKey: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "closeFile"): TypedContractMethod<[path: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "computeCreate2Address(bytes32,bytes32)"): TypedContractMethod<[
        salt: BytesLike,
        initCodeHash: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "computeCreate2Address(bytes32,bytes32,address)"): TypedContractMethod<[
        salt: BytesLike,
        initCodeHash: BytesLike,
        deployer: AddressLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "computeCreateAddress"): TypedContractMethod<[
        deployer: AddressLike,
        nonce: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "copyFile"): TypedContractMethod<[from: string, to: string], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "createDir"): TypedContractMethod<[
        path: string,
        recursive: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "createWallet(string)"): TypedContractMethod<[
        walletLabel: string
    ], [
        VmSafe.WalletStructOutput
    ], "nonpayable">;
    getFunction(nameOrSignature: "createWallet(uint256)"): TypedContractMethod<[
        privateKey: BigNumberish
    ], [
        VmSafe.WalletStructOutput
    ], "nonpayable">;
    getFunction(nameOrSignature: "createWallet(uint256,string)"): TypedContractMethod<[
        privateKey: BigNumberish,
        walletLabel: string
    ], [
        VmSafe.WalletStructOutput
    ], "nonpayable">;
    getFunction(nameOrSignature: "deriveKey(string,string,uint32,string)"): TypedContractMethod<[
        mnemonic: string,
        derivationPath: string,
        index: BigNumberish,
        language: string
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "deriveKey(string,uint32,string)"): TypedContractMethod<[
        mnemonic: string,
        index: BigNumberish,
        language: string
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "deriveKey(string,uint32)"): TypedContractMethod<[
        mnemonic: string,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "deriveKey(string,string,uint32)"): TypedContractMethod<[
        mnemonic: string,
        derivationPath: string,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "ensNamehash"): TypedContractMethod<[name: string], [string], "view">;
    getFunction(nameOrSignature: "envAddress(string)"): TypedContractMethod<[name: string], [string], "view">;
    getFunction(nameOrSignature: "envAddress(string,string)"): TypedContractMethod<[name: string, delim: string], [string[]], "view">;
    getFunction(nameOrSignature: "envBool(string)"): TypedContractMethod<[name: string], [boolean], "view">;
    getFunction(nameOrSignature: "envBool(string,string)"): TypedContractMethod<[name: string, delim: string], [boolean[]], "view">;
    getFunction(nameOrSignature: "envBytes(string)"): TypedContractMethod<[name: string], [string], "view">;
    getFunction(nameOrSignature: "envBytes(string,string)"): TypedContractMethod<[name: string, delim: string], [string[]], "view">;
    getFunction(nameOrSignature: "envBytes32(string,string)"): TypedContractMethod<[name: string, delim: string], [string[]], "view">;
    getFunction(nameOrSignature: "envBytes32(string)"): TypedContractMethod<[name: string], [string], "view">;
    getFunction(nameOrSignature: "envExists"): TypedContractMethod<[name: string], [boolean], "view">;
    getFunction(nameOrSignature: "envInt(string,string)"): TypedContractMethod<[name: string, delim: string], [bigint[]], "view">;
    getFunction(nameOrSignature: "envInt(string)"): TypedContractMethod<[name: string], [bigint], "view">;
    getFunction(nameOrSignature: "envOr(string,string,bytes32[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BytesLike[]
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string,int256[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,bool)"): TypedContractMethod<[
        name: string,
        defaultValue: boolean
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,address)"): TypedContractMethod<[
        name: string,
        defaultValue: AddressLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,uint256)"): TypedContractMethod<[
        name: string,
        defaultValue: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string,bytes[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BytesLike[]
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string,uint256[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string,string[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: string[]
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,bytes)"): TypedContractMethod<[
        name: string,
        defaultValue: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,bytes32)"): TypedContractMethod<[
        name: string,
        defaultValue: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,int256)"): TypedContractMethod<[
        name: string,
        defaultValue: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string,address[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: AddressLike[]
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string)"): TypedContractMethod<[
        name: string,
        defaultValue: string
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "envOr(string,string,bool[])"): TypedContractMethod<[
        name: string,
        delim: string,
        defaultValue: boolean[]
    ], [
        boolean[]
    ], "view">;
    getFunction(nameOrSignature: "envString(string,string)"): TypedContractMethod<[name: string, delim: string], [string[]], "view">;
    getFunction(nameOrSignature: "envString(string)"): TypedContractMethod<[name: string], [string], "view">;
    getFunction(nameOrSignature: "envUint(string)"): TypedContractMethod<[name: string], [bigint], "view">;
    getFunction(nameOrSignature: "envUint(string,string)"): TypedContractMethod<[name: string, delim: string], [bigint[]], "view">;
    getFunction(nameOrSignature: "eth_getLogs"): TypedContractMethod<[
        fromBlock: BigNumberish,
        toBlock: BigNumberish,
        target: AddressLike,
        topics: BytesLike[]
    ], [
        VmSafe.EthGetLogsStructOutput[]
    ], "nonpayable">;
    getFunction(nameOrSignature: "exists"): TypedContractMethod<[path: string], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "ffi"): TypedContractMethod<[commandInput: string[]], [string], "nonpayable">;
    getFunction(nameOrSignature: "fsMetadata"): TypedContractMethod<[
        path: string
    ], [
        VmSafe.FsMetadataStructOutput
    ], "view">;
    getFunction(nameOrSignature: "getBlobBaseFee"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getBlockNumber"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getBlockTimestamp"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getCode"): TypedContractMethod<[artifactPath: string], [string], "view">;
    getFunction(nameOrSignature: "getDeployedCode"): TypedContractMethod<[artifactPath: string], [string], "view">;
    getFunction(nameOrSignature: "getLabel"): TypedContractMethod<[account: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "getMappingKeyAndParentOf"): TypedContractMethod<[
        target: AddressLike,
        elementSlot: BytesLike
    ], [
        [
            boolean,
            string,
            string
        ] & {
            found: boolean;
            key: string;
            parent: string;
        }
    ], "nonpayable">;
    getFunction(nameOrSignature: "getMappingLength"): TypedContractMethod<[
        target: AddressLike,
        mappingSlot: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "getMappingSlotAt"): TypedContractMethod<[
        target: AddressLike,
        mappingSlot: BytesLike,
        idx: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "getNonce(address)"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getNonce((address,uint256,uint256,uint256))"): TypedContractMethod<[wallet: VmSafe.WalletStruct], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "getRecordedLogs"): TypedContractMethod<[], [VmSafe.LogStructOutput[]], "nonpayable">;
    getFunction(nameOrSignature: "indexOf"): TypedContractMethod<[input: string, key: string], [bigint], "view">;
    getFunction(nameOrSignature: "isContext"): TypedContractMethod<[context: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "isDir"): TypedContractMethod<[path: string], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "isFile"): TypedContractMethod<[path: string], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "keyExists"): TypedContractMethod<[json: string, key: string], [boolean], "view">;
    getFunction(nameOrSignature: "keyExistsJson"): TypedContractMethod<[json: string, key: string], [boolean], "view">;
    getFunction(nameOrSignature: "keyExistsToml"): TypedContractMethod<[toml: string, key: string], [boolean], "view">;
    getFunction(nameOrSignature: "label"): TypedContractMethod<[
        account: AddressLike,
        newLabel: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "lastCallGas"): TypedContractMethod<[], [VmSafe.GasStructOutput], "view">;
    getFunction(nameOrSignature: "load"): TypedContractMethod<[
        target: AddressLike,
        slot: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "parseAddress"): TypedContractMethod<[stringifiedValue: string], [string], "view">;
    getFunction(nameOrSignature: "parseBool"): TypedContractMethod<[stringifiedValue: string], [boolean], "view">;
    getFunction(nameOrSignature: "parseBytes"): TypedContractMethod<[stringifiedValue: string], [string], "view">;
    getFunction(nameOrSignature: "parseBytes32"): TypedContractMethod<[stringifiedValue: string], [string], "view">;
    getFunction(nameOrSignature: "parseInt"): TypedContractMethod<[stringifiedValue: string], [bigint], "view">;
    getFunction(nameOrSignature: "parseJson(string)"): TypedContractMethod<[json: string], [string], "view">;
    getFunction(nameOrSignature: "parseJson(string,string)"): TypedContractMethod<[json: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseJsonAddress"): TypedContractMethod<[json: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseJsonAddressArray"): TypedContractMethod<[json: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseJsonBool"): TypedContractMethod<[json: string, key: string], [boolean], "view">;
    getFunction(nameOrSignature: "parseJsonBoolArray"): TypedContractMethod<[json: string, key: string], [boolean[]], "view">;
    getFunction(nameOrSignature: "parseJsonBytes"): TypedContractMethod<[json: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseJsonBytes32"): TypedContractMethod<[json: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseJsonBytes32Array"): TypedContractMethod<[json: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseJsonBytesArray"): TypedContractMethod<[json: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseJsonInt"): TypedContractMethod<[json: string, key: string], [bigint], "view">;
    getFunction(nameOrSignature: "parseJsonIntArray"): TypedContractMethod<[json: string, key: string], [bigint[]], "view">;
    getFunction(nameOrSignature: "parseJsonKeys"): TypedContractMethod<[json: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseJsonString"): TypedContractMethod<[json: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseJsonStringArray"): TypedContractMethod<[json: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseJsonUint"): TypedContractMethod<[json: string, key: string], [bigint], "view">;
    getFunction(nameOrSignature: "parseJsonUintArray"): TypedContractMethod<[json: string, key: string], [bigint[]], "view">;
    getFunction(nameOrSignature: "parseToml(string,string)"): TypedContractMethod<[toml: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseToml(string)"): TypedContractMethod<[toml: string], [string], "view">;
    getFunction(nameOrSignature: "parseTomlAddress"): TypedContractMethod<[toml: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseTomlAddressArray"): TypedContractMethod<[toml: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseTomlBool"): TypedContractMethod<[toml: string, key: string], [boolean], "view">;
    getFunction(nameOrSignature: "parseTomlBoolArray"): TypedContractMethod<[toml: string, key: string], [boolean[]], "view">;
    getFunction(nameOrSignature: "parseTomlBytes"): TypedContractMethod<[toml: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseTomlBytes32"): TypedContractMethod<[toml: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseTomlBytes32Array"): TypedContractMethod<[toml: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseTomlBytesArray"): TypedContractMethod<[toml: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseTomlInt"): TypedContractMethod<[toml: string, key: string], [bigint], "view">;
    getFunction(nameOrSignature: "parseTomlIntArray"): TypedContractMethod<[toml: string, key: string], [bigint[]], "view">;
    getFunction(nameOrSignature: "parseTomlKeys"): TypedContractMethod<[toml: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseTomlString"): TypedContractMethod<[toml: string, key: string], [string], "view">;
    getFunction(nameOrSignature: "parseTomlStringArray"): TypedContractMethod<[toml: string, key: string], [string[]], "view">;
    getFunction(nameOrSignature: "parseTomlUint"): TypedContractMethod<[toml: string, key: string], [bigint], "view">;
    getFunction(nameOrSignature: "parseTomlUintArray"): TypedContractMethod<[toml: string, key: string], [bigint[]], "view">;
    getFunction(nameOrSignature: "parseUint"): TypedContractMethod<[stringifiedValue: string], [bigint], "view">;
    getFunction(nameOrSignature: "pauseGasMetering"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "projectRoot"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "prompt"): TypedContractMethod<[promptText: string], [string], "nonpayable">;
    getFunction(nameOrSignature: "promptAddress"): TypedContractMethod<[promptText: string], [string], "nonpayable">;
    getFunction(nameOrSignature: "promptSecret"): TypedContractMethod<[promptText: string], [string], "nonpayable">;
    getFunction(nameOrSignature: "promptUint"): TypedContractMethod<[promptText: string], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "readDir(string,uint64)"): TypedContractMethod<[
        path: string,
        maxDepth: BigNumberish
    ], [
        VmSafe.DirEntryStructOutput[]
    ], "view">;
    getFunction(nameOrSignature: "readDir(string,uint64,bool)"): TypedContractMethod<[
        path: string,
        maxDepth: BigNumberish,
        followLinks: boolean
    ], [
        VmSafe.DirEntryStructOutput[]
    ], "view">;
    getFunction(nameOrSignature: "readDir(string)"): TypedContractMethod<[
        path: string
    ], [
        VmSafe.DirEntryStructOutput[]
    ], "view">;
    getFunction(nameOrSignature: "readFile"): TypedContractMethod<[path: string], [string], "view">;
    getFunction(nameOrSignature: "readFileBinary"): TypedContractMethod<[path: string], [string], "view">;
    getFunction(nameOrSignature: "readLine"): TypedContractMethod<[path: string], [string], "view">;
    getFunction(nameOrSignature: "readLink"): TypedContractMethod<[linkPath: string], [string], "view">;
    getFunction(nameOrSignature: "record"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "recordLogs"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "rememberKey"): TypedContractMethod<[privateKey: BigNumberish], [string], "nonpayable">;
    getFunction(nameOrSignature: "removeDir"): TypedContractMethod<[
        path: string,
        recursive: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "removeFile"): TypedContractMethod<[path: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "replace"): TypedContractMethod<[
        input: string,
        from: string,
        to: string
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "resumeGasMetering"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "rpc"): TypedContractMethod<[
        method: string,
        params: string
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "rpcUrl"): TypedContractMethod<[rpcAlias: string], [string], "view">;
    getFunction(nameOrSignature: "rpcUrlStructs"): TypedContractMethod<[], [VmSafe.RpcStructOutput[]], "view">;
    getFunction(nameOrSignature: "rpcUrls"): TypedContractMethod<[], [[string, string][]], "view">;
    getFunction(nameOrSignature: "serializeAddress(string,string,address[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: AddressLike[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeAddress(string,string,address)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: AddressLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeBool(string,string,bool[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: boolean[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeBool(string,string,bool)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: boolean
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeBytes(string,string,bytes[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BytesLike[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeBytes(string,string,bytes)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeBytes32(string,string,bytes32[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BytesLike[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeBytes32(string,string,bytes32)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeInt(string,string,int256)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeInt(string,string,int256[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BigNumberish[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeJson"): TypedContractMethod<[
        objectKey: string,
        value: string
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeString(string,string,string[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: string[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeString(string,string,string)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: string
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeUint(string,string,uint256)"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeUint(string,string,uint256[])"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        values: BigNumberish[]
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "serializeUintToHex"): TypedContractMethod<[
        objectKey: string,
        valueKey: string,
        value: BigNumberish
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "setEnv"): TypedContractMethod<[name: string, value: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "sign(bytes32)"): TypedContractMethod<[
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "sign(address,bytes32)"): TypedContractMethod<[
        signer: AddressLike,
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "sign((address,uint256,uint256,uint256),bytes32)"): TypedContractMethod<[
        wallet: VmSafe.WalletStruct,
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "nonpayable">;
    getFunction(nameOrSignature: "sign(uint256,bytes32)"): TypedContractMethod<[
        privateKey: BigNumberish,
        digest: BytesLike
    ], [
        [bigint, string, string] & {
            v: bigint;
            r: string;
            s: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "signP256"): TypedContractMethod<[
        privateKey: BigNumberish,
        digest: BytesLike
    ], [
        [string, string] & {
            r: string;
            s: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "sleep"): TypedContractMethod<[duration: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "split"): TypedContractMethod<[
        input: string,
        delimiter: string
    ], [
        string[]
    ], "view">;
    getFunction(nameOrSignature: "startBroadcast()"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "startBroadcast(address)"): TypedContractMethod<[signer: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "startBroadcast(uint256)"): TypedContractMethod<[privateKey: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "startMappingRecording"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "startStateDiffRecording"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "stopAndReturnStateDiff"): TypedContractMethod<[
    ], [
        VmSafe.AccountAccessStructOutput[]
    ], "nonpayable">;
    getFunction(nameOrSignature: "stopBroadcast"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "stopMappingRecording"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "toBase64(string)"): TypedContractMethod<[data: string], [string], "view">;
    getFunction(nameOrSignature: "toBase64(bytes)"): TypedContractMethod<[data: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "toBase64URL(string)"): TypedContractMethod<[data: string], [string], "view">;
    getFunction(nameOrSignature: "toBase64URL(bytes)"): TypedContractMethod<[data: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "toLowercase"): TypedContractMethod<[input: string], [string], "view">;
    getFunction(nameOrSignature: "toString(address)"): TypedContractMethod<[value: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "toString(uint256)"): TypedContractMethod<[value: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "toString(bytes)"): TypedContractMethod<[value: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "toString(bool)"): TypedContractMethod<[value: boolean], [string], "view">;
    getFunction(nameOrSignature: "toString(int256)"): TypedContractMethod<[value: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "toString(bytes32)"): TypedContractMethod<[value: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "toUppercase"): TypedContractMethod<[input: string], [string], "view">;
    getFunction(nameOrSignature: "trim"): TypedContractMethod<[input: string], [string], "view">;
    getFunction(nameOrSignature: "tryFfi"): TypedContractMethod<[
        commandInput: string[]
    ], [
        VmSafe.FfiResultStructOutput
    ], "nonpayable">;
    getFunction(nameOrSignature: "unixTime"): TypedContractMethod<[], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "writeFile"): TypedContractMethod<[path: string, data: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "writeFileBinary"): TypedContractMethod<[path: string, data: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "writeJson(string,string,string)"): TypedContractMethod<[
        json: string,
        path: string,
        valueKey: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "writeJson(string,string)"): TypedContractMethod<[json: string, path: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "writeLine"): TypedContractMethod<[path: string, data: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "writeToml(string,string,string)"): TypedContractMethod<[
        json: string,
        path: string,
        valueKey: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "writeToml(string,string)"): TypedContractMethod<[json: string, path: string], [void], "nonpayable">;
    filters: {};
}
