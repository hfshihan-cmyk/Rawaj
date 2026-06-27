import Link from "next/link";
import { notFound } from "next/navigation";
import { OPPORTUNITIES, getOpportunity } from "@/lib/opportunities";

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ id: o.id }));
}

export default function OpportunityDetail({
  params,
}: {
  params: { id: string };
}) {
  const opp = getOpportunity(params.id);
  if (!opp) notFound();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background px-md py-xl text-on-surface md:px-lg">
      {/* Ambient background */}
      <div className="bg-grid-pattern pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed left-1/4 top-0 z-0 h-96 w-1/2 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Back */}
        <Link
          href="/dashboard"
          className="mb-lg flex items-center gap-sm font-mono text-label-sm text-outline transition-colors hover:text-secondary"
        >
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
          <span>العودة للرؤى • Back to Insights</span>
        </Link>

        {/* Main card */}
        <div className="glass-panel teal-glow relative overflow-hidden rounded-xl">
          <div className="watermark font-geist left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 !text-[20rem]">
            {String(opp.rank).padStart(2, "0")}
          </div>

          <div className="relative z-10 p-lg md:p-xl">
            {/* Header */}
            <div className="mb-xl flex flex-col items-start justify-between gap-md border-b border-white/5 pb-md md:flex-row md:items-end">
              <div>
                <div className="mb-sm flex flex-wrap items-center gap-sm">
                  <span className="rounded-full border border-secondary/20 bg-secondary/10 px-sm py-xs font-mono text-label-sm text-secondary">
                    فرصة عالية الطلب • HIGH DEMAND
                  </span>
                  <span className="rounded-full border border-tertiary/20 bg-tertiary/10 px-sm py-xs font-mono text-label-sm text-tertiary">
                    {opp.sector_ar} • {opp.sector_en}
                  </span>
                </div>
                <h1 className="ar text-display-lg-mobile text-on-surface md:text-display-lg">
                  {opp.title_ar}
                </h1>
                <h2 className="en !text-lg text-surface-variant">{opp.title_en}</h2>
              </div>

              {/* Support entity badge */}
              <div className="flex items-center gap-sm rounded-lg border border-white/5 bg-surface-container-low p-sm">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-label-sm text-outline">
                    جهة الدعم • Support Entity
                  </span>
                  <span className="ar font-mono text-label-sm text-on-surface">
                    {opp.support_entity}
                  </span>
                </div>
              </div>
            </div>

            {/* Content grid */}
            <div className="mb-xl grid grid-cols-1 gap-lg md:grid-cols-3">
              {/* Gap analysis */}
              <div className="space-y-md md:col-span-2">
                <h3 className="ar flex items-center gap-sm text-headline-md text-on-surface">
                  <span className="material-symbols-outlined text-secondary">analytics</span>
                  تحليل الفجوة • Gap Analysis
                </h3>
                <p className="ar text-body-lg leading-relaxed text-on-surface-variant">
                  {opp.gap_analysis_ar}
                </p>
                <p className="en leading-relaxed text-outline">{opp.gap_analysis_en}</p>
              </div>

              {/* Metrics panel */}
              <div className="space-y-md rounded-lg border border-white/5 bg-surface-container-low p-md">
                <div>
                  <div className="mb-xs flex items-center justify-between">
                    <span className="font-mono text-label-sm text-outline">
                      كثافة الطلب • Demand
                    </span>
                    <span className="nums font-mono text-label-sm text-secondary">
                      {opp.demand_intensity}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                    <div
                      className="h-full rounded-full bg-secondary shadow-[0_0_10px_#4fdbc8]"
                      style={{ width: `${opp.demand_intensity}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-sm border-t border-white/5 pt-sm">
                  <div>
                    <span className="ar mb-xs block font-mono text-label-sm text-outline">
                      حجم السوق
                    </span>
                    <span className="nums block text-headline-md text-on-surface">
                      {opp.market_size_ar}
                    </span>
                  </div>
                  <div>
                    <span className="ar mb-xs block font-mono text-label-sm text-outline">
                      المنافسة
                    </span>
                    <span className="ar block text-headline-md text-tertiary">
                      {opp.competition_ar}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-sm border-t border-white/5 pt-sm">
                  <div>
                    <span className="ar mb-xs block font-mono text-label-sm text-outline">
                      الطلب المجتمعي
                    </span>
                    <span className="nums block text-headline-md text-on-surface">
                      {opp.demand_count}
                    </span>
                  </div>
                  <div>
                    <span className="ar mb-xs block font-mono text-label-sm text-outline">
                      التكلفة
                    </span>
                    <span className="ar block text-sm font-bold text-on-surface">
                      {opp.cost_estimate_ar}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* First step highlight */}
            <div className="relative flex flex-col items-center justify-between gap-md overflow-hidden rounded-lg border border-tertiary/20 bg-tertiary/5 p-md md:flex-row md:p-lg">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-tertiary/20 blur-2xl" />
              <div className="relative z-10 flex items-start gap-md">
                <span
                  className="material-symbols-outlined text-4xl text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  flag
                </span>
                <div>
                  <h4 className="ar text-headline-md text-tertiary">
                    الخطوة الأولى: {opp.first_step_ar}
                  </h4>
                  <p className="en mt-1 text-on-surface-variant">{opp.first_step_en}</p>
                </div>
              </div>
              <Link
                href="/submit"
                className="ar relative z-10 w-full whitespace-nowrap rounded-lg bg-tertiary px-lg py-md text-center font-mono text-label-sm font-bold uppercase tracking-wider text-on-tertiary transition-colors hover:opacity-90 md:w-auto"
              >
                بدء الإجراءات • Start Process
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
