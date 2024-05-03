import { isTestnet } from ".";

/* Commons */
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

/* Swap */
export const GLQCHAIN_SWAP_QUOTER_ADDRESS =
  "0x287a7beF47684D388fa56BFaB859501f9e515B9D";
export const GLQCHAIN_SWAP_ROUTER_ADDRESS =
  "0x47AB4F709b5C250026C4DA83cde56fc2C81a311c";

/* Pool */
export const GLQCHAIN_POOL_NFT_ADDRESS =
  "0x9527542236724B2D1e54F97FC62375a72Bc950cE";
export const UNISWAP_POOL_FACTORY_ADDRESS =
  "0x0E70926aE867D4dE6E056C29FaB16b0896B731Bf";

/* Bridges */
export const MAINNET_BRIDGE_OUT_ETH = isTestnet
  ? "0xF18e157028DA2Bd8D63725ba14128fc1a72C44f8"
  : "0x1973006F6bA037e70967A1bB2A15c5432361c5fE";
export const MAINNET_BRIDGE_OUT_WGLQ = isTestnet
  ? "0xD74aB112c6D5e643E1D48E7e2Aa8E59f1A21E37A"
  : "0x379D5fDD6808CE6Fc7E1450F85c98c8312CC82ca";

export const GLQCHAIN_BRIDGE_OUT_WETH =
  "0x991Dd4aaeE99b175226C7B22885564780dE46141";
export const GLQCHAIN_BRIDGE_OUT_WGLQ =
  "0x2Cc11d0be3c9d3Ed82F033065821a2250f99885F";

/* Wrapper */
export const GLQCHAIN_WRAPPER = "0xEB567ec41738c2bAb2599A1070FC5B727721b3B6";