# COSMIC DICE 🎲🌌

> **The first dice game powered by randomness from space.**

Cosmic Dice is a premium developer showcase dApp demonstrating how to integrate **SpaceComputer's Orbitport cTRNG (Cosmic True Random Number Generator)** into a modern Web3/Next.js stack. The application fetches true physical entropy generated in low-Earth orbit and uses it to drive a highly polished 3D CSS dice simulator.

---

## Features

- 🌌 **Real Space Randomness**: Zero use of `Math.random()`. Every roll uses absolute true randomness fetched directly from SpaceComputer's satellite infrastructure.
- 🎲 **3D CSS Dice Cube**: A lightweight, high-performance 3D dice constructed entirely in Tailwind CSS and Framer Motion—free from heavy WebGL dependencies (no hydration errors).
- 🔒 **Secure cTRNG Architecture**: Credentials are kept strictly server-side in a Next.js API route (`/api/random`), never leaking to the frontend.
- 🧮 **Entropy Modulo logic**: Fully utilizes entropy by converting the entire random hex output into a BigInt and applying the formula `(BigInt(randomHex) % 6n) + 1n`.
- 📊 **Verification Panel**: Shows the raw signed hex seed, timestamp, provider, and verification status for auditability.
- 💾 **Local History & Stats**: Stores the latest 20 rolls in `localStorage` and charts outcomes using a custom CSS distribution bar graph.
- 🔮 **SpaceX × Web3 Aesthetics**: Glassmorphic panels, neon borders, custom scrollbars, and dynamic parallax star backdrops.
- 🔌 **RainbowKit wallet connection**: Standard wallet authentication in header (MetaMask, Rabby, WalletConnect).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI & Layout**: React 19, Tailwind CSS v4, Lucide Icons
- **Animation**: Framer Motion
- **Web3 Connectivity**: RainbowKit v2, Wagmi v2, Viem
- **Randomness Gateway**: `@spacecomputer-io/orbitport-sdk-ts`

---

## Prerequisites

- **Node.js**: `v18.18+` or later
- **npm** or **yarn**

---

## Getting Started

### 1. Install Dependencies

Clone the project and install all required modules:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

Ensure the following variables are set:

```env
# ORBITPORT CLIENT CREDENTIALS (SERVER-SIDE ONLY)
ORBITPORT_CLIENT_ID=KUHwJFiXzSX7lLAiRWuYOJ09L41yaGvF
ORBITPORT_CLIENT_SECRET=_9F67LWR2bEE2fgp5Oa4OMBIh32stu-e_rrsqaDcmDCrRPnfF9_7b522zeCMBfZF

# RAINBOWKIT / WALLETCONNECT
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=825eb66b539bf3df8f5f0b8ce11c97be
```

*Note: The credentials provided above are configured specifically for this showcase dApp.*

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) to roll the dice.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## Orbitport Setup

If you want to use your own client credentials:
1. Log in to [accounts.spacecomputer.io](https://accounts.spacecomputer.io).
2. Go to **Credentials** and create a new client credential pair.
3. Replace the `ORBITPORT_CLIENT_ID` and `ORBITPORT_CLIENT_SECRET` inside your `.env.local` file.

---

## Deploying to Vercel

This application is ready to deploy directly to Vercel with zero modifications:

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel.
3. In the project settings, add the Environment Variables:
   - `ORBITPORT_CLIENT_ID`
   - `ORBITPORT_CLIENT_SECRET`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. Deploy!

---

## Future Improvements

- ⛓️ **On-chain Dice Roll Anchoring**: Commit roll seed hashes directly on-chain to allow verifiable off-chain outcomes matching on-chain transactions.
- 🪙 **Play-to-Earn Mechanics**: Add a gas-less testnet betting game where users guess the outcome of the cosmic roll.
- 📈 **Global Leaderboard**: A database-driven leaderboard to track users with the longest streaks or highest roll counts.
