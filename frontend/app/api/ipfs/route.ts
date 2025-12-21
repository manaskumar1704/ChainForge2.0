import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.PINATA_JWT) {
      return NextResponse.json(
        { error: "Pinata JWT not configured" },
        { status: 500 }
      );
    }

    const { hash } = await req.json();

    if (!hash) {
      return NextResponse.json(
        { error: "Missing file hash" },
        { status: 400 }
      );
    }

    // 🔒 Hash-only metadata (ChainForge core idea)
    const metadata = {
      name: "ChainForge Proof",
      description: "Cryptographic proof forged via ChainForge 2.0",
      fileHash: hash,
      hashAlgorithm: "SHA-256",
      timestamp: Math.floor(Date.now() / 1000),
    };

    const metaUpload = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: JSON.stringify(metadata),
      }
    );

    if (!metaUpload.ok) {
      const err = await metaUpload.text();
      return NextResponse.json(
        { error: "Metadata upload failed", details: err },
        { status: 500 }
      );
    }

    const metaJson = await metaUpload.json();

    console.log("ChainForge metadata IPFS:", `ipfs://${metaJson.IpfsHash}`);

    return NextResponse.json({
      metadataUri: `ipfs://${metaJson.IpfsHash}`,
    });
  } catch {
    return NextResponse.json(
      { error: "IPFS metadata generation failed" },
      { status: 500 }
    );
  }
}
