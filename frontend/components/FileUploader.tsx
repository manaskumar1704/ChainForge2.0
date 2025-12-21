"use client";

import { useState } from "react";

export function FileUploader({
  onFileProcessed,
}: {
  onFileProcessed: (hash: string, metadataUri: string) => void;
}) {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    // 1️⃣ Compute SHA-256 in browser
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashHex = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);

    // 2️⃣ Send ONLY hash to backend
    const res = await fetch("/api/ipfs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash: hashHex }),
    });

    const data = await res.json();

    setLoading(false);

    onFileProcessed(hashHex, data.metadataUri);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="cursor-pointer px-4 py-2 border rounded-lg">
        Upload File
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {loading && <p className="text-sm text-gray-500">Forging hash…</p>}

      {hash && (
        <div className="text-xs break-all bg-gray-900 text-green-400 p-2 rounded max-w-md">
          <strong>SHA-256:</strong>
          <br />
          {hash}
        </div>
      )}
    </div>
  );
}
