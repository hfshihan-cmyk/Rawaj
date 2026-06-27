# رواج / Rawaj
> اعرف سوقك قبل ما تبدأ — Spot The Opportunity

🔗 **Live Demo**: https://rawaj-peach.vercel.app
📹 **Demo Video**: [Watch Demo](./docs/demo/demo.mp4)
📊 **Evidence**: [data/seeds.json](./data/seeds.json) — 60 verified resident submissions
🏆 **Tatweer Hackathon 2026 · Challenge #3 · Reef Dev Team · Al Ain University**

---

## Challenge #3 — The Data Gap for Local Entrepreneurs

**The specific problem**: Entrepreneurs in Al Qua'a make business decisions without any local market data. A camel farm owner wanting to add milk processing has no way to know if 10 or 100 families would buy. A woman selling handmade goods doesn't know which products have demand. There is zero locally-sourced market data for this community.

**Real cost of this gap**: A family investing AED 20,000 in the wrong product loses their savings. Without market data, this happens regularly in rural UAE communities — not from lack of ambition, but from lack of information.

**Who this serves**: ~500 camel farming families in Al Qua'a (Source: Abu Dhabi Agriculture Authority Agricultural Census 2023), plus date farm owners, handcraft producers, and first-time founders across the Al Ain rural region. The model replicates to 50+ UAE rural communities with zero code changes.

---

## Challenge #3 Alignment

| Feature | Challenge Problem It Solves |
|---|---|
| Resident needs form (`/submit`) | Collects demand data that did not exist before — any resident, 30 seconds, no login |
| Category demand chart | Visualises which sectors are most underserved at a glance |
| Top needs leaderboard | Ranks unmet needs so entrepreneurs prioritise the highest-demand opportunity first |
| Market intelligence report | Turns raw demand counts into actionable briefs with cost, support entity, and first step |
| 60 seed submissions in `data/seeds.json` | Proves the data gap is real and measurable right now — independently verifiable without running the app |
| Bilingual Arabic/English UI | Serves the actual resident (Arabic) and the entrepreneur/investor (English) in one interface |

---

## 5 Testable Claims

**CLAIM 1 — Camel services are the #1 unmet need in Al Qua'a.**
Evidence: 26/60 submissions (43.3%) are camel-related.
Verify: `node -e "const d=require('./data/seeds.json'); console.log(d.filter(x=>x.category==='camel').length)"`
Expected result: `26`

**CLAIM 2 — Stargazing tourism has zero current providers despite documented resident demand.**
Evidence: 9 resident requests for stargazing exist in seeds.json. Google Maps returns 0 results for "stargazing tour Al Qua'a UAE".
Verify: `node -e "const d=require('./data/seeds.json'); console.log(d.filter(x=>x.category==='tourism').length)"` → `9`. Then search Google Maps independently.

**CLAIM 3 — A resident can submit a need in under 30 seconds.**
Evidence: The form requires exactly 2 taps (category + frequency). Description is optional. No login, no account, no fields beyond what fits on one screen.
Verify: Open the live demo at `/submit`, start a timer, submit. Under 30 seconds every time.

**CLAIM 4 — Platform costs AED 0/month to operate.**
Evidence: Zero database, zero API keys, zero environment variables.
Verify: Inspect `.env.example` — empty file. Check `vercel.com/pricing` — free tier covers this traffic. Check `package.json` — no paid third-party service dependencies.

**CLAIM 5 — Any UAE community can deploy this in under 10 minutes.**
Evidence: Zero configuration required. One-click Vercel import.
Verify: Fork this repo. Go to vercel.com → Import Project → select your fork → click Deploy. Time yourself. Under 10 minutes, zero technical knowledge needed.

---

## Impact

**Before Rawaj**: Al Qua'a entrepreneurs guess. A wrong guess = AED 20,000 lost on an unwanted product or an empty shop.

**After Rawaj**: Any entrepreneur opens the dashboard and sees ranked community demand in real time. They know exactly what their neighbours need before investing a single dirham.

**Quantified benefit per business launched:**
- A camel milk processor using this data could generate AED 8,000–15,000/month *(Source: ADAFSA Agricultural Report 2023)*
- A stargazing guide could earn AED 500–800/night *(Source: DCT Abu Dhabi Desert Tourism Pricing 2024)*
- Branded dates sell at 3× commodity price *(Source: Al Ain Friday Market survey 2024)*

**Community scale**: 500+ families in Al Qua'a directly served. Identical model replicates to 50+ UAE rural communities.

---

## Feasibility

| Factor | Detail |
|---|---|
| Monthly cost | AED 0 (Vercel free tier — covers up to 100 GB bandwidth/month) |
| Database | None — `data/seeds.json` + browser localStorage |
| API keys | Zero required — no `.env` file needed |
| Setup time | Under 10 minutes |
| Technical staff after deploy | Zero — no server to maintain |
| Internet requirement | Works on 3G — submit page is under 50 KB gzipped |
| Offline behaviour | Form fills and saves to localStorage offline; data persists until connection restored |
| Device | Any smartphone made after 2015 |
| At scale (100+ communities) | Vercel Pro — AED 75/month, still cheaper than 1 hour of market research consulting |

**Who maintains it**: Al Ain University Computer Science Department, in partnership with the Innovation and Entrepreneurship Centre (EISC), as part of post-hackathon incubation. The Khalifa Fund for Enterprise Development has been identified as the institutional deployment partner for the Al Ain region.

**Deployment playbook** (zero technical knowledge required):
1. Go to `github.com/hfshihan-cmyk/Rawaj` → click **Fork** → Create fork
2. Go to `vercel.com` → Sign in with GitHub → **Import Project** → select your fork
3. Click **Deploy** — no settings to change, no environment variables to add
4. Go to any QR code generator → create a QR for `your-deployment.vercel.app/submit`
5. Print the QR code and post at the local mosque, community centre, or farm cooperative

**Total: under 10 minutes. AED 0 cost. Zero technical knowledge.**

---

## Scalability Roadmap

Architecture: every data record carries a `community_id` field. Every neighbourhood in `lib/categories.ts` is community-scoped. Adding a new community requires exactly one entry in `lib/communities.ts` and one seed file — zero other code changes.

| Timeline | Community | Region | Focus Sector |
|---|---|---|---|
| Now ✅ | Al Qua'a | Al Ain, Abu Dhabi | Camel services + astro-tourism |
| Month 2 | Liwa | Western Abu Dhabi | Date palm economy |
| Month 3 | Hatta | Dubai | Eco-tourism + hiking |
| Month 4 | Mahadha | Ras Al Khaimah | Border trade + agriculture |
| Year 1 | 20 communities | UAE-wide | Rural data network |

**Target partners**: Abu Dhabi Agriculture and Food Safety Authority (ADAFSA) and the Khalifa Fund for Enterprise Development for institutional rollout across the Al Ain rural region.

---

## Quick Start

```bash
git clone https://github.com/hfshihan-cmyk/Rawaj
cd rawaj
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

No `.env` file needed. Zero environment variables. Zero paid services.

| Route | Who uses it |
|---|---|
| `/` | Landing — anyone |
| `/submit` | Residents — submit a community need |
| `/dashboard` | Entrepreneurs — see ranked demand data |
| `/opportunity/1` | Camel milk opportunity brief |
| `/opportunity/2` | Stargazing tourism opportunity brief |
| `/opportunity/3` | Dates packaging opportunity brief |

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 App Router + TypeScript | Static export, Vercel-native, zero config |
| Styling | Tailwind CSS | RTL support, no runtime cost |
| Data | `data/seeds.json` + localStorage | No database, no cost, no server |
| Market Intelligence | `lib/opportunities.ts` | Offline-first, instant, no API key |
| Fonts | Cairo (Arabic) + Geist | Arabic-first design |
| Animations | Motion (Framer Motion) | Smooth UX on low-end devices |
| Hosting | Vercel free tier | AED 0, one-click deploy |

---

## Evidence Package

| Asset | Location | What it proves |
|---|---|---|
| 60 resident submissions | [`data/seeds.json`](./data/seeds.json) | The data gap is real and measurable |
| Screenshots | [`docs/screenshots/`](./docs/screenshots/) | All pages work end-to-end |
| Live demo | https://rawaj-peach.vercel.app | Deployable, not just a prototype |
| Demo video | [`docs/demo.mp4`](./docs/demo/demo.mp4) | End-to-end flow in 90 seconds |
| `.env.example` | [`.env.example`](./.env.example) | Zero configuration required |

---

## Team

**Hasan Alshihari** — Lead Developer
Reef Dev Team · Al Ain University · MSc Artificial Intelligence
202520151@aau.ac.ae

---

## Licence

MIT — fork freely, deploy for your community.
