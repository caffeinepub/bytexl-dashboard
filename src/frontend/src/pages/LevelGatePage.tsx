import React from "react";
import type { View } from "../App";

interface LevelGatePageProps {
  onNavigate: (view: View) => void;
}

const LEVELS = [
  {
    id: 0,
    label: "Level-0",
    sublabel: "Apex Tier",
    title: "Industry Expert Status",
    locked: true,
    description:
      "Complete all 3 levels to unlock. Represents full industry readiness. Reserved for top performers who have validated their skills, built real projects, and verified their market value.",
    actions: [],
    status: "🔒 Locked",
    cta: null,
    targetView: null as View | null,
  },
  {
    id: 1,
    label: "Level-1",
    sublabel: "Market Reality",
    title: "Reality Check Marketplace",
    locked: false,
    description:
      "Understand real-world salary data, connect with active professionals, and validate your career path with live market intelligence.",
    actions: [
      "View job salaries",
      "Talk to real job-doers",
      "Track industry trends",
    ],
    status: null,
    cta: "Enter Level-1 →",
    targetView: "marketplace" as View,
  },
  {
    id: 2,
    label: "Level-2",
    sublabel: "Builder",
    title: "AI-HI Ratio Architect",
    locked: false,
    description:
      "Build real projects with the right AI-to-Human balance. Know exactly which parts of your project need AI automation vs. your own intelligence.",
    actions: [
      "Describe project idea",
      "Get tech stack recommendation",
      "See AI/HI breakdown",
    ],
    status: null,
    cta: "Enter Level-2 →",
    targetView: "aiHIRatio" as View,
  },
  {
    id: 3,
    label: "Level-3",
    sublabel: "Foundations",
    title: "Curriculum ATS",
    locked: false,
    description:
      "Start here. Discover how aligned your college syllabus is with what companies actually want. Fix the gap before it costs you an offer.",
    actions: [
      "Upload your curriculum",
      "See alignment score",
      "Identify skill conflicts",
    ],
    status: null,
    cta: "Start at Level-3 →",
    targetView: "curriculumATS" as View,
  },
];

export default function LevelGatePage({ onNavigate }: LevelGatePageProps) {
  return (
    <div className="module-page" style={{ padding: "40px 48px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#9AA6A0",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 12,
          }}
        >
          CYBER ROADMAP
        </div>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#F2F5F3",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          The{" "}
          <span style={{ color: "#00FF88" }} className="glow-text-green">
            Level-Gate
          </span>{" "}
          System
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#9AA6A0",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Your structured path from college student to industry-ready
          professional
        </p>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 28,
            bottom: 28,
            width: 2,
            background:
              "linear-gradient(180deg, rgba(255,215,0,0.4), rgba(0,255,136,0.5) 40%, rgba(0,255,136,0.15))",
          }}
        />

        <div className="flex flex-col" style={{ gap: 32 }}>
          {LEVELS.map((level) => (
            <div
              key={level.id}
              className="flex items-start gap-8"
              style={{ position: "relative" }}
            >
              {/* Node */}
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 1,
                  ...(level.locked
                    ? {
                        background:
                          "linear-gradient(135deg, #FFD700, #00FF88, #FFD700, #00cc6a)",
                        backgroundSize: "300% 300%",
                        animation: "gold-gradient 3s ease infinite",
                        border: "2px solid rgba(255,215,0,0.5)",
                        boxShadow:
                          "0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(0,255,136,0.15)",
                      }
                    : {
                        background: "rgba(0,255,136,0.12)",
                        border: "2px solid rgba(0,255,136,0.4)",
                        boxShadow: "0 0 16px rgba(0,255,136,0.25)",
                      }),
                }}
              >
                {level.locked ? (
                  <span style={{ fontSize: 20 }}>🔒</span>
                ) : (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#00FF88",
                    }}
                    className="glow-text-green"
                  >
                    L{level.id}
                  </span>
                )}
              </div>

              {/* Card */}
              <div
                className="glass-card flex-1"
                style={{
                  padding: "24px 28px",
                  borderColor: level.locked
                    ? "rgba(255,215,0,0.25)"
                    : "rgba(0,255,136,0.15)",
                  background: level.locked
                    ? "rgba(255,215,0,0.04)"
                    : "rgba(0,255,136,0.02)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: "'JetBrains Mono', monospace",
                          color: level.locked ? "#FFD700" : "#00FF88",
                          letterSpacing: "0.12em",
                        }}
                        className={level.locked ? "" : "glow-text-green"}
                      >
                        {level.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#555",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {level.sublabel.toUpperCase()}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#F2F5F3",
                      }}
                    >
                      {level.title}
                    </h3>
                  </div>
                  {level.status && (
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "rgba(255,215,0,0.1)",
                        border: "1px solid rgba(255,215,0,0.3)",
                        color: "#FFD700",
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {level.status}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: 13,
                    color: "#9AA6A0",
                    lineHeight: 1.7,
                    marginBottom: level.actions.length > 0 ? 16 : 0,
                  }}
                >
                  {level.description}
                </p>

                {level.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {level.actions.map((action) => (
                      <span
                        key={action}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          color: "#00FF88",
                          background: "rgba(0,255,136,0.07)",
                          border: "1px solid rgba(0,255,136,0.15)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        ✓ {action}
                      </span>
                    ))}
                  </div>
                )}

                {level.cta && level.targetView && (
                  <button
                    type="button"
                    onClick={() => onNavigate(level.targetView as View)}
                    className="btn-cyber px-6 py-2"
                    style={{ fontSize: 13, fontWeight: 600 }}
                    data-ocid={`levelgate.item.${level.id}`}
                  >
                    {level.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: "center", marginTop: 64 }}>
        <p style={{ fontSize: 13, color: "#9AA6A0", marginBottom: 20 }}>
          Everyone starts at Level-3. Work your way up.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("curriculumATS")}
          className="btn-cyber px-10 py-3"
          style={{ fontSize: 15, fontWeight: 700 }}
          data-ocid="levelgate.primary_button"
        >
          Start your journey at Level-3 →
        </button>
      </div>
    </div>
  );
}
