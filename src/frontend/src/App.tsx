import { Toaster } from "@/components/ui/sonner";
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AIHIRatioArchitect from "./components/modules/AIHIRatioArchitect";
import CurriculumATS from "./components/modules/CurriculumATS";
import RealityCheckMarketplace from "./components/modules/RealityCheckMarketplace";
import HomePage from "./pages/HomePage";
import LevelGatePage from "./pages/LevelGatePage";

export type View =
  | "home"
  | "levelGate"
  | "curriculumATS"
  | "aiHIRatio"
  | "marketplace";

export default function App() {
  const [view, setView] = useState<View>("home");

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#000000" }}
    >
      <Sidebar view={view} setView={setView} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main
          className="flex-1 overflow-y-auto"
          style={{
            padding: view === "home" ? "0" : "28px 28px 80px",
            background: "#000000",
          }}
        >
          {view === "home" && <HomePage onNavigate={setView} />}
          {view === "levelGate" && <LevelGatePage onNavigate={setView} />}
          {view === "curriculumATS" && <CurriculumATS />}
          {view === "aiHIRatio" && <AIHIRatioArchitect />}
          {view === "marketplace" && <RealityCheckMarketplace />}
        </main>

        {/* Footer */}
        <footer
          className="flex-shrink-0 flex items-center justify-between"
          style={{
            height: 40,
            padding: "0 28px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ fontSize: 11, color: "#555" }}>
            © {new Date().getFullYear()} SYNTRA AI · All rights reserved
          </div>
          <div style={{ fontSize: 11, color: "#555" }}>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00FF88", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </div>
        </footer>
      </div>

      <Toaster />
    </div>
  );
}
