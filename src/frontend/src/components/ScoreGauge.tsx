// Legacy byteXL component - types migrated to local definitions
interface StudentProfile {
  name: string;
  college: string;
  bytexlScore: bigint;
  coursesCompleted: bigint;
  dayStreak: bigint;
  collegeRank: bigint;
}

interface ScoreGaugeProps {
  profile: StudentProfile;
}

export default function ScoreGauge({ profile: _profile }: ScoreGaugeProps) {
  const score = 1066;
  const maxScore = 1500;
  const percent = Math.min(score / maxScore, 1);
  const cx = 90;
  const cy = 90;
  const r = 70;
  const startAngle = -200;
  const sweepAngle = 220;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcPath = (start: number, sweep: number) => {
    const end = start + sweep;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  const filledSweep = sweepAngle * percent;
  const breakdown = [
    { label: "Courses", value: 280, max: 300, color: "#00ff88" },
    { label: "Gigs Completed", value: 420, max: 500, color: "#00d4ff" },
    { label: "Assessments", value: 366, max: 400, color: "#f5c842" },
  ];

  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">byteXL Score</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <svg
            width="180"
            height="140"
            viewBox="0 0 180 140"
            role="img"
            aria-labelledby="bytexl-score-title"
          >
            <title id="bytexl-score-title">
              byteXL Score: {score} / {maxScore}
            </title>
            <defs>
              <linearGradient
                id="gaugeGradDark"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00ff88" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
            <path
              d={arcPath(startAngle, sweepAngle)}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {filledSweep > 0 && (
              <path
                d={arcPath(startAngle, filledSweep)}
                fill="none"
                stroke="url(#gaugeGradDark)"
                strokeWidth="12"
                strokeLinecap="round"
              />
            )}
            <text
              x={cx}
              y={cy - 8}
              textAnchor="middle"
              fontSize="26"
              fontWeight="800"
              fill="white"
            >
              {score}
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(255,255,255,0.4)"
            >
              / {maxScore}
            </text>
          </svg>
        </div>
        <div className="flex-1 space-y-3">
          {breakdown.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  {item.label}
                </span>
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.value / item.max) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
