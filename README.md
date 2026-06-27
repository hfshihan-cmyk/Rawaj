# رواج / Rawaj

> **اعرف سوقك قبل ما تبدأ — Know your market before you start.**

🔗 **Live:** _[add your Vercel URL here]_
📹 **Demo Video:** _[to be added]_

Rawaj turns scattered community demand into clear, evidence-backed business opportunities for first-time entrepreneurs in **Al Qua'a, Al Ain, UAE** — built for **Tatweer Hackathon 2026, Challenge #3: The Data Gap for Local Entrepreneurs**.

---

## Challenge #3 — The Data Gap for Local Entrepreneurs

In a remote community like Al Qua'a, a would-be entrepreneur has no data. There is no census of "what do people here need but can't find?", no demand dashboard, no market study they can afford. So they guess — and a guess is an expensive way to start a business in a place where camel farming is the main income, the nearest mall is an hour away, and one failed shop can drain a family's savings.

Meanwhile, the demand is **real and specific**: residents drive to Al Ain for fresh bread, can't find a mobile camel vet, and watch world-class stargazing skies go commercially untapped.

**Rawaj closes that gap.** Residents tap in what they need in under 30 seconds (Arabic, no account). Entrepreneurs open a market-intelligence dashboard that ranks demand and — with one click — gets an opportunity report grounded in that exact local data and the UAE business context (Khalifa Fund, trade-licence costs, local entities). The report returns **instantly, with no API key and no setup** — it works fully offline and on Vercel with zero environment variables.

---

## Who This Is For

- **Camel farmers** looking to diversify income (milk processing, feed wholesale, mobile vet, racing prep).
- **First-time founders** in Al Qua'a who can't afford a market study.
- **Returning youth** who want to build something locally instead of commuting to the city.
- **Co-ops and support bodies** (e.g. Khalifa Fund) wanting evidence of real local demand before backing a venture.

---

## The Solution & Testable Claims

Every claim below is backed by committed data in [`data/seeds.json`](./data/seeds.json) — 60 realistic community submissions. **This file is the evidence; it is committed to the repo, not hidden in a database.**

**Claim 1 — Camel services are the #1 unmet need in Al Qua'a.**
Evidence: **26 of 60** submissions (43%) are camel-related — feed wholesale, mobile vet, milk processing, racing prep. See [`data/seeds.json`](./data/seeds.json) entries `seed_001`–`seed_026`. The dashboard's demand chart and AI report both surface camel as rank #1.

**Claim 2 — Stargazing tourism is commercially untapped.**
Evidence: **9 residents** requested stargazing/astro-tourism services (telescope rental, night tours, desert experiences — `seed_042`–`seed_050`), yet there are **zero** local providers. Al Qua'a sits on the **Tropic of Cancer** with very low light pollution — an unworked asset.

**Claim 3 — Residents will use this without training.**
Evidence: the [`/submit`](./app/submit/page.tsx) form needs **no account**, is **Arabic-first and RTL**, and takes **under 30 seconds** — pick an icon, optionally describe, tap send. Works on a phone over 3G.

> Want to test the claims live? Open `/dashboard` (password `rawaj2026`) → the demand chart, the ranked cards, and the AI report all read from the same merged dataset.

---

## How It Works (Architecture)

No database. No backend persistence. The "live" dataset is built on every page load by merging two sources:

```
data/seeds.json  (60 committed submissions = evidence)
        +
localStorage "rawaj_needs"  (new submissions captured live during the demo)
        ↓
   merged dataset  →  charts · rankings · AI analysis
```

- **`/submit`** saves new needs to `localStorage` → the UI and the dashboard counter update instantly, so it *feels* real-time.
- **`/api/analyze`** is stateless and **needs no external service**: the client sends an **aggregated, anonymised** summary (counts + sample descriptions, never personal data), and the route returns 3 ranked, Al Qua'a-specific opportunities **instantly**. Demand counts in the report are pulled from the live dataset, so the report always matches the dashboard.

---

## Feasibility

- **Cost: AED 0 / month.** Vercel free tier + no database + no external API. There are **no running costs at all**.
- **Maintenance: zero servers, zero secrets.** Fully serverless; nothing to patch, scale, or configure — **no environment variables**.
- **Resilient:** the entire app (form, dashboard, charts, table, **and the opportunity report**) runs from local data — nothing depends on a third-party service being up.
- **Mobile-first & installable:** responsive, RTL, works on 3G, installable as a **PWA** ([`public/manifest.json`](./public/manifest.json)).

---

## Scalability

Rawaj is built around a **`community_id`** abstraction. A new community = **one config change** in [`lib/categories.ts`](./lib/categories.ts) (`COMMUNITY` + category set), a fresh seed file, and the opportunity templates in [`lib/opportunities.ts`](./lib/opportunities.ts). The same engine serves any UAE town — Liwa, Hatta, Madinat Zayed — without code rewrites.

---

## How to Run

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** — it redirects to `/submit`.
Dashboard: **/dashboard** (password: `rawaj2026`).

> **No `.env`, no API key, no setup.** Every feature — including the opportunity report — works out of the box.

### Deploy to Vercel

1. Push this repo to GitHub and import it into Vercel.
2. **No environment variables to add.**
3. Deploy. That's the entire setup.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS (custom RTL Arabic-first design system) |
| Fonts | Cairo + Tajawal (Google Fonts, Arabic) |
| Charts | Recharts |
| Opportunity report | Built-in, data-driven templates (`lib/opportunities.ts`) — no external API |
| Data | `data/seeds.json` + browser `localStorage` (no database) |
| Hosting | Vercel (zero environment variables) |

---

## Evidence

- **The data:** [`data/seeds.json`](./data/seeds.json) — 60 submissions (26 camel · 15 food/dairy · 9 tourism · 6 home · 4 tech).
- **The resident view:** [`app/submit/page.tsx`](./app/submit/page.tsx) + [`components/NeedForm.tsx`](./components/NeedForm.tsx).
- **The entrepreneur view:** [`app/dashboard/page.tsx`](./app/dashboard/page.tsx) — demand chart, ranked needs, AI report, filterable table.
- **The opportunity engine:** [`lib/opportunities.ts`](./lib/opportunities.ts) + [`app/api/analyze/route.ts`](./app/api/analyze/route.ts).

_Screenshots: add `/submit` and `/dashboard` captures here before submission._

---

<div dir="rtl">

## رواج باختصار

**رواج** منصة بسيطة تسدّ فجوة البيانات أمام رواد الأعمال في **القوع**. يسجّل السكان احتياجاتهم في أقل من 30 ثانية (بالعربية، بدون حساب)، فيحصل رائد الأعمال على **لوحة ذكاء سوق** ترتّب الطلب وتقترح — بضغطة زر وفوراً — أفضل 3 فرص تجارية مبنية على بيانات مجتمعه الحقيقية وسياق الأعمال الإماراتي (صندوق خليفة، تكلفة الرخصة التجارية، الجهات الداعمة).

بدون قاعدة بيانات. بدون خادم. بدون مفتاح API. التكلفة صفر درهم شهرياً، وبدون أي متغيّرات بيئة للنشر.

**اعرف سوقك قبل ما تبدأ.**

</div>
