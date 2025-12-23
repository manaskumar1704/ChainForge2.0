"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForgeFlow } from "../../store/useForgeFlow";
import { ArrowLeft, Hammer } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex w-full">
        <div className="w-1/2 pr-4 space-y-6">
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-400">Review Proof</CardTitle>
              <CardDescription className="text-neutral-400">
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

          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Before you mint
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Please review carefully.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-neutral-400">
              <p>• Minting creates a permanent, immutable record on Ethereum</p>
              <p>• This action requires a small gas fee</p>
              <p>• The file itself is never uploaded or stored</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center items-center gap-4">
          <Button
            variant="secondary"
            className="w-full max-w-xs flex items-center gap-2"
            onClick={() => router.push("/upload")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            className="w-full max-w-xs bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
            onClick={() => router.push("/forge")}
          >
            <Hammer className="h-4 w-4" />
            Proceed to Forge
          </Button>
        </div>
      </div>
    </div>
  );
}