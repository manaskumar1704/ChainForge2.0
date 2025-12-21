"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function ConnectWallet() {
  const [mounted, setMounted] = useState(false);

  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // ✅ This runs only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-green-500">
          Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
        </p>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-sm bg-gray-700 text-white rounded"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Connect Wallet
    </button>
  );
}
