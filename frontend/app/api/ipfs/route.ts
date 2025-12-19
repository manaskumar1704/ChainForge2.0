import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const hash = formData.get("hash") as string;

    if (!file || !hash) {
      return NextResponse.json({ error: "Missing file or hash" }, { status: 400 });
    }

    // 1. Upload file to Pinata
    const fileData = new FormData();
    fileData.append("file", file);

    const fileUpload = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY!,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!,
        },
        body: fileData,
      }
    );

    const fileJson = await fileUpload.json();

    // 2. Create metadata
    const metadata = {
      name: file.name,
      description: "Forged via ChainForge 2.0",
      fileHash: hash,
      image: `ipfs://${fileJson.IpfsHash}`,
    };

    // 3. Upload metadata
    const metaUpload = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY!,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!,
        },
        body: JSON.stringify(metadata),
      }
    );

    const metaJson = await metaUpload.json();

    return NextResponse.json({
      fileIpfs: fileJson.IpfsHash,
      metadataIpfs: metaJson.IpfsHash,
      metadataUri: `ipfs://${metaJson.IpfsHash}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "IPFS upload failed" }, { status: 500 });
  }
}
