# Frontend Interview Book

A Next.js app that turns the **FrontendInterviewBook** markdown content into a readable, navigable site with a sidebar menu, dark/light theme, and progress tracking.

## Features

- **Menu from README**: Sidebar follows the structure of `FrontendInterviewBook/README.md` (Parts A–O, System Design Guide, Interview Strategy).
- **Markdown content**: All `.md` files are rendered with correct heading hierarchy (H1–H4) and code blocks with a **Copy** button.
- **Dark/Light mode**: Theme toggle in the header; respects system preference by default.
- **Progress tracking**: "Mark as complete" per topic; progress persisted in `localStorage` and shown in the header bar.
- **Time estimate**: ~X min read per page based on word count.
- **Responsive**: Sidebar collapses to a drawer on small screens; menu button in the header opens it.

## Setup

Content is read from the sibling directory `../FrontendInterviewBook` (relative to the app). Run the app from the repo root or ensure that path exists.

To use a custom content directory at build/time:

```bash
CONTENT_DIR=/path/to/FrontendInterviewBook npm run build
```

## Development

```bash
cd frontend-interview-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home route redirects to the first section (Part A).

## Build

```bash
npm run build
npm start
```

Static pages are generated for every slug (41 sections). If the build fails due to sandbox or network (e.g. font fetch), run with full permissions or use the system fonts already configured.

## Tech

- **Next.js 14+** (App Router), **React 18**, **TypeScript**
- **Tailwind CSS** for layout and theme
- **react-markdown**, **remark-gfm**, **rehype-slug** for rendering
- **next-themes** for dark/light mode
