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

export default function SuccessPage() {
  const router = useRouter();

  const {
    walletConnected,
    txHash,
    reset,
  } = useForgeFlow();

  // 🔐 Route guard
  useEffect(() => {
    if (!walletConnected || !txHash) {
      router.replace("/");
    }
  }, [walletConnected, txHash, router]);

  function handleStartOver() {
    reset();
    router.replace("/connect");
  }

  if (!txHash) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-neutral-400">
        ChainForge 2.0
      </h1>

      <p className="mt-1 text-center text-sm md:text-base text-neutral-400 max-w-md mx-auto">
        Forge cryptographic proof of existence on Ethereum
      </p>

      <Card className="bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Forge Successful</CardTitle>
          <CardDescription className="text-neutral-500">
            Your cryptographic proof has been permanently recorded on Ethereum.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="break-all bg-gray-900 p-3 rounded text-green-400">
            <strong>Transaction Hash</strong>
            <div className="text-green-400 mt-1">{txHash}</div>
          </div>

          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="block text-center underline text-blue-400"
          >
            View on Etherscan
          </a>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={handleStartOver}
          >
            Forge Another Asset
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
