"use client";

import { useState } from "react";

export function FileUploader({
  onFileProcessed,
}: {
  onFileProcessed: (file: File, hash: string, metadataUri: string) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [metadataUri, setMetadataUri] = useState<string | null>(null);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    // 1. Read file
    const buffer = await file.arrayBuffer();

    // 2. Hash file (SHA-256)
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);
    setLoading(false);

    // 3. Upload to IPFS via API route
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("hash", hashHex);

    const res = await fetch("/api/ipfs", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUploading(false);
    setMetadataUri(data.metadataUri);

    // 4. Notify parent
    onFileProcessed(file, hashHex, data.metadataUri);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <label className="cursor-pointer px-4 py-2 border rounded-lg">
        Upload File
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {loading && (
        <p className="text-sm text-gray-500">Hashing file…</p>
      )}

      {uploading && (
        <p className="text-sm text-orange-500">
          Uploading to IPFS…
        </p>
      )}

      {fileName && (
        <p className="text-sm">
          <strong>File:</strong> {fileName}
        </p>
      )}

      {hash && (
        <div className="text-xs break-all bg-gray-900 text-green-400 p-2 rounded w-full max-w-md">
          <strong>SHA-256:</strong>
          <br />
          {hash}
        </div>
      )}

      {metadataUri && (
        <div className="text-xs break-all bg-gray-800 text-blue-400 p-2 rounded w-full max-w-md">
          <strong>Metadata URI:</strong>
          <br />
          {metadataUri}
        </div>
      )}
    </div>
  );
}
