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
            <div className={`${CARD} xl:col-span-3 p-6 flex flex-col`} style={{ height: "380px" }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1" style={{ color: "#c4956a" }}>
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#c4956a" }}></span>
                    {t("dash_chart_primary")}
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold text-[#8b7355] uppercase tracking-wider">
                  {t("dash_chart_title")}
                </h3>
              </div>

              {/* Bars — pixel heights so percentage-resolution issues can't occur */}
              <div className="flex-1 flex flex-col min-h-0">
                <div
                  className="flex-1 flex items-end justify-around gap-1 px-2"
                  style={{ borderBottom: "1px solid #e8d5b7", borderLeft: "1px solid #e8d5b7" }}
                >
                  {CATEGORIES.map((c) => {
                    const count = stats.counts[c.key] || 0;
                    const BAR_MAX_PX = 170;
                    const barH = maxCount > 0 && count > 0
                      ? Math.max(Math.round((count / maxCount) * BAR_MAX_PX), 4)
                      : 0;
                    return (
                      <div
                        key={c.key}
                        className="flex flex-col items-center flex-1 min-w-0 group/bar cursor-default"
                        title={`${lang === "ar" ? c.ar : c.en}: ${count} ${t("dash_chart_requests")}`}
                      >
                        {/* Count label above bar */}
                        <span
                          className="text-[11px] font-bold font-mono mb-1 transition-opacity duration-500"
                          style={{ color: "#1a3a4a", opacity: count > 0 ? 1 : 0 }}
                        >
                          {count > 0 ? count : "·"}
                        </span>
                        {/* Bar */}
                        <div
                          className="w-full rounded-t-sm transition-all duration-700 ease-out"
                          style={{
                            height: `${barH}px`,
                            backgroundColor: barH > 0 ? "#c4956a" : "#e8d5b7",
                            maxWidth: "40px",
                            opacity: barH > 0 ? 1 : 0.4,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Category labels row */}
                <div className="flex justify-around px-2 pt-2">
                  {CATEGORIES.map((c) => (
                    <div key={c.key} className="flex-1 flex justify-center min-w-0">
                      <span className="text-[9px] sm:text-[10px] text-[#8b7355] font-mono font-bold text-center leading-tight">
                        {(lang === "ar" ? c.ar : c.en).slice(0, 6)}
                      </span>
                    </div>
                  ))}
                </div>
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

      {/* Contact / Request Service Modal */}
      <AnimatePresence>
        {contactNeed && (
          <ContactModal
            need={contactNeed}
            onClose={() => setContactNeed(null)}
            lang={lang}
            t={t}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactModal({
  need,
  onClose,
  lang,
  t,
}: {
  need: Need;
  onClose: () => void;
  lang: string;
  t: (key: string) => string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem("rawaj_service_requests") || "[]");
      existing.push({
        id: `sr_${Date.now()}`,
        need_id: need.id,
        need_description: need.description,
        need_category: need.category,
        name: name.trim(),
        phone: phone.trim(),
        message: message.trim(),
        created_at: new Date().toISOString(),
      });
      localStorage.setItem("rawaj_service_requests", JSON.stringify(existing));
    } catch {}
    setSubmitted(true);
  }

  const catDef = CATEGORY_MAP[need.category];
  const catLabel = lang === "ar" ? catDef.ar : catDef.en;
  const Icon = CATEGORY_UI[need.category].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        className="bg-[#faf4ec] rounded-2xl shadow-2xl w-full max-w-md relative border border-[#e8d5b7] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#1a3a4a] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#14b8a6]" />
            <span className="font-bold text-sm">{t("contact_modal_title")}</span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 bg-[#14b8a6]/15 text-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#14b8a6]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1a3a4a] mb-2">
                {t("contact_success_title")}
              </h3>
              <p className="text-xs text-[#8b7355] leading-relaxed max-w-xs mx-auto">
                {t("contact_success_body")}
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#14b8a6] text-white font-bold px-8 py-2.5 rounded-lg hover:bg-[#0f9f8e] transition-colors text-sm"
              >
                {t("contact_success_close")}
              </button>
            </motion.div>
          ) : (
            <>
              {/* Listing snippet */}
              <div className="mb-5 p-3 bg-[#f0e6d3] rounded-xl border border-[#e8d5b7] flex gap-3 items-start">
                <div className="p-2 bg-[#c4956a]/15 rounded-lg shrink-0">
                  <Icon className="w-4 h-4 text-[#c4956a]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#c4956a] uppercase tracking-wider">
                    {catLabel}
                  </span>
                  <p className="text-xs text-[#4a3728] mt-0.5 line-clamp-2 leading-relaxed">
                    {need.description}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#8b7355] mb-5">{t("contact_modal_sub")}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4a3728] mb-1">
                    {t("contact_name_label")} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={t("contact_name_placeholder")}
                    className="w-full border border-[#e8d5b7] bg-white rounded-lg px-3 py-2 text-sm text-[#1a3a4a] focus:outline-none focus:border-[#14b8a6] placeholder-[#c6b89a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4a3728] mb-1">
                    {t("contact_phone_label")} *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder={t("contact_phone_placeholder")}
                    className="w-full border border-[#e8d5b7] bg-white rounded-lg px-3 py-2 text-sm text-[#1a3a4a] focus:outline-none focus:border-[#14b8a6] placeholder-[#c6b89a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4a3728] mb-1">
                    {t("contact_msg_label")}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder={t("contact_msg_placeholder")}
                    className="w-full border border-[#e8d5b7] bg-white rounded-lg px-3 py-2 text-sm text-[#1a3a4a] focus:outline-none focus:border-[#14b8a6] placeholder-[#c6b89a] resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-[#e8d5b7] text-[#8b7355] font-bold py-2.5 rounded-lg hover:bg-[#f0e6d3] transition-colors text-sm"
                  >
                    {t("contact_cancel")}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#14b8a6] text-white font-bold py-2.5 rounded-lg hover:bg-[#0f9f8e] transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("contact_submit")}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
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
