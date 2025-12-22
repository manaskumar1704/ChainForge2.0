"use client";

import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import { useForgeFlow } from "../../store/useForgeFlow";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { XCircle } from "lucide-react";

export default function FailurePage() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const resetFlow = useForgeFlow(s => s.reset);

  function handleRetry() {
    // 1️⃣ Disconnect wallet
    disconnect();

    // 2️⃣ Reset forge state
    resetFlow();

    // 3️⃣ Restart flow
    router.push("/connect");
  }

  return (
    <main className="min-h-screen text-white relative z-10 flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-neutral-900/80 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <XCircle className="h-5 w-5 text-red-400" />
            Forging Failed
          </CardTitle>
          <CardDescription className="text-neutral-400">
            The transaction was reverted or rejected.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleRetry}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
