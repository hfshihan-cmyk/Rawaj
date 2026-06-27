"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DemandChart from "@/components/DemandChart";
import NeedsTable from "@/components/NeedsTable";
import OpportunityCard from "@/components/OpportunityCard";
import { CATEGORY_MAP, FREQUENCY_MAP } from "@/lib/categories";
import {
  buildAnalyzePayload,
  chartData,
  getMergedNeeds,
  topNeeds,
} from "@/lib/dataUtils";
import type { Need, Opportunity } from "@/lib/types";

export default function DashboardPage() {
  const [needs, setNeeds] = useState<Need[] | null>(null);

  // Merged (seeds + localStorage) loads on the client to avoid hydration mismatch.
  useEffect(() => {
    setNeeds(getMergedNeeds());
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-on-surface">
      <div className="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-60" />

      {/* Top bar */}
      <nav className="relative z-30 border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-container-max flex-row-reverse items-center justify-between px-lg py-md">
          <Link href="/" className="font-geist text-2xl font-bold tracking-tighter">
            رواج <span className="text-secondary">Rawaj</span>
          </Link>
          <div className="flex flex-row-reverse items-center gap-md">
            <Link
              href="/submit"
              className="ar rounded-lg border border-secondary/40 px-md py-sm font-mono text-label-sm text-secondary transition hover:bg-secondary/10"
            >
              + إضافة احتياج
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex max-w-container-max gap-lg px-lg py-lg">
        <Sidebar />
        <main className="min-w-0 flex-grow">
          {needs ? <Dashboard needs={needs} /> : <Loading />}
        </main>
      </div>

      <footer className="relative z-10 border-t border-white/5 px-lg py-lg text-center">
        <p className="font-mono text-label-sm text-outline">
          رواج • Tatweer 2026 • Challenge #3 • Reef Dev Team • صنع في القوع
        </p>
      </footer>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <p className="ar text-on-surface-variant">جارٍ تحميل البيانات…</p>
    </div>
  );
}

function Sidebar() {
  const item =
    "ar flex items-center gap-sm rounded-lg px-md py-sm text-body-md text-on-surface-variant transition hover:bg-white/5 hover:text-secondary";
  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <div className="glass-panel sticky top-lg rounded-xl p-md">
        <p className="ar mb-sm px-md font-mono text-label-sm uppercase text-outline">
          نظرة عامة • Overview
        </p>
        <nav className="space-y-1">
          <a href="#demand" className={item}>
            <span className="material-symbols-outlined text-[20px] text-secondary">bar_chart</span>
            الطلب حسب الفئة
          </a>
          <a href="#top" className={item}>
            <span className="material-symbols-outlined text-[20px] text-secondary">trophy</span>
            أهم الاحتياجات
          </a>
          <a href="#table" className={item}>
            <span className="material-symbols-outlined text-[20px] text-secondary">table</span>
            كل الطلبات
          </a>
        </nav>
        <p className="ar mb-sm mt-lg px-md font-mono text-label-sm uppercase text-tertiary">
          مميّز • Premium
        </p>
        <nav className="space-y-1">
          <a href="#ai" className={item}>
            <span className="material-symbols-outlined text-[20px] text-tertiary">auto_awesome</span>
            توقعات الذكاء الاصطناعي
          </a>
        </nav>
      </div>
    </aside>
  );
}

function Dashboard({ needs }: { needs: Need[] }) {
  return (
    <div className="space-y-lg">
      <Header total={needs.length} />
      <EvidenceBanner total={needs.length} needs={needs} />
      <div className="grid grid-cols-1 gap-lg xl:grid-cols-2">
        <DemandSection needs={needs} />
        <LeaderboardSection needs={needs} />
      </div>
      <AISection needs={needs} />
      <TableSection needs={needs} />
    </div>
  );
}

function Header({ total }: { total: number }) {
  return (
    <header className="flex flex-col gap-2 border-b border-white/5 pb-lg sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="ar text-headline-md font-bold text-on-surface">
          لوحة ذكاء السوق — القوع
        </h1>
        <p className="en mt-1">Market Intelligence Dashboard — Al Qua&apos;a</p>
      </div>
      <div className="glass-panel teal-glow rounded-xl px-md py-sm text-center">
        <span className="ar text-sm text-secondary">
          📊 <span className="nums text-xl font-extrabold">{total}</span> حاجة مسجّلة
        </span>
      </div>
    </header>
  );
}

function EvidenceBanner({ total, needs }: { total: number; needs: Need[] }) {
  const camel = needs.filter((n) => n.category === "camel").length;
  const pct = total ? Math.round((camel / total) * 100) : 0;
  return (
    <div className="card-top-light flex flex-col items-start gap-2 rounded-xl border border-secondary/20 bg-secondary/10 px-lg py-md sm:flex-row sm:items-center sm:justify-between">
      <p className="ar text-body-md text-on-surface">
        <span className="font-mono text-secondary">●</span> دليل حيّ:{" "}
        <span className="nums font-bold text-secondary">{camel}</span> من{" "}
        <span className="nums font-bold">{total}</span> احتياجاً مرتبط بالإبل (
        <span className="nums">{pct}%</span>) — أكبر فجوة في السوق.
      </p>
      <span className="font-mono text-label-sm text-on-surface-variant">
        Needs found in Al Qua&apos;a this month: {total}
      </span>
    </div>
  );
}

function DemandSection({ needs }: { needs: Need[] }) {
  const data = useMemo(() => chartData(needs), [needs]);
  return (
    <section id="demand" className="glass-panel card-top-light rounded-xl p-lg">
      <h2 className="ar text-body-lg font-bold text-on-surface">الطلب حسب الفئة</h2>
      <p className="en mb-md">Demand by Category</p>
      <DemandChart data={data} />
    </section>
  );
}

const TROPHIES = ["🥇", "🥈", "🥉"];

function LeaderboardSection({ needs }: { needs: Need[] }) {
  const ranked = useMemo(() => topNeeds(needs, 5), [needs]);
  return (
    <section id="top" className="glass-panel card-top-light rounded-xl p-lg">
      <h2 className="ar text-body-lg font-bold text-on-surface">أهم الاحتياجات</h2>
      <p className="en mb-md">Top Needs — ranked by demand</p>
      <ol className="space-y-sm">
        {ranked.map((r, i) => {
          const c = CATEGORY_MAP[r.category];
          return (
            <li
              key={r.category}
              className="flex items-center gap-md rounded-lg border border-white/5 bg-surface-container-lowest px-md py-sm transition hover:border-secondary/30"
            >
              <span className="w-7 shrink-0 text-center text-xl">
                {TROPHIES[i] ?? <span className="nums text-outline">{i + 1}</span>}
              </span>
              <span className="text-2xl">{c.emoji}</span>
              <div className="min-w-0 flex-grow">
                <p className="ar truncate font-bold text-on-surface">{c.ar}</p>
                <p className="ar truncate text-xs text-on-surface-variant">
                  {r.samples[0] ?? FREQUENCY_MAP[r.top_frequency].ar}
                </p>
              </div>
              <div className="shrink-0 text-left">
                <span className="nums text-xl font-extrabold text-secondary">{r.count}</span>
                <span className="ar mr-1 text-xs text-outline">طلب</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* Static AI-insight teaser bento (with watermark numbers), then the generated report. */
const INSIGHTS = [
  {
    n: "01",
    tone: "teal" as const,
    tagAr: "توصية",
    tagEn: "Recommendation",
    body: "دمج طلبات علف الإبل في توريد جماعي قد يخفّض التكلفة حتى 20% على المزارع الحالية.",
  },
  {
    n: "02",
    tone: "gold" as const,
    tagAr: "تنبيه",
    tagEn: "Alert",
    body: "خدمات السياحة الفلكية لها 9 طلبات محلية و0 مزوّد — فجوة سوق مؤكدة في القوع.",
  },
  {
    n: "03",
    tone: "teal" as const,
    tagAr: "فرصة",
    tagEn: "Opportunity",
    body: "نقص حاد في معالجة حليب الإبل الطازج رغم أنه الطلب الأول — أعلى عائد متوقّع.",
  },
];

function AISection({ needs }: { needs: Need[] }) {
  const [loading, setLoading] = useState(false);
  const [opps, setOpps] = useState<Opportunity[] | null>(null);
  const [error, setError] = useState("");

  async function analyze() {
    setLoading(true);
    setError("");
    setOpps(null);
    try {
      const payload = buildAnalyzePayload(needs);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`فشل التحليل (${res.status})`);
      const data = (await res.json()) as { opportunities: Opportunity[] };
      setOpps(data.opportunities);
    } catch {
      setError("تعذّر إنشاء التقرير. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="ai"
      className="card-top-light rounded-xl border border-tertiary/20 bg-gradient-to-b from-tertiary/5 to-transparent p-lg"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="ar text-headline-md font-bold text-on-surface">
            رؤى الذكاء الاصطناعي ⭐
          </h2>
          <p className="en">AI Insights — Al Qua&apos;a Forecast</p>
        </div>
        <button
          onClick={analyze}
          disabled={loading}
          className="ar rounded-lg bg-secondary px-lg py-sm text-body-md font-bold text-on-secondary shadow-[0_4px_14px_0_rgba(79,219,200,0.39)] transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "جارٍ التحليل…" : "🤖 حلّل الفرص بالذكاء الاصطناعي"}
        </button>
      </div>

      {/* Teaser bento */}
      <div className="mt-lg grid grid-cols-1 gap-md md:grid-cols-3">
        {INSIGHTS.map((ins) => (
          <div
            key={ins.n}
            className="glass-panel relative overflow-hidden rounded-xl p-md"
          >
            <span className="watermark font-geist absolute -bottom-8 -left-2 !text-[7rem]">
              {ins.n}
            </span>
            <span
              className={`ar relative z-10 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                ins.tone === "gold"
                  ? "bg-tertiary/10 text-tertiary"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              {ins.tagAr} <span className="en">({ins.tagEn})</span>
            </span>
            <p className="ar relative z-10 mt-sm text-sm leading-relaxed text-on-surface-variant">
              {ins.body}
            </p>
          </div>
        ))}
      </div>

      {/* Generated report */}
      {loading && (
        <div className="mt-lg grid gap-md lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-panel h-64 animate-pulse rounded-xl" />
          ))}
        </div>
      )}
      {error && (
        <p className="ar mt-lg rounded-lg bg-error/10 px-md py-sm text-sm font-semibold text-error">
          ⚠️ {error}
        </p>
      )}
      {opps && (
        <div className="mt-lg grid gap-md lg:grid-cols-3">
          {opps.map((o) => (
            <OpportunityCard key={o.id} opp={o} emoji={emojiForTitle(o.title_ar)} />
          ))}
        </div>
      )}
    </section>
  );
}

function TableSection({ needs }: { needs: Need[] }) {
  return (
    <section id="table" className="glass-panel card-top-light rounded-xl p-lg">
      <h2 className="ar text-body-lg font-bold text-on-surface">كل الاحتياجات المسجّلة</h2>
      <p className="en mb-md">All submissions — filterable</p>
      <NeedsTable needs={needs} />
    </section>
  );
}

function emojiForTitle(title: string): string {
  if (title.includes("إبل") || title.includes("هجن") || title.includes("حليب")) return "🐪";
  if (title.includes("نجوم") || title.includes("فلك") || title.includes("صحراء")) return "⭐";
  if (
    title.includes("خبز") ||
    title.includes("تمر") ||
    title.includes("غذاء") ||
    title.includes("عسل") ||
    title.includes("ألبان")
  )
    return "🥛";
  if (title.includes("صيانة") || title.includes("تكييف") || title.includes("بناء")) return "🏠";
  if (title.includes("تقني") || title.includes("هواتف") || title.includes("واي")) return "🔧";
  return "💡";
}
