import {
  Abi,
  Address,
  PublicClient,
  WalletClient,
  Account,
} from "viem";
import { sepolia } from "viem/chains";

type MintChainForgeArgs = {
  contract: {
    address: Address;
    abi: Abi;
    publicClient: PublicClient;
    walletClient: WalletClient;
  };
  metadataUri: string;
  fileHash: string;
  account: Address | Account; // ✅ ADD THIS
};

export async function mintChainForgeNFT({
  contract,
  metadataUri,
  fileHash,
  account,
}: MintChainForgeArgs) {
  const { walletClient, address, abi } = contract;

  const hash = await walletClient.writeContract({
    address,
    abi,
    functionName: "mintAsset",
    args: [metadataUri, fileHash],
    chain: sepolia,
    account, // ✅ REQUIRED
  });

  return hash;
}
