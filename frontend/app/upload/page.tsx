"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileUploader } from "../../components/FileUploader";
import { useForgeFlow } from "../../store/useForgeFlow";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

export default function UploadPage() {
  const router = useRouter();

  const {
    walletConnected,
    fileHash,
    metadataUri,
    setFileHash,
    setMetadataUri,
  } = useForgeFlow();

  useEffect(() => {
    if (!walletConnected) {
      router.replace("/connect");
    }
  }, [walletConnected, router]);

  useEffect(() => {
    if (fileHash && metadataUri) {
      router.replace("/preview");
    }
  }, [fileHash, metadataUri, router]);

  return (
    <main className="min-h-screen text-white relative z-10">
      <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

        <h1 className="text-3xl font-bold text-center">ChainForge 2.0</h1>

        <Card className="bg-neutral-900/80 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-blue-400">Upload File</CardTitle>
            <CardDescription className="text-neutral-400">
              Your file never leaves your device. Only its cryptographic hash is forged.
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

      </div>
    </main>
  );
}
