import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { ChainForgeNFTAbi } from "../contracts/ChainForgeNFT";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CHAINFORGE_CONTRACT as `0x${string}`;

export function useChainForgeContract() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  if (!publicClient || !walletClient || !address) return null;

  return {
    address: CONTRACT_ADDRESS,
    abi: ChainForgeNFTAbi,
    publicClient,
    walletClient,
    account: address,
  };
}
