import React, { useEffect, useState } from "react";
import type { View } from "../App";

interface HomePageProps {
  onNavigate: (view: View) => void;
}

const AI_NEWS_DATA: Record<string, string[]> = {
  Meta: [
    "Llama 4 released with 2T parameter multimodal capabilities",
    "Meta AI assistant now integrated across WhatsApp, Instagram & FB",
    "Meta opens new AI research lab in Bangalore, hiring 500 engineers",
    "Meta's FAIR team publishes breakthrough in embodied AI agents",
  ],
  OpenAI: [
    "GPT-5 beats human benchmarks across all reasoning domains",
    "OpenAI launches o3 model with real-time web access",
    "ChatGPT Enterprise hits 1M+ corporate users globally",
    "OpenAI raises $40B at $300B valuation — largest AI funding round",
  ],
  Nvidia: [
    "H200 GPU chips sold out globally, waitlist extends to Q3 2026",
    "Nvidia GB200 NVLink Switch achieves 1.8 TB/s bandwidth",
    "CUDA 13.0 drops with native transformer acceleration",
    "Nvidia's AI revenue surpasses $60B in Q1 2026",
  ],
  Google: [
    "Gemini Ultra 2.0 launches with multimodal reasoning at human-level",
    "Google DeepMind AlphaCode 3 solves competitive programming at expert level",
    "Google integrates Gemini deeply into Search, Docs & Gmail",
    "NotebookLM now supports 10M token context window",
  ],
  Microsoft: [
    "Copilot deep integration rolls out across all Office 365 apps",
    "Azure AI Foundry becomes most used enterprise LLM platform",
    "Microsoft phi-4 model outperforms GPT-4o on reasoning tasks",
    "Windows Copilot+ PCs ship 50M units, AI features go mainstream",
  ],
  Anthropic: [
    "Claude 3.7 Sonnet scores 98% on medical licensing exams",
    "Anthropic releases Constitutional AI 2.0 safety framework",
    "Claude now used by 40% of Fortune 500 companies for code review",
    "Anthropic raises $2B Series E, expands EU data centers",
  ],
};

const COMPANIES = Object.keys(AI_NEWS_DATA);

function NewsBlock({ company }: { company: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const news = AI_NEWS_DATA[company];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="flex flex-col gap-2">
      {/* Square label button */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 14px",
          background: "#0a0a0a",
          border: "1px solid rgba(0,255,136,0.4)",
          borderRadius: 6,
          boxShadow:
            "0 0 8px rgba(0,255,136,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          width: "fit-content",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            color: "#00FF88",
            letterSpacing: "0.1em",
          }}
          className="glow-text-green"
        >
          {company.toUpperCase()}
        </span>
      </div>

      {/* 4×4 news box */}
      <div
        className="glass-card"
        style={{
          padding: "14px 16px",
          minHeight: 100,
          border: "1px solid rgba(0,255,136,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Live dot */}
        <div className="flex items-center gap-2 mb-3">
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00FF88",
              animation: "live-blink 1.2s ease-in-out infinite",
              boxShadow: "0 0 6px rgba(0,255,136,0.8)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 9,
              color: "#00FF88",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.12em",
              fontWeight: 700,
            }}
          >
            LIVE
          </span>
        </div>
        <p
          key={currentIndex}
          style={{
            fontSize: 12,
            color: "#F2F5F3",
            lineHeight: 1.6,
            animation: "fade-in 0.4s ease both",
          }}
        >
          {news[currentIndex]}
        </p>
        {/* Progress indicator */}
        <div
          className="flex gap-1 mt-3"
          style={{ position: "absolute", bottom: 10, right: 14 }}
        >
          {news.map((item, i) => (
            <div
              key={item.slice(0, 20)}
              style={{
                width: i === currentIndex ? 16 : 5,
                height: 3,
                borderRadius: 999,
                background:
                  i === currentIndex ? "#00FF88" : "rgba(255,255,255,0.15)",
                transition: "width 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const FEATURE_CIRCLES = [
  {
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="#00FF88"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l-4.879 2.706A5 5 0 016 20v-1"
        />
      </svg>
    ),
    label: "Curriculum ATS",
    sublabel: "Level-3 · Foundations",
    view: "curriculumATS" as View,
    color: "#00FF88",
  },
  {
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="#00FF88"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    label: "AI-HI Architect",
    sublabel: "Level-2 · Builder",
    view: "aiHIRatio" as View,
    color: "#00FF88",
  },
  {
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="#00FF88"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    label: "Reality Check",
    sublabel: "Level-1 · Market",
    view: "marketplace" as View,
    color: "#00FF88",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div style={{ background: "#000", minHeight: "100%", overflowX: "hidden" }}>
      {/* ── Hero Section ── */}
      <section
        style={{
          padding: "72px 48px 64px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        data-ocid="home.section"
      >
        {/* Radial glow bg */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* SYNTRA wordmark */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #00FF88 0%, #00cc6a 100%)",
              boxShadow:
                "0 0 30px rgba(0,255,136,0.5), 0 0 60px rgba(0,255,136,0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 28,
                color: "#000",
                lineHeight: 1,
              }}
            >
              S
            </span>
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "#F2F5F3",
              lineHeight: 1,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            className="glow-text-green"
          >
            SYNTRA
          </h1>
        </div>

        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#00FF88",
            letterSpacing: "0.04em",
            marginBottom: 20,
            fontFamily: "'JetBrains Mono', monospace",
          }}
          className="glow-text-green"
        >
          Navigate Your Future with AI Precision
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "#9AA6A0",
            lineHeight: 1.8,
            maxWidth: 580,
            margin: "0 auto 40px",
          }}
        >
          SYNTRA bridges the gap between college education and industry reality.
          Unlock your career potential with AI-powered curriculum analysis,
          project architecture, and real market data.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("curriculumATS")}
            className="btn-cyber px-8 py-3"
            style={{
              fontSize: 15,
              fontWeight: 700,
              boxShadow: "0 0 20px rgba(0,255,136,0.3)",
            }}
            data-ocid="home.primary_button"
          >
            Enter Platform →
          </button>
          <button
            type="button"
            onClick={() => onNavigate("levelGate")}
            className="px-8 py-3 rounded-full transition-all duration-200"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#9AA6A0",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            data-ocid="home.secondary_button"
          >
            How Levels Work
          </button>
        </div>
      </section>

      {/* ── Feature Circles ── */}
      <section
        style={{ padding: "48px 48px 64px", textAlign: "center" }}
        data-ocid="home.panel"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div
            style={{
              height: 1,
              width: 40,
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,136,0.4))",
            }}
          />
          <h2
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#9AA6A0",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            PLATFORM MODULES
          </h2>
          <div
            style={{
              height: 1,
              width: 40,
              background:
                "linear-gradient(90deg, rgba(0,255,136,0.4), transparent)",
            }}
          />
        </div>
        <h3
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#F2F5F3",
            marginBottom: 40,
          }}
        >
          Three Modules.{" "}
          <span style={{ color: "#00FF88" }} className="glow-text-green">
            One Career Path.
          </span>
        </h3>

        <div className="flex items-center justify-center" style={{ gap: 64 }}>
          {FEATURE_CIRCLES.map((feat, i) => (
            <button
              key={feat.label}
              type="button"
              onClick={() => onNavigate(feat.view)}
              className="flex flex-col items-center gap-4 group"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              data-ocid={`home.item.${i + 1}`}
            >
              {/* Circle */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "rgba(13,13,13,0.8)",
                  border: "1px solid rgba(0,255,136,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 0 rgba(0,255,136,0)",
                  position: "relative",
                }}
                className="circle-feature"
              >
                {/* Outer ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    border: "1px dashed rgba(0,255,136,0.15)",
                    animation: `spin-slow ${8 + i * 2}s linear infinite`,
                  }}
                />
                {feat.icon}
              </div>
              <div className="text-center">
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#F2F5F3",
                    marginBottom: 4,
                    transition: "color 0.2s",
                  }}
                >
                  {feat.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.06em",
                  }}
                >
                  {feat.sublabel}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── AI News Section ── */}
      <section style={{ padding: "0 48px 64px" }} data-ocid="home.panel">
        <div className="flex items-center gap-3 mb-2">
          <div
            style={{
              height: 1,
              width: 40,
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,136,0.4))",
            }}
          />
          <h2
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#9AA6A0",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            AI INTELLIGENCE FEED
          </h2>
          <div
            style={{
              height: 1,
              flex: 1,
              background:
                "linear-gradient(90deg, rgba(0,255,136,0.4), transparent)",
            }}
          />
        </div>

        <h3
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#F2F5F3",
            marginBottom: 32,
          }}
        >
          Live AI{" "}
          <span style={{ color: "#00FF88" }} className="glow-text-green">
            Intelligence Feed
          </span>
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {COMPANIES.map((company) => (
            <NewsBlock key={company} company={company} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          padding: "48px 48px 72px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent, rgba(0,255,136,0.03) 50%, transparent)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            fontSize: 13,
            color: "#9AA6A0",
            letterSpacing: "0.12em",
            marginBottom: 12,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          READY TO CHECK YOUR ALIGNMENT?
        </p>
        <h3
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#F2F5F3",
            marginBottom: 32,
          }}
        >
          Is your college syllabus industry-ready?
        </h3>
        <button
          type="button"
          onClick={() => onNavigate("curriculumATS")}
          className="btn-cyber px-10 py-4"
          style={{
            fontSize: 16,
            fontWeight: 700,
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
          data-ocid="home.primary_button"
        >
          Enter Platform →
        </button>
      </section>

      <style>{`
        .circle-feature:hover {
          border-color: rgba(0,255,136,0.6) !important;
          box-shadow: 0 0 30px rgba(0,255,136,0.25), 0 0 60px rgba(0,255,136,0.1) !important;
          transform: translateY(-4px);
        }
        .circle-feature:hover svg {
          filter: drop-shadow(0 0 10px rgba(0,255,136,0.8));
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
