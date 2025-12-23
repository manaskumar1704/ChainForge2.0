"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { useChainForgeContract } from "../../hooks/useChainForgeContract";
import { mintChainForgeNFT } from "../../lib/mintChainForgeNFT";
import { useForgeFlow } from "../../store/useForgeFlow";
import { ForgeVisual } from "../../components/ForgeVisual";

/* shadcn */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Hammer, Loader } from "lucide-react";

export default function ForgePage() {
  const router = useRouter();
  const contract = useChainForgeContract();
  const { isConnected } = useAccount();

  const {
    walletConnected,
    fileHash,
    metadataUri,
    setTxHash,
  } = useForgeFlow();

  const [forging, setForging] = useState(false);
  const [estimatedGasEth, setEstimatedGasEth] = useState<string | null>(null);
  const [estimating, setEstimating] = useState(false);

  // 🔐 Route guards
  useEffect(() => {
    if (!walletConnected || !isConnected) {
      router.replace("/connect");
      return;
    }

    if (!fileHash || !metadataUri) {
      router.replace("/upload");
    }
  }, [walletConnected, isConnected, fileHash, metadataUri, router]);

  // ⛽ Gas estimation (read-only)
  useEffect(() => {
    async function estimateGas() {
      if (
        !contract ||
        !contract.publicClient ||
        !contract.account ||
        !fileHash ||
        !metadataUri
      ) {
        return;
      }

      try {
        setEstimating(true);

        const gas = await contract.publicClient.estimateContractGas({
          address: contract.address,
          abi: contract.abi,
          functionName: "mintProof", // ✅ correct function
          args: [fileHash, metadataUri], // ✅ correct order + types
          account: contract.account,
        });

        const gasPrice = await contract.publicClient.getGasPrice();
        const totalWei = gas * gasPrice;
        const eth = Number(totalWei) / 1e18;

        setEstimatedGasEth(eth.toFixed(6));
      } catch {
        setEstimatedGasEth(null);
      }
      finally {
        setEstimating(false);
      }
    }

    estimateGas();
  }, [contract, fileHash, metadataUri]);

  async function handleForge() {
    if (
      !contract ||
      !contract.walletClient ||
      !contract.account ||
      !fileHash ||
      !metadataUri
    ) {
      return;
    }

    setForging(true);

    try {
      const walletContract = {
        address: contract.address,
        abi: contract.abi,
        publicClient: contract.publicClient,
        walletClient: contract.walletClient,
        account: contract.account,
      };

      const txHash = await mintChainForgeNFT({
        contract: walletContract,
        metadataUri,
        fileHash,
        account: contract.account,
      });

      setTxHash(txHash);
      router.replace("/success");
    } catch {
      router.replace("/failure");
    }
    finally {
      setForging(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex w-full">
        <div className="w-1/2 pr-4 space-y-6">
          {/* Irreversible warning */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Irreversible action
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Blockchain writes cannot be undone.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-neutral-400">
              <p>
                You are about to permanently record a cryptographic proof on Ethereum.
                Please make sure the selected file is correct.
              </p>
            </CardContent>
          </Card>

          {/* Gas estimation */}
          <Card className="bg-neutral-900/80 border-neutral-800 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Estimated gas cost
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Approximate cost to mint this proof.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-neutral-400">
              {estimating && <p>Estimating gas…</p>}

              {!estimating && estimatedGasEth && (
                <p>~{estimatedGasEth} ETH</p>
              )}

              {!estimating && !estimatedGasEth && (
                <p>Gas estimate unavailable</p>
              )}

              <p className="text-xs text-neutral-500 mt-2">
                Final cost is determined by the network and shown in your wallet before confirmation.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center items-center">
          {/* Forge action */}
          <Card className="w-full bg-neutral-900/80 border-neutral-800 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Forge NFT
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Mint your cryptographic proof permanently on Ethereum.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ForgeVisual active={forging} />

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                disabled={forging}
                onClick={handleForge}
              >
                {forging ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Forging…
                  </>
                ) : (
                  <>
                    <Hammer className="h-4 w-4" />
                    Confirm & Forge
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}