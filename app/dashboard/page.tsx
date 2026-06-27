"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Building,
  FileSpreadsheet,
  Info,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CATEGORY_UI } from "@/components/categoryConfig";
import { CATEGORIES, CATEGORY_MAP, FREQUENCY_MAP } from "@/lib/categories";
import { getMergedNeeds, topNeeds } from "@/lib/dataUtils";
import { getAllOpportunities } from "@/lib/opportunities";
import type { Need } from "@/lib/types";

const OPPORTUNITIES = getAllOpportunities();

export default function DashboardPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    setNeeds(getMergedNeeds());
  }, []);

  const stats = useMemo(() => {
    const total = needs.length;
    const counts: Record<string, number> = {};
    for (const c of CATEGORIES) counts[c.key] = needs.filter((n) => n.category === c.key).length;
    const camelCount = counts.camel || 0;
    const camelPercent = total ? Math.round((camelCount / total) * 100) : 0;
    return { total, counts, camelCount, camelPercent };
  }, [needs]);

  const filtered = useMemo(
    () =>
      needs.filter((n) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          n.description.toLowerCase().includes(q) || n.neighborhood.toLowerCase().includes(q);
        const matchesCategory = categoryFilter === "all" || n.category === categoryFilter;
        return matchesSearch && matchesCategory;
      }),
    [needs, searchQuery, categoryFilter],
  );

  const leaders = useMemo(() => topNeeds(needs, 3), [needs]);

  function exportCsv() {
    const headers = "ID,Category,Description,Frequency,Neighborhood,Date\n";
    const rows = needs
      .map(
        (n) =>
          `${n.id},"${n.category}","${n.description.replace(/"/g, '""')}",${n.frequency},"${n.neighborhood}",${n.created_at.slice(0, 10)}`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "rawaj_market_demands.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const maxCount = Math.max(...(Object.values(stats.counts) as number[]), 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 pt-6 pb-24 w-full flex-grow flex flex-col gap-6"
    >
      <div className="flex flex-col lg:flex-row-reverse gap-8 items-start w-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="glass rounded-xl p-5 space-y-4 shadow-sm text-right">
            <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-white/5 pb-2">
              نظرة عامة Overview
            </span>
            <button
              onClick={() => setCategoryFilter("all")}
              className={`w-full flex items-center justify-between p-2.5 rounded text-xs font-bold transition-colors ${
                categoryFilter === "all"
                  ? "bg-[#4fdbc8]/15 text-[#4fdbc8] border border-[#4fdbc8]/20"
                  : "text-[#c6c6cc] hover:bg-white/5"
              }`}
            >
              <span className="font-mono text-[10px] bg-white/10 text-white rounded-full px-2 py-0.5">
                {stats.total}
              </span>
              <span>الطلب الحالي Demand</span>
            </button>
            <button
              onClick={() => setCategoryFilter("camel")}
              className={`w-full flex items-center justify-between p-2.5 rounded text-xs font-bold transition-colors ${
                categoryFilter === "camel"
                  ? "bg-[#4fdbc8]/15 text-[#4fdbc8] border border-[#4fdbc8]/20"
                  : "text-[#c6c6cc] hover:bg-white/5"
              }`}
            >
              <span className="font-mono text-[10px] bg-white/10 text-white rounded-full px-2 py-0.5">
                {stats.camelCount}
              </span>
              <span>التوجهات Trends</span>
            </button>
          </div>

          <div className="glass rounded-xl p-5 space-y-4 shadow-sm text-right">
            <span className="text-xs font-mono font-bold text-[#ffb95f] uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-1 justify-end">
              <span>أدوات مميزة Premium</span>
              <Award className="w-4 h-4 text-[#ffb95f]" />
            </span>
            <a
              href="#ai-insights"
              className="w-full flex items-center justify-end gap-2 p-2.5 rounded text-xs font-bold bg-[#ffb95f]/10 text-[#ffb95f] border border-[#ffb95f]/20 hover:bg-[#ffb95f]/20 transition-all text-right"
            >
              <span>توقعات الذكاء الاصطناعي Forecast</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Evidence banner */}
          <div className="glass rounded-xl p-6 border-l-4 border-[#14b8a6] flex flex-col md:flex-row-reverse justify-between items-center gap-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#14b8a6]/5 to-transparent pointer-events-none"></div>
            <div className="flex flex-row-reverse items-center gap-4 z-10 text-right">
              <div className="p-3 bg-[#14b8a6]/10 text-[#14b8a6] rounded-xl shrink-0">
                <Info className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">
                  تم رصد {stats.total} احتياجاً في القوع هذا الشهر
                </h2>
                <p className="text-xs text-[#c6c6cc] mt-1 font-sans">
                  {stats.total} unmet local demands verified live and committed to the repository.
                </p>
              </div>
            </div>
            <button
              onClick={exportCsv}
              className="bg-[#14b8a6] text-[#051424] font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-[#4fdbc8] transition-colors shadow-lg shadow-black/10 flex items-center gap-1.5 z-10 shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>تصدير التقرير Export CSV</span>
            </button>
          </div>

          {/* Chart + leaderboard */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Bar chart */}
            <div className="xl:col-span-3 glass rounded-xl p-6 flex flex-col h-[380px] text-right">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">
                  الطلب حسب الفئة Demand by Category
                </h3>
                <div className="flex gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-[#4fdbc8]">
                    <span className="w-2.5 h-2.5 bg-[#4fdbc8] rounded-sm"></span> أساسي Primary
                  </span>
                  <span className="flex items-center gap-1 text-[#ffb95f]">
                    <span className="w-2.5 h-2.5 bg-[#ffb95f] rounded-sm"></span> ثانوي Secondary
                  </span>
                </div>
              </div>
              <div className="flex-1 relative border-b border-l border-white/10 flex items-end justify-around pb-4 pt-10 px-4 group">
                {CATEGORIES.map((c) => {
                  const count = stats.counts[c.key] || 0;
                  const heightPercent = Math.max((count / maxCount) * 80, 5);
                  const isSpecial = c.key === "camel" || c.key === "tourism" || c.key === "food";
                  return (
                    <div key={c.key} className="flex flex-col items-center gap-2 group/bar relative w-8 sm:w-12">
                      <div
                        className={`w-full rounded-t-sm transition-all duration-1000 ${
                          isSpecial
                            ? "bg-gradient-to-t from-[#14b8a6] to-[#4fdbc8] shadow-[0_0_15px_rgba(79,219,200,0.2)]"
                            : "bg-white/10 group-hover/bar:bg-white/25"
                        }`}
                        style={{ height: needs.length ? `${heightPercent}%` : "0%" }}
                      ></div>
                      <span className="text-[10px] sm:text-xs text-[#c6c6cc] truncate max-w-full font-mono font-bold">
                        {c.ar.slice(0, 6)}
                      </span>
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover/bar:opacity-100 scale-90 group-hover/bar:scale-100 transition-all duration-200 pointer-events-none bg-[#0f172a] border border-white/10 rounded px-2.5 py-1.5 text-[11px] font-mono text-[#d4e4fa] whitespace-nowrap z-40 shadow-xl">
                        <span className="block text-[#4fdbc8] font-bold">{c.en}</span>
                        <span className="block text-white font-extrabold">{count} الطلبات / Requests</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="xl:col-span-2 glass rounded-xl p-6 flex flex-col h-[380px] text-right">
              <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                أعلى الاحتياجات Top Needs
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {leaders.map((r, i) => {
                  const c = CATEGORY_MAP[r.category];
                  const tier =
                    i === 0
                      ? { box: "bg-[#ffb95f]/10 border-[#ffb95f]/20", num: "bg-[#ffb95f]/20 text-[#ffb95f]", sub: "text-[#ffb95f]", badge: "bg-red-500/20 text-red-400", badgeText: "HIGH" }
                      : i === 1
                        ? { box: "bg-[#4fdbc8]/10 border-[#4fdbc8]/20", num: "bg-[#4fdbc8]/20 text-[#4fdbc8]", sub: "text-[#4fdbc8]", badge: "bg-[#4fdbc8]/20 text-[#4fdbc8]", badgeText: "MED" }
                        : { box: "bg-white/5 border-white/5", num: "bg-white/10 text-white", sub: "text-slate-400", badge: "bg-[#ffb95f]/10 text-[#ffb95f]", badgeText: "NEW OCEAN" };
                  return (
                    <div key={r.category} className={`flex flex-row-reverse items-center justify-between p-3 rounded-lg border ${tier.box}`}>
                      <div className="flex flex-row-reverse items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${tier.num}`}>
                          {["١", "٢", "٣"][i]}
                        </div>
                        <div className="text-right">
                          <span className="block text-xs font-bold text-white">{c.ar}</span>
                          <span className={`block text-[10px] font-mono mt-0.5 ${tier.sub}`}>
                            {r.count} طلبات مسجلة
                          </span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${tier.badge}`}>
                        {tier.badgeText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Insights bento */}
          <div id="ai-insights" className="space-y-4 scroll-mt-28">
            <div className="flex justify-between items-center text-right">
              <div>
                <h3 className="text-xl font-bold text-white">رؤى الذكاء الاصطناعي (AI Insights)</h3>
                <p className="text-xs text-[#c6c6cc]">
                  Automated high-value analytical trends derived from community requests.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BentoCard n="01" tone="teal" tagEn="OPPORTUNITY" icon={<TrendingUp className="w-4 h-4" />} titleAr="نقص حاد في معالجة حليب الإبل" body="Severe shortage of fresh camel-milk processing despite it being the #1 demand — highest expected return." />
              <BentoCard n="02" tone="gold" tagEn="ALERT" icon={<AlertTriangle className="w-4 h-4" />} titleAr="السياحة الفلكية بلا مزوّدين" body="Stargazing has 9 local requests and 0 providers — a confirmed market gap in Al Qua'a." />
              <BentoCard n="03" tone="slate" tagEn="RECOMMENDATION" icon={<Info className="w-4 h-4" />} titleAr="تجميع طلبات العلف يخفض التكلفة" body="Consolidating camel-feed requests could cut costs up to 20% for remote farms." />
            </div>
          </div>

          {/* Opportunity briefs */}
          <div className="space-y-4 pt-6">
            <h3 className="text-lg font-bold text-white text-right">فرص الاستثمار الموصى بها (Opportunity Briefs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.id}
                  className="glass rounded-xl p-6 flex flex-col justify-between border-t border-white/5 hover:border-[#4fdbc8]/30 transition-all relative overflow-hidden"
                >
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-bold text-[#4fdbc8] bg-[#4fdbc8]/10 rounded px-2 py-0.5 uppercase mb-3">
                      فرصة عالية الطلب
                    </span>
                    <h4 className="text-lg font-extrabold text-white">{opp.title_ar}</h4>
                    <p className="text-xs text-[#c6c6cc] mt-1 font-mono uppercase">{opp.title_en}</p>
                    <p className="text-xs text-[#c6c6cc] mt-4 leading-relaxed line-clamp-3">
                      {opp.gap_analysis_ar}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-[#ffb95f] font-mono font-bold">{opp.market_size_ar}</span>
                    <Link
                      href={`/opportunity/${opp.id}`}
                      className="text-xs font-bold text-[#4fdbc8] hover:text-white flex items-center gap-1 group"
                    >
                      <span>عرض الملف الكامل</span>
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data table */}
          <div className="glass rounded-xl p-6 space-y-6 text-right">
            <div className="flex flex-col sm:flex-row-reverse justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">سجل الاحتياجات والبيانات الخام</h3>
                <p className="text-xs text-[#c6c6cc]">Verified resident submission logs for Al Qua&apos;a</p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث في الطلبات..."
                  className="w-full glass rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none focus:border-[#4fdbc8]"
                  dir="rtl"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  categoryFilter === "all" ? "bg-[#4fdbc8] text-[#051424]" : "glass hover:bg-white/5 text-[#c6c6cc]"
                }`}
              >
                الكل (All)
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategoryFilter(c.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                    categoryFilter === c.key ? "bg-[#4fdbc8] text-[#051424]" : "glass hover:bg-white/5 text-[#c6c6cc]"
                  }`}
                >
                  {c.ar}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto rounded-lg border border-white/5">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10 text-[#c6c6cc] uppercase tracking-wider font-mono">
                    <th className="p-3 text-center">المستوى</th>
                    <th className="p-3">المنطقة</th>
                    <th className="p-3">الفئة</th>
                    <th className="p-3 w-1/2">تفاصيل الاحتياج</th>
                    <th className="p-3">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      const c = CATEGORY_MAP[item.category];
                      const Icon = CATEGORY_UI[item.category].icon;
                      const freqBadge =
                        item.frequency === "daily"
                          ? "bg-red-500/10 text-red-400"
                          : item.frequency === "weekly"
                            ? "bg-amber-500/10 text-[#ffb95f]"
                            : "bg-slate-500/10 text-slate-400";
                      return (
                        <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-3 text-center">
                            <span className={`inline-block font-mono font-bold text-[10px] px-2 py-0.5 rounded ${freqBadge}`}>
                              {FREQUENCY_MAP[item.frequency].ar}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[#c6c6cc]">{item.neighborhood}</td>
                          <td className="p-3 font-bold text-[#4fdbc8]">
                            <span className="inline-flex items-center gap-1.5 flex-row-reverse">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{c.ar}</span>
                            </span>
                          </td>
                          <td className="p-3 text-white leading-relaxed font-sans">{item.description}</td>
                          <td className="p-3 font-mono text-slate-400">{item.created_at.slice(0, 10)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        لا توجد نتائج مطابقة لخيارات البحث والتصفية.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BentoCard({
  n,
  tone,
  tagEn,
  icon,
  titleAr,
  body,
}: {
  n: string;
  tone: "teal" | "gold" | "slate";
  tagEn: string;
  icon: React.ReactNode;
  titleAr: string;
  body: string;
}) {
  const border =
    tone === "teal"
      ? "border-t border-[#4fdbc8]/30 hover:border-[#4fdbc8]/50"
      : tone === "gold"
        ? "border-t border-[#ffb95f]/30 hover:border-[#ffb95f]/50"
        : "hover:border-white/10";
  const tag = tone === "teal" ? "text-[#4fdbc8]" : tone === "gold" ? "text-[#ffb95f]" : "text-slate-400";
  return (
    <div className={`glass rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] transition-all ${border}`}>
      <div className="absolute right-2 -top-4 font-mono font-extrabold text-[7rem] text-white/[0.02] select-none pointer-events-none">
        {n}
      </div>
      <div className="relative z-10 text-right">
        <div className={`flex items-center justify-end gap-1 text-xs font-bold font-mono tracking-widest uppercase mb-3 ${tag}`}>
          <span>{tagEn}</span>
          {icon}
        </div>
        <h4 className="text-base font-bold text-white">{titleAr}</h4>
        <p className="text-xs text-[#c6c6cc] mt-2 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
