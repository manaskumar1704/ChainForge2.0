import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

if (!process.env.SEPOLIA_URL || !process.env.PRIVATE_KEY) {
  throw new Error("Missing Sepolia environment variables");
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
