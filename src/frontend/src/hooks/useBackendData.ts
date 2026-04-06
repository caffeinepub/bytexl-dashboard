import { useEffect, useState } from "react";
import { useActor } from "./useActor";

interface StudentProfile {
  name: string;
  college: string;
  bytexlScore: bigint;
  coursesCompleted: bigint;
  dayStreak: bigint;
  collegeRank: bigint;
}

interface Course {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  durationMinutes: bigint;
  progressPercent: bigint;
  isCompleted: boolean;
}

interface Gig {
  id: string;
  title: string;
  description: string;
  source: string;
  skills: string[];
  budgetUsd: bigint;
  deadline: bigint;
  claimed: boolean;
  isCompleted: boolean;
}

interface PlacementRecord {
  companyName: string;
  college: string;
  studentsPlaced: bigint;
  month: string;
  year: bigint;
}

interface Wallet {
  totalEarnings: bigint;
  pendingPayments: bigint;
  transactions: Array<{
    gigId: string;
    amountUsdCents: bigint;
    isCompleted: boolean;
    timestamp: bigint;
  }>;
}

const mockProfile: StudentProfile = {
  name: "Alka Raikwar",
  college: "IIIT Hyderabad",
  bytexlScore: 820n,
  coursesCompleted: 8n,
  dayStreak: 14n,
  collegeRank: 3n,
};

const mockCourses: Course[] = [
  {
    title: "React & TypeScript Mastery",
    description: "Build production-grade React apps",
    category: "Web Dev",
    difficulty: "Intermediate",
    durationMinutes: 360n,
    progressPercent: 75n,
    isCompleted: false,
  },
  {
    title: "Node.js REST API Design",
    description: "Design and build scalable REST APIs",
    category: "Web Dev",
    difficulty: "Intermediate",
    durationMinutes: 240n,
    progressPercent: 100n,
    isCompleted: true,
  },
];

const now = Date.now();
const mockGigs: Gig[] = [
  {
    id: "g1",
    title: "Full Stack Developer – DevCorp",
    description: "Build a React + Node.js dashboard",
    source: "Upwork",
    skills: ["React", "Node.js", "PostgreSQL"],
    budgetUsd: 450n,
    deadline: BigInt((now + 3 * 24 * 60 * 60 * 1000) * 1_000_000),
    claimed: false,
    isCompleted: false,
  },
  {
    id: "g2",
    title: "UI Fixes – Innovatech",
    description: "Fix responsive layout issues",
    source: "Fiverr",
    skills: ["Next.js", "Tailwind CSS"],
    budgetUsd: 120n,
    deadline: BigInt((now + 1 * 24 * 60 * 60 * 1000) * 1_000_000),
    claimed: false,
    isCompleted: false,
  },
];

const mockPlacements: PlacementRecord[] = [
  {
    companyName: "Google",
    college: "IIIT Hyderabad",
    studentsPlaced: 24n,
    month: "March",
    year: 2026n,
  },
  {
    companyName: "Microsoft",
    college: "IIIT Hyderabad",
    studentsPlaced: 18n,
    month: "March",
    year: 2026n,
  },
  {
    companyName: "Amazon",
    college: "IIIT Hyderabad",
    studentsPlaced: 15n,
    month: "March",
    year: 2026n,
  },
];

const mockWallet: Wallet = {
  totalEarnings: 285050n,
  pendingPayments: 12000n,
  transactions: [
    {
      gigId: "g1",
      amountUsdCents: 45000n,
      isCompleted: true,
      timestamp: BigInt(Date.now() * 1_000_000),
    },
  ],
};

export function useBackendData() {
  const { actor: _actor } = useActor();
  const [profile] = useState<StudentProfile>(mockProfile);
  const [courses] = useState<Course[]>(mockCourses);
  const [gigs, setGigs] = useState<Gig[]>(mockGigs);
  const [placements] = useState<PlacementRecord[]>(mockPlacements);
  const [wallet] = useState<Wallet>(mockWallet);
  const [loading] = useState(false);

  const claimGig = (gigId: string) => {
    setGigs((prev) =>
      prev.map((g) => (g.id === gigId ? { ...g, claimed: true } : g)),
    );
  };

  return { profile, courses, gigs, placements, wallet, loading, claimGig };
}
