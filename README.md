# Humerus.ai — Landing site

Marketing site for **Humerus**, the unified healthcare SaaS ecosystem (multi-tenant EMR for hospitals, diagnostics, pharmacy and patients).

Built local-first. All Google Cloud integrations are stubbed and log `Mocking [Service Call] …` to the browser console — no `@google-cloud/*` or `firebase` SDK is installed.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3
- framer-motion (subtle reveal animations only)
- lucide-react (icons)
- react-hook-form + zod (demo form)

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # → dist/ (static, ready to ship)
npm run preview      # serves dist/ for sanity check
npm run typecheck
```

## Project layout

```
src/
├── App.tsx                # composes the 9 sections
├── main.tsx               # React entry
├── index.css              # Tailwind directives + utility classes
├── lib/
│   ├── content.ts         # all copy + structured data (verticals, spine, pricing, …)
│   └── gcp-stubs.ts       # mocked Firestore / Cloud Functions / Storage / reCAPTCHA
└── components/
    ├── Navbar.tsx         # sticky nav, mobile hamburger
    ├── Hero.tsx           # headline + orbital ecosystem visual
    ├── TrustBar.tsx       # ABDM · DPDP · NABH · CERT-In · FHIR R4 · …
    ├── Verticals.tsx      # 4 vertical cards (Hospitals / Diagnostics / Pharmacy / Patient)
    ├── PlatformSpine.tsx  # 6 reusable backbone modules
    ├── AISecurity.tsx     # AI · Security · Regulatory pillars
    ├── Pricing.tsx        # 4 indicative tiers
    ├── DemoForm.tsx       # zod-validated lead form → submitLead()
    ├── Footer.tsx
    └── ui/{Section,Card}.tsx
```

## Mocked GCP services

`src/lib/gcp-stubs.ts` exposes the same async surface you'd swap in for real GCP later. Every call logs `Mocking [Service] …` and returns a fake successful response. Open DevTools → Console while submitting the demo form to see them fire:

```
Mocking [reCAPTCHA.assessments.create] {…}
Mocking [Firestore.add(leads)] {…}
Mocking [CloudFunctions.invoke(notifyLead)] {…}
```

| Stub | Production target |
|------|-------------------|
| `firestore.add(collection, doc)` | `@google-cloud/firestore` `collection().add()` |
| `cloudFunctions.invoke(name, payload)` | Cloud Functions HTTPS / callable trigger |
| `cloudStorage.upload(bucket, key, file)` | `@google-cloud/storage` `bucket.file().save()` |
| `recaptcha.verify(token)` | reCAPTCHA Enterprise `assessments.create` |
| `submitLead(payload)` | Orchestrates reCAPTCHA → Firestore → Cloud Function |

To swap in real GCP, install the SDK and replace each function body. Call sites (`DemoForm.tsx`) do not change.

## Deploy on GitHub Pages (current)

The site auto-deploys to `https://humerus-ai.github.io/Humerus-website/` on every push to `main`.

**One-time repo setup** (do this in the GitHub UI before the first run):

1. **Settings → Pages → Build and deployment → Source:** select `GitHub Actions`. (Do *not* pick "Deploy from a branch" — the workflow uses the new `actions/deploy-pages` flow, not the old `gh-pages` branch.)
2. **Settings → Actions → General → Workflow permissions:** "Read and write permissions" + "Allow GitHub Actions to create and approve pull requests" both enabled.
3. Push to `main` (or trigger manually under **Actions → Deploy to GitHub Pages → Run workflow**).

**How it works** — see [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

- Checkout → `npm ci` → `npm run build` with `GITHUB_PAGES=true` (sets Vite `base` to `/Humerus-website/`).
- Copies `dist/index.html` to `dist/404.html` so any unknown path falls back to the SPA (anchor links keep working).
- Uploads `dist/` as a Pages artifact and deploys via `actions/deploy-pages@v4`.

**Local sanity check before pushing:**

```bash
GITHUB_PAGES=true npm run build
npx serve dist -l 5174   # open http://localhost:5174/Humerus-website/ to mimic Pages
```

**Custom domain (humerus.ai) later:** add a `public/CNAME` file containing `humerus.ai`, set the DNS, and switch `base` back to `'/'` (or set `VITE_BASE=/`). The workflow doesn't need any other change.

## Deploy on GCP (later)

The build output is static (`dist/`), so the cheapest path is fine for v1.

### Option A — Cloud Storage + Cloud CDN (recommended for v1)

```bash
# one-time
gcloud storage buckets create gs://humerus-landing --location=asia-south1 --uniform-bucket-level-access
gcloud storage buckets update gs://humerus-landing --web-main-page-suffix=index.html --web-error-page=index.html

# every deploy
npm run build
gcloud storage rsync dist/ gs://humerus-landing --recursive --delete-unmatched-destination-objects --cache-control="public,max-age=3600"
```

Front with an HTTPS Load Balancer + Cloud CDN backed by the bucket. ~$1–3/mo at low traffic.

### Option B — Cloud Run (containerized)

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
```

```bash
gcloud run deploy humerus-landing \
  --source . --region asia-south1 \
  --allow-unauthenticated --max-instances 10
```

Scales to zero. Use this if/when the landing grows server-rendered routes.

### When you wire up real lead capture

1. `npm install @google-cloud/firestore @google-cloud/functions-framework`
2. Replace bodies in `src/lib/gcp-stubs.ts` with real client calls (keep signatures).
3. Move secrets to Secret Manager; inject via Cloud Run env vars or a Vite proxy.
4. Add a Cloud Function `notifyLead` that fans out to email + Slack via Pub/Sub.

> ⚠️ Until billing is enabled on a GCP project, keep the stubs in place. The constraint for this repo is **no calls to billed `google-cloud-*` APIs**.

## Content source

Copy is sourced directly from `../Humerus_EMR_FRD_Core_Story.pptx` (4 verticals, 6 spine modules, 3 pillars, compliance posture). Update `src/lib/content.ts` to keep the page in sync as the FRD evolves.

## Out of scope (intentionally)

- Auth / customer dashboard
- Blog / CMS
- i18n (English only)
- Analytics SDK wiring
