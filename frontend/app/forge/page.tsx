"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useChainForgeContract } from "../../hooks/useChainForgeContract";
import { mintChainForgeNFT } from "../../lib/mintChainForgeNFT";
import { useForgeFlow } from "../../store/useForgeFlow";
import { ForgeVisual } from "../../components/ForgeVisual";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ForgePage() {
  const router = useRouter();
  const contract = useChainForgeContract();

  const { address, isConnected } = useAccount(); // ✅ ADDED

  const { walletConnected, fileHash, metadataUri, setTxHash } =
    useForgeFlow();

  const [forging, setForging] = useState(false);

  useEffect(() => {
    if (!walletConnected || !isConnected) router.replace("/connect");
    if (!fileHash || !metadataUri) router.replace("/upload");
  }, [walletConnected, isConnected, fileHash, metadataUri, router]);

  async function handleForge() {
    if (!contract || !fileHash || !metadataUri || !address) return;

    setForging(true);
    try {
      const txHash = await mintChainForgeNFT({
        contract,
        metadataUri,
        fileHash,
        account: address, // ✅ REQUIRED FOR VIEM
      });

      setTxHash(txHash);
      router.replace("/success");
    } catch {
      router.replace("/failure");
    } finally {
      setForging(false);
    }
  }

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
          <CardTitle className="text-blue-400">Forge NFT</CardTitle>
          <CardDescription>
            Mint your cryptographic proof permanently on Ethereum.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ForgeVisual active={forging} />

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={!contract || forging || !address}
            onClick={handleForge}
          >
            {forging ? "Forging…" : "Confirm & Forge"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
