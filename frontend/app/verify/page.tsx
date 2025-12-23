"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForgeFlow } from "../../store/useForgeFlow";
import { Upload, FileCheck2, ArrowLeft, Clipboard, Hammer } from "lucide-react";

import { useChainForgeContract } from "../../hooks/useChainForgeContract";

/* shadcn */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../components/ui/alert";

type ProofInfo = {
  tokenId: bigint | null;
  owner: `0x${string}`;
};

export default function VerifyPage() {
  const router = useRouter();
  const contract = useChainForgeContract();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setFileHash, setMetadataUri } = useForgeFlow();

  const [hash, setHash] = useState<`0x${string}` | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const [proof, setProof] = useState<ProofInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file || !contract) return;

    setExists(null);
    setProof(null);
    setLoading(true);
    setFileName(file.name);

    try {
      /* 1️⃣ Compute SHA-256 locally */
      const buffer = await file.arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", buffer);
      const hashHex =
        "0x" +
        Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      const fileHash = hashHex as `0x${string}`;
      setHash(fileHash);
      setFileHash(fileHash);

      /* 2️⃣ Check existence via contract */
      const owner = await contract.publicClient.readContract({
        address: contract.address,
        abi: contract.abi,
        functionName: "getOwnerByHash",
        args: [fileHash],
      });

      if (owner === "0x0000000000000000000000000000000000000000") {
        setExists(false);
        // Create a dummy metadata URI for now
        const metadata = {
          name: "ChainForge Proof",
          description: `Cryptographic proof for file: ${file.name}`,
          file_hash: fileHash,
        };
        const metadataJson = JSON.stringify(metadata);
        const metadataBase64 = Buffer.from(metadataJson).toString("base64");
        setMetadataUri(`data:application/json;base64,${metadataBase64}`);
        return;
      }

      setExists(true);

      /* 3️⃣ Resolve tokenId (optional) */
      let tokenId: bigint | null = null;
      try {
        tokenId = await contract.publicClient.readContract({
          address: contract.address,
          abi: contract.abi,
          functionName: "getTokenIdByHash",
          args: [fileHash],
        }) as bigint;
      } catch {
        tokenId = null;
      }

      setProof({
        tokenId,
        owner: owner as `0x${string}`,
      });
    } catch (err) {
      console.error(err);
      setExists(false);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleVerifyAnother = () => {
    setHash(null);
    setFileName(null);
    setExists(null);
    setProof(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

      

      {/* UPLOAD CARD — matches /upload */}
      <Card className="bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Verify File</CardTitle>
          <CardDescription className="text-neutral-400">
            Your file is hashed locally. Nothing is uploaded.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            onClick={() => !hash && fileInputRef.current?.click()}
            className={`cursor-pointer rounded-lg border border-dashed border-neutral-700 bg-neutral-950/60 ${!hash ? 'hover:bg-neutral-900/60' : ''} transition p-6 text-center space-y-3`}
          >
            {hash ? (
              <FileCheck2 className="h-6 w-6 text-green-400 mx-auto" />
            ) : (
              <Upload className="h-6 w-6 text-blue-400 mx-auto" />
            )}

            <div className="text-sm text-neutral-300">
              {fileName || (hash ? "File selected" : "Click to select a file")}
            </div>

            <div className="text-xs text-neutral-500">
              Files never leave your device
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {loading && (
            <p className="text-sm text-neutral-400">
              Verifying proof on Ethereum…
            </p>
          )}

          {hash && (
            <div className="relative break-all bg-gray-900 p-3 rounded text-green-400 text-xs">
              <strong>SHA-256</strong>
              <div className="mt-1 pr-10">{hash}</div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => copyToClipboard(hash, 'hash')}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
              {copySuccess === 'hash' && <div className="absolute top-2 right-12 text-xs text-green-400">Copied!</div>}
            </div>
          )}
        </CardContent>
      </Card>

      {exists === false && (
        <Alert variant="destructive">
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            This file has not been forged yet.
          </AlertDescription>
        </Alert>
      )}

      {exists === true && proof && (
        <Alert className="border-green-600">
          <AlertTitle>Verified</AlertTitle>
          <AlertDescription className="space-y-2 text-sm">
            <div className="relative">
              <strong>Minter:</strong>{" "}
              <a
                href={`https://sepolia.etherscan.io/address/${proof.owner}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-400"
              >
                {proof.owner}
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-[-8px] right-0 h-8 w-8"
                onClick={() => copyToClipboard(proof.owner, 'minter')}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
              {copySuccess === 'minter' && <div className="absolute top-1 right-10 text-xs text-green-400">Copied!</div>}
            </div>

            {proof.tokenId !== null && (
              <div>
                <strong>Token ID:</strong>{" "}
                {proof.tokenId.toString()}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {exists !== null && !loading && (
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="secondary"
            className="w-full max-w-xs flex items-center gap-2"
            onClick={handleVerifyAnother}
          >
            <Upload className="h-4 w-4" />
            Verify Another File
          </Button>
          {exists === false && (
            <Button
              className="w-full max-w-xs bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
              onClick={() => router.push("/forge")}
            >
              <Hammer className="h-4 w-4" />
              Proceed to Forge
            </Button>
          )}
        </div>
      )}

      <Button
        variant="secondary"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Button>
    </div>
  );
}

