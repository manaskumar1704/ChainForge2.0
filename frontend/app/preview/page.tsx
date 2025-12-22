"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForgeFlow } from "../../store/useForgeFlow";

/* shadcn */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function PreviewPage() {
  const router = useRouter();

  const {
    walletConnected,
    fileHash,
    metadataUri,
  } = useForgeFlow();

  // 🔐 Route guard
  useEffect(() => {
    if (!walletConnected) {
      router.replace("/connect");
      return;
    }

    if (!fileHash || !metadataUri) {
      router.replace("/upload");
    }
  }, [walletConnected, fileHash, metadataUri, router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-neutral-400">
        ChainForge 2.0
      </h1>

      <p className="mt-1 text-center text-sm md:text-base text-neutral-400 max-w-md mx-auto">
        Forge cryptographic proof of existence on Ethereum
      </p>

      <Card className="bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Review Proof</CardTitle>
          <CardDescription className="text-neutral-500">
            Review the cryptographic proof before minting it on Ethereum.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-xs">
          <div className="break-all bg-gray-900 p-3 rounded text-green-500">
            <strong>SHA-256 File Hash</strong>
            <div className="text-green-500 mt-1">{fileHash}</div>
          </div>

          <div className="break-all bg-gray-900 p-3 rounded text-green-500">
            <strong>Metadata URI</strong>
            <div className="text-green-500 mt-1">{metadataUri}</div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="secondary"
          className="w-full max-w-xs"
          onClick={() => router.push("/upload")}
        >
          Back
        </Button>

        <Button
          className="w-full max-w-xs bg-orange-600 hover:bg-orange-700"
          onClick={() => router.push("/forge")}
        >
          Proceed to Forge
        </Button>
      </div>

    </div>
  );
}
