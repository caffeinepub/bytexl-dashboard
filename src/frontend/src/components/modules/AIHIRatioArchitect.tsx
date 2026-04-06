import type React from "react";
import { useState } from "react";
import type { ProjectIdea } from "../../backend";
import { useActor } from "../../hooks/useActor";

const MOCK_STACK = [
  { name: "React.js + TypeScript", label: "Frontend" },
  { name: "Node.js + Express", label: "Backend" },
  { name: "MongoDB Atlas", label: "Database" },
  { name: "Grok API / OpenAI SDK", label: "AI Layer" },
  { name: "Docker + AWS ECS", label: "Deployment" },
];

const MOCK_RATIOS = [
  { component: "Frontend Development", ai: 70, hi: 30 },
  { component: "Backend API", ai: 60, hi: 40 },
  { component: "AI Integration", ai: 85, hi: 15 },
  { component: "Database Design", ai: 50, hi: 50 },
  { component: "DevOps Pipeline", ai: 75, hi: 25 },
];

const HI_TASKS = [
  "Business logic validation & edge case handling",
  "UX decisions & accessibility compliance",
  "Security architecture review",
  "Stakeholder communication & requirement gathering",
  "Final code review & deployment sign-off",
];

function RatioBar({
  ai,
  hi,
  label,
}: { ai: number; hi: number; label: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span style={{ fontSize: 12, color: "#F2F5F3", fontWeight: 500 }}>
          {label}
        </span>
        <div className="flex gap-3">
          <span style={{ fontSize: 11, color: "#00FF88" }}>AI {ai}%</span>
          <span style={{ fontSize: 11, color: "#FFBF00" }}>HI {hi}%</span>
        </div>
      </div>
      <div
        className="flex rounded-full overflow-hidden"
        style={{ height: 8, background: "rgba(255,255,255,0.07)" }}
      >
        <div
          style={{
            width: `${ai}%`,
            background: "linear-gradient(90deg, #00FF88, #00cc6a)",
            boxShadow: "0 0 6px rgba(0,255,136,0.5)",
            borderRadius: hi === 0 ? "999px" : "999px 0 0 999px",
            transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
        <div
          style={{
            width: `${hi}%`,
            background: "linear-gradient(90deg, #FFBF00, #cc9900)",
            boxShadow: "0 0 6px rgba(255,191,0,0.4)",
            borderRadius: ai === 0 ? "999px" : "0 999px 999px 0",
            transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export default function AIHIRatioArchitect() {
  const { actor } = useActor();
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    setShowResult(false);
    await new Promise((r) => setTimeout(r, 2000));
    const mockProject: ProjectIdea = {
      idea: idea,
      components: MOCK_RATIOS.map((r) => ({
        name: r.component,
        aiRatio: BigInt(r.ai),
        humanIntelligenceRatio: BigInt(r.hi),
        recommendedTech: MOCK_STACK[0].name,
      })),
    };
    try {
      if (actor) await actor.submitProject(mockProject);
    } catch (err) {
      console.error("submitProject error:", err);
    }
    setLoading(false);
    setShowResult(true);
  };

  return (
    <div className="module-page">
      <div className="mb-8">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#F2F5F3",
            marginBottom: 6,
          }}
        >
          AI-HI Ratio{" "}
          <span style={{ color: "#00FF88" }} className="glow-text-green">
            Architect
          </span>
        </h1>
        <div
          style={{
            height: 2,
            width: 160,
            background: "linear-gradient(90deg, #00FF88, transparent)",
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(0,255,136,0.5)",
          }}
        />
      </div>

      <div className="glass-card p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="aihi-idea"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#9AA6A0",
              letterSpacing: "0.08em",
            }}
          >
            DESCRIBE YOUR PROJECT IDEA
          </label>
          <textarea
            id="aihi-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your Project Idea... (e.g. Build a job recommendation engine using NLP)"
            rows={4}
            className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F2F5F3",
              outline: "none",
              lineHeight: 1.6,
            }}
            data-ocid="aihi.textarea"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !idea.trim()}
              className="btn-cyber px-8 py-2.5"
              style={{ opacity: loading || !idea.trim() ? 0.6 : 1 }}
              data-ocid="aihi.submit_button"
            >
              Brain-Sync →
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div
          className="flex flex-col items-center justify-center py-16"
          data-ocid="aihi.loading_state"
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: 100, height: 100 }}
          >
            <div
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "3px solid transparent",
                borderTopColor: "#00FF88",
                borderRightColor: "rgba(0,255,136,0.3)",
                animation: "brain-sync 1.2s linear infinite",
                boxShadow: "0 0 20px rgba(0,255,136,0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 70,
                height: 70,
                borderRadius: "50%",
                border: "2px solid transparent",
                borderTopColor: "rgba(0,255,136,0.5)",
                borderLeftColor: "#00FF88",
                animation: "brain-sync 0.8s linear infinite reverse",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#00FF88",
                animation: "brain-pulse 1s ease-in-out infinite",
                boxShadow: "0 0 16px rgba(0,255,136,0.8)",
              }}
            />
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#9AA6A0",
              marginTop: 20,
              animation: "brain-pulse 1.5s ease-in-out infinite",
            }}
          >
            Syncing with AI Knowledge Base...
          </p>
          <p style={{ fontSize: 11, color: "#555", marginTop: 6 }}>
            Analysing tech stack requirements
          </p>
        </div>
      )}

      {showResult && (
        <div className="module-page">
          <div
            className="grid gap-6 mb-6"
            style={{ gridTemplateColumns: "1fr 1.2fr" }}
          >
            <div
              className="glass-card p-6"
              style={{ borderColor: "rgba(0,255,136,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00FF88",
                    boxShadow: "0 0 6px rgba(0,255,136,0.8)",
                  }}
                />
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#F2F5F3",
                    letterSpacing: "0.04em",
                  }}
                >
                  Technical Stack
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {MOCK_STACK.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                    style={{
                      background: "rgba(0,255,136,0.04)",
                      border: "1px solid rgba(0,255,136,0.08)",
                    }}
                    data-ocid={`aihi.item.${i + 1}`}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00FF88",
                        boxShadow: "0 0 4px rgba(0,255,136,0.6)",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#F2F5F3",
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: 10, color: "#9AA6A0" }}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="glass-card p-6"
              style={{ borderColor: "rgba(255,191,0,0.1)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#FFBF00",
                    boxShadow: "0 0 6px rgba(255,191,0,0.8)",
                  }}
                />
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#F2F5F3",
                    letterSpacing: "0.04em",
                  }}
                >
                  AI/HI Ratio Breakdown
                </h3>
              </div>
              {MOCK_RATIOS.map((r) => (
                <RatioBar
                  key={r.component}
                  label={r.component}
                  ai={r.ai}
                  hi={r.hi}
                />
              ))}
              <div
                className="flex items-center gap-5 mt-4 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#00FF88",
                      boxShadow: "0 0 4px rgba(0,255,136,0.6)",
                    }}
                  />
                  <span style={{ fontSize: 11, color: "#9AA6A0" }}>
                    AI Automation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#FFBF00",
                      boxShadow: "0 0 4px rgba(255,191,0,0.6)",
                    }}
                  />
                  <span style={{ fontSize: 11, color: "#9AA6A0" }}>
                    Human Intervention (HI)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="glass-card p-6"
            style={{
              borderColor: "rgba(255,191,0,0.2)",
              background: "rgba(255,191,0,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: 16 }}>⚡</span>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#FFBF00",
                  letterSpacing: "0.04em",
                }}
              >
                HI Zones Require Your Expertise
              </h3>
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              {HI_TASKS.map((task) => (
                <div
                  key={task}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{
                    background: "rgba(255,191,0,0.06)",
                    border: "1px solid rgba(255,191,0,0.12)",
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#FFBF00",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#F2F5F3" }}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
