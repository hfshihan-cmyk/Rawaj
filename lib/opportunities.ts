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

interface OpportunityTemplate extends Opportunity {
  /** Which category drives this opportunity's live demand numbers. */
  category: CategoryKey;
}

export const OPPORTUNITIES: OpportunityTemplate[] = [
  {
    id: "1",
    category: "camel",
    rank: 1,
    title_ar: "إنتاج ومعالجة حليب الإبل",
    title_en: "Camel Milk Production",
    demand_count: 26,
    demand_percentage: "43%",
    insight_ar:
      "حليب الإبل هو الطلب الأول في القوع لأن تربية الإبل مصدر الدخل الرئيسي، ومع ذلك لا يوجد منتج محلي يعالج ويعبّئ الحليب الطازج يومياً. مشروع معالجة صغير قرب المزارع يحوّل فائض الحليب إلى منتج جاهز للبيع في الأسواق ومحلات الألبان.",
    first_step_ar:
      "هذا الأسبوع: زُر 3 من مزارع الإبل القريبة واتفق على شراء فائض الحليب الطازج يومياً، وجهّز ثلاجة تبريد بسيطة لتخزينه.",
    first_step_en:
      "This week: visit 3 nearby camel farms, agree to buy surplus fresh milk daily, and set up a simple chiller to store it.",
    support_entity: "صندوق خليفة لتطوير المشاريع",
    feasibility: "medium",
    cost_estimate_ar: "متوسطة — من 5,000 إلى 15,000 درهم للبداية",
    sector_ar: "قطاع الزراعة والثروة الحيوانية",
    sector_en: "AGRI-SECTOR",
    demand_intensity: 92,
    gap_analysis_ar:
      "تشير البيانات إلى أن 26 من أصل 60 احتياجاً مجتمعياً مرتبطة بالإبل، ومع ذلك لا يوجد منتج محلي يعالج حليب الإبل الطازج ويعبّئه يومياً. أصحاب العزب يضطرون لبيع الحليب خاماً بأسعار منخفضة أو هدره، بينما الطلب على منتج معبّأ نظيف مرتفع في القوع والعين.",
    gap_analysis_en:
      "26 of 60 community needs are camel-related, yet no local operator processes and packages fresh camel milk daily. Farm owners sell raw milk cheaply or waste surplus, while demand for a clean, packaged product across Al Qua'a and Al Ain stays unmet.",
    market_size_ar: "AED 4.2M",
    competition_ar: "منخفضة",
  },
  {
    id: "2",
    category: "tourism",
    rank: 2,
    title_ar: "تجربة رصد النجوم في القوع",
    title_en: "Al Qua'a Stargazing Experience",
    demand_count: 9,
    demand_percentage: "15%",
    insight_ar:
      "تقع القوع على مدار السرطان بتلوث ضوئي منخفض جداً، ما يجعلها من أفضل مواقع رصد النجوم في الدولة، لكن لا يوجد حالياً أي مزوّد محلي لهذه الخدمة. جولة ليلية بتلسكوب ومرشد محلي تجذب زوار أبوظبي والعين الباحثين عن تجربة صحراوية مميزة.",
    first_step_ar:
      "هذا الأسبوع: حدّد موقعاً صحراوياً آمناً بعيداً عن الأضواء، واحجز تلسكوباً واحداً للبدء، وأنشئ صفحة بسيطة على إنستغرام لعرض التجربة.",
    first_step_en:
      "This week: scout a safe dark-sky desert spot, rent one telescope to start, and create a simple Instagram page to showcase the experience.",
    support_entity: "دائرة الثقافة والسياحة – أبوظبي",
    feasibility: "low",
    cost_estimate_ar: "منخفضة — أقل من 5,000 درهم للبداية",
    sector_ar: "قطاع السياحة والضيافة",
    sector_en: "TOURISM",
    demand_intensity: 78,
    gap_analysis_ar:
      "طلب 9 من سكان القوع خدمات رصد نجوم، بينما عدد المزودين الحاليين صفر. موقع القوع على مدار السرطان وانخفاض التلوث الضوئي يجعلانها أصلاً سياحياً غير مستغل تجارياً، رغم قرب سوق أبوظبي والعين الكبير.",
    gap_analysis_en:
      "9 Al Qua'a residents requested stargazing services while current providers number zero. Sitting on the Tropic of Cancer with very low light pollution, Al Qua'a is a commercially untapped astro-tourism asset next to the large Abu Dhabi and Al Ain markets.",
    market_size_ar: "AED 1.8M",
    competition_ar: "معدومة",
  },
  {
    id: "3",
    category: "food",
    rank: 3,
    title_ar: "تعبئة وتغليف التمور المحلية",
    title_en: "Local Dates Packaging",
    demand_count: 15,
    demand_percentage: "25%",
    insight_ar:
      "مزارع القوع تنتج تموراً عالية الجودة لكنها تُباع سائبة بأسعار منخفضة دون تغليف يرفع قيمتها. خدمة تعبئة وتغليف احترافية تحوّل تمور المزارع إلى علب هدايا وعبوات جاهزة للبيع في المتاجر والمناسبات بأرباح أعلى.",
    first_step_ar:
      "هذا الأسبوع: اتفق مع مزرعتين على توريد التمور، واطلب عيّنات من علب تغليف بتصميم بسيط يحمل اسم القوع.",
    first_step_en:
      "This week: line up two farms to supply dates, and order sample gift boxes with a simple Al Qua'a-branded design.",
    support_entity: "صندوق خليفة / الجمعية التعاونية المحلية",
    feasibility: "low",
    cost_estimate_ar: "منخفضة — أقل من 7,000 درهم للبداية",
    sector_ar: "قطاع الأغذية والمنتجات المحلية",
    sector_en: "FOOD & PRODUCTS",
    demand_intensity: 70,
    gap_analysis_ar:
      "15 من احتياجات المجتمع مرتبطة بالغذاء والمنتجات المحلية، والتمور أبرزها. المزارع تبيع التمور خاماً دون تغليف يرفع قيمتها، بينما يطلب السوق عبوات وهدايا جاهزة. خدمة تغليف بسيطة ترفع هامش الربح على نفس المنتج.",
    gap_analysis_en:
      "15 community needs relate to food and local products, with dates the standout. Farms sell dates loose with no value-adding packaging, while the market wants ready gift boxes — simple packaging lifts the margin on the same produce.",
    market_size_ar: "AED 2.4M",
    competition_ar: "منخفضة",
  },
];

/** Look up a single opportunity by id (for /opportunity/[id]). */
export function getOpportunity(id: string): Opportunity | undefined {
  return OPPORTUNITIES.find((o) => o.id === id);
}

export function getAllOpportunities(): Opportunity[] {
  return OPPORTUNITIES.map(stripCategory);
}

function stripCategory(t: OpportunityTemplate): Opportunity {
  const { category: _category, ...rest } = t;
  void _category;
  return rest;
}

/**
 * The report shown when the dashboard button is clicked. Identical content to
 * the static list, but demand_count / demand_percentage are refreshed from the
 * live payload so they always match the dashboard's current totals.
 */
export async function analyzeOpportunities(
  payload?: AnalyzePayload,
): Promise<Opportunity[]> {
  const byCategory = new Map(
    (payload?.aggregates ?? []).map((a) => [a.category, a]),
  );

  return OPPORTUNITIES.map((t, i) => {
    const agg = byCategory.get(t.category);
    const base = stripCategory(t);
    return {
      ...base,
      rank: i + 1,
      demand_count: agg?.count ?? t.demand_count,
      demand_percentage: agg ? `${agg.percentage}%` : t.demand_percentage,
    };
  });
}
