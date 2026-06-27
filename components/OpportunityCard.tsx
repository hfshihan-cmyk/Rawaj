import Link from "next/link";
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
    <div className="glass-panel card-top-light teal-glow animate-fade-up flex flex-col overflow-hidden rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/5 p-5">
        <div>
          <h3 className="ar text-body-lg font-extrabold text-on-surface">
            {emoji} #{opp.rank} — {opp.title_ar}
          </h3>
          <p className="en mt-0.5">{opp.title_en}</p>
        </div>
        <span className="nums shrink-0 rounded-full bg-secondary/15 px-3 py-1 text-sm font-bold text-secondary">
          {opp.demand_percentage}
        </span>
      </div>

      <div className="flex-grow space-y-4 p-5">
        <Row icon="📊" label="الطلب">
          <span className="ar text-on-surface">
            <span className="nums font-bold text-secondary">{opp.demand_count}</span>{" "}
            طلب مجتمعي ({opp.demand_percentage})
          </span>
        </Row>
        <Row icon="💡" label="الرؤية">
          <p className="ar leading-relaxed text-on-surface-variant">{opp.insight_ar}</p>
        </Row>
        <Row icon="⚡" label="الخطوة الأولى">
          <p className="ar leading-relaxed text-on-surface-variant">{opp.first_step_ar}</p>
        </Row>
        <Row icon="💰" label="التكلفة">
          <span className="ar text-on-surface-variant">{opp.cost_estimate_ar}</span>
        </Row>
        <Row icon="🏛️" label="جهة الدعم">
          <span className="ar font-semibold text-on-surface">{opp.support_entity}</span>
        </Row>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 px-5 py-3">
        <span
          className={`ar rounded-full px-3 py-1 text-xs font-bold ${
            opp.feasibility === "low"
              ? "bg-secondary/15 text-secondary"
              : "bg-tertiary/15 text-tertiary"
          }`}
        >
          {FEASIBILITY_AR[opp.feasibility]}
        </span>
        <Link
          href={`/opportunity/${opp.id}`}
          className="ar flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
        >
          عرض التفاصيل
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </Link>
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
      <div className="ar mb-1 flex items-center gap-1.5 font-mono text-label-sm text-on-surface-variant">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="pr-6">{children}</div>
    </div>
  );
}
