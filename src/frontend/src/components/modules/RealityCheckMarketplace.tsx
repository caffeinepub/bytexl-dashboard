import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import JobDoerModal from "../JobDoerModal";

const JOB_ROLES = [
  {
    title: "SDE-1",
    salary: "₹18-28 LPA",
    verification: 97,
    skills: ["DSA", "System Design", "React"],
    color: "#00FF88",
    trend: [16, 18, 21, 24, 28],
  },
  {
    title: "AI/ML Engineer",
    salary: "₹24-45 LPA",
    verification: 96,
    skills: ["Python", "PyTorch", "MLOps"],
    color: "#00e07a",
    trend: [20, 24, 30, 38, 45],
  },
  {
    title: "Data Scientist",
    salary: "₹20-38 LPA",
    verification: 94,
    skills: ["Statistics", "SQL", "Tableau"],
    color: "#00c870",
    trend: [18, 20, 25, 30, 38],
  },
  {
    title: "Full Stack Dev",
    salary: "₹15-25 LPA",
    verification: 98,
    skills: ["MERN", "Docker", "AWS"],
    color: "#00b060",
    trend: [13, 15, 18, 21, 25],
  },
  {
    title: "DevOps Engineer",
    salary: "₹22-40 LPA",
    verification: 95,
    skills: ["Kubernetes", "CI/CD", "Terraform"],
    color: "#00a055",
    trend: [19, 22, 27, 33, 40],
  },
  {
    title: "AI Product Manager",
    salary: "₹30-55 LPA",
    verification: 92,
    skills: ["Product Strategy", "LLMs", "Agile"],
    color: "#009048",
    trend: [25, 30, 37, 45, 55],
  },
];

const SALARY_DATA = [
  {
    year: "2020",
    SDE1: 16,
    AIML: 20,
    DS: 18,
    FullStack: 13,
    DevOps: 19,
    PM: 25,
  },
  {
    year: "2021",
    SDE1: 18,
    AIML: 24,
    DS: 20,
    FullStack: 15,
    DevOps: 22,
    PM: 30,
  },
  {
    year: "2022",
    SDE1: 21,
    AIML: 30,
    DS: 25,
    FullStack: 18,
    DevOps: 27,
    PM: 37,
  },
  {
    year: "2023",
    SDE1: 24,
    AIML: 38,
    DS: 30,
    FullStack: 21,
    DevOps: 33,
    PM: 45,
  },
  {
    year: "2024",
    SDE1: 26,
    AIML: 42,
    DS: 34,
    FullStack: 23,
    DevOps: 37,
    PM: 50,
  },
  {
    year: "2025",
    SDE1: 28,
    AIML: 45,
    DS: 38,
    FullStack: 25,
    DevOps: 40,
    PM: 55,
  },
];

const AREA_COLORS = [
  "#00FF88",
  "#00e07a",
  "#00c870",
  "#00b060",
  "#00a055",
  "#009048",
];

function MiniChart({
  role,
  color,
}: { role: (typeof JOB_ROLES)[0]; color: string }) {
  const data = role.trend.map((v, i) => ({ year: 2020 + i, salary: v }));
  const gradId = `mini-${role.title.replace(/[^a-z0-9]/gi, "-")}`;
  return (
    <ResponsiveContainer width="100%" height={50}>
      <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="salary"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradId})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function JobCard({
  role,
  onTalk,
}: { role: (typeof JOB_ROLES)[0]; onTalk: () => void }) {
  return (
    <div
      className="glass-card-hover p-5 flex flex-col gap-3"
      data-ocid="marketplace.card"
    >
      <div className="flex items-start justify-between">
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#F2F5F3" }}>
          {role.title}
        </h3>
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(0,255,136,0.1)",
            border: "1px solid rgba(0,255,136,0.2)",
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#00FF88",
              animation: "live-blink 1.2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: 9,
              color: "#00FF88",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      <div
        style={{ fontSize: 24, fontWeight: 800, color: role.color }}
        className="glow-text-green"
      >
        {role.salary}
      </div>

      <div style={{ margin: "0 -4px" }}>
        <MiniChart role={role} color={role.color} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontSize: 11, color: "#9AA6A0" }}>
            Verification Score
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#00FF88" }}>
            {role.verification}%
          </span>
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{ height: 4, background: "rgba(255,255,255,0.07)" }}
        >
          <div
            style={{
              width: `${role.verification}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${role.color}, rgba(0,255,136,0.4))`,
              borderRadius: "999px",
              boxShadow: "0 0 4px rgba(0,255,136,0.4)",
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {role.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded-full"
            style={{
              fontSize: 10,
              color: "#9AA6A0",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onTalk}
        className="btn-cyber w-full py-2 mt-auto"
        style={{ fontSize: 12 }}
        data-ocid="marketplace.primary_button"
      >
        Talk to a Real Job-Doer
      </button>
    </div>
  );
}

export default function RealityCheckMarketplace() {
  const [modalRole, setModalRole] = useState<string | null>(null);

  return (
    <div className="module-page">
      <div className="mb-2">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#F2F5F3",
            marginBottom: 6,
          }}
        >
          Reality Check{" "}
          <span style={{ color: "#00FF88" }} className="glow-text-green">
            Marketplace
          </span>
        </h1>
        <div
          style={{
            height: 2,
            width: 200,
            background: "linear-gradient(90deg, #00FF88, transparent)",
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(0,255,136,0.5)",
            marginBottom: 8,
          }}
        />
        <p style={{ fontSize: 13, color: "#9AA6A0" }}>
          Verified salary data from real professionals — not LinkedIn estimates
        </p>
      </div>

      <div
        className="grid gap-4 mb-8"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 24 }}
      >
        {JOB_ROLES.map((role) => (
          <JobCard
            key={role.title}
            role={role}
            onTalk={() => setModalRole(role.title)}
          />
        ))}
      </div>

      <div
        className="glass-card p-6"
        style={{ borderColor: "rgba(0,255,136,0.15)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#F2F5F3",
                marginBottom: 2,
              }}
            >
              Salary Trend Analysis
            </h3>
            <p style={{ fontSize: 12, color: "#9AA6A0" }}>
              5-year salary growth across all roles (LPA)
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#00FF88",
                animation: "live-blink 1.2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: "#00FF88",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              LIVE DATA
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={SALARY_DATA}
            margin={{ top: 10, right: 16, left: -10, bottom: 0 }}
          >
            <defs>
              {JOB_ROLES.map((role, i) => (
                <linearGradient
                  key={role.title}
                  id={`grad-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={AREA_COLORS[i]}
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor={AREA_COLORS[i]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="year"
              tick={{ fill: "#9AA6A0", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9AA6A0", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
              tickFormatter={(v) => `${v}L`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(13,13,13,0.95)",
                border: "1px solid rgba(0,255,136,0.2)",
                borderRadius: 8,
                color: "#F2F5F3",
                fontSize: 12,
              }}
              formatter={(value: number) => [`₹${value} LPA`]}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#9AA6A0", paddingTop: 8 }}
            />
            <Area
              type="monotone"
              dataKey="SDE1"
              name="SDE-1"
              stroke={AREA_COLORS[0]}
              fill="url(#grad-0)"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="AIML"
              name="AI/ML"
              stroke={AREA_COLORS[1]}
              fill="url(#grad-1)"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="DS"
              name="Data Sci"
              stroke={AREA_COLORS[2]}
              fill="url(#grad-2)"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="FullStack"
              name="Full Stack"
              stroke={AREA_COLORS[3]}
              fill="url(#grad-3)"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="DevOps"
              name="DevOps"
              stroke={AREA_COLORS[4]}
              fill="url(#grad-4)"
              strokeWidth={1.5}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="PM"
              name="AI PM"
              stroke={AREA_COLORS[5]}
              fill="url(#grad-5)"
              strokeWidth={1.5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <JobDoerModal
        open={!!modalRole}
        onClose={() => setModalRole(null)}
        role={modalRole ?? ""}
      />
    </div>
  );
}
