import { Address, Hex } from "viem";

type WriteContractArgs = {
  address: Address;
  abi: unknown;
  functionName: string;
  args: readonly unknown[];
  account: Address;
};

type ChainForgeContract = {
  address: Address;
  abi: unknown;
  walletClient: {
    writeContract: (args: WriteContractArgs) => Promise<Hex>;
  };
  publicClient: {
    waitForTransactionReceipt: (args: {
      hash: Hex;
    }) => Promise<{
      status: "success" | "reverted";
      transactionHash: Hex;
    }>;
  };
  account: Address;
};

export async function mintChainForgeNFT({
  contract,
  metadataUri,
  fileHash,
}: {
  contract: ChainForgeContract;
  metadataUri: string;
  fileHash: Hex;
}) {
  const hash = await contract.walletClient.writeContract({
    address: contract.address,
    abi: contract.abi,
    functionName: "mintAsset",
    args: [metadataUri, fileHash],
    account: contract.account,
  });

  return await contract.publicClient.waitForTransactionReceipt({
    hash,
  });
}
