@AGENTS.md

# Krysoc — project context for Claude

Marketing site for **Krysoc**, an AI automation studio (workflow automation, AI
agents, custom AI apps, audits) serving DACH SMBs, startups, e-commerce and
agencies. One bilingual landing page plus legal pages. Live at
**https://krysoc.com**.

Krysoc is Abdullah's own venture and is intended to become the umbrella brand
for his companies. The name reads as *chrysos* (Greek: gold) — which is where
the palette comes from. Don't rename, don't "correct" the spelling.

## Stack & deployment

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (CSS-first `@theme`) ·
TypeScript. **No database, no API routes, no auth** — this is a static site.

- **`output: 'export'`** in `next.config.ts` with `trailingSlash: true`.
  Everything must be statically renderable. No server components that fetch, no
  route handlers, no `proxy.ts`/middleware — none of it runs on GitHub Pages.
- **Hosting: GitHub Pages** from `enderwillrise/krysoc` (public repo).
  **Deploy = push to `main`.** `.github/workflows/deploy.yml` builds and
  publishes `out/` — no other step, no manual promotion.
- `public/CNAME` pins the custom domain. Don't delete it; Pages drops the domain
  if it disappears from the build output.
- DNS lives at **Hostinger** (4× A records to GitHub Pages + `www` CNAME).

### Deploy verification — the trap

`gh run list` immediately after a push still shows the **previous** run; the new
one hasn't registered yet. Watching that id reports success for the old deploy
and you "verify" stale content. Take the id from the `in_progress` row, or sleep
first:

```bash
gh run watch <id-from-in_progress-row> -R enderwillrise/krysoc --exit-status
```

Pages also serves `cache-control: max-age=600`, so add a cache-buster when
curling right after a deploy: `curl -s "https://krysoc.com/en/?cb=$(date +%s)"`.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build → out/  (must pass before pushing)
npx eslint .     # lint
```

Always run `npm run build` before pushing — it is the same command CI runs, and
a static-export error only surfaces there.

## Routing & i18n

Two locales, `en` and `de`, both first-class. **German is a real translation,
not an afterthought — every string ships in both.**

- All pages live under `src/app/[locale]/`, prerendered via
  `generateStaticParams()` for `en` and `de`.
- **All copy lives in `src/content/dictionary.ts`** as a typed `Dict`. Adding
  UI text means adding it to the `Dict` interface and both `en` and `de`
  objects — TypeScript enforces that neither locale is missing a key. Never
  hardcode a user-visible string in a component.
- Strings inside the animated demo components (`service-visuals.tsx`,
  `work-visuals.tsx`) are the one exception: they're localized via small local
  `Record<Locale, …>` maps beside the component, since they're illustrative
  mock-UI content rather than site copy.
- **`/` is a hand-written `public/index.html`** that reads `navigator.language`
  and redirects to `/de/` or `/en/`. A static host can't do server-side
  Accept-Language negotiation. It carries a `<meta refresh>` fallback for
  no-JS.
- **Internal links need the trailing slash** (`/en/#services`, `/de/imprint/`)
  because `trailingSlash: true`. Missing it costs a redirect hop.
- German copy uses formal **Sie**.

## Design system

Everything is defined in `src/app/globals.css`. There is no `tailwind.config.ts`
(Tailwind v4 is CSS-first).

### Palette — warm obsidian + three jewel accents

| Token | Hex | Use |
|---|---|---|
| `obsidian` / `coal` / `card` | `#0a0907` / `#14110c` / `#191510` | page, alternating sections, cards |
| `line` / `line-soft` | `#2c261b` / `#221d14` | borders, dividers |
| `ivory` / `stone` / `stone-dim` | `#f4efe4` / `#a69c87` / `#6f6653` | headings, body, captions |
| `gold` (+ `-soft`, `-deep`) | `#e6b963` | **primary accent** — CTAs, eyebrows, hero |
| `jade` (+ `-deep`) | `#57c39b` | second accent |
| `amethyst` (+ `-deep`) | `#a58fe6` | third accent |

**The accents are semantic, not decorative.** Keep the mapping consistent:

- **gold** — brand primary: hero, all CTAs, pricing, workflow automation,
  audits, the Einbürgerung case study
- **jade** — the agent/conversation world: AI agents & chatbots, the Ankommo
  case study, process step 02
- **amethyst** — the custom-build world: custom AI applications, the UniGet
  case study, process step 03

Rotations (stat bars, FAQ indices, marquee diamonds) cycle
gold → jade → amethyst. A new section should join that system rather than
introduce a fourth colour.

### Typography

**Unbounded** (display, geometric/wide) · **Archivo** (body) · **IBM Plex Mono**
(labels, eyebrows, data). Chosen deliberately to avoid the generic
serif-display look; don't swap them for "safer" faces.

> **Gotcha that will burn you:** font tokens referencing `next/font` variables
> **must** be declared in `@theme inline`, not plain `@theme`. The font CSS vars
> are set on `<body>` by `next/font`, but a plain `@theme` emits its utilities
> against `:root` — the result silently falls back to the system font with no
> error. This already happened once.

## Motion

The site is heavily animated, and **almost all of it is pure CSS** with
keyframes in `globals.css`. Only four client components exist:
`reveal-observer.tsx`, `spotlight-effect.tsx`, `count-up.tsx`, and the
interactive `roi-widget.tsx`. Prefer CSS over JS for anything new.

- **Scroll reveal** — `RevealObserver` adds `.js-reveal` to `<html>` and
  `.is-visible` to each `.reveal` as it enters the viewport. **Content is
  visible by default**; it is only hidden under
  `html.js-reveal .reveal:not(.is-visible)`. That ordering is deliberate — with
  JS disabled or broken, nothing is ever invisible. Any new reveal-driven
  effect (bar fills, accent bars) must follow the same visible-by-default
  pattern.
  *Do not replace this with the pure-CSS `animation-timeline: view()` approach.*
  It was tried and reverted — its failure mode leaves content stuck invisible.
- **`prefers-reduced-motion`** — the block at the bottom of `globals.css`
  disables every animation and pins each loop to a sensible static frame
  (checkmarks shown, progress bars part-filled, scan beams hidden). **Every new
  keyframe animation must be added to that block.**
- `.spot` on a card enables the gold cursor-spotlight (delegated mousemove sets
  `--mx`/`--my`).
- Demo loops are long and slow on purpose (5.5–13s). They should read as ambient
  proof, never as a distraction competing with the copy.

## Components

| File | What it is |
|---|---|
| `sections.tsx` | Every page section (`Hero`, `Marquee`, `Proof`, `Services`, `Work`, `Process`, `Pricing`, `Faq`, `FinalCta`) + the accent maps |
| `pipeline.tsx` | Hero SVG: requests in → Krysoc core → finished work out |
| `service-visuals.tsx` | Four animated service demos: `FlowDemo`, `ChatDemo`, `BuildDemo`, `AuditDemo` |
| `work-visuals.tsx` | Three case-study mini-screens: Ankommo feed, UniGet match bars, Einbürgerung quiz |
| `roi-widget.tsx` | Interactive payback slider (the only stateful widget) |
| `nav.tsx` / `footer.tsx` | Chrome, incl. locale switch |

**Section identity matters.** The first version of this site was eight
variations of "eyebrow + title + N identical cards" and read as generic — that
was explicit feedback. Each section now has its own shape (demo cards,
mini-screens, conveyor stations, an interactive widget, an asymmetric
two-column FAQ). Keep new sections visually distinct rather than reusing an
existing card grid.

## Content & business facts

Pricing (confirmed by Abdullah, live on the site):

- **Automation Audit — €490**, fixed, one week; credited toward a build sprint
- **Build Sprint — from €2,900**, 2–4 weeks (badged "Most booked")
- **Automation Partner — from €990/mo**, cancel anytime

The ROI widget's assumptions (`roi-widget.tsx`): €35/hour staff cost, 46 working
weeks, payback measured against the €2,900 sprint. If sprint pricing changes,
update `SPRINT` there **and** the `roi` strings in both locales.

Case studies are Abdullah's own products — **Ankommo** (German learning
platform), **UniGet** (university matching), **Einbürgerung Deutschland**
(citizenship test prep). The numbers quoted (10,000+ contacts, 13,000+ AI audio
clips, 109 chapters, 460 questions, 667 pages) are real; don't invent new ones.

Krysoc has **no client testimonials yet** and must not imply otherwise. Proof
comes from the founder's own shipped products — that positioning ("we automate
our own companies first") is deliberate.

## Config in `src/lib/site.ts`

`BOOKING_URL`, `CONTACT_EMAIL`, `SITE_URL`, and the locale helpers. Every CTA
routes through `BOOKING_URL` — change it in one place.

## Kadenz (`/kadenz`) — internal tool, not the marketing site

**Kadenz** is Krysoc's social-content product: it onboards a client brand from a
competitor audit, generates daily posts, routes each one through a QA gate and a
client approval, then publishes and **verifies the post actually went live**.
The `/kadenz` route is the **UI skeleton only** — every screen renders from
fixtures in `src/lib/kadenz/fixtures.ts`. Nothing is wired to a live account.

> ⚠️ **Unlisted, not private.** This repo is public and Pages is static, so
> there is no auth and there cannot be. `robots: noindex` is set, and that is
> the entire protection. **Never put a credential, client name, real client
> content, or an API key under `src/*/kadenz/`.** When the backend lands, Kadenz
> moves to a host with real auth (Cloudflare Pages + Access, or Fly/Render) —
> that migration is a prerequisite for the first real tenant, not a nice-to-have.

### Layout

| Path | Contents |
|---|---|
| `src/app/kadenz/` | Routes + its own **second root layout** (`<html>`/`<body>`) |
| `src/lib/kadenz/schema.ts` | Zod types — the shapes the future engine produces |
| `src/lib/kadenz/fixtures.ts` | All mock data, typed against the schema |
| `src/components/kadenz/ui.tsx` | Status pills, buttons, `MockImage` |

### Rules that keep it from leaking into the marketing site

- **Two root layouts, on purpose.** There is no `src/app/layout.tsx`;
  `[locale]/layout.tsx` and `kadenz/layout.tsx` are siblings, each with its own
  `<html>`/`<body>`. This is why a Kadenz change can't alter the marketing
  document shell. Adding a top-level `layout.tsx` would break both.
- **Kadenz is English-only** and deliberately exempt from the
  `dictionary.ts` bilingual rule — it's an internal ops tool, not site copy.
  Don't add its strings to the `Dict`.
- **`rust` (`#d4674a`) is Kadenz-only.** It is a functional failure state, *not*
  a fourth brand accent. The gold/jade/amethyst rotation is unchanged. Never use
  `rust` under `[locale]/`.
- **Trailing slashes are mandatory** on every internal Kadenz link
  (`/kadenz/queue/`) — `trailingSlash: true`, so a missing slash costs a
  redirect hop.
- **Every dynamic route needs `generateStaticParams()`** (`brands/[slug]`,
  `runs/[id]`) or the static export fails at build.
- The shared class names (`.card`, `.dot`, `.eyebrow`, `.scroll-x`) were checked
  against `globals.css` for collisions before being added. Check again before
  adding more.

### Design decisions worth keeping

- **`AuditFinding.evidence` is `.min(1)`** — a competitor-audit finding that
  can't point at the posts supporting it fails validation and cannot render.
  This is a deliberate guard against asserting visual analysis that was never
  actually performed.
- **`accepted` and `verified` are separate publish states.** "The provider took
  the request" and "the post is live" are different facts; conflating them is
  what silently dropped Ankommo's Instagram carousel posts.
- **Lane names are format descriptions** (`photo_carousel`, `news_card`), never
  a specific brand's lane names. The engine has to stay tenant-neutral.

## Concept demos (`/demo/*`) — sales collateral

Three fictional local businesses, built so a prospect can see what their own
site would look like. Sent as a direct link during sales conversations; the
hub at `/demo/` is the entry point. **Not linked from the marketing nav.**

| Route | Business | Sells on |
|---|---|---|
| `/demo/restaurant/` | Trattoria Salvia | Speisekarte, Mittagstisch, live open/closed, reservation |
| `/demo/praxis/` | Praxis am Lindenplatz | **Doctolib booking** front and centre, Rezept-Anforderung, Sprechzeiten |
| `/demo/handwerk/` | Hartmann Haustechnik | Wärmepumpen-Förderrechner, 24h-Notdienst, Azubi-Gewinnung |

### Rules

- **A THIRD root layout** (`src/app/demo/layout.tsx`), sibling to
  `[locale]/` and `kadenz/`. Still no `src/app/layout.tsx`.
- **Own stylesheet — `src/app/demo/demo.css`, never `globals.css`.** The whole
  point is that these must not look like Krysoc or like each other. Palettes
  are prefixed `rst-` / `prx-` / `hwk-`; `ks-` is Krysoc's, used only by the
  concept bar. Never use a `ks-` token inside a demo's own design.
- **Fonts per demo**, declared once in `src/app/demo/fonts.ts` and applied via
  a wrapper `className` — so no page ships families it doesn't use. Same
  `@theme inline` rule as the marketing site.
- **German-only**, deliberately outside the `dictionary.ts` bilingual rule.
  The audience is German local businesses.
- **`ConceptBar` is mandatory on every demo page.** It is simultaneously the
  disclaimer ("Beispiel, frei erfunden") and the sales CTA. Removing it would
  leave a fictional Arztpraxis looking like a real one.
- **`noindex` is set on the whole `/demo` tree** in the layout metadata. Keep
  it. A fake practice must never appear in search results.
- **Everything is fictional and must stay obviously so**: invented businesses,
  `089 000 00 00` phone numbers, `.example` email domains, placeholder VAT and
  register numbers. Never put a real business's details in a demo.
- Mock forms are inert previews and say so. Don't wire them to anything — a
  static export has no backend, and a form that silently drops a patient's
  message is worse than no form.

### Photography

`public/img/` holds AI-generated stand-in photos (`rst-` / `prx-` / `hwk-`
prefixes), ~600 KB total, WebP at 1200px wide. Rendered through
`components/demo/photo.tsx`, which keeps the old gradient behind the image so a
missing file degrades to the previous look rather than a broken-image icon.

- **No identifiable faces anywhere.** The trades photos show gloved hands only,
  the practice rooms are empty. A fictional practice must never appear to show
  real staff — and the Team section deliberately uses initials, not portraits.
- These exist so the concepts don't look unfinished. **A real client's site uses
  their own photos** — that's part of the sale, and swapping the file is the
  only change needed.
- `images.unoptimized` is on (static export has no image server), so files are
  resized and compressed at generation time, not at request time.
- Regenerate with the script kept in the session scratchpad; it calls the
  OpenAI images API via `curl` (this machine's Python has no CA bundle, so
  `urllib` fails certificate verification against the API).

### Facts that need re-checking before a real client deployment

- **The Förderrechner numbers are illustrative** (base 30 % + speed 20 % +
  income 30 %, capped at 70 %, against €30,000 eligible cost). BEG rules change;
  re-verify against current BAFA/KfW guidance before this goes live for a real
  Handwerksbetrieb. The on-page text already frames it as unverbindlich.
- **The demos claim German hosting** — that is the product being sold, and it is
  true of a real client deployment (Hetzner/IONOS/Netcup). These demo pages
  themselves sit on GitHub Pages, which is not German-hosted. Fine for a
  concept; **not fine to reuse this exact wording on a client's live site
  unless it is actually hosted in Germany.**
- The Doctolib button points at `doctolib.de`, standing in for the practice's
  own profile URL.

## Known TODOs

- **`hello@krysoc.com` does not exist yet.** It's shown in the footer and final
  CTA. Create it at Hostinger (the domain is there).
- **Imprint is a placeholder.** `src/app/[locale]/imprint/page.tsx` has a
  `FIELDS` const with `[Full legal name]` etc. German law (§5 DDG) requires real
  details before the site is promoted.
- **Privacy policy is a skeleton** covering the current site (no cookies, no
  analytics, external booking link). It must be revised if analytics, a contact
  form, or an embedded booking widget are ever added.
- `BOOKING_URL` currently points at Abdullah's personal Topmate with
  `utm_source=krysoc`; a Krysoc-specific booking page would be better.

## Conventions

- **Never hardcode user-visible copy** — it goes in `dictionary.ts`, both locales.
- **Never hardcode a colour** — use the palette tokens. (SVG `stroke`/`fill`
  attributes can't take Tailwind classes, so those carry literal hexes; keep
  them in sync with the tokens.)
- **Test both locales.** German strings are longer and break layouts English
  doesn't — that's why headings wrap rather than sit on fixed-height rows.
- Verify in the browser before pushing. A passing build proves it compiles, not
  that an animation looks right.
