"use client";

import { useState } from "react";

export function FileUploader({
  onFileProcessed,
}: {
  onFileProcessed: (file: File, hash: string) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    // Read file as ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Hash using Web Crypto API
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);
    setLoading(false);

    onFileProcessed(file, hashHex);
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

      {loading && <p className="text-sm text-gray-500">Hashing file…</p>}

      {fileName && (
        <p className="text-sm">
          <strong>File:</strong> {fileName}
        </p>
      )}

      {hash && (
        <div className="text-xs break-all bg-gray-100 p-2 rounded w-full max-w-md">
          <strong>SHA-256:</strong>
          <br />
          {hash}
        </div>
      )}
    </div>
  );
}
