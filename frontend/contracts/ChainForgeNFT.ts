export const ChainForgeNFTAbi = [
  {
    type: "function",
    name: "mintProof",
    stateMutability: "nonpayable",
    inputs: [
      { name: "fileHash", type: "bytes32" },
      { name: "tokenURI", type: "string" },
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
    {
    type: "function",
    name: "getTokenIdByHash",
    stateMutability: "view",
    inputs: [{ name: "fileHash", type: "bytes32" }],
    outputs: [{ name: "tokenId", type: "uint256" }],
  },
  {
    type: "function",
    name: "getOwnerByHash",
    stateMutability: "view",
    inputs: [{ name: "fileHash", type: "bytes32" }],
    outputs: [{ name: "owner", type: "address" }],
  },
  {
    type: "event",
    name: "ProofForged",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "fileHash", type: "bytes32", indexed: true },
      { name: "tokenURI", type: "string", indexed: false },
    ],
  },
] as const;
