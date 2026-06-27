"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { CATEGORY_UI } from "@/components/categoryConfig";
import {
  CATEGORIES,
  CATEGORY_MAP,
  FREQUENCIES,
  NEIGHBORHOODS,
} from "@/lib/categories";
import { saveLocalNeed } from "@/lib/dataUtils";
import { useLang } from "@/lib/LanguageContext";
import type { CategoryKey, Frequency, Need } from "@/lib/types";


export default function SubmitPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const [category, setCategory] = useState<CategoryKey>("camel");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    const def = CATEGORY_MAP[category];
    const need: Need = {
      id: `local_${Date.now()}`,
      category,
      category_label_ar: def.ar,
      category_label_en: def.en,
      description: description.trim(),
      frequency,
      neighborhood,
      created_at: new Date().toISOString(),
    };
    saveLocalNeed(need);
    setDescription("");
    setShowSuccess(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex-grow max-w-3xl mx-auto px-6 pt-12 pb-24 w-full"
    >
      {/* Back */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xs text-[#8b7355] hover:text-[#c4956a] transition-colors mb-8 uppercase font-mono"
      >
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        <span>{t("submit_back")}</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-[#1a3a4a]">
          {t("submit_title")}
        </h1>
        <p className="text-xs sm:text-sm text-[#8b7355] mt-2 max-w-md mx-auto">
          {t("submit_sub")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category cards */}
        <div>
          <label className="block text-xs font-bold text-[#8b7355] uppercase tracking-wider mb-3 font-mono">
            {t("submit_cat_label")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_UI[c.key].icon;
              const isSelected = category === c.key;
              return (
                <div
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`rounded-xl p-5 cursor-pointer text-center transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-3 border ${
                    isSelected
                      ? "border-[#c4956a] bg-[#fff8f0] shadow-[0_0_12px_rgba(196,149,106,0.2)]"
                      : "border-[#e8d5b7] bg-white hover:border-[#c4956a]/50"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${isSelected ? "text-[#c4956a]" : "text-[#8b7355]"}`}
                  />
                  <span
                    className={`text-xs font-bold ${isSelected ? "text-[#1a3a4a]" : "text-[#8b7355]"}`}
                  >
                    {lang === "ar" ? c.ar : c.en}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white border border-[#e8d5b7] rounded-xl p-6 space-y-6 shadow-[0_2px_12px_rgba(196,149,106,0.08)]">
          <div>
            <label className="block text-xs font-bold text-[#8b7355] uppercase tracking-wider mb-2">
              {t("submit_desc_label")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder={t("submit_desc_placeholder")}
              className="w-full bg-[#faf4ec] border border-[#e8d5b7] rounded-lg focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a] focus:outline-none text-sm text-[#1a3a4a] placeholder-[#8b7355]/50 p-4"
            ></textarea>
            <p className="text-[11px] text-[#8b7355]/60 mt-1 font-mono">
              {t("submit_note")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frequency */}
            <div>
              <label className="block text-xs font-bold text-[#8b7355] uppercase tracking-wider mb-2">
                {t("submit_urgency_label")}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="w-full bg-[#faf4ec] border border-[#e8d5b7] rounded-lg focus:border-[#c4956a] focus:outline-none text-sm text-[#1a3a4a] p-3"
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.key} value={f.key} className="bg-white">
                    {lang === "ar" ? f.ar : f.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="block text-xs font-bold text-[#8b7355] uppercase tracking-wider mb-2">
                {t("submit_neighborhood_label")}
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-[#faf4ec] border border-[#e8d5b7] rounded-lg focus:border-[#c4956a] focus:outline-none text-sm text-[#1a3a4a] p-3"
              >
                {NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n} className="bg-white">
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#1a3a4a] text-white font-bold px-12 py-4 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-base shadow-[0_4px_14px_rgba(26,58,74,0.25)]"
          >
            <span>{t("submit_btn")}</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Success modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1a3a4a]/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-[#e8d5b7] rounded-2xl p-8 max-w-md w-full text-center relative shadow-[0_20px_60px_rgba(26,58,74,0.2)]"
            >
              <div className="w-20 h-20 bg-[#c4956a]/10 text-[#c4956a] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#c4956a]/30">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1a3a4a]">
                {t("submit_modal_saved")}
              </h2>
              <p className="text-xs text-[#8b7355] mt-2 font-mono uppercase">
                {t("submit_modal_saved_sub")}
              </p>
              <p className="text-sm text-[#4a3728] mt-4 leading-relaxed">
                {t("submit_modal_body")}
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-[#1a3a4a] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-colors"
                >
                  {t("submit_modal_dashboard")}
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="border border-[#c4956a] text-[#c4956a] hover:bg-[#c4956a]/5 font-bold py-3 px-6 rounded-lg transition-colors text-xs"
                >
                  {t("submit_modal_another")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
