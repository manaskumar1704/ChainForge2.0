"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileCheck2 } from "lucide-react";
import { useForgeFlow } from "../../store/useForgeFlow";

/* shadcn */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setFileHash, setMetadataUri } = useForgeFlow();

  const [hash, setHash] = useState<`0x${string}` | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    // Compute SHA-256 locally
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashHex =
      "0x" +
      Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    const typedHash = hashHex as `0x${string}`;
    setHash(typedHash);
    setFileHash(typedHash);

    // Upload metadata (hash only)
    const res = await fetch("/api/ipfs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash: typedHash }),
    });

    const { metadataUri } = await res.json();
    setMetadataUri(metadataUri);

    setLoading(false);
    router.push("/preview");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

      {/* HERO */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-300 flex justify-center">
        ChainForge <span className="text-blue-400">2.0</span>
      </h1>

      <p className="mt-1 text-center text-sm md:text-base text-neutral-400 max-w-md mx-auto">
        Select a file to generate its cryptographic proof
      </p>

      {/* UPLOAD CARD — CANONICAL */}
      <Card className="bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-blue-400">
            Upload File
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Your file is processed locally. Only its hash is used.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-lg border border-dashed border-neutral-700 bg-neutral-950/60 hover:bg-neutral-900/60 transition p-6 text-center space-y-3"
          >
            {hash ? (
              <FileCheck2 className="h-6 w-6 text-green-400 mx-auto" />
            ) : (
              <Upload className="h-6 w-6 text-blue-400 mx-auto" />
            )}

            <div className="text-sm text-neutral-300">
              {hash ? "File selected" : "Click to select a file"}
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
              Generating cryptographic proof…
            </p>
          )}

          {hash && (
            <div className="break-all bg-gray-900 p-3 rounded text-green-400 text-xs">
              <strong>SHA-256</strong>
              <div className="mt-1">{hash}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-blue-400">
            What happens next?
          </CardTitle>
          <CardDescription className="text-neutral-400">
            No blockchain interaction yet.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-neutral-400">
          <p>• Your file is hashed locally in your browser</p>
          <p>• Only the cryptographic hash is prepared for minting</p>
          <p>• You will review everything before anything is sent on-chain</p>
        </CardContent>
      </Card>

    </div>
  );
}
