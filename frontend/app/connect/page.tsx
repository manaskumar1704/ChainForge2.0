"use client";

import { useEffect, useRef } from "react";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useRouter } from "next/navigation";

import { useForgeFlow } from "../../store/useForgeFlow";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Wallet } from "lucide-react";

export default function ConnectPage() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, isPending } = useConnect();
  const router = useRouter();

  const setWalletConnected = useForgeFlow(s => s.setWalletConnected);
  const hasReset = useRef(false);

  // 🔐 Disconnect ONCE when entering flow
  useEffect(() => {
    if (!hasReset.current) {
      disconnect();
      hasReset.current = true;
    }
  }, [disconnect]);

  // ➡️ Move forward once connected
  useEffect(() => {
    if (isConnected) {
      setWalletConnected(true);
      router.push("/upload");
    }
  }, [isConnected, router, setWalletConnected]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <Card className="max-w-md w-full bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-neutral-400" />
            <div className="text-blue-400">Connect Wallet</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-400">
            Connect an Ethereum wallet to begin forging a proof of existence.
          </p>

          <Button
            className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => connect({ connector: injected() })}
            disabled={isPending}
          >
            <Wallet className="h-4 w-4" />
            {isPending ? "Connecting..." : "Connect Wallet"}
          </Button>

          {address && (
            <p className="text-xs text-green-400 text-center">
              Connected: {address.slice(0, 6)}…{address.slice(-4)}
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
