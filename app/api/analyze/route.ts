import { NextResponse } from "next/server";
import { analyzeOpportunities } from "@/lib/opportunities";
import type { AnalyzePayload } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// No API key, no external service — returns an instant, Al Qua'a-specific
// opportunity report derived from the live demand data sent by the client.
export async function POST(req: Request) {
  let payload: AnalyzePayload | undefined;
  try {
    payload = (await req.json()) as AnalyzePayload;
  } catch {
    payload = undefined;
  }

  const opportunities = await analyzeOpportunities(payload);
  return NextResponse.json({ opportunities });
}
