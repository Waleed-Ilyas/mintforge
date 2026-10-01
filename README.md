# MintForge — NFT collection launch dashboard

[![CI](https://img.shields.io/badge/CI-vitest-%2344cc88)](https://github.com/Waleed-Ilyas/mintforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

MintForge is a devnet-only NFT collection launch dashboard. It models collection health, mint economics, and a marketplace header flow without claiming a production minting deployment.

## Demo accounts

No real login is required. This repo uses collection demo states and wallet labels for product storytelling:

- Genesis Collector — early mint wallet
- Mirage Lab — trending mint wallet
- Orbit Studio — hot drop wallet

## Features

- collection health panel and status indicators
- launch economics for royalties, fees, and total mint cost
- drop-by-drop supply tracking for collections
- honest devnet warning before any wallet signing or metadata upload

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Vitest
- Solana devnet guidance

## Getting started

```bash
cd projects/mintforge
pnpm install
cp .env.example .env.local
pnpm dev
```

## Tests

```bash
pnpm test
pnpm build
```

## Key engineering decisions

- the mint economics are expressed in pure TypeScript to keep the pricing model deterministic and testable
- the UI makes the devnet-only boundary explicit so it remains honest for recruiters and reviewers
- the next upgrade path is to verify actual Metaplex Core minting and Irys metadata uploads before any public claim is made

## What I'd improve next

- add real wallet connect and devnet mint flow for a verified collection launch
- integrate Irys or Arweave metadata uploads and a buy/sell marketplace workflow
- persist collection data and minted inventory in Postgres or a lightweight DB
- add explorer links, transaction status, and collection-level analytics after live validation

## Author

Waleed Ilyas — https://github.com/Waleed-Ilyas
