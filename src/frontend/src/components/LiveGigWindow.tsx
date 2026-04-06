// Legacy byteXL component - types migrated to local definitions
import { Clock, Lock, Users, Zap } from "lucide-react";
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

interface LiveGigWindowProps {
  gigs: Gig[];
  bytexlScore: number;
  onClaim: (gigId: string) => void;
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
      setTimeLeft(d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [deadlineNs]);
  return timeLeft;
}

const MOCK_VIEWERS: Record<string, number> = { g1: 24, g2: 17, g3: 31 };

function GigRow({
  gig,
  isLive,
  scoreUnlocked,
  onClaim,
}: { gig: Gig; isLive: boolean; scoreUnlocked: boolean; onClaim: () => void }) {
  const countdown = useCountdown(gig.deadline);
  const liveViewers = MOCK_VIEWERS[gig.id] ?? 18;
  const canClaim = isLive && scoreUnlocked && !gig.claimed;
  return (
    <div
      className="flex items-start justify-between gap-3 py-3 border-b last:border-0"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {gig.title}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {gig.source} · ${Number(gig.budgetUsd)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
          style={{
            background: "rgba(0,255,136,0.08)",
            color: "#00ff88",
            border: "1px solid rgba(0,255,136,0.2)",
          }}
        >
          <Clock size={9} />
          {countdown}
        </span>
        {isLive && (
          <span
            className="text-[10px] flex items-center gap-1"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Users size={9} />
            {liveViewers} viewing
          </span>
        )}
        <button
          type="button"
          onClick={onClaim}
          disabled={!canClaim}
          className="text-[11px] font-semibold px-3 py-1 rounded-lg transition-all"
          style={
            canClaim
              ? {
                  background: "rgba(0,255,136,0.15)",
                  color: "#00ff88",
                  border: "1px solid rgba(0,255,136,0.3)",
                }
              : {
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "not-allowed",
                }
          }
        >
          {gig.claimed ? "Claimed" : "Claim Task"}
        </button>
      </div>
    </div>
  );
}

export default function LiveGigWindow({
  gigs,
  bytexlScore,
  onClaim,
}: LiveGigWindowProps) {
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
      style={{
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={16} style={{ color: "#00ff88" }} />
          <span className="text-sm font-bold text-white">Live Tech Gigs</span>
        </div>
        {isLiveWindow ? (
          <span
            className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
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
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Opens in {nextWindow}
          </span>
        )}
      </div>
      {!scoreUnlocked && (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3"
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
            <span className="font-bold text-white">500+</span> to unlock tasks.{" "}
            <span style={{ color: "#00ff88" }}>Current: {bytexlScore}</span>
          </p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {gigs.map((gig) => (
          <GigRow
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
