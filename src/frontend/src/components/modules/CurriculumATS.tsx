import type React from "react";
import { useRef, useState } from "react";
import type { AnalysisResult } from "../../backend";
import { useActor } from "../../hooks/useActor";

const MOCK_CONFLICTS: [string, string][] = [
  ["Data Structures & Algorithms", "System Design at Scale"],
  ["Manual Software Testing", "AI-Powered CI/CD DevOps"],
  ["Legacy Java EE", "Cloud-Native Go / Rust"],
  ["Basic ML Algorithms", "LLM Fine-tuning & RAG Pipelines"],
  ["Monolithic Architecture", "Microservices + Kubernetes"],
];

const PAIN_POINTS = [
  "Graduates struggle to clear technical interviews",
  "Companies reject 60% of applicants for skill mismatches",
  "Universities update curriculum every 5+ years",
  "Industry evolves every 6 months with new tech",
];

const JOB_ROLES_COMPACT = [
  { title: "SDE-1", salary: "₹18-28 LPA", skill: "System Design", trend: "↑" },
  {
    title: "AI/ML Engineer",
    salary: "₹24-45 LPA",
    skill: "PyTorch + MLOps",
    trend: "↑",
  },
  {
    title: "Data Scientist",
    salary: "₹20-38 LPA",
    skill: "Statistics + SQL",
    trend: "↑",
  },
  {
    title: "Full Stack Dev",
    salary: "₹15-25 LPA",
    skill: "MERN + Docker",
    trend: "↑",
  },
  {
    title: "DevOps Engineer",
    salary: "₹22-40 LPA",
    skill: "Kubernetes",
    trend: "↑",
  },
  {
    title: "AI Product Manager",
    salary: "₹30-55 LPA",
    skill: "LLMs + Agile",
    trend: "↑",
  },
];

const EXPERTS = [
  {
    name: "Arjun Sharma",
    role: "Senior SDE",
    company: "Google",
    initials: "AS",
  },
  {
    name: "Priya Mehta",
    role: "AI/ML Engineer",
    company: "OpenAI",
    initials: "PM",
  },
  { name: "Rahul Singh", role: "DevOps Lead", company: "AWS", initials: "RS" },
  {
    name: "Neha Patel",
    role: "Data Scientist",
    company: "Flipkart",
    initials: "NP",
  },
];

const CAREER_MOCK_RESPONSES: Record<string, string[]> = {
  default: [
    "Start with your current branch's core subjects and identify 3 skill gaps against your target JD",
    "Complete at least one end-to-end project using the tech stack companies are currently hiring for",
    "Use the Reality Check Marketplace to benchmark your salary expectations against live market data",
    "Connect with an Industry Expert on this platform for a personalized 48-hour guidance session",
  ],
};

function CircularGauge({ percent }: { percent: number }) {
  const radius = 80;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 200, height: 200 }}>
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          role="img"
          aria-labelledby="gauge-title"
        >
          <title id="gauge-title">{`Industry alignment score: ${percent}%`}</title>
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#00FF88"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)",
              filter: "drop-shadow(0 0 8px rgba(0,255,136,0.7))",
            }}
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(0,255,136,0.2)"
            strokeWidth={stroke + 8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#00FF88",
              lineHeight: 1,
              fontFamily: "'JetBrains Mono', monospace",
            }}
            className="glow-text-green"
          >
            {percent}%
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#9AA6A0",
              marginTop: 4,
              letterSpacing: "0.05em",
            }}
          >
            COMPLETE
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#9AA6A0",
          letterSpacing: "0.08em",
          fontWeight: 500,
          marginTop: 8,
          textAlign: "center",
        }}
      >
        Industry Alignment Score
      </div>
    </div>
  );
}

interface Profile {
  id: string;
  name: string;
  branch: string;
  careerFocus: string;
}

function MultiProfileManager() {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "My Profile",
      branch: "CSE",
      careerFocus: "Full Stack Dev",
    },
  ]);
  const [activeId, setActiveId] = useState("1");
  const [showForm, setShowForm] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: "",
    branch: "CSE",
    careerFocus: "",
  });

  const active = profiles.find((p) => p.id === activeId);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfile.name.trim() || profiles.length >= 5) return;
    const id = Date.now().toString();
    setProfiles((prev) => [...prev, { ...newProfile, id }]);
    setActiveId(id);
    setShowForm(false);
    setNewProfile({ name: "", branch: "CSE", careerFocus: "" });
  };

  return (
    <div
      className="glass-card p-6"
      style={{ borderColor: "rgba(0,255,136,0.12)", marginTop: 32 }}
      data-ocid="profile.panel"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#F2F5F3",
              marginBottom: 2,
            }}
          >
            Multi-Profile Manager
          </h3>
          <p style={{ fontSize: 12, color: "#9AA6A0" }}>
            Create separate profiles for different career paths to track your
            alignment per goal.
          </p>
        </div>
        {profiles.length < 5 && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="btn-cyber px-4 py-1.5"
            style={{ fontSize: 12 }}
            data-ocid="profile.open_modal_button"
          >
            + Add Profile
          </button>
        )}
      </div>

      {/* Active profile pill */}
      {active && (
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.25)",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00FF88",
              boxShadow: "0 0 6px rgba(0,255,136,0.8)",
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#00FF88" }}>
            {active.name}
          </span>
          <span style={{ fontSize: 11, color: "#9AA6A0" }}>
            · {active.branch} · {active.careerFocus}
          </span>
        </div>
      )}

      {/* Profiles list */}
      <div className="flex flex-wrap gap-3">
        {profiles.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className="flex flex-col items-start gap-1 px-4 py-3 rounded-xl transition-all duration-200"
            style={{
              background:
                p.id === activeId
                  ? "rgba(0,255,136,0.1)"
                  : "rgba(255,255,255,0.03)",
              border:
                p.id === activeId
                  ? "1px solid rgba(0,255,136,0.35)"
                  : "1px solid rgba(255,255,255,0.08)",
              minWidth: 140,
            }}
            data-ocid={`profile.item.${i + 1}`}
          >
            <div
              className="flex items-center gap-2"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(0,255,136,0.15)",
                border: "1px solid rgba(0,255,136,0.3)",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#00FF88" }}>
                {p.name.charAt(0)}
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: p.id === activeId ? "#00FF88" : "#F2F5F3",
              }}
            >
              {p.name}
            </span>
            <span style={{ fontSize: 10, color: "#9AA6A0" }}>{p.branch}</span>
          </button>
        ))}
      </div>

      {/* Add profile form */}
      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.85)" }}
          data-ocid="profile.modal"
        >
          <form
            onSubmit={handleAdd}
            className="glass-card p-6 w-full max-w-sm relative"
            style={{ borderColor: "rgba(0,255,136,0.25)" }}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "#9AA6A0",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
              }}
              data-ocid="profile.close_button"
            >
              ×
            </button>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#F2F5F3",
                marginBottom: 20,
              }}
            >
              New Profile
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="profile-name"
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  PROFILE NAME
                </label>
                <input
                  id="profile-name"
                  type="text"
                  required
                  placeholder="e.g. Backend Specialist"
                  value={newProfile.name}
                  onChange={(e) =>
                    setNewProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="profile.input"
                />
              </div>
              <div>
                <label
                  htmlFor="profile-branch"
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  BRANCH
                </label>
                <select
                  id="profile-branch"
                  value={newProfile.branch}
                  onChange={(e) =>
                    setNewProfile((p) => ({ ...p, branch: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="profile.select"
                >
                  <option value="CSE">CSE</option>
                  <option value="AIML">AIML</option>
                  <option value="ECE">ECE</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="profile-career"
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  CAREER FOCUS
                </label>
                <input
                  type="text"
                  id="profile-career"
                  placeholder="e.g. AI Engineer, Full Stack, DevOps"
                  value={newProfile.careerFocus}
                  onChange={(e) =>
                    setNewProfile((p) => ({
                      ...p,
                      careerFocus: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="profile.input"
                />
              </div>
              <button
                type="submit"
                className="btn-cyber w-full py-2.5"
                style={{ fontSize: 13, fontWeight: 600 }}
                data-ocid="profile.submit_button"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function IndustryExperts() {
  const [askModal, setAskModal] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleAsk = (name: string) => {
    setAskModal(name);
    setSent(false);
  };

  return (
    <div style={{ marginTop: 32 }} data-ocid="experts.panel">
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#F2F5F3",
          marginBottom: 4,
        }}
      >
        Industry Expert Profiles
      </h3>
      <p style={{ fontSize: 12, color: "#9AA6A0", marginBottom: 20 }}>
        Get real guidance from professionals in your target role
      </p>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {EXPERTS.map((expert, i) => (
          <div
            key={expert.name}
            className="glass-card-hover p-5 flex flex-col items-center text-center gap-3"
            data-ocid={`experts.item.${i + 1}`}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 52,
                height: 52,
                background: "rgba(0,255,136,0.12)",
                border: "2px solid rgba(0,255,136,0.3)",
                boxShadow: "0 0 12px rgba(0,255,136,0.15)",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#00FF88",
                }}
              >
                {expert.initials}
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#F2F5F3",
                  marginBottom: 2,
                }}
              >
                {expert.name}
              </div>
              <div style={{ fontSize: 11, color: "#9AA6A0" }}>
                {expert.role}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#00FF88",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginTop: 2,
                }}
              >
                @ {expert.company}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleAsk(expert.name)}
              className="btn-cyber w-full py-1.5"
              style={{ fontSize: 11 }}
              data-ocid={`experts.primary_button.${i + 1}`}
            >
              Ask Expert
            </button>
          </div>
        ))}
      </div>

      {/* Ask modal */}
      {askModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.85)" }}
          data-ocid="experts.modal"
        >
          <div
            className="glass-card p-6 w-full max-w-sm text-center"
            style={{ borderColor: "rgba(0,255,136,0.25)" }}
          >
            {sent ? (
              <>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <h4
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#00FF88",
                    marginBottom: 8,
                  }}
                  className="glow-text-green"
                >
                  Message Sent!
                </h4>
                <p style={{ fontSize: 13, color: "#9AA6A0", marginBottom: 20 }}>
                  Your question has been sent to{" "}
                  <strong style={{ color: "#F2F5F3" }}>{askModal}</strong>. They
                  will respond within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setAskModal(null)}
                  className="btn-cyber px-6 py-2"
                  style={{ fontSize: 13 }}
                  data-ocid="experts.close_button"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h4
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#F2F5F3",
                    marginBottom: 8,
                  }}
                >
                  Ask {askModal}
                </h4>
                <p style={{ fontSize: 12, color: "#9AA6A0", marginBottom: 20 }}>
                  Your question will be delivered directly to this expert.
                  Expect a response within 48 hours.
                </p>
                <textarea
                  rows={3}
                  placeholder="Type your career question..."
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none mb-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="experts.textarea"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAskModal(null)}
                    className="flex-1 px-4 py-2 rounded-full text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#9AA6A0",
                    }}
                    data-ocid="experts.cancel_button"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setSent(true)}
                    className="btn-cyber flex-1 py-2"
                    style={{ fontSize: 13 }}
                    data-ocid="experts.confirm_button"
                  >
                    Send Question
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    college: "",
    branch: "",
    skills: "",
    project1: "",
    project2: "",
    targetRole: "",
  });
  const [preview, setPreview] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setPreview(true);
  };

  return (
    <div
      className="glass-card p-6"
      style={{ borderColor: "rgba(0,255,136,0.12)", marginTop: 32 }}
      data-ocid="resume.panel"
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#F2F5F3",
          marginBottom: 4,
        }}
      >
        College Resume Builder
      </h3>
      <p style={{ fontSize: 12, color: "#9AA6A0", marginBottom: 20 }}>
        Generate a formatted resume preview instantly
      </p>

      <form onSubmit={handleGenerate} className="flex flex-col gap-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label
              htmlFor="resume-name"
              style={{
                fontSize: 11,
                color: "#9AA6A0",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 6,
              }}
            >
              FULL NAME
            </label>
            <input
              id="resume-name"
              type="text"
              required
              placeholder="Arjun Kumar"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F2F5F3",
                outline: "none",
              }}
              data-ocid="resume.input"
            />
          </div>
          <div>
            <label
              htmlFor="resume-college"
              style={{
                fontSize: 11,
                color: "#9AA6A0",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 6,
              }}
            >
              COLLEGE
            </label>
            <input
              id="resume-college"
              type="text"
              required
              placeholder="IIT Delhi"
              value={form.college}
              onChange={(e) =>
                setForm((p) => ({ ...p, college: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F2F5F3",
                outline: "none",
              }}
              data-ocid="resume.input"
            />
          </div>
          <div>
            <label
              htmlFor="resume-branch"
              style={{
                fontSize: 11,
                color: "#9AA6A0",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 6,
              }}
            >
              BRANCH / MAJOR
            </label>
            <input
              id="resume-branch"
              type="text"
              required
              placeholder="Computer Science Engineering"
              value={form.branch}
              onChange={(e) =>
                setForm((p) => ({ ...p, branch: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F2F5F3",
                outline: "none",
              }}
              data-ocid="resume.input"
            />
          </div>
          <div>
            <label
              htmlFor="resume-target"
              style={{
                fontSize: 11,
                color: "#9AA6A0",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 6,
              }}
            >
              TARGET ROLE
            </label>
            <input
              id="resume-target"
              type="text"
              required
              placeholder="SDE-1 at Google"
              value={form.targetRole}
              onChange={(e) =>
                setForm((p) => ({ ...p, targetRole: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F2F5F3",
                outline: "none",
              }}
              data-ocid="resume.input"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="resume-skills"
            style={{
              fontSize: 11,
              color: "#9AA6A0",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: 6,
            }}
          >
            KEY SKILLS (comma separated)
          </label>
          <input
            id="resume-skills"
            type="text"
            required
            placeholder="React, Node.js, Python, DSA, System Design"
            value={form.skills}
            onChange={(e) => setForm((p) => ({ ...p, skills: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg text-sm"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F2F5F3",
              outline: "none",
            }}
            data-ocid="resume.input"
          />
        </div>
        <div>
          <label
            htmlFor="resume-project1"
            style={{
              fontSize: 11,
              color: "#9AA6A0",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: 6,
            }}
          >
            TOP PROJECT 1
          </label>
          <textarea
            id="resume-project1"
            rows={2}
            required
            placeholder="AI-powered job recommendation engine using NLP and BERT embeddings..."
            value={form.project1}
            onChange={(e) =>
              setForm((p) => ({ ...p, project1: e.target.value }))
            }
            className="w-full px-4 py-2.5 rounded-xl text-sm resize-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F2F5F3",
              outline: "none",
            }}
            data-ocid="resume.textarea"
          />
        </div>
        <div>
          <label
            htmlFor="resume-project2"
            style={{
              fontSize: 11,
              color: "#9AA6A0",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: 6,
            }}
          >
            TOP PROJECT 2
          </label>
          <textarea
            id="resume-project2"
            rows={2}
            placeholder="Full-stack e-commerce platform with MERN stack and payment gateway..."
            value={form.project2}
            onChange={(e) =>
              setForm((p) => ({ ...p, project2: e.target.value }))
            }
            className="w-full px-4 py-2.5 rounded-xl text-sm resize-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F2F5F3",
              outline: "none",
            }}
            data-ocid="resume.textarea"
          />
        </div>
        <button
          type="submit"
          className="btn-cyber py-3 font-semibold"
          style={{ fontSize: 14, letterSpacing: "0.06em" }}
          data-ocid="resume.submit_button"
        >
          Generate Resume Preview →
        </button>
      </form>

      {preview && form.name && (
        <div
          style={{
            marginTop: 28,
            padding: "28px 32px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 12,
            animation: "result-glow-in 0.6s ease-out both",
          }}
          data-ocid="resume.success_state"
        >
          <div
            className="flex items-start justify-between mb-5"
            style={{
              borderBottom: "2px solid rgba(0,255,136,0.2)",
              paddingBottom: 16,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#F2F5F3",
                  letterSpacing: "0.04em",
                }}
              >
                {form.name.toUpperCase()}
              </h2>
              <p style={{ fontSize: 12, color: "#9AA6A0", marginTop: 2 }}>
                {form.college} · {form.branch}
              </p>
            </div>
            <div
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                background: "rgba(0,255,136,0.1)",
                border: "1px solid rgba(0,255,136,0.25)",
                fontSize: 11,
                color: "#00FF88",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            >
              TARGET: {form.targetRole}
            </div>
          </div>

          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#00FF88",
                  letterSpacing: "0.14em",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: 8,
                }}
              >
                TECHNICAL SKILLS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {form.skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontSize: 11,
                        color: "#F2F5F3",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#00FF88",
                  letterSpacing: "0.14em",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: 8,
                }}
              >
                EDUCATION
              </div>
              <p style={{ fontSize: 12, color: "#F2F5F3" }}>{form.college}</p>
              <p style={{ fontSize: 11, color: "#9AA6A0" }}>
                B.Tech — {form.branch}
              </p>
            </div>
          </div>

          {(form.project1 || form.project2) && (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "#00FF88",
                  letterSpacing: "0.14em",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: 12,
                }}
              >
                KEY PROJECTS
              </div>
              <div className="flex flex-col gap-3">
                {form.project1 && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(0,255,136,0.04)",
                      border: "1px solid rgba(0,255,136,0.1)",
                      borderRadius: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#9AA6A0",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      PROJECT 1 ·{" "}
                    </span>
                    <span style={{ fontSize: 12, color: "#F2F5F3" }}>
                      {form.project1}
                    </span>
                  </div>
                )}
                {form.project2 && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(0,255,136,0.04)",
                      border: "1px solid rgba(0,255,136,0.1)",
                      borderRadius: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#9AA6A0",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      PROJECT 2 ·{" "}
                    </span>
                    <span style={{ fontSize: 12, color: "#F2F5F3" }}>
                      {form.project2}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CareerDecisionAssistant() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    await new Promise((r) => setTimeout(r, 1500));
    setResponse(CAREER_MOCK_RESPONSES.default);
    setLoading(false);
  };

  return (
    <div
      className="glass-card p-6"
      style={{ borderColor: "rgba(0,255,136,0.12)", marginTop: 32 }}
      data-ocid="career.panel"
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#F2F5F3",
          marginBottom: 4,
        }}
      >
        Career Decision Assistant
      </h3>
      <p style={{ fontSize: 12, color: "#9AA6A0", marginBottom: 20 }}>
        Describe your career confusion, goal, or dilemma — get AI-powered
        guidance
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          rows={4}
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your career confusion, goal, or dilemma..."
          className="w-full px-4 py-3 rounded-xl text-sm resize-none"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#F2F5F3",
            outline: "none",
            lineHeight: 1.6,
          }}
          data-ocid="career.textarea"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="btn-cyber px-8 py-2.5"
            style={{
              fontSize: 13,
              opacity: loading || !query.trim() ? 0.6 : 1,
            }}
            data-ocid="career.submit_button"
          >
            {loading ? "Analysing..." : "Get AI Guidance →"}
          </button>
        </div>
      </form>

      {loading && (
        <div
          className="flex items-center gap-3 mt-4"
          data-ocid="career.loading_state"
        >
          <div
            style={{
              width: 20,
              height: 20,
              border: "2px solid rgba(0,255,136,0.2)",
              borderTopColor: "#00FF88",
              borderRadius: "50%",
              animation: "brain-sync 1s linear infinite",
            }}
          />
          <span style={{ fontSize: 13, color: "#9AA6A0" }}>
            AI is analysing your situation...
          </span>
        </div>
      )}

      {response && (
        <div
          style={{
            marginTop: 20,
            animation: "result-glow-in 0.5s ease-out both",
          }}
          data-ocid="career.success_state"
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#00FF88",
              marginBottom: 12,
            }}
            className="glow-text-green"
          >
            ✓ AI Guidance Ready
          </div>
          <div className="flex flex-col gap-3">
            {response.map((rec, recIdx) => (
              <div
                key={rec.slice(0, 30)}
                className="flex items-start gap-3 px-4 py-3 rounded-lg"
                style={{
                  background: "rgba(0,255,136,0.04)",
                  border: "1px solid rgba(0,255,136,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#00FF88",
                    marginTop: 1,
                  }}
                >
                  {String(recIdx + 1).padStart(2, "0")}
                </span>
                <span
                  style={{ fontSize: 13, color: "#F2F5F3", lineHeight: 1.6 }}
                >
                  {rec}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SalaryRealityCheck() {
  return (
    <div style={{ marginTop: 32 }} data-ocid="salary.panel">
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#F2F5F3",
          marginBottom: 4,
        }}
      >
        Salary Reality Check
      </h3>
      <p style={{ fontSize: 12, color: "#9AA6A0", marginBottom: 20 }}>
        Current market salaries aligned with real industry data
      </p>
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {JOB_ROLES_COMPACT.map((role, i) => (
          <div
            key={role.title}
            className="glass-card-hover flex items-center justify-between px-4 py-3"
            style={{ borderColor: "rgba(0,255,136,0.1)" }}
            data-ocid={`salary.item.${i + 1}`}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#F2F5F3",
                  marginBottom: 2,
                }}
              >
                {role.title}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#9AA6A0",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Top skill: {role.skill}
              </div>
            </div>
            <div className="text-right">
              <div
                style={{ fontSize: 14, fontWeight: 700, color: "#00FF88" }}
                className="glow-text-green"
              >
                {role.salary}
              </div>
              <div style={{ fontSize: 11, color: "#00FF88" }}>
                {role.trend} Trending
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CurriculumATS() {
  const { actor } = useActor();
  const [branch, setBranch] = useState("CSE");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1500));
    const mockResult: AnalysisResult = {
      alignmentPercent: BigInt(65),
      branch,
      suggestions: [
        "Add System Design to your curriculum",
        "Include MLOps and LLM fine-tuning modules",
        "Integrate cloud-native deployment tracks",
      ],
      conflictPoints: MOCK_CONFLICTS,
    };
    try {
      if (actor) await actor.submitAnalysis(mockResult);
    } catch (err) {
      console.error("submitAnalysis error:", err);
    }
    setResult(mockResult);
    setLoading(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
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
          Curriculum{" "}
          <span style={{ color: "#00FF88" }} className="glow-text-green">
            ATS
          </span>
        </h1>
        <div
          style={{
            height: 2,
            width: 120,
            background: "linear-gradient(90deg, #00FF88, transparent)",
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(0,255,136,0.5)",
          }}
        />
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="flex flex-col justify-center">
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#F2F5F3",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Is your College Syllabus{" "}
            <span style={{ color: "#00FF88" }} className="glow-text-green">
              Outdated?
            </span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#9AA6A0",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            Upload your curriculum to check Industry Alignment in real-time. Our
            AI cross-references your syllabus against 10,000+ live job postings.
          </p>
          <ul className="flex flex-col gap-3">
            {PAIN_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00FF88",
                    flexShrink: 0,
                    marginTop: 7,
                    boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                  }}
                />
                <span
                  style={{ fontSize: 13, color: "#9AA6A0", lineHeight: 1.5 }}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleAnalyse}
          className="glass-card p-6 flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="branch-select"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#9AA6A0",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 8,
              }}
            >
              SELECT BRANCH
            </label>
            <select
              id="branch-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F2F5F3",
                outline: "none",
              }}
              data-ocid="curriculum.select"
            >
              <option value="CSE">Computer Science Engineering (CSE)</option>
              <option value="AIML">AI &amp; Machine Learning (AIML)</option>
              <option value="ECE">Electronics &amp; Communication (ECE)</option>
              <option value="Mechanical">Mechanical Engineering</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="curriculum-upload"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#9AA6A0",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 8,
              }}
            >
              UPLOAD CURRICULUM (PDF)
            </label>
            <button
              type="button"
              className="flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-200 w-full"
              style={{
                border: dragOver
                  ? "2px dashed #00FF88"
                  : "2px dashed rgba(0,255,136,0.25)",
                padding: "24px 16px",
                background: dragOver
                  ? "rgba(0,255,136,0.05)"
                  : "rgba(255,255,255,0.02)",
                boxShadow: dragOver ? "0 0 16px rgba(0,255,136,0.15)" : "none",
              }}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const dropped = e.dataTransfer.files[0];
                if (dropped) setFile(dropped);
              }}
              data-ocid="curriculum.dropzone"
              aria-label="Upload curriculum PDF"
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#00FF88"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ marginBottom: 8, opacity: 0.7 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {file ? (
                <span
                  style={{ fontSize: 13, color: "#00FF88", fontWeight: 600 }}
                >
                  {file.name}
                </span>
              ) : (
                <>
                  <span style={{ fontSize: 13, color: "#9AA6A0" }}>
                    Drag &amp; drop PDF here
                  </span>
                  <span style={{ fontSize: 11, color: "#555", marginTop: 4 }}>
                    or click to browse
                  </span>
                </>
              )}
            </button>
            <input
              id="curriculum-upload"
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFile(f);
              }}
              data-ocid="curriculum.upload_button"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-cyber w-full py-3 font-semibold transition-all duration-200"
            style={{
              fontSize: 14,
              letterSpacing: "0.06em",
              opacity: loading ? 0.7 : 1,
            }}
            data-ocid="curriculum.submit_button"
          >
            {loading ? "Analysing..." : "Analyse with AI →"}
          </button>
        </form>
      </div>

      {loading && (
        <div
          className="flex items-center justify-center mt-8"
          data-ocid="curriculum.loading_state"
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 24,
                height: 24,
                border: "2px solid rgba(0,255,136,0.2)",
                borderTopColor: "#00FF88",
                borderRadius: "50%",
                animation: "brain-sync 1s linear infinite",
              }}
            />
            <span style={{ fontSize: 13, color: "#9AA6A0" }}>
              Processing curriculum data...
            </span>
          </div>
        </div>
      )}

      {result && (
        <div
          ref={resultRef}
          className="mt-8"
          style={{
            border: "1px solid rgba(0,255,136,0.4)",
            borderRadius: 12,
            boxShadow: "0 0 24px rgba(0,255,136,0.15)",
            padding: "24px",
            background: "rgba(0,255,136,0.02)",
            animation: "result-glow-in 0.6s ease-out both",
          }}
          data-ocid="curriculum.success_state"
        >
          <div
            style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "#00FF88",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ fontSize: 16 }}>✓</span>
            <span>Analysis Complete — Here are your results</span>
          </div>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "1fr 1.5fr" }}
          >
            <div
              className="glass-card p-6 flex flex-col items-center justify-center"
              style={{ borderColor: "rgba(0,255,136,0.2)" }}
            >
              <CircularGauge percent={Number(result.alignmentPercent)} />
            </div>
            <div className="glass-card p-6">
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#F2F5F3",
                  marginBottom: 16,
                  letterSpacing: "0.05em",
                }}
              >
                Conflict Analysis
              </h3>
              <div
                className="grid gap-3 mb-3"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  📚 COLLEGE TEACHES
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#00FF88",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                  className="glow-text-green"
                >
                  🏭 INDUSTRY WANTS
                </span>
              </div>
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: 12,
                }}
              />
              <div className="flex flex-col gap-3">
                {result.conflictPoints.map(([college, industry], i) => (
                  <div
                    key={college}
                    className="grid gap-3 py-2 px-3 rounded-lg"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                    data-ocid={`curriculum.item.${i + 1}`}
                  >
                    <span style={{ fontSize: 12, color: "#9AA6A0" }}>
                      {college}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#00FF88",
                        fontWeight: 500,
                      }}
                      className="glow-text-green"
                    >
                      {industry}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Career Decision Assistant ── */}
      <CareerDecisionAssistant />

      {/* ── Salary Reality Check ── */}
      <SalaryRealityCheck />

      {/* ── Multi-Profile Manager ── */}
      <MultiProfileManager />

      {/* ── Industry Expert Profiles ── */}
      <IndustryExperts />

      {/* ── College Resume Builder ── */}
      <ResumeBuilder />
    </div>
  );
}
