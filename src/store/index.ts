// import { atom, getDefaultStore } from "jotai/vanilla";
import { atom, getDefaultStore } from "jotai";
import { create } from "zustand";

import { FundraiserWeb3Connect } from "../lib/fundraiserlib.es.js";
import { FundraiserState } from "../types/launchpad.js";

// Jotai store - we dont use this really need to remove
export const store = getDefaultStore();
export const pagerAtom = atom("default");

interface LaunchpadState {
  fundraisers: Array<string>;
  setFundraisers: (fundraisers: any[]) => void;
}

// Types for our store state
export type StoreState = LaunchpadState & {
  form_launchpad_create: Record<string, any>;
  isConnected: boolean;
  address: string | null;
  library: FundraiserWeb3Connect | null;
  fundraiserStates: Record<string, FundraiserState>;
  tokenInfo: Record<string, any>;
  setState: (fn: (state: StoreState) => Partial<StoreState>) => void;
  getState: () => StoreState;
  setConnected: (isConnected: boolean) => void;
  setAddress: (address: string | null) => void;
  setLibrary: (library: FundraiserWeb3Connect | null) => void;
  setFundraiseState: (fundraiserAddr: string, fundraiserState : FundraiserState) => void;
  setTokenInfo: (tokenAddr: string, tokenInfo: any) => void;
}

export const useStore = create<StoreState>()(
    (set, get) => ({
    // Auth state
    isConnected: false,
    address: null,
    library: null,
    fundraiserStates: {},
    tokenInfo: {},

    // Actions
    setState: set,
    getState: get,

    setConnected: (isConnected: boolean) => set({ isConnected }),
    setAddress: (address: string | null) => set({ address }),
    setLibrary: (library: FundraiserWeb3Connect | null) => set({ library }),

    // fundraisers
    fundraisers: [],
    setFundraisers: (fundraisers) => set({ fundraisers }),
    setFundraiseState: (fundraiserAddr, fundraiserState) => set((state) => ({
      fundraiserStates: {
        ...state.fundraiserStates,
        [fundraiserAddr]: fundraiserState,
      },
    })),
    setTokenInfo: (tokenAddr, tokenInfo) => set((state) => ({
      tokenInfo: {
        ...state.tokenInfo,
        [tokenAddr]: tokenInfo,
      },
    })),

    // Form state
    form_launchpad_create: {},
  })
);
