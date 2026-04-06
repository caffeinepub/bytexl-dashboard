// Legacy byteXL component - types migrated to local definitions
import { Clock, Lock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

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

interface HackerHubProps {
  gigs: Gig[];
  bytexlScore: number;
  onClaim: (id: string) => void;
}

function useCountdown(deadlineNs: bigint) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const target = Number(deadlineNs) / 1_000_000;
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [deadlineNs]);
  return timeLeft;
}

function GigItem({
  gig,
  isLive,
  scoreUnlocked,
  onClaim,
}: { gig: Gig; isLive: boolean; scoreUnlocked: boolean; onClaim: () => void }) {
  const countdown = useCountdown(gig.deadline);
  const canClaim = isLive && scoreUnlocked && !gig.claimed;
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl transition-all"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {gig.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-bold" style={{ color: "#00ff88" }}>
            ${Number(gig.budgetUsd)}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {gig.source}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <Clock size={9} style={{ color: "rgba(255,255,255,0.35)" }} />
          <span
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {countdown}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClaim}
        disabled={!canClaim}
        className="text-[11px] font-bold px-4 py-2 rounded-lg flex-shrink-0 transition-all"
        style={
          canClaim
            ? {
                background: "rgba(0,255,136,0.15)",
                color: "#00ff88",
                border: "1px solid rgba(0,255,136,0.4)",
              }
            : {
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "not-allowed",
              }
        }
      >
        {gig.claimed ? "✓ Claimed" : "Claim Task"}
      </button>
    </div>
  );
}

export default function HackerHub({
  gigs,
  bytexlScore,
  onClaim,
}: HackerHubProps) {
  const hour = new Date().getHours();
  const isLiveWindow = hour >= 5 && hour < 7;
  const scoreUnlocked = bytexlScore >= 500;
  const [nextWindow, setNextWindow] = useState("");

  useEffect(() => {
    const now = new Date();
    const next = new Date(now);
    if (now.getHours() >= 7) next.setDate(next.getDate() + 1);
    next.setHours(5, 0, 0, 0);
    const diff = next.getTime() - now.getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    setNextWindow(`${h}h ${m}m`);
  }, []);

  return (
    <div
      className={isLiveWindow ? "glass-card-glow-green" : "glass-card"}
      style={{ padding: "24px" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: isLiveWindow ? "0 0 20px rgba(0,255,136,0.1)" : "none",
        }}
      >
        <Zap
          size={16}
          style={{
            color: isLiveWindow ? "#00ff88" : "rgba(255,255,255,0.4)",
            flexShrink: 0,
          }}
        />
        <span
          className="flex-1 text-sm font-medium"
          style={{
            color: isLiveWindow
              ? "rgba(255,255,255,0.85)"
              : "rgba(255,255,255,0.4)",
          }}
        >
          Start your 5-7 AM Squad Gig
        </span>
        {isLiveWindow ? (
          <span
            className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,255,136,0.2)",
              color: "#00ff88",
              border: "1px solid rgba(0,255,136,0.4)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#00ff88" }}
            />{" "}
            LIVE
          </span>
        ) : (
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <Clock size={10} className="inline mr-1" /> Opens in {nextWindow}
          </span>
        )}
      </div>
      {!scoreUnlocked && (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Lock
            size={13}
            style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }}
          />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Reach byteXL Score{" "}
            <span className="font-bold text-white">500+</span> to claim live
            tasks.{" "}
            <span style={{ color: "#00ff88" }}>Current: {bytexlScore}</span>
          </p>
        </div>
      )}
      <div className="space-y-2.5">
        {gigs.map((gig) => (
          <GigItem
            key={gig.id}
            gig={gig}
            isLive={isLiveWindow}
            scoreUnlocked={scoreUnlocked}
            onClaim={() => onClaim(gig.id)}
          />
        ))}
      </div>
    </div>
  );
}
