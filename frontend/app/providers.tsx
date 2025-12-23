"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouteTransition } from "../components/RouteTransition";
import { wagmiConfig } from "../lib/wagmiConfig";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RouteTransition>
          {children}
        </RouteTransition>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
