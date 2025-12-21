import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.PINATA_JWT) {
      return NextResponse.json(
        { error: "Pinata JWT not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const hash = formData.get("hash") as string | null;

    if (!file || !hash) {
      return NextResponse.json(
        { error: "Missing file or hash" },
        { status: 400 }
      );
    }

    /* ------------------ Upload file to IPFS ------------------ */
    const fileData = new FormData();
    fileData.append("file", file);

    const fileUpload = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: fileData,
      }
    );

    if (!fileUpload.ok) {
      const err = await fileUpload.text();
      return NextResponse.json(
        { error: "File upload to Pinata failed", details: err },
        { status: 500 }
      );
    }

    const fileJson = await fileUpload.json();

    /* ------------------ Create metadata ------------------ */
    const metadata = {
      name: file.name,
      description: "Forged via ChainForge 2.0",
      fileHash: hash,
      image: `ipfs://${fileJson.IpfsHash}`,
    };

    /* ------------------ Upload metadata ------------------ */
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
        { error: "Metadata upload to Pinata failed", details: err },
        { status: 500 }
      );
    }

    const metaJson = await metaUpload.json();
    console.log("File stored at:", `ipfs://${fileJson.IpfsHash}`);
    console.log("Metadata stored at:", `ipfs://${metaJson.IpfsHash}`);


    /* ------------------ Success response ------------------ */
    return NextResponse.json({
      fileIpfs: fileJson.IpfsHash,
      metadataIpfs: metaJson.IpfsHash,
      metadataUri: `ipfs://${metaJson.IpfsHash}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected IPFS upload error" },
      { status: 500 }
    );
  }
}
