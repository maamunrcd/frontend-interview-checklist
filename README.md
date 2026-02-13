# Frontend Interview Checklist

A **web app** that turns a structured markdown interview guide into a readable, navigable site. Built for the **Frontend Interview Book** — a single source for cracking **Senior Frontend Developer** interviews.

Anyone can use this repo to browse the guide in the browser: sidebar navigation, dark/light theme, progress tracking, syntax-highlighted code blocks, and per-topic “mark as complete” with persistence.

---

## What This Repo Is For

- **Purpose:** Host and present the **Frontend Interview Book** content (JavaScript, React, Next.js, HTML/CSS, security, performance, system design, interview strategy, etc.) as a modern web app.
- **Audience:** Developers preparing for senior frontend interviews; maintainers who want to edit content or extend the app.
- **Content:** The app **reads markdown files at build time** from a **content directory** (by default a sibling folder `FrontendInterviewBook`). The menu and routes are driven by a config that maps slugs to those files.

So: **this repo is the “reader” app.** The actual interview content (`.md` files) can live in the same monorepo, a sibling repo, or a path you provide via env.

---

## Features

| Feature | Description |
|--------|-------------|
| **Sidebar navigation** | Sections (e.g. Quick Reference, JavaScript Mastery) with expandable subsections and deep links to headings (`/slug#anchor`). |
| **Scroll spy** | As you scroll, the sidebar highlights the current section. |
| **Dark / light mode** | Theme toggle in the header; respects system preference. Body and code blocks use theme variables (e.g. dark body `#0a0a0a`, code block `#1a1616`). |
| **Progress tracking** | “Mark as complete” per topic; progress stored in `localStorage` and shown in the header (e.g. `5/37`). |
| **Read time** | ~X min read per page from word count. |
| **Code blocks** | Syntax highlighting (Prism via `react-syntax-highlighter`), language label, Copy button, theme-aware background. |
| **Responsive layout** | Sidebar becomes an overlay on small screens; header with menu button and fluid width. |

---

## Tech Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS 4** for layout and theme (CSS variables for light/dark)
- **react-markdown** + **remark-gfm** + **rehype-slug** (and rehype-autolink-headings) for markdown → HTML with heading IDs
- **react-syntax-highlighter** (Prism) for code blocks
- **next-themes** for dark/light mode and persistence

---

## Project Structure

```
frontend-interview-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (theme, progress, shell)
│   │   ├── page.tsx            # Home → redirects to first section
│   │   ├── [slug]/page.tsx     # Dynamic route: one page per content slug
│   │   ├── not-found.tsx
│   │   └── globals.css         # Theme variables (--background, --surface, --code-bg, etc.)
│   ├── components/
│   │   ├── AppShell.tsx        # Header + Sidebar + main; scroll-spy provider
│   │   ├── Header.tsx          # Logo, title, progress bar, theme toggle, mobile menu
│   │   ├── Sidebar.tsx         # Menu from menu-config; scroll-spy highlight
│   │   ├── ContentRenderer.tsx # Renders markdown (headings, code, prose)
│   │   ├── CodeBlock.tsx       # Syntax-highlighted block + Copy button
│   │   ├── ContentWithProgress # Client wrapper: content + “mark complete” + read time
│   │   ├── Logo.tsx            # Book + code icon
│   │   └── ThemeProvider.tsx   # next-themes wrapper
│   └── lib/
│       ├── menu-config.ts      # Sections, entries, slugs, file names (source of truth for menu + routes)
│       ├── content.ts           # Reads .md from CONTENT_DIR by slug
│       ├── progress.tsx         # Progress context + localStorage
│       └── scroll-spy.tsx      # Context + observer for “current section” highlight
├── package.json
└── README.md
```

**Content (outside this app):**  
Markdown files (e.g. `PART_A_QUICK_REFERENCE.md`) and optionally a `README.md` as the table of contents. The app does **not** bundle content; it expects a **content directory** at build time.

---

## Content Directory

The app loads markdown from a **content directory**. By default it looks for a sibling folder named `FrontendInterviewBook`:

- **Default path:** `../FrontendInterviewBook` (relative to the app’s working directory when you run `next build` or `next dev`).

To use another path (e.g. in CI or another repo layout), set:

```bash
CONTENT_DIR=/absolute/path/to/your/markdown/folder npm run build
```

(or `npm run dev`). All `.md` files referenced in `src/lib/menu-config.ts` must exist under `CONTENT_DIR`.

**If you clone only this repo:**  
You’ll need to either clone/copy the content repo into `../FrontendInterviewBook` or set `CONTENT_DIR` to where the markdown files live. Without that, the app will build but pages will be empty or 404.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A content directory with the markdown files and structure expected by `menu-config.ts` (or you’ll need to point `CONTENT_DIR` and possibly adjust `menu-config.ts`).

### Install and run

```bash
cd frontend-interview-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to the first section (e.g. Quick Reference).

### Build for production

```bash
CONTENT_DIR=/path/to/FrontendInterviewBook npm run build   # optional, if content is not in ../FrontendInterviewBook
npm start
```

Static pages are generated for every slug defined in `menu-config.ts`.

---

## Configuration

- **Menu and routes:** Edit `src/lib/menu-config.ts`. Each entry has a `slug`, `file` (e.g. `PART_A_QUICK_REFERENCE.md`), and optionally `subItems` (anchors for H2s in that file). The app uses this to build the sidebar and `/[slug]` routes.
- **Content path:** Set `CONTENT_DIR` when running `next build` or `next dev` if your markdown is not in `../FrontendInterviewBook`.
- **Theme (e.g. body/code background):** Edit CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark).

---

## License and Contributing

- This app is the **reader** for the Frontend Interview Book content. Content licensing (if any) is separate.
- To contribute: open issues or PRs for the app (e.g. UI, performance, accessibility). Content changes (e.g. new sections or edits to `.md`) belong in the content repo or folder that you pass via `CONTENT_DIR`.

---

## Summary

| Question | Answer |
|----------|--------|
| **What is this?** | A Next.js web app that renders a structured frontend-interview markdown guide with sidebar, themes, and progress. |
| **What is it for?** | Browsing and tracking progress through the Frontend Interview Book (senior frontend prep). |
| **Where is the content?** | In a separate content directory (default: `../FrontendInterviewBook`), configurable via `CONTENT_DIR`. |
| **How do I run it?** | `npm install && npm run dev` (and ensure the content directory exists or set `CONTENT_DIR`). |
| **How do I change the menu?** | Edit `src/lib/menu-config.ts` and ensure the referenced `.md` files exist in the content directory. |
