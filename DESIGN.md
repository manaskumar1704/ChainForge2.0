# ChainForge 2.0 — Design Specification

This document defines the **design system, UI rules, and visual constraints** for ChainForge 2.0. It is authoritative. All present and future UI must conform to these rules unless explicitly revised here.

* * *

## 1\. Design Goals

ChainForge is a **trust product**. The UI must communicate:

*   Cryptographic seriousness (not playful, not NFT-art oriented)
    
*   Technical credibility
    
*   Privacy-first guarantees
    
*   Determinism and calm
    

The design intentionally avoids:

*   Loud gradients
    
*   Meme / Web3 hype visuals
    
*   Over-decoration
    

The user should feel they are performing a **forensic operation**, not browsing a marketplace.

* * *

## 2\. Global Layout Rules

### 2.1 No `<main>` Wrapper

*   Pages **must not rely on `<main>` for layout semantics**.
    
*   Root layout already provides:
    
    *   Global background
        
    *   Page transition wrapper
        
    *   Providers
        

Each page should render **only its local container**.

### 2.2 Background Ownership

*   Backgrounds are **global-only**.
    
*   Individual pages **must not** define full-screen gradients or body backgrounds.
    
*   The active background system:
    
    *   `ForgeBackground`
        
    *   Subtle animated forge glow
        

Pages must assume a dark, animated canvas is always present.

### 2.3 Z-Index Discipline

*   All page content must include `relative z-10` (or higher if justified)
    
*   Background components must never overlap interactive UI
    

* * *

## 3\. Color System

### 3.1 Semantic Colors (Strict)

| Purpose | Color | Notes |
| --- | --- | --- |
| Primary Accent | Blue (text-blue-400) | Identity, headers, trust signals |
| Action / Irreversible | Orange (bg-orange-600) | Forge, mint, confirm |
| Success | Green | Hashes, verified states |
| Failure | Red | Errors only |
| Neutral Text | Neutral-400/500 | All body copy |

**Do not invent new accent colors.**

### 3.2 Cards

*   Default card background: `bg-neutral-900/80`
    
*   Border: `border-neutral-800`
    
*   Backdrop blur is allowed (`backdrop-blur`) only on cards
    

Cards represent **bounded cryptographic operations**.

* * *

## 4\. Typography Rules

### 4.1 Headings

*   Product name: `ChainForge 2.0`
    
*   Font weight: `font-bold`
    
*   Color: `text-neutral-300` or `text-neutral-400`
    

### 4.2 Body Text

*   Size: `text-sm` or `text-base`
    
*   Color: `text-neutral-400`
    
*   Never pure white for paragraphs
    

### 4.3 Hashes & Technical Data

*   Always monospaced implicitly via UI context
    
*   Color: Green (`text-green-400/500`)
    
*   Wrapped using `break-all`
    

Hashes must **look immutable**.

* * *

## 5\. Buttons

### 5.1 Primary Action

*   Color: Orange
    
*   Used only for:
    
    *   Forge
        
    *   Confirm
        
    *   Proceed
        

Orange = **irreversible blockchain action**.

### 5.2 Secondary Action

*   Variant: `secondary` or `outline`
    
*   Used for:
    
    *   Back
        
    *   Cancel
        
    *   Retry
        

### 5.3 CTA Hierarchy

*   One primary action per screen
    
*   Never stack multiple orange buttons
    

* * *

## 6\. Iconography

*   Icon set: `lucide-react`
    
*   Icons must:
    
    *   Be small (`h-4` to `h-5`)
        
    *   Reinforce meaning, not decorate
        

Common meanings:

*   Hammer → Forge / Mint
    
*   Fingerprint → Hash / Identity
    
*   Shield → Security / Privacy
    
*   Link → On-chain / Ethereum
    

* * *

## 7\. Page-Level Design Rules

### 7.1 Landing Page

Purpose: **Explain, not sell NFTs**

Must answer clearly:

*   Why this exists
    
*   When it is useful
    
*   How it works
    

Constraints:

*   No jargon without explanation
    
*   Strong reassurance about privacy
    

### 7.2 Connect Page

*   Minimal
    
*   One decision at a time
    
*   Wallet connection framed as a _technical prerequisite_, not onboarding hype
    

### 7.3 Upload Page

*   Explicit privacy messaging
    
*   Clear statement: _file never leaves device_
    

### 7.4 Preview Page

*   Read-only
    
*   No actions except navigation
    
*   Hash and metadata shown clearly
    

### 7.5 Forge Page

*   Single irreversible action
    
*   Visual feedback during forging
    
*   No distractions
    

### 7.6 Success / Failure Pages

*   Deterministic outcomes
    
*   Clear next step
    
*   No celebratory visuals
    

* * *

## 8\. Motion & Animation

Allowed:

*   Subtle background animation
    
*   Page transitions
    
*   Loading indicators
    

Forbidden:

*   Bounce
    
*   Shake
    
*   Attention-grabbing motion
    

Motion must feel **mechanical**, not emotional.

* * *

## 9\. Accessibility & Restraint

*   Contrast must remain readable on dark backgrounds
    
*   No hidden actions
    
*   No surprise UI changes
    

ChainForge favors **clarity over cleverness**.

* * *

## 10\. Design Philosophy Summary

> ChainForge does not try to impress.  
> It tries to convince.

Every screen should feel like:

*   A cryptographic terminal
    
*   A legal timestamping tool
    
*   A forensic instrument
    

If a design choice feels flashy, it is likely wrong.