"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Building, Sparkles, TrendingUp } from "lucide-react";
import type { Opportunity } from "@/lib/types";

export default function OpportunityDetail({ opp }: { opp: Opportunity }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid-bg relative flex-grow max-w-5xl mx-auto px-6 pt-6 pb-24 w-full text-right"
    >
      {/* Back */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-xs text-[#c6c6cc] hover:text-[#4fdbc8] transition-colors mb-8 uppercase font-mono"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للوحة الاستكشاف • Back to Dashboard</span>
      </Link>

      <div className="glass rounded-2xl overflow-hidden relative border-t border-[#4fdbc8]/30 shadow-[0_0_50px_rgba(79,219,200,0.1)]">
        {/* Watermark */}
        <div className="absolute right-6 -top-12 font-mono font-extrabold text-[15rem] text-white/[0.01] select-none pointer-events-none">
          0{opp.id}
        </div>

        <div className="p-8 sm:p-12 relative z-10 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div>
              <div className="flex flex-wrap gap-2 justify-end mb-3">
                <span className="bg-[#4fdbc8]/10 text-[#4fdbc8] font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-[#4fdbc8]/20">
                  فرصة عالية الطلب · HIGH DEMAND
                </span>
                <span className="bg-[#ffb95f]/10 text-[#ffb95f] font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-[#ffb95f]/20">
                  {opp.sector_ar} · {opp.sector_en}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{opp.title_ar}</h1>
              <p className="text-sm font-mono text-slate-400 mt-1 uppercase">{opp.title_en}</p>
            </div>

            {/* Support entity */}
            <div className="flex flex-row-reverse items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <Building className="w-8 h-8 text-[#4fdbc8] shrink-0" />
              <div>
                <span className="block text-[10px] font-mono text-[#c6c6cc] uppercase">
                  جهة الدعم المقترحة / Support Entity
                </span>
                <span className="block text-xs font-bold text-white">{opp.support_entity}</span>
              </div>
            </div>
          </div>

          {/* Analysis grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center justify-end gap-2 border-b border-white/5 pb-2">
                <span>تحليل الفجوة والفرصة • Gap Analysis</span>
                <TrendingUp className="w-5 h-5 text-[#4fdbc8]" />
              </h3>
              <p className="text-sm text-white leading-relaxed font-sans font-medium">{opp.gap_analysis_ar}</p>
              <p className="text-xs text-[#c6c6cc] leading-relaxed font-sans">{opp.gap_analysis_en}</p>
            </div>

            {/* Metrics */}
            <div className="glass bg-white/[0.01] p-5 rounded-xl space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 text-xs font-mono">
                  <span className="text-[#4fdbc8] font-bold">{opp.demand_intensity}%</span>
                  <span className="text-slate-400">كثافة الطلب • Demand Intensity</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#14b8a6] to-[#4fdbc8] rounded-full shadow-[0_0_15px_#4fdbc8]"
                    style={{ width: `${opp.demand_intensity}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">حجم السوق</span>
                  <span className="block text-sm font-bold text-white font-mono">{opp.market_size_ar}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">المنافسة</span>
                  <span className="block text-sm font-bold text-[#ffb95f]">{opp.competition_ar}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">الطلب المجتمعي</span>
                  <span className="block text-sm font-bold text-white font-mono">{opp.demand_count}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">التكلفة</span>
                  <span className="block text-xs font-bold text-white">{opp.cost_estimate_ar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* First step */}
          <div className="bg-[#ffb95f]/5 border border-[#ffb95f]/20 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row-reverse items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#ffb95f]/15 blur-2xl rounded-full"></div>
            <div className="flex flex-row-reverse items-start gap-4 z-10 text-right">
              <div className="p-3 bg-[#ffb95f]/10 text-[#ffb95f] rounded-xl shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#ffb95f] mb-1">الخطوة الاستراتيجية الأولى (Next Action)</h4>
                <p className="text-xs text-[#c6c6cc] font-sans leading-relaxed">{opp.first_step_ar}</p>
                <p className="text-[11px] text-slate-400 font-sans mt-1">{opp.first_step_en}</p>
              </div>
            </div>
            <Link
              href="/submit"
              className="bg-[#ffb95f] text-[#051424] font-bold text-xs px-6 py-3.5 rounded-lg hover:bg-yellow-400 transition-all shadow-lg hover:shadow-[#ffb95f]/20 w-full md:w-auto shrink-0 z-10 text-center"
            >
              بدء الإجراءات • Start Process
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
