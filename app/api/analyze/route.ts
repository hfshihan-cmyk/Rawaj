import { NextResponse } from "next/server";
import { analyzeOpportunities } from "@/lib/claude";
import type { AnalyzePayload } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "مفتاح ANTHROPIC_API_KEY غير مضبوط على الخادم." },
      { status: 500 },
    );
  }

  let payload: AnalyzePayload;
  try {
    payload = (await req.json()) as AnalyzePayload;
  } catch {
    return NextResponse.json(
      { error: "صيغة الطلب غير صحيحة." },
      { status: 400 },
    );
  }

  if (!payload?.aggregates?.length) {
    return NextResponse.json(
      { error: "لا توجد بيانات كافية للتحليل." },
      { status: 400 },
    );
  }

  try {
    const opportunities = await analyzeOpportunities(payload);
    return NextResponse.json({ opportunities });
  } catch (err) {
    console.error("[/api/analyze] failed:", err);
    return NextResponse.json(
      { error: "تعذّر إنشاء تقرير الفرص. حاول مرة أخرى." },
      { status: 502 },
    );
  }
}
