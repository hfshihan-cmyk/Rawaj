import type { CategoryKey, Frequency } from "./types";

export interface CategoryDef {
  key: CategoryKey;
  ar: string;
  en: string;
  emoji: string;
  /** Hex used for chart bars + accents per category. */
  color: string;
}

/** Single source of truth for the 6 categories — used by form, chart, cards, table. */
export const CATEGORIES: CategoryDef[] = [
  { key: "camel", ar: "خدمات الإبل", en: "Camel Services", emoji: "🐪", color: "#14b8a6" },
  { key: "food", ar: "غذاء ومنتجات", en: "Food & Products", emoji: "🥛", color: "#f59e0b" },
  { key: "tourism", ar: "سياحة ونجوم", en: "Tourism & Stars", emoji: "⭐", color: "#8b5cf6" },
  { key: "home", ar: "صيانة وبناء", en: "Home & Construction", emoji: "🏠", color: "#3b82f6" },
  { key: "tech", ar: "خدمات تقنية", en: "Tech Services", emoji: "🔧", color: "#ec4899" },
  { key: "other", ar: "أخرى", en: "Other", emoji: "📦", color: "#6b7280" },
];

export const CATEGORY_MAP: Record<CategoryKey, CategoryDef> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.key] = c;
    return acc;
  },
  {} as Record<CategoryKey, CategoryDef>,
);

export const FREQUENCIES: { key: Frequency; ar: string; en: string }[] = [
  { key: "daily", ar: "يومياً", en: "Daily" },
  { key: "weekly", ar: "أسبوعياً", en: "Weekly" },
  { key: "sometimes", ar: "أحياناً", en: "Sometimes" },
];

export const FREQUENCY_MAP: Record<Frequency, { ar: string; en: string }> =
  FREQUENCIES.reduce(
    (acc, f) => {
      acc[f.key] = { ar: f.ar, en: f.en };
      return acc;
    },
    {} as Record<Frequency, { ar: string; en: string }>,
  );

export const NEIGHBORHOODS = [
  "القوع المركز",
  "الجاهلي",
  "منطقة المزارع",
  "أخرى",
];

/** One config change scales Rawaj to a new community (see README → Scalability). */
export const COMMUNITY = {
  id: "al-quaa",
  name_ar: "القوع",
  name_en: "Al Qua'a",
};
