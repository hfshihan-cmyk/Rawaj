"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Activity, AlertCircle, ArrowRight, Layers } from "lucide-react";
import { getMergedNeeds, getSeeds } from "@/lib/dataUtils";
import { useLang } from "@/lib/LanguageContext";

export default function LandingPage() {
  const { t } = useLang();

  const [total, setTotal] = useState(() => getSeeds().length);
  const [camelPercent, setCamelPercent] = useState(() => {
    const s = getSeeds();
    return (
      Math.round(
        (s.filter((n) => n.category === "camel").length / s.length) * 100,
      ) || 0
    );
  });

  useEffect(() => {
    const all = getMergedNeeds();
    setTotal(all.length);
    setCamelPercent(
      Math.round(
        (all.filter((n) => n.category === "camel").length / all.length) * 100,
      ) || 0,
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex-grow flex flex-col"
      style={{ background: "#0a141e" }}
    >
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          backgroundImage: "url('/landing-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,20,36,0.5) 0%, rgba(5,20,36,0.3) 40%, rgba(5,20,36,0.8) 100%)",
            filter: "brightness(1.1) contrast(0.95)",
          }}
        />

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
          {/* Pulse badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 animate-pulse backdrop-blur-sm"
            style={{
              background: "rgba(240,192,112,0.08)",
              border: "1px solid rgba(240,192,112,0.4)",
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#f0c070" }}
            ></span>
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "#f0c070" }}
            >
              ● {t("badge")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold leading-tight max-w-4xl tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <span className="block text-white">{t("hero_line1")}</span>
            <span className="block mt-1" style={{ color: "#f0c070" }}>
              {t("hero_line2")}
            </span>
          </h1>

          <p
            className="mt-6 text-sm sm:text-base max-w-2xl leading-relaxed font-sans drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
            style={{ color: "#e8ddd0" }}
          >
            {t("hero_sub")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <Link
              href="/submit"
              className="flex-1 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: "#c4956a",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(196,149,106,0.4)",
              }}
            >
              {t("cta_submit")}
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm hover:opacity-90"
              style={{ border: "1px solid #f0c070", color: "#f0c070" }}
            >
              {t("cta_dashboard")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Below-the-fold */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 w-full flex flex-col items-center text-center">
        {/* Stats bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Registered needs */}
          <div className="stat-card rounded-xl p-6 relative overflow-hidden group transition-all duration-300">
            <div
              className="absolute end-4 top-4 p-3 rounded-lg"
              style={{ background: "rgba(196,149,106,0.15)", color: "#c4956a" }}
            >
              <Layers className="w-6 h-6" />
            </div>
            <div className="mt-12">
              <span
                className="block font-mono text-4xl font-extrabold"
                style={{ color: "#ffffff" }}
              >
                {total}
              </span>
              <span
                className="block text-xs font-bold uppercase tracking-wider mt-2"
                style={{ color: "#e8ddd0" }}
              >
                {t("stat1_label")}
              </span>
            </div>
            <div
              className="mt-6 w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: "80%", background: "#c4956a" }}
              ></div>
            </div>
          </div>

          {/* Camel demand */}
          <div className="stat-card rounded-xl p-6 relative overflow-hidden group transition-all duration-300">
            <div
              className="absolute end-4 top-4 p-3 rounded-lg"
              style={{ background: "rgba(240,192,112,0.15)", color: "#f0c070" }}
            >
              <Activity className="w-6 h-6" />
            </div>
            <div className="mt-12">
              <span
                className="block font-mono text-4xl font-extrabold"
                style={{ color: "#ffffff" }}
              >
                {camelPercent}%
              </span>
              <span
                className="block text-xs font-bold uppercase tracking-wider mt-2"
                style={{ color: "#e8ddd0" }}
              >
                {t("stat2_label")}
              </span>
            </div>
            <div
              className="mt-6 w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${camelPercent}%`, background: "#f0c070" }}
              ></div>
            </div>
          </div>

          {/* Providers gap */}
          <div
            className="stat-card rounded-xl p-6 relative overflow-hidden group transition-all duration-300"
            style={{ border: "1px solid rgba(232,168,124,0.3)" }}
          >
            <div
              className="absolute end-4 top-4 p-3 rounded-lg"
              style={{ background: "rgba(232,168,124,0.15)", color: "#e8a87c" }}
            >
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="mt-12">
              <span
                className="block font-mono text-4xl font-extrabold"
                style={{ color: "#e8a87c" }}
              >
                0
              </span>
              <span
                className="block text-xs font-bold uppercase tracking-wider mt-2"
                style={{ color: "#e8ddd0", opacity: 0.8 }}
              >
                {t("stat3_label")}
              </span>
            </div>
            <div
              className="mt-6 text-xs font-bold tracking-wide uppercase flex items-center gap-1"
              style={{ color: "#e8a87c" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ background: "#e8a87c" }}
              ></span>
              {t("stat3_sub")}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div
          className="mt-32 w-full max-w-5xl rounded-2xl px-8 py-16"
          style={{ background: "rgba(10,20,30,0.7)" }}
        >
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "#e8ddd0" }}
            >
              {t("how_title")}
            </h2>
            <p
              className="text-xs sm:text-sm mt-2"
              style={{ color: "#e8ddd0", opacity: 0.7 }}
            >
              {t("how_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div
              className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] border-t border-dashed z-0"
              style={{ borderColor: "rgba(196,149,106,0.3)" }}
            ></div>
            <Step
              num={t("step1_num")}
              title={t("step1_title")}
              desc={t("step1_desc")}
            />
            <Step
              num={t("step2_num")}
              title={t("step2_title")}
              desc={t("step2_desc")}
              highlight
            />
            <Step
              num={t("step3_num")}
              title={t("step3_title")}
              desc={t("step3_desc")}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full py-12 px-6 relative z-20 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto rounded-t-xl"
        style={{
          background: "rgba(10,20,30,0.85)",
          borderTop: "1px solid rgba(196,149,106,0.2)",
        }}
      >
        <div className="text-lg font-bold" style={{ color: "#c4956a" }}>
          رواج Rawaj
        </div>
        <div className="flex gap-6 text-xs">
          <a
            href="#"
            className="transition-colors hover:opacity-80"
            style={{ color: "#e8ddd0" }}
          >
            {t("footer_terms")}
          </a>
          <a
            href="#"
            className="transition-colors hover:opacity-80"
            style={{ color: "#e8ddd0" }}
          >
            {t("footer_privacy")}
          </a>
          <a
            href="#"
            className="transition-colors hover:opacity-80"
            style={{ color: "#e8ddd0" }}
          >
            {t("footer_contact")}
          </a>
        </div>
        <div className="text-xs font-mono" style={{ color: "#c4956a" }}>
          {t("footer_made")}
        </div>
      </footer>
    </motion.div>
  );
}

function Step({
  num,
  title,
  desc,
  highlight,
}: {
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all"
        style={
          highlight
            ? {
                background: "#c4956a",
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(196,149,106,0.35)",
              }
            : {
                background: "rgba(10,20,30,0.8)",
                border: "2px solid #c4956a",
                color: "#f0c070",
              }
        }
      >
        {num}
      </div>
      <h3 className="text-lg font-bold mt-4" style={{ color: "#e8ddd0" }}>
        {title}
      </h3>
      <p
        className="text-xs mt-1 max-w-xs"
        style={{ color: "#e8ddd0", opacity: 0.7 }}
      >
        {desc}
      </p>
    </div>
  );
}
