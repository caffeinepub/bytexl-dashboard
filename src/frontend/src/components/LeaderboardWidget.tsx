import { TrendingUp, Trophy } from "lucide-react";

const TOP_EARNERS = [
  {
    rank: 1,
    name: "Arjun Mehta",
    college: "IIT Bombay",
    earnings: "$1,240",
    badge: "🥇",
  },
  {
    rank: 2,
    name: "Sneha Rao",
    college: "NIT Warangal",
    earnings: "$980",
    badge: "🥈",
  },
  {
    rank: 3,
    name: "Alka Raikwar",
    college: "IIIT Hyderabad",
    earnings: "$850",
    badge: "🥉",
  },
  {
    rank: 4,
    name: "Karan Gupta",
    college: "VIT Vellore",
    earnings: "$720",
    badge: "",
  },
  {
    rank: 5,
    name: "Aarti Nair",
    college: "BITS Pilani",
    earnings: "$690",
    badge: "",
  },
];

export default function LeaderboardWidget() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy
            size={16}
            style={{
              color: "#f5c842",
              filter: "drop-shadow(0 0 6px rgba(245,200,66,0.7))",
            }}
          />
          <span className="text-sm font-bold text-white">
            Top Earners This Week
          </span>
        </div>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-bold"
          style={{ background: "rgba(245,200,66,0.12)", color: "#f5c842" }}
        >
          Weekly
        </span>
      </div>
      <div className="space-y-2">
        {TOP_EARNERS.map((earner) => (
          <div
            key={earner.rank}
            className="flex items-center gap-3 p-2.5 rounded-xl transition-all"
            style={{
              background:
                earner.rank <= 3 ? "rgba(255,255,255,0.04)" : "transparent",
              border:
                earner.name === "Alka Raikwar"
                  ? "1px solid rgba(180,160,255,0.25)"
                  : "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <span className="text-base w-6 text-center">
              {earner.badge || `#${earner.rank}`}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{
                  color:
                    earner.name === "Alka Raikwar"
                      ? "#b4a0ff"
                      : "rgba(255,255,255,0.85)",
                  textShadow:
                    earner.name === "Alka Raikwar"
                      ? "0 0 10px rgba(180,160,255,0.6)"
                      : "none",
                }}
              >
                {earner.name}
              </p>
              <p
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {earner.college}
              </p>
            </div>
            <span
              className="text-sm font-bold flex items-center gap-1"
              style={{
                color: "#00ff88",
                textShadow: "0 0 8px rgba(0,255,136,0.5)",
              }}
            >
              <TrendingUp size={11} />
              {earner.earnings}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
