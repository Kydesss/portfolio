# Portfolio

A scalable, content-driven portfolio site built with **Next.js 15 (App Router)**, **MDX** for case studies, and **Vercel** for hosting. Dark mode default with light toggle.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit any file — it hot-reloads.

---

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout (theme provider + nav)
│   ├── page.tsx            # Home: hero, work list, about, CV, contact
│   ├── globals.css         # All styles (CSS variables for theming)
│   └── work/[slug]/page.tsx  # Dynamic case study route
├── components/
│   ├── Nav.tsx             # Top nav
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   ├── ThemeToggle.tsx     # Sun/moon button
│   └── MDXComponents.tsx   # Custom components usable in .mdx files
├── content/
│   └── work/               # ← YOUR CASE STUDIES LIVE HERE
│       ├── project-one.mdx
│       ├── project-two.mdx
│       └── project-three.mdx
├── lib/
│   ├── content.ts          # MDX file reader / sorter
│   └── site-config.ts      # ← YOUR PERSONAL INFO LIVES HERE
└── public/
    └── work/               # Drop case study images here
```

---

## Editing your personal info

Open **`lib/site-config.ts`** and fill in:
- Name, role, location, status
- Hero headline (wrap `*phrases*` in asterisks to make them italic/muted)
- About paragraphs
- Experience, education, skills, recognition
- Email, LinkedIn, GitHub URLs

Everything in this file flows to the home page, nav, footer, and `<title>` tags automatically.

---

## Adding a new case study

1. Create a new `.mdx` file in `content/work/` — e.g. `airline-redesign.mdx`. The filename becomes the URL: `/work/airline-redesign`.
2. Copy the structure from any existing file. The **frontmatter** (the YAML block at the top between `---` lines) is required:

```yaml
---
title: "Airline App Redesign"
summary: "Rethinking the boarding pass experience for frequent flyers."
client: "Self-directed"
role: "Lead designer"
timeline: "4 weeks"
year: "2025"
tag: "Mobile · Redesign"
order: 4              # Controls position in the work list (lower = first)
cover: "/work/airline-cover.jpg"   # Optional; drop file in public/work/
outcomes:
  - stat: "32%"
    desc: "Reduction in pre-boarding anxiety in usability tests"
  - stat: "12"
    desc: "Interviews conducted"
---
```

3. Below the frontmatter, write your case study in Markdown. You get:

| What | How |
|---|---|
| Bold | `**text**` |
| Italic | `*text*` |
| Underline | `<u>text</u>` |
| Link | `[label](https://url)` |
| Heading 2 | `## Heading` |
| Heading 3 | `### Subheading` |
| Image | `![alt text](/work/image.jpg)` |
| Quote | `> "Quote text"` |
| List | `- item` (bullets) or `1. item` (numbered) |
| Divider | `---` |

4. **Custom components** (defined in `components/MDXComponents.tsx`):

```mdx
<SectionLabel>The Challenge</SectionLabel>

<Figure
  src="/work/research.jpg"
  alt="Research synthesis"
  caption="Caption text below the image."
/>
```

5. Save the file. The home page automatically lists it; the URL is automatically generated.

---

## Adding images

1. Drop image files into `public/work/` (e.g. `public/work/airline-hero.jpg`).
2. Reference them in MDX with a leading slash: `/work/airline-hero.jpg` (the `public/` part is implicit).
3. For optimization, use `.webp` or compressed `.jpg`. Aim for under 500KB per image.

---

## Theme behavior

- Defaults to **dark mode** on first visit.
- User's choice is saved to localStorage via `next-themes`.
- All colors live in CSS variables in `app/globals.css`. To tweak the palette, edit the `:root` (light) or `[data-theme='dark']` (dark) blocks.

---

## Deploying to Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/[USERNAME]/portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repo, click Deploy. No config needed — Vercel detects Next.js.
3. Your site is live at `your-project.vercel.app`. Add a custom domain in Vercel's project settings ($0 if you already own one; ~$15/yr to buy one through Vercel).

After deploy, **every `git push` to `main` auto-deploys**. To preview changes without deploying, push to any other branch — Vercel creates a preview URL.

---

## Sharing specific case studies

Each case study has its own permanent URL:
- `yourdomain.com/work/project-one`
- `yourdomain.com/work/airline-redesign`

Send those links directly to recruiters, clients, or anyone you want to show a specific project to.

---

## Useful commands

```bash
npm run dev      # Dev server with hot reload
npm run build    # Production build (run before deploying manually)
npm run start    # Serve the production build locally
```

---

## What's intentionally minimal

- **No CMS** — content is just files in git. Faster, free, and version-controlled.
- **No database** — everything is statically generated at build time.
- **No client-side JS for content** — pages are server-rendered, fast, and SEO-friendly.
- **One CSS file** — easier to read and tweak than a sprawling design-token system. Scale up to CSS Modules or Tailwind later if you need to.
