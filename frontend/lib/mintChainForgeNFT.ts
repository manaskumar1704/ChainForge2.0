import { writeContract, waitForTransactionReceipt } from "viem/actions";
import { sepolia } from "viem/chains";

export async function mintChainForgeNFT({
  contract,
  metadataUri,
  fileHash,
}: {
  contract: {
    address: `0x${string}`;
    abi: any;
    walletClient: any;
    publicClient: any;
    account: `0x${string}`;
  };
  metadataUri: string;
  fileHash: `0x${string}`;
}) {
  const hash = await writeContract(contract.walletClient, {
    address: contract.address,
    abi: contract.abi,
    functionName: "mintAsset", // ✅ correct
    args: [metadataUri, fileHash], // ✅ both args
    account: contract.account,
    chain: sepolia,
    gas: BigInt(1_000_000),
  });

  const receipt = await waitForTransactionReceipt(
    contract.publicClient,
    { hash }
  );

  return receipt;
}
