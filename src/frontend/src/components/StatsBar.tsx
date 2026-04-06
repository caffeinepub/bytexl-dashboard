// Legacy byteXL component - types migrated to local definitions
interface StudentProfile {
  name: string;
  college: string;
  bytexlScore: bigint;
  coursesCompleted: bigint;
  dayStreak: bigint;
  collegeRank: bigint;
}

interface StatsBarProps {
  profile: StudentProfile;
  coursesCompleted: number;
}

export default function StatsBar(_props: StatsBarProps) {
  return null;
}
