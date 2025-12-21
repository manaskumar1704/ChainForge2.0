"use client";

import { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import { HammerAnimation } from "../components/HammerAnimation";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectWallet } from "../components/ConnectWallet";


export default function Home() {
  const { isConnected } = useAccount();

  const [metadataUri, setMetadataUri] = useState<string | null>(null);
  const [forging, setForging] = useState(false);

  function handleForgeClick() {
    if (!metadataUri) return;

    // For now, just simulate mint lifecycle
    console.log("Minting NFT with metadata:", metadataUri);

    setForging(true);

    // This will later be replaced by real mint()
    setTimeout(() => {
      setForging(false);
      console.log("Mint simulation complete");
    }, 2000);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold">ChainForge 2.0</h1>

      {!isConnected && (
        <p className="text-sm text-gray-500">
          Connect your wallet to begin forging
        </p>
      )}

      <FileUploader
        onFileProcessed={(_, __, uri) => {
          console.log("IPFS Metadata URI:", uri);
          setMetadataUri(uri);
        }}
      />
      
      <ConnectWallet />
      <HammerAnimation active={forging} />

      <button
        disabled={!metadataUri || forging || !isConnected}
        onClick={handleForgeClick}
        className={`px-6 py-3 rounded-lg text-white ${
          metadataUri && isConnected
            ? "bg-orange-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Forge Asset
      </button>
    </main>
  );
}
