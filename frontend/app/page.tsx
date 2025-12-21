"use client";

import { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import { HammerAnimation } from "../components/HammerAnimation";
import { ConnectWallet } from "../components/ConnectWallet";
import { useChainForgeContract } from "../hooks/useChainForgeContract";
import { mintChainForgeNFT } from "../lib/mintChainForgeNFT";

/* shadcn imports */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../components/ui/alert";

export default function Home() {
  const contract = useChainForgeContract();

  const [metadataUri, setMetadataUri] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<`0x${string}` | null>(null);
  const [forging, setForging] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readyToMint = Boolean(contract && metadataUri && fileHash && !forging);

  async function handleMint() {
    if (!contract || !metadataUri || !fileHash) return;

    try {
      setError(null);
      setForging(true);

      const receipt = await mintChainForgeNFT({
        contract,
        metadataUri,
        fileHash,
      });

      if (receipt.status !== "success") {
        throw new Error("Transaction failed");
      }

      setTxHash(receipt.transactionHash);
    } catch (err) {
      console.error(err);
      setError("Mint failed. Transaction was reverted or rejected.");
    } finally {
      setForging(false);
    }
  }
 

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center">ChainForge 2.0</h1>
        <p className="text-center text-sm text-gray-400">
          Forge cryptographic proof of existence on Ethereum
        </p>

        {/* Wallet */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectWallet />
          </CardContent>
        </Card>

        {/* Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>
              Your file never leaves your device. Only its hash is forged.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader
              onFileProcessed={(hashHex, uri) => {
                setFileHash(`0x${hashHex}`);
                setMetadataUri(uri);
              }}
            />
          </CardContent>
        </Card>

        {/* Proof */}
        {metadataUri && fileHash && (
          <Card>
            <CardHeader>
              <CardTitle>Proof Generated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="break-all bg-gray-900 p-2 rounded">
                <strong>SHA-256</strong>
                <div className="text-green-400">{fileHash}</div>
              </div>

              <div className="break-all bg-gray-900 p-2 rounded">
                <strong>Metadata URI</strong>
                <div className="text-blue-400">{metadataUri}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forge */}
        <Card>
          <CardHeader>
            <CardTitle>Forge NFT</CardTitle>
            <CardDescription>
              Mint this proof permanently on Ethereum
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <HammerAnimation active={forging} />

            <Button
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={!readyToMint}
              onClick={handleMint}
            >
              Forge NFT
            </Button>
          </CardContent>
        </Card>

        {/* Success */}
        {txHash && (
          <Alert className="border-green-600">
            <AlertTitle>Forged Successfully</AlertTitle>
            <AlertDescription>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-green-400"
              >
                View transaction on Etherscan
              </a>
            </AlertDescription>
          </Alert>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Mint Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

      </div>
    </main>
  );
}