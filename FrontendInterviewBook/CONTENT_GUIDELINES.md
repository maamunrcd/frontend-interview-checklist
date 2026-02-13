# Content Guidelines — Senior Frontend Interview Book

This doc keeps the book **DRY**, **scannable**, and **focused on cracking the Senior Frontend Developer interview**. Follow these rules when adding or editing content and when maintaining the menu.

---

## 1. Purpose & Audience

- **Goal:** One definitive prep source for **Senior Frontend Engineer** interviews.
- **Audience:** Developers who already build with React/Next.js and need to solidify concepts, system design, and interview technique.
- **Tone:** Concise answers first; depth in one canonical place. Avoid long intros and repeated “you’re ready” / motivational fluff.

---

## 2. DRY Rules (Don’t Repeat Yourself)

### 2.1 One canonical place per topic

- Each **concept** (e.g. Event Loop, Closures, Server Components) has **one main section** where the full explanation lives.
- Everywhere else: **short answer + pointer** to that section (e.g. “See [Closures & Scope](/part-b#closures--scope) for depth.”).

### 2.2 Quick Reference vs Deep Dive

| Part | Role | Rule |
|------|------|------|
| **Part A (Quick Reference)** | Interview-day cheat sheet: short Q&A, code snippets, “Top 50” style. | Keep answers to 1–2 short paragraphs + code. **Link to the relevant Part B–O section** for “deep dive” instead of re-explaining. |
| **Parts B–O** | Canonical depth. | Full explanation, examples, and edge cases live here. Part A should not duplicate this. |

**Example:** Part A “Event Loop” = one short answer + order (sync → micro → macro). Part B “Event Loop & Async JavaScript” = full treatment. Part A can end with: “For full event loop and async patterns, see [Event Loop & Async JavaScript](/part-b#event-loop--async-javascript).”

### 2.3 No duplicate sections across Parts

- **Performance:** Canonical place = **Part H (Performance Optimization)**. Part C (React Performance), Part D (Next.js Performance), and Part E (Web Vitals) should cover **only** framework-specific or metric-specific points and **link to Part H** for bundle/runtime/network/image optimization.
- **Testing:** Canonical place = **Part J (Testing)** for pyramid, tools, and practices. **Part C (React Testing Strategies)** = React-specific (RTL, mocking components). Part C should not re-teach unit vs integration vs E2E.
- **System Design:** Canonical place = **“Senior Frontend Engineer – System Design Master Guide”** (and optionally one subsection in Part K). Part K “Frontend System Design” should either be a short overview + link to the System Design guide, or merged into it.
- **Authentication / Security:** Part D (NextAuth) and Part F (Security) should cross-link; avoid copying the same “token storage” or “CSP” paragraphs in both.

---

## 3. Topic Ownership (Where to Put What)

Use this table when adding or moving content. “Owner” = the Part that holds the **full** explanation.

| Topic | Owner | Others (link only, no duplicate depth) |
|-------|--------|----------------------------------------|
| Event loop, microtasks, Promises, async/await | Part B | Part A (short answer only) |
| Closures, scope, `this`, prototypes | Part B | Part A (short answer only) |
| React lifecycle, hooks, patterns | Part C | Part A (short Q&A only) |
| Next.js App Router, RSC, data fetching | Part D | Part A (short Q&A only) |
| HTML/CSS/Browser (semantic, layout, rendering, APIs) | Part E | Part A (short Q&A only) |
| Security (XSS, CSRF, CSP, auth) | Part F | Part D (NextAuth flow only) |
| A11y (WCAG, testing) | Part G | — |
| **All performance (bundle, runtime, network, images)** | **Part H** | Part C, D, E (framework-specific + link to H) |
| TypeScript | Part I | — |
| Testing pyramid, unit/integration/E2E, tools | Part J | Part C (React Testing only) |
| Build tools, Webpack/Vite/Rollup, dev tools | Part K | — |
| System design (frontend) | System Design Master Guide | Part K (overview or single section) |
| PWA, Web Workers, WebSockets, GraphQL vs REST | Part M | — |
| CI/CD, monitoring, deployment | Part N | — |
| Leadership, code review, mentoring | Part O | — |

---

## 4. Menu & Structure Rules

### 4.1 Parts A–O (main curriculum)

- **One Part = one file** (e.g. `PART_B_JAVASCRIPT_MASTERY.md`).
- **Sections inside a Part** = H2 (`##`) that become sidebar anchors. Keep section names **unique and descriptive** (e.g. “Event Loop & Async JavaScript”, not “Async”).
- **Sub-items in the app menu** must match these H2 section titles (anchors) so scroll-spy and deep links work.

### 4.2 Interview Strategy & Final Prep (avoid bloat)

- **Problem:** Many small, repetitive “motivation” pages (“You’re Ready”, “Final Words”, “You’ve Got This!”, etc.) create noise and duplicate the same message.
- **Target:** Consolidate into **fewer, clear pages** with distinct roles:

| Consolidated page | Purpose | Current files to merge (suggested) |
|-------------------|--------|-----------------------------------|
| **Interview Strategy** | Problem-solving framework, how to behave in interview, time management | `09_Final_Section_Interview_Strategy.md` (keep as base) |
| **Preparation Timeline & Checklist** | Timeline, what to do when, night before | `10_Interview_Preparation_Timeline.md`, `12_The_Night_Before_Interview.md`, `11_Must_Memorize_Before_Interview.md` |
| **Interview Scenarios & Answers** | Real Q&A scenarios (e.g. “optimize 100k list”, “memory leak”) | `14_Youre_Ready.md` (rename; most of it is scenarios, not motivation) |
| **Topics Summary & Survival Kit** | Single “what we cover” + last-minute checklist | `18_Comprehensive_Topics_Coverage_Summary.md`, `19_Your_Interview_Survival_Kit.md` |
| **Final Reminder** | One short “day-of” reminder + encouragement | Merge: `15_Remember_During_Interview.md`, `20_The_Ultimate_Reminder.md`, `21_Last_Words_Before_You_Go.md`, `22_Final_Motivation.md`, `23_Youre_Ready_To_Crack_Any_Interview.md`, and remove redundant “You’re Ready” / “Final Words” / “You’ve Got This” standalone pages |

- After consolidation: **5–6 Strategy pages** instead of 15+. Menu in `README.md` and `menu-config.ts` should list only these consolidated pages.

### 4.3 System Design Master Guide

- Keep as a **separate block** in the menu (8 files is fine if each has a distinct role: Intro, Roadmap, Pillars, Cheat Sheet, Offline-First, Scenarios, Playbook, Conclusion).
- Part K “Frontend System Design” should **not** duplicate this; it should be a short overview + link to the System Design guide.

### 4.4 Bonus / extra topics

- **13_Bonus_Additional_Critical_Topics.md:** Prefer moving **topic-specific** content into the owning Part (e.g. SVG/ViewBox → Part E; anything performance → Part H). What remains can stay as “Bonus” but trimmed; avoid long copy-paste from other Parts.
- **23_Youre_Ready_To_Crack_Any_Interview.md:** Contains a “PART P: Advanced Networking & Performance Patterns” section (tRPC, gRPC, loading patterns, INP, virtual lists). Consider moving that content into **Part H** or **Part M** and removing from this file; the rest of 23 was merged into **Final_Reminder.md**.

---

## 5. Length & Scannability

- **Part A (Quick Reference):** Short answers only. If a Q&A grows beyond ~1 screen, move the depth to the owning Part and replace with a summary + link.
- **Other Parts:** Prefer **bullet lists and code blocks** over long paragraphs. Use clear H3/H4 for sub-questions so the doc is scannable and the sidebar stays useful.
- **Avoid:** Multi-page “motivation” sections. One “Final reminder / You’re ready” block at the end of Interview Strategy is enough.

---

## 6. Maintaining the Menu (README + app)

1. **Single source of truth:** The **menu structure** is defined in:
   - **FrontendInterviewBook/README.md** — human-readable TOC and file list.
   - **frontend-interview-app/src/lib/menu-config.ts** — app sidebar and routing (slugs, anchors, file names).

2. **When adding a new section:**
   - Add the H2 in the right Part file (owner from table above).
   - Add the sub-item in `menu-config.ts` with the correct `anchor` (slug from H2, e.g. `event-loop--async-javascript`).
   - Optionally add a line in `README.md` under that Part.

3. **When merging or renaming Strategy files:**
   - Merge the markdown into the target file (see table in 4.2).
   - Remove or redirect old files.
   - Update `README.md` and `menu-config.ts` so slugs and file names match; remove entries for deleted files.

4. **PART L:** README says “Content covered within PART K”. Either remove “PART L” from the menu or add a single “System Design (overview)” entry under Part K that links to the System Design Master Guide. Do not create a separate empty Part L file.

---

## 7. Checklist Before Publishing Edits

- [ ] No full topic duplicated in two Parts; at most short summary in Part A + link to owner Part.
- [ ] Performance content: framework-specific in C/D/E, rest in Part H with cross-links.
- [ ] Testing: general in Part J, React-specific in Part C.
- [ ] Interview Strategy: consolidated into 5–6 pages; no duplicate “you’re ready” pages.
- [ ] `menu-config.ts` and `README.md` match (same sections, same file names, no broken slugs).
- [ ] New H2s have clear, unique titles so anchors and scroll-spy stay correct.

---

*Last updated: Feb 2025. Use this file when adding content or refactoring the book.*
