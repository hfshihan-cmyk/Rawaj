"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Building,
  CheckCircle2,
  FileSpreadsheet,
  Info,
  MessageCircle,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { CATEGORY_UI } from "@/components/categoryConfig";
import { CATEGORIES, CATEGORY_MAP, FREQUENCY_MAP } from "@/lib/categories";
import { getMergedNeeds, topNeeds } from "@/lib/dataUtils";
import { getAllOpportunities } from "@/lib/opportunities";
import { useLang } from "@/lib/LanguageContext";
import type { Need } from "@/lib/types";

const OPPORTUNITIES = getAllOpportunities();

const CARD = "bg-white border border-[#e8d5b7] rounded-xl shadow-[0_2px_12px_rgba(196,149,106,0.08)]";

export default function DashboardPage() {
  const { lang, t } = useLang();
  const [needs, setNeeds] = useState<Need[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [contactNeed, setContactNeed] = useState<Need | null>(null);

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
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className={`${CARD} p-5 space-y-4`}>
            <span className="block text-xs font-mono font-bold text-[#8b7355] uppercase tracking-wider border-b border-[#e8d5b7] pb-2">
              {t("sidebar_overview")}
            </span>
            <button
              onClick={() => setCategoryFilter("all")}
              className={`w-full flex items-center justify-between p-2.5 rounded text-xs font-bold transition-colors ${
                categoryFilter === "all"
                  ? "bg-[#c4956a]/10 text-[#c4956a] border border-[#c4956a]/25"
                  : "text-[#8b7355] hover:bg-[#faf4ec]"
              }`}
            >
              <span className="font-mono text-[10px] bg-[#faf4ec] text-[#1a3a4a] rounded-full px-2 py-0.5 border border-[#e8d5b7]">
                {stats.total}
              </span>
              <span>{t("sidebar_demand")}</span>
            </button>
            <button
              onClick={() => setCategoryFilter("camel")}
              className={`w-full flex items-center justify-between p-2.5 rounded text-xs font-bold transition-colors ${
                categoryFilter === "camel"
                  ? "bg-[#c4956a]/10 text-[#c4956a] border border-[#c4956a]/25"
                  : "text-[#8b7355] hover:bg-[#faf4ec]"
              }`}
            >
              <span className="font-mono text-[10px] bg-[#faf4ec] text-[#1a3a4a] rounded-full px-2 py-0.5 border border-[#e8d5b7]">
                {stats.camelCount}
              </span>
              <span>{t("sidebar_trends")}</span>
            </button>
          </div>

          <div className={`${CARD} p-5 space-y-4`}>
            <span className="text-xs font-mono font-bold text-[#d4a017] uppercase tracking-wider border-b border-[#e8d5b7] pb-2 flex items-center gap-1 justify-end">
              <span>{t("sidebar_premium")}</span>
              <Award className="w-4 h-4 text-[#d4a017]" />
            </span>
            <a
              href="#ai-insights"
              className="w-full flex items-center justify-end gap-2 p-2.5 rounded text-xs font-bold bg-[#d4a017]/8 text-[#d4a017] border border-[#d4a017]/20 hover:bg-[#d4a017]/15 transition-all"
            >
              <span>{t("sidebar_ai")}</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Evidence banner */}
          <div
            className={`${CARD} p-6 border-s-4 border-[#c4956a] flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#c4956a]/5 to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-4 z-10">
              <div className="p-3 bg-[#c4956a]/10 text-[#c4956a] rounded-xl shrink-0">
                <Info className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1a3a4a] leading-tight">
                  {stats.total} {t("dash_banner_post")}
                </h2>
                <p className="text-xs text-[#8b7355] mt-1 font-sans">
                  {stats.total} {t("dash_banner_detail")}
                </p>
              </div>
            </div>
            <button
              onClick={exportCsv}
              className="bg-[#1a3a4a] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:opacity-90 transition-colors shadow-sm flex items-center gap-1.5 z-10 shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t("dash_export")}</span>
            </button>
          </div>

          {/* Chart + leaderboard */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Bar chart */}
            <div className={`${CARD} xl:col-span-3 p-6 flex flex-col h-[380px]`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-[#c4956a]">
                    <span className="w-2.5 h-2.5 bg-[#c4956a] rounded-sm"></span>
                    {t("dash_chart_primary")}
                  </span>
                  <span className="flex items-center gap-1 text-[#d4a017]">
                    <span className="w-2.5 h-2.5 bg-[#d4a017] rounded-sm"></span>
                    {t("dash_chart_secondary")}
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold text-[#8b7355] uppercase tracking-wider">
                  {t("dash_chart_title")}
                </h3>
              </div>
              <div className="flex-1 relative border-b border-s border-[#e8d5b7] flex items-end justify-around pb-4 pt-10 px-4 group">
                {CATEGORIES.map((c) => {
                  const count = stats.counts[c.key] || 0;
                  const heightPercent = Math.max((count / maxCount) * 80, 5);
                  const isSpecial = c.key === "camel" || c.key === "tourism" || c.key === "food";
                  return (
                    <div
                      key={c.key}
                      className="flex flex-col items-center gap-2 group/bar relative w-8 sm:w-12"
                    >
                      <div
                        className={`w-full rounded-t-sm transition-all duration-1000 ${
                          isSpecial
                            ? "bg-[#c4956a] hover:bg-[#b07d4a]"
                            : "bg-[#e8d5b7] group-hover/bar:bg-[#c4956a]/50"
                        }`}
                        style={{ height: needs.length ? `${heightPercent}%` : "0%" }}
                      ></div>
                      <span className="text-[10px] sm:text-xs text-[#8b7355] truncate max-w-full font-mono font-bold">
                        {(lang === "ar" ? c.ar : c.en).slice(0, 6)}
                      </span>
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover/bar:opacity-100 scale-90 group-hover/bar:scale-100 transition-all duration-200 pointer-events-none bg-[#1a3a4a] border border-[#e8d5b7]/20 rounded px-2.5 py-1.5 text-[11px] font-mono whitespace-nowrap z-40 shadow-xl">
                        <span className="block text-[#c4956a] font-bold">
                          {lang === "ar" ? c.ar : c.en}
                        </span>
                        <span className="block text-white font-extrabold">
                          {count} {t("dash_chart_requests")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            <div className={`${CARD} xl:col-span-2 p-6 flex flex-col h-[380px]`}>
              <h3 className="text-sm font-mono font-bold text-[#8b7355] uppercase tracking-wider mb-4 border-b border-[#e8d5b7] pb-2 text-end">
                {t("dash_needs_title")}
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin">
                {leaders.map((r, i) => {
                  const c = CATEGORY_MAP[r.category];
                  const tier =
                    i === 0
                      ? {
                          box: "bg-[#d4a017]/8 border-[#d4a017]/25",
                          num: "bg-[#d4a017]/15 text-[#d4a017]",
                          sub: "text-[#d4a017]",
                          badge: "bg-red-500/10 text-red-500",
                          badgeText: t("dash_high"),
                        }
                      : i === 1
                        ? {
                            box: "bg-[#8b8b8b]/8 border-[#8b8b8b]/20",
                            num: "bg-[#8b8b8b]/15 text-[#8b8b8b]",
                            sub: "text-[#8b8b8b]",
                            badge: "bg-[#c4956a]/10 text-[#c4956a]",
                            badgeText: t("dash_med"),
                          }
                        : {
                            box: "bg-[#8b5e3c]/8 border-[#8b5e3c]/20",
                            num: "bg-[#8b5e3c]/15 text-[#8b5e3c]",
                            sub: "text-[#8b5e3c]",
                            badge: "bg-[#c4956a]/8 text-[#c4956a]",
                            badgeText: t("dash_new_ocean"),
                          };
                  return (
                    <div
                      key={r.category}
                      className={`flex items-center justify-between p-3 rounded-lg border ${tier.box}`}
                    >
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${tier.badge}`}
                      >
                        {tier.badgeText}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="text-end">
                          <span className="block text-xs font-bold text-[#1a3a4a]">
                            {lang === "ar" ? c.ar : c.en}
                          </span>
                          <span className={`block text-[10px] font-mono mt-0.5 ${tier.sub}`}>
                            {r.count} {t("dash_registered_req")}
                          </span>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${tier.num}`}
                        >
                          {["١", "٢", "٣"][i]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Insights bento */}
          <div id="ai-insights" className="space-y-4 scroll-mt-28">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1a3a4a]">
                  {t("dash_ai_insights_title")}
                </h3>
                <p className="text-xs text-[#8b7355]">{t("dash_ai_insights_sub")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BentoCard
                n="01"
                tone="sand"
                tag={t("bento1_tag")}
                icon={<TrendingUp className="w-4 h-4" />}
                title={t("bento1_title")}
                body={t("bento1_body")}
              />
              <BentoCard
                n="02"
                tone="gold"
                tag={t("bento2_tag")}
                icon={<AlertTriangle className="w-4 h-4" />}
                title={t("bento2_title")}
                body={t("bento2_body")}
              />
              <BentoCard
                n="03"
                tone="slate"
                tag={t("bento3_tag")}
                icon={<Info className="w-4 h-4" />}
                title={t("bento3_title")}
                body={t("bento3_body")}
              />
            </div>
          </div>

          {/* Opportunity briefs */}
          <div className="space-y-4 pt-6">
            <h3 className="text-lg font-bold text-[#1a3a4a]">
              {t("dash_opp_title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.id}
                  className={`${CARD} p-6 flex flex-col justify-between border-l-[3px] border-[#c4956a] hover:shadow-[0_4px_20px_rgba(196,149,106,0.15)] transition-all relative overflow-hidden`}
                >
                  <div
                    className="absolute end-2 -top-4 font-mono font-extrabold text-[7rem] select-none pointer-events-none"
                    style={{ color: "rgba(196,149,106,0.08)" }}
                  >
                    0{opp.id}
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block text-[10px] font-bold text-[#c4956a] bg-[#c4956a]/10 rounded px-2 py-0.5 uppercase mb-3">
                      {t("dash_high_demand")}
                    </span>
                    <h4 className="text-lg font-extrabold text-[#1a3a4a]">
                      {lang === "ar" ? opp.title_ar : opp.title_en}
                    </h4>
                    <p className="text-xs text-[#8b7355] mt-4 leading-relaxed line-clamp-3">
                      {lang === "ar" ? opp.gap_analysis_ar : opp.gap_analysis_en}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#e8d5b7] flex items-center justify-between relative z-10">
                    <span className="text-xs text-[#d4a017] font-mono font-bold">
                      {opp.market_size_ar}
                    </span>
                    <Link
                      href={`/opportunity/${opp.id}`}
                      className="text-xs font-bold text-[#c4956a] hover:text-[#1a3a4a] flex items-center gap-1 group transition-colors"
                    >
                      <span>{t("dash_view_full")}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data table */}
          <div className={`${CARD} p-6 space-y-6`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1a3a4a]">{t("dash_raw_title")}</h3>
                <p className="text-xs text-[#8b7355]">{t("dash_raw_sub")}</p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("dash_search_placeholder")}
                  className="w-full bg-[#faf4ec] border border-[#e8d5b7] rounded-lg ps-3 pe-10 py-2 text-xs text-[#1a3a4a] focus:outline-none focus:border-[#c4956a] placeholder-[#8b7355]/50"
                />
                <Search className="absolute end-3 top-2.5 w-4 h-4 text-[#8b7355]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  categoryFilter === "all"
                    ? "bg-[#c4956a] text-white"
                    : "bg-[#faf4ec] border border-[#e8d5b7] hover:border-[#c4956a] text-[#8b7355]"
                }`}
              >
                {t("dash_all_cats")}
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategoryFilter(c.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                    categoryFilter === c.key
                      ? "bg-[#c4956a] text-white"
                      : "bg-[#faf4ec] border border-[#e8d5b7] hover:border-[#c4956a] text-[#8b7355]"
                  }`}
                >
                  {lang === "ar" ? c.ar : c.en}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#e8d5b7]">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1a3a4a] text-white uppercase tracking-wider font-mono">
                    <th className="p-3 text-center">{t("dash_col_level")}</th>
                    <th className="p-3 text-start">{t("dash_col_area")}</th>
                    <th className="p-3 text-start">{t("dash_col_cat")}</th>
                    <th className="p-3 text-start w-1/2">{t("dash_col_desc")}</th>
                    <th className="p-3 text-start">{t("dash_col_date")}</th>
                    <th className="p-3 text-center">{t("contact_col")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8d5b7]">
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      const c = CATEGORY_MAP[item.category];
                      const Icon = CATEGORY_UI[item.category].icon;
                      const freqKey =
                        item.frequency === "daily"
                          ? "freq_daily"
                          : item.frequency === "weekly"
                            ? "freq_weekly"
                            : "freq_sometimes";
                      const freqBadge =
                        item.frequency === "daily"
                          ? "bg-red-500/10 text-red-600"
                          : item.frequency === "weekly"
                            ? "bg-amber-500/10 text-[#d4a017]"
                            : "bg-[#e8d5b7]/60 text-[#8b7355]";
                      return (
                        <tr key={item.id} className="hover:bg-[#fdf0e0] transition-colors">
                          <td className="p-3 text-center">
                            <span
                              className={`inline-block font-mono font-bold text-[10px] px-2 py-0.5 rounded ${freqBadge}`}
                            >
                              {t(freqKey)}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[#8b7355]">
                            {item.neighborhood}
                          </td>
                          <td className="p-3 font-bold text-[#c4956a]">
                            <span className="inline-flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{lang === "ar" ? c.ar : c.en}</span>
                            </span>
                          </td>
                          <td className="p-3 text-[#4a3728] leading-relaxed font-sans">
                            {item.description}
                          </td>
                          <td className="p-3 font-mono text-[#8b7355]">
                            {item.created_at.slice(0, 10)}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setContactNeed(item)}
                              className="inline-flex items-center gap-1.5 bg-[#c4956a] text-white font-bold text-[10px] px-3 py-1.5 rounded-lg hover:bg-[#b07d4a] transition-all shadow-sm hover:shadow-md"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>{t("contact_btn")}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#8b7355]">
                        {t("dash_no_results")}
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
  tag,
  icon,
  title,
  body,
}: {
  n: string;
  tone: "sand" | "gold" | "slate";
  tag: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  const border =
    tone === "sand"
      ? "border-t-2 border-[#c4956a]"
      : tone === "gold"
        ? "border-t-2 border-[#d4a017]"
        : "border-t border-[#e8d5b7]";
  const tagCls =
    tone === "sand"
      ? "text-[#c4956a]"
      : tone === "gold"
        ? "text-[#d4a017]"
        : "text-[#8b7355]";
  return (
    <div
      className={`bg-white border border-[#e8d5b7] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] transition-all hover:shadow-[0_4px_16px_rgba(196,149,106,0.12)] ${border}`}
    >
      <div
        className="absolute end-2 -top-4 font-mono font-extrabold text-[7rem] select-none pointer-events-none"
        style={{ color: "rgba(196,149,106,0.08)" }}
      >
        {n}
      </div>
      <div className="relative z-10">
        <div
          className={`flex items-center gap-1 text-xs font-bold font-mono tracking-widest uppercase mb-3 ${tagCls}`}
        >
          {icon}
          <span>{tag}</span>
        </div>
        <h4 className="text-base font-bold text-[#1a3a4a]">{title}</h4>
        <p className="text-xs text-[#8b7355] mt-2 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// suppress unused import lint
void Building;
void FREQUENCY_MAP;
