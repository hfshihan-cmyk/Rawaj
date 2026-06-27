"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Activity, AlertCircle, ArrowLeft, Layers } from "lucide-react";
import StarrySky from "@/components/StarrySky";
import { getMergedNeeds, getSeeds } from "@/lib/dataUtils";

export default function LandingPage() {
  // Initialise from static seeds (stable for SSR), then merge localStorage on mount.
  const [total, setTotal] = useState(() => getSeeds().length);
  const [camelPercent, setCamelPercent] = useState(() => {
    const s = getSeeds();
    return Math.round((s.filter((n) => n.category === "camel").length / s.length) * 100) || 0;
  });

  useEffect(() => {
    const all = getMergedNeeds();
    setTotal(all.length);
    setCamelPercent(
      Math.round((all.filter((n) => n.category === "camel").length / all.length) * 100) || 0,
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex-grow flex flex-col justify-between"
    >
      {/* Starry sky backdrop */}
      <StarrySky className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 w-full flex-grow flex flex-col items-center justify-center text-center">
        {/* Pulse badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4fdbc8]/10 border border-[#4fdbc8]/20 mb-8 animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4fdbc8]"></span>
          <span className="font-mono text-xs text-[#4fdbc8] uppercase tracking-wider">
            ● LIVE MARKET INTELLIGENCE
          </span>
        </div>

        {/* Giant Arabic headline */}
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-[#d4e4fa] leading-tight max-w-4xl tracking-tight">
          رواد الأعمال في القوع <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#4fdbc8] to-[#ffb95f]">
            يقررون في الظلام
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-[#c6c6cc] max-w-2xl leading-relaxed font-sans">
          Intelligence platform for traditional trade. Bridging the gap between rural
          entrepreneurship and high-velocity market data. Stop guessing, start scaling.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <Link
            href="/submit"
            className="flex-1 bg-[#14b8a6] text-[#051424] font-bold py-4 px-6 rounded-lg shadow-[0_4px_14px_rgba(20,184,166,0.3)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>سجّل احتياجك 🐪</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 border border-[#ffb95f] text-[#ffb95f] hover:bg-[#ffb95f]/15 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>لوحة الريادي 📊</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
          </Link>
        </div>

        {/* Bento stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-right">
          {/* Registered needs */}
          <div className="glass rounded-xl p-6 relative overflow-hidden group hover:border-[#4fdbc8]/30 transition-all duration-300 teal-glow">
            <div className="absolute right-4 top-4 bg-[#4fdbc8]/10 text-[#4fdbc8] p-3 rounded-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div className="mt-12">
              <span className="block font-mono text-4xl font-extrabold text-[#d4e4fa]">{total}</span>
              <span className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider mt-2">
                حاجة مسجّلة (Registered Needs)
              </span>
            </div>
            <div className="mt-6 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#4fdbc8] rounded-full transition-all duration-1000 w-[80%]"></div>
            </div>
          </div>

          {/* Camel demand */}
          <div className="glass rounded-xl p-6 relative overflow-hidden group hover:border-[#ffb95f]/30 transition-all duration-300">
            <div className="absolute right-4 top-4 bg-[#ffb95f]/10 text-[#ffb95f] p-3 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div className="mt-12">
              <span className="block font-mono text-4xl font-extrabold text-[#d4e4fa]">
                {camelPercent}%
              </span>
              <span className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider mt-2">
                خدمات إبل (Camel Services)
              </span>
            </div>
            <div className="mt-6 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ffb95f] rounded-full transition-all duration-1000"
                style={{ width: `${camelPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Providers gap */}
          <div className="glass rounded-xl p-6 relative overflow-hidden border border-red-500/20 group hover:border-red-500/40 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
            <div className="absolute right-4 top-4 bg-red-500/10 text-red-400 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="mt-12">
              <span className="block font-mono text-4xl font-extrabold text-red-400">0</span>
              <span className="block text-xs font-bold text-red-300/80 uppercase tracking-wider mt-2">
                مزودين حاليين (Current Providers)
              </span>
            </div>
            <div className="mt-6 text-xs text-red-400 font-bold tracking-wide uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              High Opportunity Market
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-32 w-full max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#d4e4fa]">آلية العمل (How it works)</h2>
            <p className="text-xs sm:text-sm text-[#c6c6cc] mt-2">
              Three minimal steps to market dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] border-t border-dashed border-white/10 z-0"></div>

            <Step num="١" titleAr="سجّل (Register)" desc="Input raw market demands and resource gaps securely." />
            <Step
              num="٢"
              titleAr="حلّل (Analyze)"
              desc="Our system cross-references data to reveal hidden patterns."
              highlight
            />
            <Step num="٣" titleAr="نمّو (Grow)" desc="Deploy capital efficiently into proven high-demand vectors." />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-6 glass border-t border-white/5 relative z-20 flex flex-col md:flex-row-reverse justify-between items-center gap-6 max-w-7xl mx-auto rounded-t-xl">
        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#4fdbc8] to-[#ffb95f]">
          رواج Rawaj
        </div>
        <div className="flex gap-6 text-xs text-[#c6c6cc]">
          <a href="#" className="hover:text-[#4fdbc8] transition-colors">الشروط Terms</a>
          <a href="#" className="hover:text-[#4fdbc8] transition-colors">الخصوصية Privacy</a>
          <a href="#" className="hover:text-[#4fdbc8] transition-colors">اتصل بنا Contact</a>
        </div>
        <div className="text-xs font-mono text-[#4fdbc8]">صنع في القوع • Made in Al Qua&apos;a</div>
      </footer>
    </motion.div>
  );
}

function Step({
  num,
  titleAr,
  desc,
  highlight,
}: {
  num: string;
  titleAr: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
          highlight
            ? "bg-[#0f172a] border border-[#4fdbc8] text-[#ffb95f] shadow-[0_0_20px_rgba(79,219,200,0.2)]"
            : "bg-[#051424] border border-white/10 text-[#4fdbc8] hover:border-[#4fdbc8] hover:shadow-[0_0_15px_rgba(79,219,200,0.2)]"
        }`}
      >
        {num}
      </div>
      <h3 className="text-lg font-bold text-[#d4e4fa] mt-4">{titleAr}</h3>
      <p className="text-xs text-[#c6c6cc] mt-1 max-w-xs">{desc}</p>
    </div>
  );
}
