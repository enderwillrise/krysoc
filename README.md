# krysoc.com

Marketing site for **Krysoc** — an AI automation studio building workflow
automation, AI agents, custom AI applications and automation audits for
companies in the DACH region and beyond.

Live at **[krysoc.com](https://krysoc.com)** · bilingual (EN / DE).

## Development

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en/ or /de/
npm run build    # static export into out/
npx eslint .
```

## Deployment

Push to `main`. GitHub Actions builds the static export and publishes it to
GitHub Pages (`.github/workflows/deploy.yml`); the custom domain is pinned by
`public/CNAME`. There is no other deploy step.

## Structure

```
src/
  app/
    [locale]/          en + de pages (landing, imprint, privacy)
    globals.css        design tokens + every keyframe animation
  components/          sections, animated demos, widgets
  content/
    dictionary.ts      ALL user-facing copy, both locales
  lib/
    site.ts            booking URL, contact email, locale helpers
public/
  index.html           language detection + redirect for the root path
  CNAME                custom domain
```

Copy changes go in `src/content/dictionary.ts` — both `en` and `de`.
Colours, fonts and motion live in `src/app/globals.css`.

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture, design system and
conventions.
