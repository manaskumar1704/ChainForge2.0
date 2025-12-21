export const ChainForgeNFTAbi = [
  {
    type: "function",
    name: "mintAsset",
    stateMutability: "nonpayable",
    inputs: [
      { name: "tokenURI", type: "string" },
      { name: "fileHash", type: "bytes32" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "verifyAsset",
    stateMutability: "view",
    inputs: [{ name: "fileHash", type: "bytes32" }],
    outputs: [{ type: "bool" }],
  },
] as const;
