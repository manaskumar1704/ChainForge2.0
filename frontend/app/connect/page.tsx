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

import { Wallet, Smartphone } from "lucide-react";

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
      <Card className="max-w-md w-full bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-neutral-400" />
            <span className="text-blue-400">Connect Wallet</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-400">
            Connect an Ethereum wallet to begin forging a cryptographic proof of
            existence.
          </p>

          {/* Injected wallet */}
          {hasInjectedWallet ? (
            <Button
              className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => connect({ connector: injected() })}
              disabled={isPending}
            >
              <Wallet className="h-4 w-4" />
              {isPending ? "Connecting…" : "Connect Browser Wallet"}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-neutral-700 h-4 w-4"
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

          <p className="text-xs text-neutral-500 text-center pt-2">
            Works on desktop, mobile, and tablets
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
