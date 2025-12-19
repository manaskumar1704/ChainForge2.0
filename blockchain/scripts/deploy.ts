import hre from "hardhat";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import "dotenv/config";

async function main() {
  // 1. Get the contract artifact
  const ChainForgeNFT = await hre.artifacts.readArtifact("ChainForgeNFT");

  // 2. Create Viem Clients
  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY!}`);
  
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.SEPOLIA_URL!),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.SEPOLIA_URL!),
  });

  // 3. Deploy the contract using the Wallet Client
  console.log("Deploying MyNFT contract with Viem...");
  const hash = await walletClient.deployContract({
    abi: ChainForgeNFT.abi,
    bytecode: ChainForgeNFT.bytecode as `0x${string}`,
    args: [],
  });
  console.log(`Transaction hash: ${hash}`);
  
  // 4. Wait for the transaction to be mined using the Public Client
  console.log("Waiting for deployment confirmation...");
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  if (receipt.contractAddress) {
    console.log(`MyNFT contract deployed to: ${receipt.contractAddress}`);
  } else {
    console.error("Contract address not found in receipt.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});