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
import type { CategoryKey, Frequency, Need } from "@/lib/types";

const MASCOT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDMjtC39EYbsHKpeHvhpza7z2b0OIMmUKGatJcupmamNFQ4PWNNGyWsJEM0IFi7a3UwdKEuGQobdA65dgOX2i5ZtS6YTmaQRbVh7DlcA8JM1Ifm7nOr9HrniMwf75W7I2cKot5zM7xjjNel9jFElTc7lkp9-y-stMMpVKNGCE-np04LXKELCWWnYFDM1zMkWxv55TXK7sjckCITO44w7Q132oF8-nTeDNhHUeCgMzfeOlIaYbZT8440xyBc84s34y1UMSV-0OzN9i4";

export default function SubmitPage() {
  const router = useRouter();
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
      className="grid-bg relative flex-grow max-w-3xl mx-auto px-6 pt-12 pb-24 w-full"
    >
      {/* Back */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xs text-[#c6c6cc] hover:text-[#4fdbc8] transition-colors mb-8 uppercase font-mono"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للرئيسية • Cancel</span>
      </Link>

      {/* Mascot */}
      <div className="text-center mb-10">
        <div className="w-40 h-40 mx-auto relative mb-6">
          <div className="absolute inset-0 bg-[#4fdbc8]/10 rounded-full blur-2xl"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MASCOT}
            alt="Rawaj Camel Mascot"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-[#d4e4fa]">ما الذي تحتاجه اليوم؟</h1>
        <p className="text-xs sm:text-sm text-[#c6c6cc] mt-2 max-w-md mx-auto">
          حدد فئة احتياجك واشرح التفاصيل. سنقوم بتوصيلك بأفضل الموردين في المنطقة.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category cards */}
        <div>
          <label className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider mb-3 text-right font-mono">
            اختر الفئة / Category <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_UI[c.key].icon;
              const isSelected = category === c.key;
              return (
                <div
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`glass rounded-xl p-5 cursor-pointer text-center transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-3 border ${
                    isSelected
                      ? "border-[#4fdbc8] bg-[#4fdbc8]/10 shadow-[0_0_15px_rgba(79,219,200,0.15)]"
                      : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isSelected ? "text-[#4fdbc8]" : "text-[#c6c6cc]"}`} />
                  <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-[#c6c6cc]"}`}>
                    {c.ar}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="glass rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider mb-2 text-right">
              وصف الطلب التفصيلي / Request Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="يرجى كتابة ما تحتاجه بدقة، مثال: نحتاج لأعلاف رودس بكميات تجارية لعزبة الهجن غرب القوع..."
              className="w-full glass rounded-lg border-white/5 focus:border-[#4fdbc8] focus:ring-1 focus:ring-[#4fdbc8] text-sm text-white placeholder-white/20 p-4 text-right"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frequency */}
            <div>
              <label className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider mb-2 text-right">
                مدى الحاجة / Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="w-full glass rounded-lg border-white/5 focus:border-[#4fdbc8] text-sm text-[#d4e4fa] p-3 text-right"
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.key} value={f.key} className="bg-[#051424]">
                    {f.ar} / {f.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="block text-xs font-bold text-[#c6c6cc] uppercase tracking-wider mb-2 text-right">
                المنطقة / Neighborhood
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full glass rounded-lg border-white/5 focus:border-[#4fdbc8] text-sm text-[#d4e4fa] p-3 text-right"
              >
                {NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n} className="bg-[#051424]">
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
            className="w-full md:w-auto bg-[#14b8a6] text-[#051424] font-bold px-12 py-4 rounded-xl shadow-[0_4px_14px_rgba(20,184,166,0.3)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-base"
          >
            <span>إرسال الطلب / Send Request</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass rounded-2xl p-8 max-w-md w-full text-center relative border border-[#4fdbc8]/30 shadow-[0_0_50px_rgba(79,219,200,0.2)]"
            >
              <div className="w-20 h-20 bg-[#4fdbc8]/15 text-[#4fdbc8] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#4fdbc8]/30">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">تم استلام طلبك بنجاح!</h2>
              <p className="text-xs text-[#c6c6cc] mt-2 font-mono uppercase">Request Saved Successfully</p>
              <p className="text-sm text-[#c6c6cc] mt-4 leading-relaxed">
                تم حفظ طلبك محلياً بنجاح ودمجه فوراً في لوحة الاستكشاف والبيانات المجتمعية
                لمساعدتك ومساعدة رواد الأعمال في القوع.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-[#14b8a6] text-[#051424] font-bold py-3 px-6 rounded-lg hover:bg-[#4fdbc8] transition-colors"
                >
                  تصفح لوحة التحكم
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="border border-white/10 text-white hover:bg-white/5 font-bold py-3 px-6 rounded-lg transition-colors text-xs"
                >
                  تقديم طلب آخر
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
