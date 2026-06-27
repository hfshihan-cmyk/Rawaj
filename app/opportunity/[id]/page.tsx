import { notFound } from "next/navigation";
import OpportunityDetail from "@/components/OpportunityDetail";
import { OPPORTUNITIES, getOpportunity } from "@/lib/opportunities";

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ id: o.id }));
}

export default function OpportunityPage({ params }: { params: { id: string } }) {
  const opp = getOpportunity(params.id);
  if (!opp) notFound();
  return <OpportunityDetail opp={opp} />;
}
