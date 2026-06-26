export type CategoryKey =
  | "camel"
  | "food"
  | "tourism"
  | "home"
  | "tech"
  | "other";

export type Frequency = "daily" | "weekly" | "sometimes";

export interface Need {
  id: string;
  category: CategoryKey;
  category_label_ar: string;
  category_label_en: string;
  description: string;
  frequency: Frequency;
  neighborhood: string;
  created_at: string;
}

/** Shape sent to /api/analyze — aggregated, never the raw rows. */
export interface CategoryAggregate {
  category: CategoryKey;
  label_ar: string;
  label_en: string;
  count: number;
  percentage: number;
  top_frequency: Frequency;
  sample_descriptions: string[];
}

export interface AnalyzePayload {
  total: number;
  community: string;
  aggregates: CategoryAggregate[];
}

export interface Opportunity {
  rank: number;
  title_ar: string;
  title_en: string;
  demand_count: number;
  demand_percentage: string;
  insight_ar: string;
  first_step_ar: string;
  support_entity: string;
  feasibility: "low" | "medium";
  cost_estimate_ar: string;
}
