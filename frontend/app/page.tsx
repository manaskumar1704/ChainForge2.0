"use client";

import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { HammerAnimation } from "@/components/HammerAnimation";
//import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [fileReady, setFileReady] = useState(false);
  const [forging, setForging] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold">ChainForge 2.0</h1>

      {/*<ConnectButton />*/}

      <FileUploader
        onFileProcessed={() => setFileReady(true)}
      />

      <HammerAnimation active={forging} />

      <button
        disabled={!fileReady}
        onClick={() => setForging(!forging)}
        className={`px-6 py-3 rounded-lg text-white ${
          fileReady
            ? "bg-orange-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Forge Asset
      </button>
    </main>
  );
}
