import Link from "next/link";
import StarrySky from "@/components/StarrySky";
import { ACTIVE_COMMUNITY } from "@/lib/communities";
import { countByCategory, getSeeds } from "@/lib/dataUtils";

export default function LandingPage() {
  const seeds = getSeeds();
  const total = seeds.length;
  const counts = countByCategory(seeds);
  const camelPct = Math.round((counts.camel / total) * 100);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-on-surface">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-container-max flex-row-reverse items-center justify-between px-lg py-md">
          <Link href="/" className="font-geist text-2xl font-bold tracking-tighter">
            رواج <span className="text-secondary">Rawaj</span>
          </Link>
          <div className="hidden flex-row-reverse items-center gap-lg md:flex">
            <Link href="/dashboard" className="font-geist text-body-md text-on-surface-variant transition-colors hover:text-secondary">
              الأسواق Markets
            </Link>
            <Link href="/dashboard" className="font-geist text-body-md text-on-surface-variant transition-colors hover:text-secondary">
              التقارير Reports
            </Link>
            <Link href="/dashboard" className="font-geist text-body-md text-on-surface-variant transition-colors hover:text-secondary">
              الرؤى Insights
            </Link>
          </div>
          <div className="flex flex-row-reverse items-center gap-md">
            <Link
              href="/dashboard"
              className="rounded-lg bg-secondary px-lg py-sm font-geist text-body-md text-on-secondary shadow-[0_4px_14px_0_rgba(79,219,200,0.39)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              لوحة التحكم
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative flex-grow pt-[100px]">
        {/* Animated star background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen">
            <StarrySky className="h-full w-full" />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        {/* Hero */}
        <div className="relative z-20 mx-auto flex min-h-[78vh] max-w-container-max flex-col items-center justify-center px-lg pb-[100px] pt-xl text-center">
          <div className="mb-lg inline-flex items-center gap-xs rounded-full border border-secondary/20 bg-secondary/10 px-sm py-xs backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
            <span className="font-mono text-label-sm uppercase text-secondary">
              Live Market Intelligence
            </span>
          </div>

          <h1 className="ar mb-md max-w-4xl text-display-lg-mobile leading-tight md:text-display-lg">
            رواد الأعمال في القوع
            <br className="hidden md:block" />
            <span className="bg-gradient-to-l from-secondary to-tertiary bg-clip-text text-transparent">
              يقررون في الظلام
            </span>
          </h1>

          <p className="en mb-xl max-w-2xl !text-base text-on-surface-variant">
            Intelligence platform for traditional trade. Bridging the gap between
            rural entrepreneurship and high-velocity market data. Stop guessing,
            start scaling.
          </p>

          <div className="mb-[64px] flex flex-col gap-md sm:flex-row">
            <Link
              href="/submit"
              className="ar flex items-center justify-center gap-sm rounded-lg bg-secondary px-xl py-md text-body-md text-on-secondary shadow-[0_4px_14px_0_rgba(79,219,200,0.39)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              سجّل احتياجك 🐪
            </Link>
            <Link
              href="/dashboard"
              className="ar group flex items-center justify-center gap-sm rounded-lg border border-tertiary bg-transparent px-xl py-md text-body-md text-tertiary transition-all duration-300 hover:bg-tertiary/10"
            >
              لوحة الريادي 📊
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
            </Link>
          </div>

          {/* Bento stats */}
          <div className="grid w-full max-w-5xl grid-cols-1 gap-lg md:grid-cols-3">
            <StatCard
              icon="app_registration"
              tone="teal"
              value={String(total)}
              labelAr="حاجة مسجّلة"
              labelEn="Registered Needs"
              barPct={80}
            />
            <StatCard
              icon="pets"
              tone="gold"
              value={`${camelPct}%`}
              labelAr="خدمات إبل"
              labelEn="Camel Services"
              barPct={camelPct}
            />
            <StatCard
              icon="warning"
              tone="error"
              value="0"
              labelAr="مزودين"
              labelEn="Providers"
              note="High Opportunity Market"
            />
          </div>
        </div>

        {/* How it works */}
        <section className="relative z-20 border-y border-white/5 bg-surface-container-lowest py-xl">
          <div className="mx-auto max-w-container-max px-lg">
            <div className="mb-xl text-center">
              <h2 className="ar text-headline-md">آلية العمل (How it works)</h2>
              <p className="en mt-sm">Three minimal steps to market dominance.</p>
            </div>
            <div className="relative grid grid-cols-1 gap-xl md:grid-cols-3">
              <div className="absolute right-[15%] left-[15%] top-[40px] z-0 hidden h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent md:block" />
              <Step icon="add_circle" tone="teal" numAr="١. سجّل" en="Register" desc="Input raw market demands and resource gaps securely." />
              <Step icon="monitoring" tone="gold" highlight numAr="٢. حلّل" en="Analyze" desc="Our system cross-references data to reveal hidden patterns." />
              <Step icon="rocket_launch" tone="teal" numAr="٣. نمّو" en="Grow" desc="Deploy capital efficiently into proven high-demand vectors." />
            </div>
          </div>
        </section>
      </main>

      <Footer community={`${ACTIVE_COMMUNITY.name_en}`} />
    </div>
  );
}

function StatCard({
  icon,
  tone,
  value,
  labelAr,
  labelEn,
  barPct,
  note,
}: {
  icon: string;
  tone: "teal" | "gold" | "error";
  value: string;
  labelAr: string;
  labelEn: string;
  barPct?: number;
  note?: string;
}) {
  const toneClasses = {
    teal: "bg-secondary/10 text-secondary",
    gold: "bg-tertiary/10 text-tertiary",
    error: "bg-error/10 text-error",
  }[tone];
  const valueColor = tone === "error" ? "text-error" : "text-on-surface";
  const barColor = tone === "gold" ? "bg-tertiary" : "bg-secondary";

  return (
    <div
      className={`glass-panel card-top-light relative flex flex-col items-start overflow-hidden rounded-xl p-lg text-right transition-transform duration-300 hover:-translate-y-1 ${
        tone !== "error" ? "teal-glow" : "border-t border-error/40"
      }`}
    >
      {tone === "error" && (
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-error/10 blur-2xl" />
      )}
      <div className={`relative z-10 mb-md rounded-lg p-sm ${toneClasses}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className={`nums relative z-10 mb-xs text-display-lg-mobile ${valueColor}`}>
        {value}
      </div>
      <div className="relative z-10 font-mono text-label-sm uppercase text-on-surface-variant">
        <span className="ar">{labelAr}</span> ({labelEn})
      </div>
      {typeof barPct === "number" && (
        <div className="mt-md h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${barPct}%` }} />
        </div>
      )}
      {note && (
        <div className="relative z-10 mt-md font-mono text-label-sm text-on-surface-variant">
          {note}
        </div>
      )}
    </div>
  );
}

function Step({
  icon,
  tone,
  numAr,
  en,
  desc,
  highlight,
}: {
  icon: string;
  tone: "teal" | "gold";
  numAr: string;
  en: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div
        className={`mb-md flex h-[80px] w-[80px] items-center justify-center rounded-full bg-surface shadow-lg ${
          highlight ? "teal-glow border border-secondary/30" : "border border-white/10 shadow-black/50"
        }`}
      >
        <span className={`material-symbols-outlined text-[32px] ${tone === "gold" ? "text-tertiary" : "text-secondary"}`}>
          {icon}
        </span>
      </div>
      <h3 className="ar text-body-lg">
        {numAr} <span className="en align-middle">({en})</span>
      </h3>
      <p className="en mt-xs max-w-[220px]">{desc}</p>
    </div>
  );
}

function Footer({ community }: { community: string }) {
  return (
    <footer className="relative z-20 flex w-full flex-col items-center justify-between gap-md border-t border-white/5 bg-surface-container-lowest px-lg py-xl md:flex-row-reverse">
      <div className="font-geist text-headline-md font-bold tracking-tight">
        رواج <span className="text-secondary">Rawaj</span>
      </div>
      <div className="flex gap-md font-mono text-label-sm">
        <span className="text-outline">Tatweer 2026</span>
        <span className="text-outline">Challenge #3</span>
        <span className="text-outline">Reef Dev Team</span>
      </div>
      <div className="font-mono text-label-sm text-secondary">
        صنع في القوع • Made in {community}
      </div>
    </footer>
  );
}
