// Legacy byteXL component - types migrated to local definitions
import { TrendingUp, Trophy } from "lucide-react";

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

interface WalletWidgetProps {
  wallet: Wallet;
  onLeaderboard: () => void;
}

export default function WalletWidget({
  wallet: _wallet,
  onLeaderboard,
}: WalletWidgetProps) {
  const segments = [
    {
      label: "Active Coding Time",
      pct: 45,
      color: "#00ff88",
      glow: "rgba(0,255,136,0.6)",
    },
    {
      label: "Code Complexity",
      pct: 30,
      color: "#00d4ff",
      glow: "rgba(0,212,255,0.6)",
    },
    {
      label: "Commit Quality",
      pct: 25,
      color: "#f5c842",
      glow: "rgba(245,200,66,0.6)",
    },
  ];

  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">My Wallet</span>
      </div>
      <div>
        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Available Earnings
        </p>
        <p className="text-3xl font-extrabold" style={{ color: "#00ff88" }}>
          $1,200.00
        </p>
        <p className="text-sm mt-1" style={{ color: "#f5c842" }}>
          Projected Payout: <span className="font-bold">$400</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: s.color, boxShadow: `0 0 6px ${s.glow}` }}
            />
            <span
              className="text-[10px] flex-1"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {s.label}
            </span>
            <span className="text-[10px] font-bold" style={{ color: s.color }}>
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
        style={{
          background: "rgba(0,255,136,0.1)",
          color: "#00ff88",
          border: "1px solid rgba(0,255,136,0.3)",
        }}
      >
        <TrendingUp size={14} /> Withdraw Earnings
      </button>
      <button
        type="button"
        onClick={onLeaderboard}
        className="w-full py-2 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        style={{
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Trophy size={14} /> View Leaderboard
      </button>
    </div>
  );
}
