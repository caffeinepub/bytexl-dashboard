import type React from "react";
import { useState } from "react";
import type { ContactSubmission } from "../backend";
import { useActor } from "../hooks/useActor";

const newsItems = [
  "⚡ Meta releases Llama 4 with 2T parameters — 2h ago",
  "🤖 OpenAI GPT-5 beats human benchmarks across all domains — 5h ago",
  "💎 Nvidia H200 chips sold out globally, waitlist extends to Q3 2026 — 8h ago",
  "🚀 Google DeepMind launches Gemini Ultra 2.0 with multimodal reasoning — 12h ago",
  "📎 Microsoft Copilot deep integration rolls out across all Office apps — 1d ago",
  "🧠 Anthropic Claude 3.7 scores 98% on medical licensing exams — 1d ago",
];

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

function ContactModal({ open, onClose }: ContactModalProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (actor) {
        const contact: ContactSubmission = {
          name: form.name,
          email: form.email,
          message: form.message,
        };
        await actor.submitContact(contact);
      }
      setDone(true);
    } catch (err) {
      console.error("Contact submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="contact.modal"
    >
      <section
        className="glass-card p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          data-ocid="contact.close_button"
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
        <h2
          id="contact-modal-title"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#F2F5F3",
            marginBottom: 4,
          }}
        >
          Get in Touch
        </h2>
        <p style={{ fontSize: 13, color: "#9AA6A0", marginBottom: 20 }}>
          We'll get back to you within 24 hours.
        </p>

        {done ? (
          <div
            className="text-center py-8"
            style={{ color: "#00FF88" }}
            data-ocid="contact.success_state"
          >
            <div style={{ fontSize: 40 }}>✓</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>
              Message Sent!
            </div>
            <div style={{ fontSize: 13, color: "#9AA6A0", marginTop: 4 }}>
              We'll reach out soon.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  fontSize: 12,
                  color: "#9AA6A0",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F2F5F3",
                  outline: "none",
                }}
                data-ocid="contact.input"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                style={{
                  fontSize: 12,
                  color: "#9AA6A0",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F2F5F3",
                  outline: "none",
                }}
                data-ocid="contact.input"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                style={{
                  fontSize: 12,
                  color: "#9AA6A0",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="How can we help?"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200 resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F2F5F3",
                  outline: "none",
                }}
                data-ocid="contact.textarea"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-cyber w-full py-3 mt-1"
              style={{ fontWeight: 600 }}
              data-ocid="contact.submit_button"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default function Header() {
  const [contactOpen, setContactOpen] = useState(false);
  const tickerText = newsItems.join("   ·   ");

  return (
    <>
      <header
        className="flex items-center flex-shrink-0"
        style={{
          height: 56,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
          zIndex: 30,
        }}
      >
        <div
          className="flex items-center gap-2 flex-shrink-0"
          style={{ width: 140 }}
        >
          <div
            className="flex items-center justify-center rounded-md flex-shrink-0"
            style={{
              width: 28,
              height: 28,
              background: "linear-gradient(135deg, #00FF88 0%, #00cc6a 100%)",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 14,
                color: "#000",
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#F2F5F3",
              letterSpacing: "0.08em",
            }}
          >
            SYNTRA
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 overflow-hidden mx-4">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              color: "#00FF88",
              whiteSpace: "nowrap",
              letterSpacing: "0.1em",
            }}
            className="glow-text-green"
          >
            AI NEWS:
          </span>
          <div
            className="flex-1 overflow-hidden relative"
            style={{ height: 20 }}
          >
            <div
              style={{
                display: "flex",
                whiteSpace: "nowrap",
                animation: "ticker-scroll 40s linear infinite",
                width: "200%",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#9AA6A0", paddingRight: "4rem" }}
              >
                {tickerText}
              </span>
              <span
                style={{ fontSize: 11, color: "#9AA6A0", paddingRight: "4rem" }}
              >
                {tickerText}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="btn-cyber flex-shrink-0"
          style={{
            animation: "pulse-glow 2s ease-in-out infinite",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
          data-ocid="header.button"
        >
          Get in Touch
        </button>
      </header>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
