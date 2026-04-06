import { Toaster } from "@/components/ui/sonner";
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AIHIRatioArchitect from "./components/modules/AIHIRatioArchitect";
import CurriculumATS from "./components/modules/CurriculumATS";
import RealityCheckMarketplace from "./components/modules/RealityCheckMarketplace";

export type Module = "curriculumATS" | "aiHIRatio" | "marketplace";

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>("curriculumATS");

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#000000" }}
    >
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main
          className="flex-1 overflow-y-auto"
          style={{
            padding: "28px 28px 80px",
            background: "#000000",
          }}
        >
          {activeModule === "curriculumATS" && <CurriculumATS />}
          {activeModule === "aiHIRatio" && <AIHIRatioArchitect />}
          {activeModule === "marketplace" && <RealityCheckMarketplace />}
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
