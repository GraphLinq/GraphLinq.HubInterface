import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(library: any, account: any) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: any, account: any) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: any, ABI: any, provider: any) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, provider);
}
