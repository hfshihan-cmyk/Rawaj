import type { AnalyzePayload, CategoryKey, Opportunity } from "./types";

/**
 * Hardcoded, Al Qua'a-specific opportunity report.
 *
 * No external API, no API key, no environment variables — the report returns
 * instantly and works fully offline / on Vercel with zero configuration.
 *
 * Demand counts and percentages are pulled from the LIVE aggregated payload
 * (seeds + localStorage) so the report always matches the dashboard numbers,
 * with sensible fallbacks if a category has no submissions yet.
 */

interface MockTemplate {
  /** Which category drives this opportunity's demand numbers. */
  category: CategoryKey;
  fallbackCount: number;
  fallbackPercentage: string;
  title_ar: string;
  title_en: string;
  insight_ar: string;
  first_step_ar: string;
  support_entity: string;
  feasibility: "low" | "medium";
  cost_estimate_ar: string;
}

const TEMPLATES: MockTemplate[] = [
  {
    category: "camel",
    fallbackCount: 26,
    fallbackPercentage: "43%",
    title_ar: "إنتاج ومعالجة حليب الإبل",
    title_en: "Camel Milk Production",
    insight_ar:
      "حليب الإبل هو الطلب الأول في القوع لأن تربية الإبل مصدر الدخل الرئيسي، ومع ذلك لا يوجد منتج محلي يعالج ويعبّئ الحليب الطازج يومياً. مشروع معالجة صغير قرب المزارع يحوّل فائض الحليب إلى منتج جاهز للبيع في الأسواق ومحلات الألبان.",
    first_step_ar:
      "هذا الأسبوع: زُر 3 من مزارع الإبل القريبة واتفق على شراء فائض الحليب الطازج يومياً، وجهّز ثلاجة تبريد بسيطة لتخزينه.",
    support_entity: "صندوق خليفة لتطوير المشاريع",
    feasibility: "medium",
    cost_estimate_ar: "متوسطة — من 5,000 إلى 15,000 درهم للبداية",
  },
  {
    category: "tourism",
    fallbackCount: 9,
    fallbackPercentage: "15%",
    title_ar: "تجربة رصد النجوم في القوع",
    title_en: "Al Qua'a Stargazing Experience",
    insight_ar:
      "تقع القوع على مدار السرطان بتلوث ضوئي منخفض جداً، ما يجعلها من أفضل مواقع رصد النجوم في الدولة، لكن لا يوجد حالياً أي مزوّد محلي لهذه الخدمة. جولة ليلية بتلسكوب ومرشد محلي تجذب زوار أبوظبي والعين الباحثين عن تجربة صحراوية مميزة.",
    first_step_ar:
      "هذا الأسبوع: حدّد موقعاً صحراوياً آمناً بعيداً عن الأضواء، واحجز تلسكوباً واحداً للبدء، وأنشئ صفحة بسيطة على إنستغرام لعرض التجربة.",
    support_entity: "دائرة الثقافة والسياحة – أبوظبي",
    feasibility: "low",
    cost_estimate_ar: "منخفضة — أقل من 5,000 درهم للبداية",
  },
  {
    category: "food",
    fallbackCount: 15,
    fallbackPercentage: "25%",
    title_ar: "تعبئة وتغليف التمور المحلية",
    title_en: "Local Dates Packaging",
    insight_ar:
      "مزارع القوع تنتج تموراً عالية الجودة لكنها تُباع سائبة بأسعار منخفضة دون تغليف يرفع قيمتها. خدمة تعبئة وتغليف احترافية تحوّل تمور المزارع إلى علب هدايا وعبوات جاهزة للبيع في المتاجر والمناسبات بأرباح أعلى.",
    first_step_ar:
      "هذا الأسبوع: اتفق مع مزرعتين على توريد التمور، واطلب عيّنات من علب تغليف بتصميم بسيط يحمل اسم القوع.",
    support_entity: "صندوق خليفة / الجمعية التعاونية المحلية",
    feasibility: "low",
    cost_estimate_ar: "منخفضة — أقل من 7,000 درهم للبداية",
  },
];

export async function analyzeOpportunities(
  payload?: AnalyzePayload,
): Promise<Opportunity[]> {
  const byCategory = new Map(
    (payload?.aggregates ?? []).map((a) => [a.category, a]),
  );

  return TEMPLATES.map((t, i) => {
    const agg = byCategory.get(t.category);
    return {
      rank: i + 1,
      title_ar: t.title_ar,
      title_en: t.title_en,
      demand_count: agg?.count ?? t.fallbackCount,
      demand_percentage: agg ? `${agg.percentage}%` : t.fallbackPercentage,
      insight_ar: t.insight_ar,
      first_step_ar: t.first_step_ar,
      support_entity: t.support_entity,
      feasibility: t.feasibility,
      cost_estimate_ar: t.cost_estimate_ar,
    };
  });
}
