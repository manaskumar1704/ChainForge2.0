  # ChainForge 2.0

ChainForge 2.0 is a Web3 application that allows users to prove the existence of a digital file at a specific point in time **without ever uploading the file itself**.

The file is hashed locally in the browser, only the cryptographic proof is stored on IPFS, and that proof is minted as an NFT on Ethereum.

* * *

## Motivation

Most NFT platforms upload entire files to IPFS, which is not ideal for private or sensitive data such as research papers, legal documents, designs, or source code.

ChainForge was built to answer a simple question:

How can someone prove ownership or existence of a file without revealing the file itself?

* * *

## What ChainForge Does

*   Generates a SHA-256 hash locally in the browser
    
*   Uploads hash-only metadata to IPFS
    
*   Mints an ERC-721 NFT representing the proof
    
*   Prevents duplicate minting of the same file hash
    
*   Allows verification of whether a file hash was already forged
    
*   Guides users through a strict, step-by-step flow
    

* * *

## Application Flow

1.  Landing page explaining the concept
    
2.  Wallet connection
    
3.  Local file hashing (file never leaves device)
    
4.  Proof preview (hash + metadata)
    
5.  NFT minting
    
6.  Success or failure result
    
7.  Verification page
    

Each step is route-guarded to prevent skipping or inconsistent state.

* * *

## Smart Contract Overview

The smart contract enforces uniqueness and immutability:

*   Each file hash can only be minted once
    
*   Metadata is immutable
    
*   Events are emitted for provenance tracking
    

`function mintAsset(     string calldata tokenURI,     bytes32 fileHash ) external;`

* * *

## Tech Stack

### Frontend

*   Next.js 16 (App Router)
    
*   TypeScript
    
*   Tailwind CSS
    
*   shadcn/ui
    
*   Framer Motion
    
*   Zustand
    
*   wagmi + viem
    

### Blockchain

*   Solidity
    
*   Hardhat
    
*   OpenZeppelin
    
*   Sepolia testnet
    

### Storage

*   IPFS via Pinata (JWT authentication)
    

* * *

## Running Locally

`git clone https://github.com/your-username/chainforge-2.0.git cd chainforge-2.0/frontend bun install bun dev`

Environment variables:

`PINATA_JWT=your_pinata_jwt NEXT_PUBLIC_SEPOLIA_RPC_URL=your_rpc_url`

* * *

## Quality and Stability

*   No file uploads, only hashes
    
*   No exposed API keys
    
*   Wallet resets between sessions
    
*   ESLint and TypeScript checks passing
    
*   Production build tested
    

* * *

## Deployment

*   Frontend hosted on Vercel
    
*   Network: Sepolia
    
*   Storage: IPFS (Pinata)
    

* * *

## About the Author

Manas Kumar  
Undergraduate Computer Science student interested in blockchain systems, full-stack development, and building practical Web3 applications.

* * *

## Future Improvements

*   Gas optimizations
    
*   Mainnet deployment
    
*   Batch verification
    
*   Enhanced forge animations
    
*   SEO and analytics improvements
    

* * *

## License

MIT
