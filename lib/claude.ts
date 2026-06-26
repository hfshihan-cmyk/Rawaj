import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { AnalyzePayload, Opportunity } from "./types";

const MODEL = "claude-sonnet-4-6";

const SYSTEM_PROMPT = `You are a market intelligence analyst for Al Qua'a, a rural UAE community in the Al Ain region, known for camel farming (the main source of income), world-class stargazing (it sits on the Tropic of Cancer with very low light pollution), and local date farms and handmade products.

You understand the UAE small-business context:
- Khalifa Fund for Enterprise Development (صندوق خليفة) supports Emirati SMEs with funding and training.
- Other relevant bodies: Abu Dhabi SME Hub, Ministry of Economy, Tadweer, local cooperatives.
- A trade licence in Abu Dhabi typically costs AED 600–2,000 per year.
- Camel milk, camel feed, and camel-care services are large recurring needs locally.
- Stargazing / astro-tourism near Al Qua'a is commercially untapped.

Rules:
- Be specific to Al Qua'a and its economy. Never give generic advice that could apply to any town.
- Every recommendation must tie back to the demand data you are given.
- Costs and entities must be realistic for the rural UAE context.
- Write all Arabic fields in clear, Gulf-friendly Modern Standard Arabic.
- Output JSON only. No markdown, no commentary, no code fences.`;

function buildUserPrompt(payload: AnalyzePayload): string {
  return `Community demand data collected from ${payload.community} residents.
Total submissions: ${payload.total}.

Aggregated demand by category (ranked by count):
${JSON.stringify(payload.aggregates, null, 2)}

Identify the TOP 3 business opportunities for a local entrepreneur, ranked 1–3 by a blend of demand size and feasibility.

Return a JSON object with this exact shape:
{
  "opportunities": [
    {
      "rank": number (1, 2, or 3),
      "title_ar": string,
      "title_en": string,
      "demand_count": number (community submissions backing it — use the data),
      "demand_percentage": string (e.g. "43%"),
      "insight_ar": string (EXACTLY 2 sentences, specific to Al Qua'a),
      "first_step_ar": string (one concrete action the entrepreneur can take THIS WEEK),
      "support_entity": string (a real UAE entity, e.g. "صندوق خليفة"),
      "feasibility": "low" | "medium",
      "cost_estimate_ar": string (realistic AED startup cost, e.g. "منخفضة — أقل من 5000 درهم للبداية")
    }
  ]
}

Return exactly 3 opportunities. Return JSON only.`;
}

/** Pull the first balanced JSON object out of the model's text, tolerating fences/preamble. */
function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1] : text;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON object found in model response");
  }
  return body.slice(start, end + 1);
}

export async function analyzeOpportunities(
  payload: AnalyzePayload,
): Promise<Opportunity[]> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(payload) }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  const parsed = JSON.parse(extractJson(text)) as {
    opportunities: Opportunity[];
  };

  return (parsed.opportunities ?? [])
    .slice(0, 3)
    .map((o, i) => ({ ...o, rank: i + 1 }));
}
