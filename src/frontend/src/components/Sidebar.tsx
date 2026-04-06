import React from "react";

type Module = "curriculumATS" | "aiHIRatio" | "marketplace";

interface SidebarProps {
  activeModule: Module;
  setActiveModule: (m: Module) => void;
}

const levels = [
  {
    id: 0,
    label: "LOCKED",
    sublabel: "Apex Tier",
    module: null as Module | null,
    locked: true,
  },
  {
    id: 1,
    label: "Level-1",
    sublabel: "Market Reality",
    module: "marketplace" as Module,
    locked: false,
  },
  {
    id: 2,
    label: "Level-2",
    sublabel: "Builder",
    module: "aiHIRatio" as Module,
    locked: false,
  },
  {
    id: 3,
    label: "Level-3",
    sublabel: "Foundations",
    module: "curriculumATS" as Module,
    locked: false,
  },
];

const moduleToLevel: Record<Module, number> = {
  curriculumATS: 3,
  aiHIRatio: 2,
  marketplace: 1,
};

export default function Sidebar({
  activeModule,
  setActiveModule,
}: SidebarProps) {
  const activeLevel = moduleToLevel[activeModule];

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

      {/* Cyber Roadmap label */}
      <div className="px-5 pt-5 pb-3">
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
          const isActive = level.module === activeModule;
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
                    onClick={() =>
                      level.module && setActiveModule(level.module)
                    }
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
                  !isLocked && level.module && setActiveModule(level.module)
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
        <button
          type="button"
          className="transition-all duration-200 rounded-lg p-2"
          style={{ color: "#9AA6A0" }}
          title="Home"
          aria-label="Home"
          data-ocid="sidebar.link"
        >
          <svg
            width="16"
            height="16"
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
        </button>
        <button
          type="button"
          className="transition-all duration-200 rounded-lg p-2"
          style={{ color: "#9AA6A0" }}
          title="Settings"
          aria-label="Settings"
          data-ocid="sidebar.link"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <div style={{ fontSize: 10, color: "#555", marginLeft: "auto" }}>
          v2.0
        </div>
      </div>
    </aside>
  );
}
