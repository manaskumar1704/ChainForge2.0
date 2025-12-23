# ChainForge 2.0

**ChainForge 2.0** is a privacy‑first Web3 application that creates **cryptographic proof of existence** for digital files using client‑side hashing and Ethereum.

It allows users to prove that a file existed at a specific point in time **without ever uploading the file itself**.

* * *

## What Problem Does ChainForge Solve?

Digital files are trivial to copy and easy to dispute.

ChainForge solves this by:

*   Generating a cryptographic fingerprint (SHA‑256) of a file **locally in the browser**
    
*   Permanently anchoring that fingerprint on Ethereum
    
*   Enabling anyone to later verify authenticity without revealing the original file
    

This creates **tamper‑proof, timestamped proof of existence**.

* * *

## Core Guarantees

*   🔐 **Privacy‑First** — Files never leave the user’s device
    
*   🧮 **Client‑Side Cryptography** — Hashing happens locally
    
*   ⛓️ **On‑Chain Immutability** — Proof is stored on Ethereum (Sepolia)
    
*   🔍 **Public Verifiability** — Anyone can verify without wallets
    

* * *

## How It Works

1.  **Connect Wallet**
    
    *   Wallet is required only for minting the proof
        
2.  **Upload File**
    
    *   File is hashed locally using SHA‑256
        
    *   Raw file data is never uploaded
        
3.  **Preview Proof**
    
    *   Review file hash and metadata before minting
        
4.  **Forge Proof**
    
    *   Hash is minted as an NFT on Ethereum
        
    *   Transaction permanently timestamps existence
        
5.  **Verify Anytime**
    
    *   Upload the same file later to verify if it exists on‑chain
        

* * *

## Why an NFT?

The NFT is not used as an art asset.

It is used as:

*   A **non‑repudiable ownership container**
    
*   A **globally verifiable proof object**
    
*   A permanent, indexed on‑chain record
    

Ownership is secondary. **Existence and timestamp are primary.**

* * *

## Design Philosophy

ChainForge is designed as a **trust product**, not a Web3 toy.

Design priorities:

*   Deterministic flows
    
*   Minimal UI
    
*   Clear cryptographic intent
    
*   Zero hype, zero distraction
    

The UI avoids NFT‑marketplace patterns and instead resembles a **forensic or legal tool**.

Full design constraints are documented in **DESIGN.md**.

* * *

## Architecture Overview

### Frontend

*   **Next.js (App Router)**
    
*   **TypeScript (strict)**
    
*   **Tailwind CSS + shadcn/ui**
    
*   **Wagmi + viem** for Ethereum interactions
    

### Blockchain

*   **Solidity smart contract**
    
*   **Hardhat** for development
    
*   **Sepolia testnet** deployment
    

### Storage

*   **Metadata** stored on IPFS (via Pinata)
    
*   **Only hashes** are recorded on‑chain
    

* * *

## Key Technical Decisions

*   No backend server
    
*   No file uploads
    
*   No centralized database
    
*   Read‑only verification does not require wallet connection
    

This keeps the system:

*   Simple
    
*   Auditable
    
*   Trust‑minimized
    

* * *

## Project Structure (High Level)

    frontend/
      app/           # App Router pages
      components/    # UI + visual components
      hooks/         # Ethereum & app hooks
      lib/           # Blockchain helpers
      store/         # Forge flow state
    
    contracts/
      ChainForgeNFT.sol
    
    hardhat.config.ts
    

* * *

## Status

*   Forge flow: ✅ Complete
    
*   Verification flow: ✅ Complete
    
*   Design system: ✅ Locked
    
*   Flow documentation: ✅ Locked
    

ChainForge 2.0 is functionally complete and portfolio‑ready.

* * *

## Disclaimer

This project is a **technical and educational demonstration**.

Do not use it for legal proof without independent legal review.

* * *

## Author

Built as a portfolio‑grade Web3 system focusing on:

*   Cryptographic correctness
    
*   Deterministic UX
    
*   Production‑quality architecture