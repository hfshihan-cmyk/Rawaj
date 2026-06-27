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

const PASSWORD = "rawaj2026";

export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-bg text-ink">
      {unlocked ? (
        <Dashboard />
      ) : (
        <Gate onUnlock={() => setUnlocked(true)} />
      )}
    </main>
  );
}

/* ----------------------------- Password gate ----------------------------- */

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) onUnlock();
    else setError(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-gray-800 bg-card p-8 text-center shadow-2xl"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-3xl">
          🔐
        </div>
        <h1 className="ar text-2xl font-extrabold">لوحة ذكاء السوق</h1>
        <p className="en-dark mt-1">Market Intelligence — Al Qua&apos;a</p>
        <p className="ar mt-4 text-sm text-muted">
          هذه اللوحة مخصصة لرواد الأعمال. أدخل كلمة المرور للمتابعة.
        </p>

        <input
          type="password"
          value={value}
          autoFocus
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="كلمة المرور"
          className="ar mt-5 w-full rounded-2xl border-2 border-gray-700 bg-bg p-4 text-center text-ink placeholder:text-gray-600 focus:border-accent focus:outline-none"
        />
        {error && (
          <p className="ar mt-3 text-sm font-semibold text-red-400">
            كلمة المرور غير صحيحة
          </p>
        )}

        <button
          type="submit"
          className="ar mt-5 w-full rounded-2xl bg-teal-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-teal-700 active:scale-[0.98]"
        >
          دخول
        </button>
        <Link
          href="/submit"
          className="ar mt-4 block text-sm text-muted hover:text-accent"
        >
          ← العودة لصفحة الاحتياجات
        </Link>
      </form>
    </div>
  );
}

/* ------------------------------- Dashboard ------------------------------- */

function Dashboard() {
  const [needs, setNeeds] = useState<Need[] | null>(null);

  // Load merged (seeds + localStorage) only on the client to avoid hydration mismatch.
  useEffect(() => {
    setNeeds(getMergedNeeds());
  }, []);

  if (!needs) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="ar text-muted">جارٍ تحميل البيانات…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <Header total={needs.length} />
      <SectionA needs={needs} />
      <SectionB needs={needs} />
      <SectionC needs={needs} />
      <SectionD needs={needs} />
      <footer className="mt-12 text-center">
        <p className="ar text-xs text-muted">
          رواج — بيانات مجتمع القوع · {needs.length} حاجة مسجّلة · النموذج
          الأولي لهاكاثون تطوير 2026
        </p>
      </footer>
    </div>
  );
}

function Header({ total }: { total: number }) {
  return (
    <header className="mb-8 flex flex-col gap-3 border-b border-gray-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="ar text-3xl font-extrabold">لوحة ذكاء السوق — القوع</h1>
        <p className="en-dark mt-1">Market Intelligence Dashboard — Al Qua&apos;a</p>
      </div>
      <div className="rounded-2xl bg-teal-500/10 px-4 py-3 text-center">
        <p className="ar text-sm text-accent">
          📊{" "}
          <span className="nums text-2xl font-extrabold">{total}</span> حاجة
          مجتمعية مسجّلة
        </p>
      </div>
    </header>
  );
}

/* Section A — Demand overview chart */
function SectionA({ needs }: { needs: Need[] }) {
  const data = useMemo(() => chartData(needs), [needs]);
  return (
    <section className="mb-10 rounded-2xl border border-gray-800 bg-card p-5 sm:p-6">
      <h2 className="ar mb-1 text-xl font-bold">توزيع الاحتياجات حسب الفئة</h2>
      <p className="en-dark mb-4">Community demand by category</p>
      <DemandChart data={data} />
    </section>
  );
}

/* Section B — Top unmet needs */
function SectionB({ needs }: { needs: Need[] }) {
  const ranked = useMemo(() => topNeeds(needs, 5), [needs]);
  return (
    <section className="mb-10">
      <h2 className="ar mb-1 text-xl font-bold">أهم الاحتياجات غير الملبّاة</h2>
      <p className="en-dark mb-4">Top unmet needs, ranked by demand</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((r, i) => {
          const c = CATEGORY_MAP[r.category];
          return (
            <div
              key={r.category}
              className="rounded-2xl border border-gray-800 bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="ar flex items-center gap-2 font-bold">
                  <span className="text-2xl">{c.emoji}</span>
                  {c.ar}
                </span>
                <span className="ar text-xs text-muted">#{i + 1}</span>
              </div>
              <p className="ar mt-3">
                <span className="nums text-3xl font-extrabold text-accent">
                  {r.count}
                </span>{" "}
                <span className="text-muted">طلب</span>
              </p>
              <span className="ar mt-1 inline-block rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                {FREQUENCY_MAP[r.top_frequency].ar}
              </span>
              <ul className="ar mt-3 space-y-1.5 border-t border-gray-800 pt-3 text-sm text-gray-300">
                {r.samples.length > 0 ? (
                  r.samples.map((s, idx) => (
                    <li key={idx} className="flex gap-1.5">
                      <span className="text-accent">•</span>
                      <span>{s}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-muted">—</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* Section C — AI opportunity report */
function SectionC({ needs }: { needs: Need[] }) {
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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `فشل التحليل (${res.status})`);
      }
      const data = (await res.json()) as { opportunities: Opportunity[] };
      setOpps(data.opportunities);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "تعذّر الاتصال بخدمة التحليل. تأكد من ضبط مفتاح API.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-10 rounded-2xl border border-teal-900/60 bg-gradient-to-b from-teal-950/30 to-card p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="ar text-xl font-bold">تقرير الفرص بالذكاء الاصطناعي ⭐</h2>
          <p className="en-dark">AI Opportunity Report</p>
        </div>
        <button
          onClick={analyze}
          disabled={loading}
          className="ar mt-3 rounded-2xl bg-teal-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0"
        >
          {loading ? "جارٍ التحليل…" : "🤖 حلّل الفرص بالذكاء الاصطناعي"}
        </button>
      </div>

      {!opps && !loading && !error && (
        <p className="ar mt-4 text-sm text-muted">
          اضغط الزر ليحلّل النظام بيانات الطلب المجتمعي ويقترح أفضل 3 فرص
          تجارية مناسبة للقوع — فوراً وبدون أي إعدادات.
        </p>
      )}

      {loading && (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl border border-gray-800 bg-white/[0.03]"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="ar mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400">
          ⚠️ {error}
        </p>
      )}

      {opps && opps.length > 0 && (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {opps.map((o) => (
            <OpportunityCard
              key={o.rank}
              opp={o}
              emoji={emojiForTitle(o.title_ar)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* Section D — Full submissions table */
function SectionD({ needs }: { needs: Need[] }) {
  return (
    <section className="mb-10 rounded-2xl border border-gray-800 bg-card p-5 sm:p-6">
      <h2 className="ar mb-1 text-xl font-bold">كل الاحتياجات المسجّلة</h2>
      <p className="en-dark mb-4">All submissions — filterable</p>
      <NeedsTable needs={needs} />
    </section>
  );
}

/* Best-effort emoji for an opportunity card header based on its Arabic title. */
function emojiForTitle(title: string): string {
  if (title.includes("إبل") || title.includes("هجن") || title.includes("حليب"))
    return "🐪";
  if (title.includes("نجوم") || title.includes("فلك") || title.includes("صحراء"))
    return "⭐";
  if (
    title.includes("خبز") ||
    title.includes("تمر") ||
    title.includes("غذاء") ||
    title.includes("عسل") ||
    title.includes("ألبان")
  )
    return "🥛";
  if (title.includes("صيانة") || title.includes("تكييف") || title.includes("بناء"))
    return "🏠";
  if (title.includes("تقني") || title.includes("هواتف") || title.includes("واي"))
    return "🔧";
  return "💡";
}
