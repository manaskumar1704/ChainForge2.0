"use client";

import { useEffect, useRef, useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { useRouter } from "next/navigation";

import { useForgeFlow } from "../../store/useForgeFlow";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

import { Wallet, Smartphone, ArrowLeft } from "lucide-react";

export default function ConnectPage() {
  const { isConnected, address } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const setWalletConnected = useForgeFlow((s) => s.setWalletConnected);
  const hasReset = useRef(false);

  // ✅ Safe injected-wallet detection (no `any`)
  const hasInjectedWallet = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ethereum" in window;
  }, []);

  // 🔐 Disconnect ONCE when entering the flow
  useEffect(() => {
    if (!hasReset.current) {
      disconnect();
      hasReset.current = true;
    }
  }, [disconnect]);

  // ➡️ Advance once connected
  useEffect(() => {
    if (isConnected) {
      setWalletConnected(true);
      router.replace("/upload");
    }
  }, [isConnected, router, setWalletConnected]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="flex w-full max-w-4xl">
        <div className="w-1/2 pr-4">
          <Card className="h-full bg-neutral-900/80 border-neutral-800 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Connect Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-400">
                Connect an Ethereum wallet to begin forging a cryptographic proof of
                existence.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/2 pl-4 space-y-4">
          {/* Injected wallet */}
          {hasInjectedWallet ? (
            <Button
              className="w-full flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              onClick={() => connect({ connector: injected() })}
              disabled={isPending}
            >
              <Wallet className="h-4 w-4" />
              {isPending ? "Connecting…" : "Connect Browser Wallet"}
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                window.open("https://metamask.io/download/", "_blank")
              }
            >
              Install MetaMask
            </Button>
          )}

          {/* WalletConnect (always available) */}
          <Button
            variant="secondary"
            className="w-full flex items-center gap-2"
            onClick={() =>
              connect({
                connector: walletConnect({
                  projectId:
                    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
                }),
              })
            }
            disabled={isPending}
          >
            <Smartphone className="h-4 w-4" />
            Connect with WalletConnect
          </Button>

          {address && (
            <p className="text-xs text-green-400 text-center">
              Connected: {address.slice(0, 6)}…{address.slice(-4)}
            </p>
          )}

          <Button
            variant="secondary"
            className="w-full mt-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </main>
  );
}
