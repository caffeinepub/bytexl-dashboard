import React from "react";
import type { View } from "../App";

interface SidebarProps {
  view: View;
  setView: (v: View) => void;
}

const levels = [
  {
    id: 0,
    label: "LOCKED",
    sublabel: "Apex Tier",
    module: null as View | null,
    locked: true,
  },
  {
    id: 1,
    label: "Level-1",
    sublabel: "Market Reality",
    module: "marketplace" as View,
    locked: false,
  },
  {
    id: 2,
    label: "Level-2",
    sublabel: "Builder",
    module: "aiHIRatio" as View,
    locked: false,
  },
  {
    id: 3,
    label: "Level-3",
    sublabel: "Foundations",
    module: "curriculumATS" as View,
    locked: false,
  },
];

const viewToLevel: Partial<Record<View, number>> = {
  curriculumATS: 3,
  aiHIRatio: 2,
  marketplace: 1,
};

export default function Sidebar({ view, setView }: SidebarProps) {
  const activeLevel = viewToLevel[view] ?? -1;

  return (
    <aside
      className="flex flex-col flex-shrink-0 h-full"
      style={{
        width: 240,
        background: "#070707",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
      data-ocid="sidebar.panel"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0 glow-green-sm"
          style={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #00FF88 0%, #00cc6a 100%)",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 18,
              color: "#000",
              lineHeight: 1,
            }}
          >
            S
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#F2F5F3",
              letterSpacing: "0.08em",
            }}
            className="glow-text-green"
          >
            SYNTRA
          </div>
          <div
            style={{ fontSize: 10, color: "#9AA6A0", letterSpacing: "0.12em" }}
          >
            AI PLATFORM
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          margin: "0 16px",
        }}
      />

      {/* Home + Level Guide buttons */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setView("home")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-left w-full"
          style={{
            background: view === "home" ? "rgba(0,255,136,0.1)" : "transparent",
            border:
              view === "home"
                ? "1px solid rgba(0,255,136,0.2)"
                : "1px solid transparent",
            color: view === "home" ? "#00FF88" : "#9AA6A0",
          }}
          data-ocid="sidebar.link"
          aria-label="Go to Home"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span
            style={{
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: view === "home" ? 700 : 500,
            }}
          >
            Home
          </span>
        </button>
        <button
          type="button"
          onClick={() => setView("levelGate")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-left w-full"
          style={{
            background:
              view === "levelGate" ? "rgba(0,255,136,0.1)" : "transparent",
            border:
              view === "levelGate"
                ? "1px solid rgba(0,255,136,0.2)"
                : "1px solid transparent",
            color: view === "levelGate" ? "#00FF88" : "#9AA6A0",
          }}
          data-ocid="sidebar.link"
          aria-label="How Levels Work"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span
            style={{
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: view === "levelGate" ? 700 : 500,
            }}
          >
            Level Guide
          </span>
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.04)",
          margin: "0 16px 4px",
        }}
      />

      {/* Cyber Roadmap label */}
      <div className="px-5 pt-3 pb-3">
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#9AA6A0",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          CYBER ROADMAP
        </span>
      </div>

      {/* Level timeline */}
      <div className="flex flex-col px-5 flex-1" style={{ gap: 0 }}>
        {levels.map((level, idx) => {
          const isActive = level.module === view;
          const isLocked = level.locked;

          return (
            <div
              key={level.id}
              className="flex items-stretch"
              style={{ minHeight: 72 }}
            >
              {/* Left: connector + node */}
              <div className="flex flex-col items-center" style={{ width: 28 }}>
                {/* Top connector */}
                <div
                  style={{
                    width: 2,
                    flex: idx === 0 ? "0 0 16px" : "1",
                    background:
                      idx === 0
                        ? "transparent"
                        : isActive || level.id > activeLevel
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,255,136,0.3)",
                  }}
                />
                {/* Node */}
                {isLocked ? (
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      background:
                        "linear-gradient(135deg, #FFD700, #00FF88, #FFD700, #00cc6a)",
                      backgroundSize: "300% 300%",
                      animation: "gold-gradient 3s ease infinite",
                      border: "2px solid rgba(255,215,0,0.5)",
                      boxShadow:
                        "0 0 14px rgba(255,215,0,0.5), 0 0 28px rgba(0,255,136,0.2)",
                      zIndex: 1,
                    }}
                    aria-label="Level 0 - Locked"
                  >
                    <span style={{ fontSize: 12 }}>🔒</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="rounded-full flex-shrink-0 cursor-pointer transition-all duration-300"
                    aria-label={`Go to ${level.sublabel}`}
                    style={{
                      width: 14,
                      height: 14,
                      background: isActive
                        ? "#00FF88"
                        : "rgba(255,255,255,0.12)",
                      border: isActive
                        ? "2px solid #00FF88"
                        : "2px solid rgba(255,255,255,0.15)",
                      boxShadow: isActive
                        ? "0 0 10px rgba(0,255,136,0.7), 0 0 20px rgba(0,255,136,0.3)"
                        : "none",
                      animation: isActive
                        ? "node-pulse 2s ease-in-out infinite"
                        : "none",
                      zIndex: 1,
                      padding: 0,
                    }}
                    onClick={() => level.module && setView(level.module)}
                  />
                )}
                {/* Bottom connector */}
                <div
                  style={{
                    width: 2,
                    flex: idx === levels.length - 1 ? "0 0 16px" : "1",
                    background:
                      idx === levels.length - 1
                        ? "transparent"
                        : isActive || level.id > activeLevel
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,255,136,0.3)",
                  }}
                />
              </div>

              {/* Right: text */}
              <button
                type="button"
                className="flex flex-col justify-center pl-3 flex-1 text-left"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: isLocked ? "default" : "pointer",
                  padding: "0 0 0 12px",
                }}
                onClick={() =>
                  !isLocked && level.module && setView(level.module)
                }
                disabled={isLocked}
                aria-label={
                  isLocked
                    ? "Level 0 - Locked"
                    : `Navigate to ${level.sublabel}`
                }
              >
                {isLocked ? (
                  <>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        fontFamily: "'JetBrains Mono', monospace",
                        background:
                          "linear-gradient(90deg, #FFD700, #00FF88, #FFD700)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "gold-gradient 3s ease infinite",
                      }}
                    >
                      LOCKED
                    </span>
                    <span
                      style={{ fontSize: 10, color: "#9AA6A0", marginTop: 2 }}
                    >
                      Complete all levels
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      className="flex items-center gap-2 rounded-full px-2 py-1 transition-all duration-200"
                      style={{
                        background: isActive
                          ? "rgba(0,255,136,0.12)"
                          : "transparent",
                        maxWidth: "fit-content",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "#00FF88" : "#9AA6A0",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                        className={isActive ? "glow-text-green" : ""}
                      >
                        {level.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: isActive ? "#F2F5F3" : "#555",
                        marginTop: 2,
                        paddingLeft: 8,
                      }}
                    >
                      {level.sublabel}
                    </span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 20px",
        }}
        className="flex items-center gap-4"
      >
        <div style={{ fontSize: 10, color: "#555", marginLeft: "auto" }}>
          v2.0
        </div>
      </div>
    </aside>
  );
}
