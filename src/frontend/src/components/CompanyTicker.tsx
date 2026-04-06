const COMPANIES = [
  { name: "Microsoft" },
  { name: "Google" },
  { name: "Amazon" },
  { name: "TCS" },
  { name: "Infosys" },
  { name: "Wipro" },
  { name: "Cognizant" },
  { name: "Accenture" },
  { name: "Deloitte" },
  { name: "IBM" },
];

const ALUMNI_STATS: Record<string, string> = {
  Microsoft: "18 placed",
  Google: "24 placed",
  Amazon: "15 placed",
  TCS: "22 placed",
  Infosys: "19 placed",
  Wipro: "11 placed",
  Cognizant: "16 placed",
  Accenture: "31 placed",
  Deloitte: "9 placed",
  IBM: "13 placed",
};

export default function CompanyTicker() {
  const items = [...COMPANIES, ...COMPANIES];
  return (
    <div className="glass-card p-4 overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-glow-gold">
          byteXL Alumni Placed At
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(245,200,66,0.2)" }}
        />
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-3 animate-marquee-logos">
          {items.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex-shrink-0 cursor-pointer"
            >
              <div
                className="px-4 py-2 rounded-xl transition-all hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p className="text-xs font-bold text-white whitespace-nowrap">
                  {c.name}
                </p>
                <p
                  className="text-[9px] whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {ALUMNI_STATS[c.name]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
