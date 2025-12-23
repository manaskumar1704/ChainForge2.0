"use client";

import { useForgeFlow } from "../../store/useForgeFlow";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ClipboardCopy, Search } from "lucide-react";

export default function SuccessPage() {
  const { fileHash, metadataUri } = useForgeFlow();

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-300 flex justify-center">
        ChainForge <span className="text-blue-400">2.0</span>
      </h1>

      <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-blue-400">
            Proof created successfully
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Save or share the details below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-neutral-400">
          <div className="break-all bg-gray-900 p-3 rounded">
            <strong>File Hash</strong>
            <div className="text-green-400 mt-1">{fileHash}</div>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 mt-2"
              onClick={() => navigator.clipboard.writeText(fileHash!)}
            >
              <ClipboardCopy className="h-4 w-4" />
              Copy
            </Button>
          </div>

          <div className="break-all bg-gray-900 p-3 rounded">
            <strong>IPFS Metadata URL</strong>
            <div className="text-blue-400 mt-1">{metadataUri}</div>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 mt-2"
              onClick={() =>
                navigator.clipboard.writeText(metadataUri!)
              }
            >
              <ClipboardCopy className="h-4 w-4" />
              Copy
            </Button>
          </div>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
            onClick={() =>
              location.assign(`/verify?hash=${fileHash}`)
            }
          >
            <Search className="h-4 w-4" />
            Verify this proof
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
