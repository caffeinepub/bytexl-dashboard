import type React from "react";
import { useState } from "react";
import type { ConsultationRequest } from "../backend";
import { useActor } from "../hooks/useActor";

interface JobDoerModalProps {
  open: boolean;
  onClose: () => void;
  role: string;
}

export default function JobDoerModal({
  open,
  onClose,
  role,
}: JobDoerModalProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    try {
      if (actor) {
        const req: ConsultationRequest = {
          userName: form.name,
          userEmail: form.email,
          paid: true,
          role,
        };
        await actor.requestConsultation(req);
      }
      setDone(true);
    } catch (err) {
      console.error("requestConsultation error:", err);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.9)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="jobdoer.modal"
    >
      <section
        className="glass-card p-6 w-full max-w-md relative"
        style={{ borderColor: "rgba(0,255,136,0.2)" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-labelledby="jobdoer-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors"
          style={{ color: "#555" }}
          data-ocid="jobdoer.close_button"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {done ? (
          <div className="text-center py-8" data-ocid="jobdoer.success_state">
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3
              id="jobdoer-modal-title"
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#00FF88",
                marginBottom: 6,
              }}
              className="glow-text-green"
            >
              Session Confirmed!
            </h3>
            <p style={{ fontSize: 13, color: "#9AA6A0" }}>
              You'll receive a calendar invite shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-cyber mt-6 px-8"
              data-ocid="jobdoer.close_button"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                style={{
                  background: "rgba(0,255,136,0.08)",
                  border: "1px solid rgba(0,255,136,0.2)",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00FF88",
                    animation: "live-blink 1.2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: "#00FF88",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                  }}
                >
                  VERIFIED PROFESSIONAL
                </span>
              </div>
              <h2
                id="jobdoer-modal-title"
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#F2F5F3",
                  marginBottom: 4,
                }}
              >
                Connect with a{" "}
                <span style={{ color: "#00FF88" }} className="glow-text-green">
                  {role}
                </span>
              </h2>
              <p style={{ fontSize: 12, color: "#9AA6A0" }}>
                30-min session · Instant confirmation · Real insights
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="jobdoer-name"
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    display: "block",
                    marginBottom: 6,
                    letterSpacing: "0.08em",
                  }}
                >
                  YOUR NAME
                </label>
                <input
                  id="jobdoer-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 rounded-lg text-sm transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="jobdoer.input"
                />
              </div>
              <div>
                <label
                  htmlFor="jobdoer-email"
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    display: "block",
                    marginBottom: 6,
                    letterSpacing: "0.08em",
                  }}
                >
                  EMAIL
                </label>
                <input
                  id="jobdoer-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg text-sm transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="jobdoer.input"
                />
              </div>
              <div>
                <label
                  htmlFor="jobdoer-message"
                  style={{
                    fontSize: 11,
                    color: "#9AA6A0",
                    display: "block",
                    marginBottom: 6,
                    letterSpacing: "0.08em",
                  }}
                >
                  MESSAGE (OPTIONAL)
                </label>
                <textarea
                  id="jobdoer-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="What would you like to discuss?"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg text-sm resize-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F2F5F3",
                    outline: "none",
                  }}
                  data-ocid="jobdoer.textarea"
                />
              </div>

              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(0,255,136,0.06)",
                  border: "1px solid rgba(0,255,136,0.15)",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 11, color: "#9AA6A0", marginBottom: 2 }}
                  >
                    SESSION FEE
                  </div>
                  <div
                    style={{ fontSize: 22, fontWeight: 800, color: "#00FF88" }}
                    className="glow-text-green"
                  >
                    ₹499
                  </div>
                </div>
                <div
                  style={{ fontSize: 11, color: "#9AA6A0", textAlign: "right" }}
                >
                  <div>✓ Verified professional</div>
                  <div>✓ 30-min session</div>
                  <div>✓ Instant confirmation</div>
                </div>
              </div>

              <button
                type="submit"
                disabled={paying}
                className="btn-cyber w-full py-3 font-semibold"
                style={{
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  opacity: paying ? 0.7 : 1,
                }}
                data-ocid="jobdoer.submit_button"
              >
                {paying ? "Processing..." : "Pay ₹499 & Book Session"}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
