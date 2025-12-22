"use client";

import { useState } from "react";
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

export default function VerifyPage() {
  const contract = useChainForgeContract();

  const [hash, setHash] = useState<`0x${string}` | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setLoading(true);

    // Compute SHA-256
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashHex =
      "0x" +
      Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    setHash(hashHex as `0x${string}`);

    if (!contract) {
      setLoading(false);
      return;
    }

    // Read-only verification
    const exists = await contract.publicClient.readContract({
      address: contract.address,
      abi: contract.abi,
      functionName: "verifyAsset",
      args: [hashHex as `0x${string}`],
    });

    setResult(Boolean(exists));
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          ChainForge 2.0
        </h1>

        <p className="mt-1 text-center text-sm md:text-base text-neutral-400 max-w-md mx-auto">
          Forge cryptographic proof of existence on Ethereum
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Verify File</CardTitle>
            <CardDescription>
              Upload a file to check if its cryptographic proof exists on-chain.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm"
            />

            {loading && (
              <p className="text-sm text-gray-400">
                Verifying file hash on Ethereum…
              </p>
            )}

            {hash && (
              <div className="break-all bg-gray-900 p-2 rounded text-xs">
                <strong>SHA-256</strong>
                <div className="text-blue-400 mt-1">{hash}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        {result === true && (
          <Alert className="border-green-600">
            <AlertTitle>Verified</AlertTitle>
            <AlertDescription>
              This file has already been forged on ChainForge.
            </AlertDescription>
          </Alert>
        )}

        {result === false && (
          <Alert variant="destructive">
            <AlertTitle>Not Found</AlertTitle>
            <AlertDescription>
              This file has not been forged yet.
            </AlertDescription>
          </Alert>
        )}

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.history.back()}
        >
          Back
        </Button>

      </div>
    </main>
  );
}
