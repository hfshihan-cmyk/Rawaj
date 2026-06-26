"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  CATEGORY_MAP,
  FREQUENCIES,
  NEIGHBORHOODS,
} from "@/lib/categories";
import { saveLocalNeed } from "@/lib/dataUtils";
import type { CategoryKey, Frequency, Need } from "@/lib/types";

export default function NeedForm() {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category) {
      setError("اختر فئة أولاً 👆");
      return;
    }
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
      <div className="animate-pop-in rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-teal-100">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-4xl">
          ✅
        </div>
        <h2 className="ar text-2xl font-extrabold text-gray-900">
          شكراً! رأيك يساعد رياديي القوع
        </h2>
        <p className="en mt-1">Thank you — your input helps Al Qua'a founders</p>
        <p className="ar mt-4 leading-relaxed text-gray-600">
          تمت إضافة احتياجك إلى بيانات المجتمع. كل رأي يقرّب رواد الأعمال من فهم
          ما تحتاجه القوع فعلاً.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-teal-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-teal-700 active:scale-[0.98]"
          >
            عرض لوحة الطلب ←
          </Link>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setCategory(null);
              setDescription("");
              setFrequency("weekly");
              setNeighborhood(NEIGHBORHOODS[0]);
              setError("");
            }}
            className="ar text-base font-semibold text-teal-700 hover:underline"
          >
            + أضف احتياجاً آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 sm:p-8"
    >
      {/* Category picker — 2×3 grid of large icon buttons */}
      <fieldset>
        <legend className="ar mb-3 text-lg font-bold text-gray-900">
          ١. شو الفئة؟
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-3 py-4 transition active:scale-[0.97] ${
                  active
                    ? "border-teal-500 bg-teal-50 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:border-teal-200"
                }`}
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="ar text-sm font-bold text-gray-800">
                  {c.ar}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Description (optional) */}
      <div className="mt-6">
        <label htmlFor="desc" className="ar mb-2 block text-lg font-bold text-gray-900">
          ٢. وصف الاحتياج{" "}
          <span className="text-sm font-normal text-gray-400">(اختياري)</span>
        </label>
        <textarea
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="مثال: محل يبيع علف الإبل بالجملة بأسعار معقولة قريب من المركز"
          className="ar w-full resize-none rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 text-gray-800 placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:outline-none"
        />
      </div>

      {/* Frequency pills */}
      <div className="mt-6">
        <span className="ar mb-2 block text-lg font-bold text-gray-900">
          ٣. كم مرة تحتاجه؟
        </span>
        <div className="flex gap-2">
          {FREQUENCIES.map((f) => {
            const active = frequency === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFrequency(f.key)}
                aria-pressed={active}
                className={`ar flex-1 rounded-full border-2 px-4 py-3 text-base font-bold transition active:scale-[0.97] ${
                  active
                    ? "border-teal-500 bg-teal-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-teal-200"
                }`}
              >
                {f.ar}
              </button>
            );
          })}
        </div>
      </div>

      {/* Area dropdown */}
      <div className="mt-6">
        <label htmlFor="area" className="ar mb-2 block text-lg font-bold text-gray-900">
          ٤. المنطقة
        </label>
        <select
          id="area"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="ar w-full appearance-none rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 text-gray-800 focus:border-teal-400 focus:bg-white focus:outline-none"
        >
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="ar mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="ar mt-7 w-full rounded-2xl bg-teal-600 px-6 py-5 text-xl font-extrabold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-700 active:scale-[0.98]"
      >
        أرسل احتياجك 📨
      </button>
      <p className="en mt-3 text-center">
        No account needed · works in Arabic · under 30 seconds
      </p>
    </form>
  );
}
