import seeds from "@/data/seeds.json";
import { CATEGORIES, CATEGORY_MAP, COMMUNITY } from "./categories";
import type {
  AnalyzePayload,
  CategoryAggregate,
  CategoryKey,
  Frequency,
  Need,
} from "./types";

const LS_KEY = "rawaj_needs";

/** The 60 committed community submissions — always present (this is the evidence). */
export function getSeeds(): Need[] {
  return seeds as Need[];
}

/** Submissions captured live during the demo, persisted in the browser only. */
export function getLocalNeeds(): Need[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Need[]) : [];
  } catch {
    return [];
  }
}

/** Append a new submission to localStorage and return the full local list. */
export function saveLocalNeed(need: Need): Need[] {
  const current = getLocalNeeds();
  const next = [need, ...current];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  }
  return next;
}

/** Seeds + localStorage merged → the "live" dataset every view reads from. */
export function getMergedNeeds(): Need[] {
  return [...getLocalNeeds(), ...getSeeds()];
}

export function countByCategory(needs: Need[]): Record<CategoryKey, number> {
  const counts = {} as Record<CategoryKey, number>;
  for (const c of CATEGORIES) counts[c.key] = 0;
  for (const n of needs) counts[n.category] = (counts[n.category] ?? 0) + 1;
  return counts;
}

/** Most common frequency within a subset of needs. */
function topFrequency(needs: Need[]): Frequency {
  const tally: Record<string, number> = {};
  for (const n of needs) tally[n.frequency] = (tally[n.frequency] ?? 0) + 1;
  let best: Frequency = "daily";
  let bestN = -1;
  for (const [freq, n] of Object.entries(tally)) {
    if (n > bestN) {
      best = freq as Frequency;
      bestN = n;
    }
  }
  return best;
}

/** Up to `limit` non-empty sample descriptions for a category. */
export function samplesFor(needs: Need[], category: CategoryKey, limit = 2): string[] {
  return needs
    .filter((n) => n.category === category && n.description.trim().length > 0)
    .slice(0, limit)
    .map((n) => n.description.trim());
}

export interface RankedNeed {
  category: CategoryKey;
  count: number;
  percentage: number;
  top_frequency: Frequency;
  samples: string[];
}

/** Categories ranked by submission count (desc), for the dashboard cards. */
export function topNeeds(needs: Need[], limit = 5): RankedNeed[] {
  const total = needs.length || 1;
  const counts = countByCategory(needs);
  return CATEGORIES.map((c) => {
    const inCat = needs.filter((n) => n.category === c.key);
    return {
      category: c.key,
      count: counts[c.key],
      percentage: Math.round((counts[c.key] / total) * 100),
      top_frequency: topFrequency(inCat),
      samples: samplesFor(needs, c.key, 2),
    };
  })
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** Data points for the demand bar chart. */
export function chartData(needs: Need[]) {
  const counts = countByCategory(needs);
  return CATEGORIES.map((c) => ({
    key: c.key,
    label: c.ar,
    emoji: c.emoji,
    count: counts[c.key],
    color: c.color,
  })).sort((a, b) => b.count - a.count);
}

/** Aggregated, anonymised payload sent to the AI route — no raw rows leave the client. */
export function buildAnalyzePayload(needs: Need[]): AnalyzePayload {
  const total = needs.length;
  const counts = countByCategory(needs);
  const aggregates: CategoryAggregate[] = CATEGORIES.map((c) => {
    const inCat = needs.filter((n) => n.category === c.key);
    return {
      category: c.key,
      label_ar: c.ar,
      label_en: c.en,
      count: counts[c.key],
      percentage: total ? Math.round((counts[c.key] / total) * 100) : 0,
      top_frequency: topFrequency(inCat),
      sample_descriptions: samplesFor(needs, c.key, 4),
    };
  })
    .filter((a) => a.count > 0)
    .sort((a, b) => b.count - a.count);

  return {
    total,
    community: `${COMMUNITY.name_en} (${COMMUNITY.name_ar})`,
    aggregates,
  };
}

export { CATEGORY_MAP };
