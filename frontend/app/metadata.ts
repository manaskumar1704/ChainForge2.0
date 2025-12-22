import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://YOUR-VERCEL-URL.vercel.app"),
  title: {
    default: "ChainForge 2.0",
    template: "%s | ChainForge 2.0",
  },
  description:
    "ChainForge lets you forge cryptographic proof of existence for digital files on Ethereum.",
  openGraph: {
    title: "ChainForge 2.0",
    description:
      "Forge cryptographic proof of existence for digital files on Ethereum.",
    type: "website",
  },
};
