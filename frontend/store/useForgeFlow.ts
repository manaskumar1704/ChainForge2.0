import { create } from "zustand";
 type ForgeFlowState = {
    walletConnected: boolean;
    fileHash: `0x${string}` | null;
    metadataUri: string | null;
    txHash: `0x${string}` | null;

    setWalletConnected: (v: boolean) => void;
    setFileHash: (hash: `0x${string}` | null) => void;
    setMetadataUri: (uri: string | null) => void;
    setTxHash: (hash: `0x${string}` | null) => void;

    reset: () => void;
 };

export const useForgeFlow = create<ForgeFlowState>((set) => ({
  walletConnected: false,
  fileHash: null,
  metadataUri: null,
  txHash: null,

  setWalletConnected: (walletConnected) =>
    set({ walletConnected }),

  setFileHash: (fileHash) =>
    set({ fileHash }),

  setMetadataUri: (metadataUri) =>
    set({ metadataUri }),

  setTxHash: (txHash) =>
    set({ txHash }),

  reset: () =>
    set({
      walletConnected: false,
      fileHash: null,
      metadataUri: null,
      txHash: null,
    }),
}));