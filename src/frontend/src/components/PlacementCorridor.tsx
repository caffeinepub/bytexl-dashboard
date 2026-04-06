// Legacy byteXL component - types migrated to local definitions
import { Award, TrendingUp } from "lucide-react";

interface PlacementRecord {
  companyName: string;
  college: string;
  studentsPlaced: bigint;
  month: string;
  year: bigint;
}

interface PlacementCorridorProps {
  placements: PlacementRecord[];
}

const TICKER_MESSAGES = [
  "🎉 Student Alka just joined Amazon via the byteXL Gig Pipeline!",
  "🚀 24 students from IIIT Hyderabad placed at Google in March 2026",
  "⚡ 18 new placements at Microsoft this month",
  "🏆 byteXL students: 89% placement rate, highest in the region",
];

export default function PlacementCorridor({
  placements,
}: PlacementCorridorProps) {
  const tickerText = TICKER_MESSAGES.join("   ·   ");
  const points = [20, 35, 28, 45, 38, 55, 48, 65, 58, 72, 68, 82, 78, 88];
  const w = 120;
  const h = 50;
  const step = w / (points.length - 1);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const toY = (v: number) => h - ((v - min) / (max - min)) * (h - 8) - 4;
  const pathD = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${toY(v)}`)
    .join(" ");
  const areaD = `${pathD} L ${(points.length - 1) * step} ${h} L 0 ${h} Z`;

  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={16} style={{ color: "#f5c842" }} />
          <span className="text-sm font-bold text-white">
            Placement Success Accelerator
          </span>
        </div>
      </div>
      <div
        className="rounded-xl py-2.5 overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(245,200,66,0.15)",
        }}
      >
        <span className="text-xs font-medium px-6" style={{ color: "#f5c842" }}>
          {tickerText}
        </span>
      </div>
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <svg
            width={w}
            height={h + 10}
            viewBox={`0 0 ${w} ${h + 10}`}
            role="img"
            aria-labelledby="placement-trend-title"
          >
            <title id="placement-trend-title">
              Placement Success Rate: 88%
            </title>
            <defs>
              <linearGradient id="goldAreaDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5c842" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f5c842" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#goldAreaDark)" />
            <path
              d={pathD}
              fill="none"
              stroke="#f5c842"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {placements.slice(0, 6).map((p) => (
            <div
              key={p.companyName}
              className="px-3 py-2 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,200,66,0.15)",
              }}
            >
              <p className="text-xs font-bold text-white">{p.companyName}</p>
              <p
                className="text-[10px] font-semibold"
                style={{ color: "#f5c842" }}
              >
                {Number(p.studentsPlaced)} Students
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="flex-1 py-2.5 px-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,200,66,0.2), rgba(180,140,30,0.2))",
          color: "#f5c842",
          border: "1px solid rgba(245,200,66,0.35)",
        }}
      >
        <TrendingUp size={14} /> View Verified Work Portfolio
      </button>
    </div>
  );
}
