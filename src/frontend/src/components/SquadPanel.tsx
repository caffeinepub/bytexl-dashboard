const SQUAD_MEMBERS = [
  {
    name: "Alka Raikwar",
    initials: "AR",
    role: "Backend Lead",
    status: "active" as const,
    color: "#7C3AED",
  },
  {
    name: "Rahul Sharma",
    initials: "RS",
    role: "Frontend UI",
    status: "productive" as const,
    color: "#1E63D6",
  },
  {
    name: "Priya Singh",
    initials: "PS",
    role: "API Dev",
    status: "active" as const,
    color: "#0891b2",
  },
  {
    name: "Kiran Kumar",
    initials: "KK",
    role: "DevOps",
    status: "idle" as const,
    color: "#6B7280",
  },
  {
    name: "Ankit Verma",
    initials: "AV",
    role: "QA Engineer",
    status: "productive" as const,
    color: "#059669",
  },
  {
    name: "Divya Nair",
    initials: "DN",
    role: "DB Admin",
    status: "active" as const,
    color: "#d97706",
  },
  {
    name: "Rohan Gupta",
    initials: "RG",
    role: "ML Dev",
    status: "idle" as const,
    color: "#6B7280",
  },
  {
    name: "Sneha Rao",
    initials: "SR",
    role: "UI/UX Lead",
    status: "productive" as const,
    color: "#be185d",
  },
  {
    name: "Arjun Mehta",
    initials: "AM",
    role: "Tech Lead",
    status: "active" as const,
    color: "#1E63D6",
  },
  {
    name: "Kavita Joshi",
    initials: "KJ",
    role: "Backend Dev",
    status: "active" as const,
    color: "#7C3AED",
  },
  {
    name: "Suresh Babu",
    initials: "SB",
    role: "Frontend Dev",
    status: "idle" as const,
    color: "#6B7280",
  },
  {
    name: "Mira Patel",
    initials: "MP",
    role: "API Dev",
    status: "productive" as const,
    color: "#059669",
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    role: "Cloud Dev",
    status: "active" as const,
    color: "#0891b2",
  },
  {
    name: "Nisha Reddy",
    initials: "NR",
    role: "Security",
    status: "idle" as const,
    color: "#6B7280",
  },
  {
    name: "Amit Yadav",
    initials: "AY",
    role: "Full Stack",
    status: "productive" as const,
    color: "#d97706",
  },
];

const STATUS_CONFIG = {
  active: {
    color: "#00ff88",
    label: "Active",
    glow: "0 0 8px rgba(0,255,136,0.8)",
  },
  productive: {
    color: "#00d4ff",
    label: "Productive",
    glow: "0 0 8px rgba(0,212,255,0.8)",
  },
  idle: {
    color: "#f59e0b",
    label: "Idle",
    glow: "0 0 8px rgba(245,158,11,0.6)",
  },
};

const FEED_ITEMS = [
  "Alka → Backend API Dev",
  "Rahul → Frontend UI Build",
  "Priya → REST Integration",
  "Ankit → Test Automation",
  "Divya → Schema Migration",
];

export default function SquadPanel() {
  const activeCount = SQUAD_MEMBERS.filter(
    (m) => m.status === "active" || m.status === "productive",
  ).length;

  return (
    <aside
      className="fixed right-0 top-0 h-full w-80 flex flex-col z-20"
      style={{
        background: "rgba(255,255,255,0.025)",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-4 border-b flex-shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">Squad Room</span>
          <span
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,255,136,0.12)",
              color: "#00ff88",
              border: "1px solid rgba(0,255,136,0.25)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-squad-glow"
              style={{ background: "#00ff88" }}
            />
            {activeCount} Active
          </span>
        </div>
      </div>

      {/* Squad list */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-1"
        style={{ scrollbarWidth: "none" }}
      >
        {SQUAD_MEMBERS.map((member) => {
          const sc = STATUS_CONFIG[member.status];
          const isActive = member.status === "active";
          return (
            <div
              key={member.name}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-default"
              style={{
                background: isActive
                  ? "rgba(0,255,136,0.04)"
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${
                  isActive ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.04)"
                }`,
              }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{
                    background: `${member.color}22`,
                    border: `1.5px solid ${member.color}66`,
                    boxShadow: isActive ? `0 0 8px ${member.color}44` : "none",
                  }}
                >
                  {member.initials}
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{
                    background: sc.color,
                    borderColor: "#0a0e14",
                    boxShadow: sc.glow,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold truncate"
                  style={{
                    color:
                      member.name === "Alka Raikwar"
                        ? "#b4a0ff"
                        : "rgba(255,255,255,0.85)",
                  }}
                >
                  {member.name}
                </p>
                <p
                  className="text-[10px] truncate"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {member.role}
                </p>
              </div>
              <span
                className="text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0"
                style={{ color: sc.color, background: `${sc.color}18` }}
              >
                {sc.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Task Feed */}
      <div
        className="px-3 pb-4 pt-2 border-t flex-shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-2"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Live Assignments
        </p>
        <div className="space-y-1.5">
          {FEED_ITEMS.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: i === 0 ? "#00ff88" : "rgba(255,255,255,0.2)",
                  boxShadow: i === 0 ? "0 0 4px #00ff88" : "none",
                }}
              />
              <span
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
