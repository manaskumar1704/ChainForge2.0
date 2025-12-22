import { Address, Hex } from "viem";

export type ChainForgeContract = {
  address: Address;
  abi: unknown;
  walletClient: {
    writeContract: (...args: any[]) => Promise<Hex>;
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

  return contract.publicClient.waitForTransactionReceipt({ hash });
}
