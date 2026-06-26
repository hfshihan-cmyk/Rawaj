import type { Opportunity } from "@/lib/types";

const FEASIBILITY_AR: Record<Opportunity["feasibility"], string> = {
  low: "سهلة التنفيذ",
  medium: "متوسطة",
};

export default function OpportunityCard({
  opp,
  emoji,
}: {
  opp: Opportunity;
  emoji: string;
}) {
  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-gray-800 bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-gray-800 bg-gradient-to-l from-teal-950/40 to-transparent p-5">
        <div>
          <h3 className="ar text-xl font-extrabold text-ink">
            {emoji} #{opp.rank} — {opp.title_ar}
          </h3>
          <p className="en-dark mt-0.5">{opp.title_en}</p>
        </div>
        <span className="nums shrink-0 rounded-full bg-teal-500/15 px-3 py-1 text-sm font-bold text-accent">
          {opp.demand_percentage}
        </span>
      </div>

      <div className="space-y-4 p-5">
        {/* Demand */}
        <Row icon="📊" label="الطلب">
          <span className="ar text-ink">
            <span className="nums font-bold text-accent">{opp.demand_count}</span>{" "}
            طلب مجتمعي ({opp.demand_percentage})
          </span>
        </Row>

        {/* Insight */}
        <Row icon="💡" label="الرؤية">
          <p className="ar leading-relaxed text-gray-200">{opp.insight_ar}</p>
        </Row>

        {/* First step */}
        <Row icon="⚡" label="الخطوة الأولى">
          <p className="ar leading-relaxed text-gray-200">{opp.first_step_ar}</p>
        </Row>

        {/* Cost + feasibility */}
        <Row icon="💰" label="التكلفة">
          <span className="ar text-gray-200">{opp.cost_estimate_ar}</span>
        </Row>

        {/* Support entity */}
        <Row icon="🏛️" label="جهة الدعم">
          <span className="ar font-semibold text-gray-100">
            {opp.support_entity}
          </span>
        </Row>
      </div>

      <div className="flex items-center justify-between border-t border-gray-800 px-5 py-3">
        <span className="ar text-xs text-muted">الجدوى</span>
        <span
          className={`ar rounded-full px-3 py-1 text-xs font-bold ${
            opp.feasibility === "low"
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {FEASIBILITY_AR[opp.feasibility]}
        </span>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="ar mb-1 flex items-center gap-1.5 text-xs font-bold text-muted">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="pr-6">{children}</div>
    </div>
  );
}
