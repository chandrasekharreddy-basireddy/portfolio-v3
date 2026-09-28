# portfolio

Personal portfolio of Chandra Sekhar Reddy Basireddy — built with Next.js,
TypeScript and modern CSS, statically exported and served from GitHub Pages.

**Live:** https://chandrasekharreddy-basireddy.github.io/portfolio-v3/

## Stack

- Next.js 14 (App Router, static export) + TypeScript
- CSS Modules over a shared design-token stylesheet — no UI framework
- Self-hosted fonts via Fontsource (Instrument Sans, IBM Plex Mono)
- Content lives in typed modules under `content/`

## Structure

```
app/                routes: home + /projects/[slug] case studies
components/         header, footer, sections, project previews, visuals
content/            site, projects (case-study copy), skills, journey
styles/             design tokens + base styles
public/             favicon, OG image, portrait, robots.txt, sitemap.xml
```

## Develop

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `out/` to GitHub Pages. The `basePath` in
`next.config.mjs` must match the repository name.

## Content edits

- Project case studies: `content/projects.ts`
- Skills groups: `content/skills.ts`
- Journey timeline: `content/journey.ts`
- Name, email, links: `content/site.ts`
