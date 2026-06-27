"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  CATEGORY_MAP,
  FREQUENCIES,
  FREQUENCY_MAP,
  NEIGHBORHOODS,
} from "@/lib/categories";
import type { Need } from "@/lib/types";

const ALL = "all";

export default function NeedsTable({ needs }: { needs: Need[] }) {
  const [cat, setCat] = useState<string>(ALL);
  const [freq, setFreq] = useState<string>(ALL);
  const [hood, setHood] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      needs.filter(
        (n) =>
          (cat === ALL || n.category === cat) &&
          (freq === ALL || n.frequency === freq) &&
          (hood === ALL || n.neighborhood === hood),
      ),
    [needs, cat, freq, hood],
  );

  const selectClass =
    "ar rounded-lg border border-white/10 bg-surface-container-lowest px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none";

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          aria-label="تصفية حسب الفئة"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className={selectClass}
        >
          <option value={ALL}>كل الفئات</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.emoji} {c.ar}
            </option>
          ))}
        </select>

        <select
          aria-label="تصفية حسب التكرار"
          value={freq}
          onChange={(e) => setFreq(e.target.value)}
          className={selectClass}
        >
          <option value={ALL}>كل التكرارات</option>
          {FREQUENCIES.map((f) => (
            <option key={f.key} value={f.key}>
              {f.ar}
            </option>
          ))}
        </select>

        <select
          aria-label="تصفية حسب المنطقة"
          value={hood}
          onChange={(e) => setHood(e.target.value)}
          className={selectClass}
        >
          <option value={ALL}>كل المناطق</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <span className="ar ms-auto self-center text-sm text-muted">
          <span className="nums font-bold text-accent">{filtered.length}</span>{" "}
          نتيجة
        </span>
      </div>

      {/* Table */}
      <div className="thin-scroll max-h-[28rem] overflow-auto rounded-xl border border-white/5">
        <table className="w-full border-collapse text-right">
          <thead className="sticky top-0 bg-surface-container-lowest">
            <tr className="ar text-xs text-muted">
              <th className="px-4 py-3 font-semibold">المنطقة</th>
              <th className="px-4 py-3 font-semibold">الفئة</th>
              <th className="px-4 py-3 font-semibold">الوصف</th>
              <th className="px-4 py-3 font-semibold">التكرار</th>
              <th className="px-4 py-3 font-semibold">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => {
              const c = CATEGORY_MAP[n.category];
              return (
                <tr
                  key={n.id}
                  className="border-t border-white/5 align-top hover:bg-white/[0.02]"
                >
                  <td className="ar px-4 py-3 text-sm text-on-surface-variant">
                    {n.neighborhood}
                  </td>
                  <td className="ar px-4 py-3 text-sm">
                    <span className="whitespace-nowrap">
                      {c.emoji} {c.ar}
                    </span>
                  </td>
                  <td className="ar px-4 py-3 text-sm text-on-surface">
                    {n.description || (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="ar px-4 py-3 text-sm text-on-surface-variant">
                    {FREQUENCY_MAP[n.frequency].ar}
                  </td>
                  <td className="nums px-4 py-3 text-xs text-muted">
                    {n.created_at.slice(0, 10)}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="ar px-4 py-10 text-center text-muted"
                >
                  لا توجد نتائج مطابقة للتصفية
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
