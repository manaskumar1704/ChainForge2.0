import { writeContract, waitForTransactionReceipt } from "viem/actions";
import { sepolia } from "viem/chains";

export async function mintChainForgeNFT({
  contract,
  metadataUri,
}: {
  contract: {
    address: `0x${string}`;
    abi: any;
    walletClient: any;
    publicClient: any;
    account: `0x${string}`;
  };
  metadataUri: string;
}) {
  // 1. Send transaction (starts hammer)
  const hash = await writeContract(contract.walletClient, {
    address: contract.address,
    abi: contract.abi,
    functionName: "mint",
    args: [metadataUri],
    account: contract.account,
    chain: sepolia, // ✅ REQUIRED
  });

  // 2. Wait for confirmation (stop hammer)
  const receipt = await waitForTransactionReceipt(
    contract.publicClient,
    { hash }
  );

  return receipt;
}
