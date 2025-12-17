import seeryLogo from "@/assets/seerylogo.png";
import siargaoLogo from "@/assets/siargao-logo.png";
import splitsafeLogo from "@/assets/splitsafe-logo.png";

import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "SplitSafe",
    description: "Trustless escrow and split-payments platform on Internet Computer (ICP) with native Bitcoin (ckBTC) support. Features milestone escrow, Constellation Digital Evidence, Story Protocol IP registration, and SEI fast settlement.",
    tags: ["React", "TypeScript", "ICP", "Motoko", "Bitcoin", "SEI"],
    liveUrl: "https://splitsafe.com",
    githubUrl: "https://github.com/kd-s-t/splitsafe",
    image: splitsafeLogo.src,
  },
  {
    title: "Seery",
    description: "Decentralized crypto prediction platform on BNB Chain. Users stake BNB on 24-hour price predictions with AI-powered forecasts and Chainlink/Pyth oracles for automated resolution.",
    tags: ["Next.js", "TypeScript", "BNB Chain", "Solidity", "OpenAI", "Chainlink"],
    liveUrl: "https://theseery.com",
    githubUrl: "https://github.com/kd-s-t/seery",
    image: seeryLogo.src,
  },
  {
    title: "Siargao Trading Road",
    description: "B2B marketplace connecting suppliers and stores in Siargao. Includes role-based access, order management, location tracking, and multi-platform support (web, React Native, Flutter).",
    tags: ["Next.js", "Golang", "PostgreSQL", "React Native", "Flutter", "AWS"],
    liveUrl: "https://siargaotradingroad.com",
    githubUrl: "https://github.com/kd-s-t/siargao-trading-road",
    image: siargaoLogo.src,
  },
];
