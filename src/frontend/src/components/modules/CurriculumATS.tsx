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

export default function CurriculumATS() {
  const { actor } = useActor();
  const [branch, setBranch] = useState("CSE");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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
        <div className="mt-8 module-page" data-ocid="curriculum.success_state">
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
    </div>
  );
}
