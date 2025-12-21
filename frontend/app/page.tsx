"use client";

import { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import { HammerAnimation } from "../components/HammerAnimation";
import { ConnectWallet } from "../components/ConnectWallet";
import { useChainForgeContract } from "../hooks/useChainForgeContract";
import { mintChainForgeNFT } from "../lib/mintChainForgeNFT";

export default function Home() {
  const contract = useChainForgeContract();

  const [metadataUri, setMetadataUri] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<`0x${string}` | null>(null);
  const [forging, setForging] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleMint() {
    if (!contract || !metadataUri || !fileHash) return;

    try {
      setError(null);
      setForging(true);

      const receipt = await mintChainForgeNFT({
        contract,
        metadataUri,
        fileHash, // ✅ REQUIRED by contract
      });

      setTxHash(receipt.transactionHash);
    } catch (err) {
      console.error(err);
      setError("Mint failed. Check console or wallet.");
    } finally {
      setForging(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold">ChainForge 2.0</h1>

      {/* Wallet */}
      <ConnectWallet />

      {/* Upload + Hash + IPFS metadata */}
      <FileUploader
        onFileProcessed={(hashHex, uri) => {
          console.log("File hash:", hashHex);
          console.log("Metadata URI:", uri);

          setFileHash(`0x${hashHex}`); // ✅ convert to bytes32
          setMetadataUri(uri);
        }}
      />

      {/* Show Metadata URI */}
      {metadataUri && (
        <div className="text-xs break-all bg-gray-900 text-blue-400 p-2 rounded max-w-md">
          <strong>Metadata URI:</strong>
          <br />
          {metadataUri}
        </div>
      )}

      {/* Hammer Animation */}
      <HammerAnimation active={forging} />

      {/* Forge Button */}
      <button
        disabled={!contract || !metadataUri || !fileHash || forging}
        onClick={handleMint}
        className={`px-6 py-3 rounded-lg text-white ${
          !contract || !metadataUri || !fileHash || forging
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-600"
        }`}
      >
        Forge NFT
      </button>

      {/* Transaction Status */}
      {txHash && (
        <a
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-green-500"
        >
          View mint on Etherscan
        </a>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </main>
  );
}
