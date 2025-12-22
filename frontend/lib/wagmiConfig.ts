"use client";

import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors:
    typeof window !== "undefined"
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
          }),
        ]
      : [],
  transports: {
    [sepolia.id]: http(),
  },
});
