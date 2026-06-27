"use client";

import { useState } from "react";
import Link from "next/link";
import Confetti from "@/components/Confetti";
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

export default function NeedForm() {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category) return setError("اختر فئة أولاً 👆");
    if (!frequency) return setError("اختر مدى الحاجة 👆");

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
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Confetti />
        <div className="glass-panel teal-glow animate-pop-in rounded-xl p-xl text-center">
          <div className="mx-auto mb-md flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-4xl">
            ✅
          </div>
          <h2 className="ar text-headline-md text-on-surface">
            شكراً! رأيك يساعد رياديي القوع
          </h2>
          <p className="en mt-1">Thank you — your input helps Al Qua&apos;a founders</p>
          <p className="ar mt-md leading-relaxed text-on-surface-variant">
            تمت إضافة احتياجك إلى بيانات المجتمع. كل رأي يقرّب رواد الأعمال من
            فهم ما تحتاجه القوع فعلاً.
          </p>
          <div className="mt-xl flex flex-col gap-md">
            <Link
              href="/dashboard"
              className="ar rounded-lg bg-secondary px-lg py-md text-body-md font-bold text-on-secondary shadow-[0_4px_14px_0_rgba(79,219,200,0.39)] transition hover:scale-[1.02] active:scale-[0.98]"
            >
              عرض لوحة الطلب ←
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCategory(null);
                setDescription("");
                setFrequency(null);
                setNeighborhood(NEIGHBORHOODS[0]);
                setError("");
              }}
              className="ar text-body-md font-semibold text-secondary hover:underline"
            >
              + أضف احتياجاً آخر
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up">
      {/* Mascot + title */}
      <div className="mb-xl flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MASCOT}
          alt="Rawaj camel mascot"
          width={140}
          height={140}
          className="mb-md h-[140px] w-[140px] rounded-xl object-cover shadow-[0_0_40px_rgba(79,219,200,0.25)]"
        />
        <h1 className="ar text-headline-md text-on-surface">ما الذي تحتاجه اليوم؟</h1>
        <p className="ar mt-1 max-w-md text-on-surface-variant">
          حدّد فئة احتياجك واشرح التفاصيل. سنقوم بتوصيلك بأفضل الموردين في المنطقة.
        </p>
      </div>

      {/* Category grid */}
      <div className="mb-lg flex items-center justify-between">
        <span className="ar text-body-md font-semibold text-on-surface">١. الفئة</span>
        <span className="font-mono text-label-sm text-error">مطلوب *</span>
      </div>
      <div className="grid grid-cols-2 gap-md sm:grid-cols-3">
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setCategory(c.key);
                setError("");
              }}
              aria-pressed={active}
              className={`glass-panel flex flex-col items-center gap-sm rounded-xl px-md py-lg transition-all duration-300 active:scale-[0.97] ${
                active
                  ? "teal-glow !border-secondary !bg-secondary/10"
                  : "hover:!border-secondary/40 hover:-translate-y-0.5"
              }`}
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="ar text-sm font-bold text-on-surface">{c.ar}</span>
            </button>
          );
        })}
      </div>

      {/* Details glass card */}
      <div className="glass-panel mt-lg space-y-lg rounded-xl p-lg">
        <div>
          <label htmlFor="desc" className="ar mb-sm block text-body-md font-semibold text-on-surface">
            وصف الطلب <span className="text-label-sm font-normal text-outline">(اختياري)</span>
          </label>
          <textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="يرجى وصف ما تحتاجه بالتفصيل…"
            className="ar w-full resize-none rounded-lg border border-white/10 bg-surface-container-lowest p-md text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/40"
          />
        </div>

        <div className="grid gap-lg sm:grid-cols-2">
          <div>
            <span className="ar mb-sm block text-body-md font-semibold text-on-surface">
              ٢. مدى الحاجة <span className="font-mono text-label-sm text-error">*</span>
            </span>
            <div className="flex gap-sm">
              {FREQUENCIES.map((f) => {
                const active = frequency === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setFrequency(f.key);
                      setError("");
                    }}
                    aria-pressed={active}
                    className={`ar flex-1 rounded-lg border px-sm py-sm text-sm font-bold transition active:scale-[0.97] ${
                      active
                        ? "border-secondary bg-secondary text-on-secondary"
                        : "border-white/10 bg-surface-container-lowest text-on-surface-variant hover:border-secondary/40"
                    }`}
                  >
                    {f.ar}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="area" className="ar mb-sm block text-body-md font-semibold text-on-surface">
              المنطقة
            </label>
            <select
              id="area"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="ar w-full appearance-none rounded-lg border border-white/10 bg-surface-container-lowest p-md text-on-surface focus:border-secondary focus:outline-none"
            >
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n} className="bg-surface-container">
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <p className="ar mt-md rounded-lg bg-error/10 px-md py-sm text-center text-sm font-bold text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="ar mt-xl flex w-full items-center justify-center gap-sm rounded-lg bg-secondary px-lg py-md text-body-lg font-extrabold text-on-secondary shadow-[0_4px_20px_0_rgba(79,219,200,0.4)] transition hover:scale-[1.01] active:scale-[0.98]"
      >
        إرسال الطلب
        <span className="material-symbols-outlined text-[20px]">send</span>
      </button>
      <p className="en mt-md text-center">
        No account · Arabic-first · 2 taps · under 30 seconds
      </p>
    </form>
  );
}
