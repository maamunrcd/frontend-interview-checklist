/**
 * Menu structure derived from FrontendInterviewBook/README.md.
 * Main menu = section title. Sub menu = items under each part (anchor links) or separate pages.
 */

export interface SubMenuItem {
  title: string;
  anchor: string; // id for deep link, e.g. "top-50-most-asked-questions"
}

export interface MenuEntry {
  title: string;
  slug: string;
  file: string;
  /** When set, sidebar shows these as sub-items linking to /slug#anchor */
  subItems?: SubMenuItem[];
}

export interface MenuSection {
  title: string;
  entries: MenuEntry[];
}

export const menuSections: MenuSection[] = [
  {
    title: "QUICK REFERENCE",
    entries: [
      {
        title: "Quick Reference",
        slug: "part-a",
        file: "PART_A_QUICK_REFERENCE.md",
        subItems: [
          { title: "Top 50 Most Asked Questions", anchor: "top-50-most-asked-questions" },
          { title: "Must-Know Code Implementations", anchor: "must-know-code-implementations" },
          { title: "Interview Day Checklist", anchor: "interview-day-checklist" },
          { title: "Common Mistakes to Avoid", anchor: "common-mistakes-to-avoid" },
        ],
      },
    ],
  },
  {
    title: "JAVASCRIPT MASTERY",
    entries: [
      {
        title: "JavaScript Mastery",
        slug: "part-b",
        file: "PART_B_JAVASCRIPT_MASTERY.md",
        subItems: [
          { title: "Event Loop & Async JavaScript", anchor: "event-loop--async-javascript" },
          { title: "Closures & Scope", anchor: "closures--scope" },
          { title: "This Keyword", anchor: "this-keyword" },
          { title: "Prototypes & Inheritance", anchor: "prototypes--inheritance" },
          { title: "Advanced Patterns", anchor: "advanced-patterns-js" },
          { title: "Memory Management & Garbage Collection", anchor: "memory-management--garbage-collection" },
        ],
      },
    ],
  },
  {
    title: "REACT ECOSYSTEM",
    entries: [
      {
        title: "React Ecosystem",
        slug: "part-c",
        file: "PART_C_REACT_ECOSYSTEM.md",
        subItems: [
          { title: "React Core Concepts", anchor: "react-core-concepts" },
          { title: "React Performance Optimization", anchor: "react-performance-optimization" },
          { title: "React Advanced Patterns", anchor: "react-advanced-patterns" },
          { title: "State Management Deep Dive", anchor: "state-management-deep-dive" },
          { title: "React Testing Strategies", anchor: "react-testing-strategies" },
        ],
      },
    ],
  },
  {
    title: "NEXT.JS & SSR",
    entries: [
      {
        title: "Next.js & SSR",
        slug: "part-d",
        file: "PART_D_NEXTJS_SSR.md",
        subItems: [
          { title: "Next.js Architecture", anchor: "nextjs-architecture" },
          { title: "Server Components vs Client Components", anchor: "server-components-vs-client-components" },
          { title: "NextAuth & Authentication", anchor: "nextauth--authentication" },
          { title: "Next.js Performance Optimization", anchor: "nextjs-performance-optimization" },
        ],
      },
    ],
  },
  {
    title: "HTML, CSS & BROWSER",
    entries: [
      {
        title: "HTML, CSS & Browser",
        slug: "part-e",
        file: "PART_E_HTML_CSS_BROWSER.md",
        subItems: [
          { title: "HTML5 & Semantic Elements", anchor: "html5--semantic-elements" },
          { title: "CSS Advanced Concepts", anchor: "css-advanced-concepts" },
          { title: "CSS Architecture & Methodologies", anchor: "css-architecture--methodologies" },
          { title: "Browser Rendering Pipeline", anchor: "browser-rendering-pipeline" },
          { title: "Browser APIs", anchor: "browser-apis" },
          { title: "Web Vitals & Performance Metrics", anchor: "web-vitals--performance-metrics" },
        ],
      },
    ],
  },
  {
    title: "SECURITY & BEST PRACTICES",
    entries: [
      {
        title: "Security & Best Practices",
        slug: "part-f",
        file: "PART_F_SECURITY_BEST_PRACTICES.md",
        subItems: [
          { title: "Frontend Security", anchor: "frontend-security" },
          { title: "Authentication & Authorization", anchor: "authentication--authorization" },
          { title: "OWASP Top 10 for Frontend", anchor: "owasp-top-10-for-frontend" },
        ],
      },
    ],
  },
  {
    title: "ACCESSIBILITY",
    entries: [
      {
        title: "Accessibility",
        slug: "part-g",
        file: "PART_G_ACCESSIBILITY.md",
        subItems: [
          { title: "Web Accessibility (A11y)", anchor: "web-accessibility-a11y" },
          { title: "WCAG Guidelines", anchor: "wcag-guidelines" },
          { title: "Accessibility Testing", anchor: "accessibility-testing" },
        ],
      },
    ],
  },
  {
    title: "PERFORMANCE OPTIMIZATION",
    entries: [
      {
        title: "Performance Optimization",
        slug: "part-h",
        file: "PART_H_PERFORMANCE_OPTIMIZATION.md",
        subItems: [
          { title: "Bundle Optimization", anchor: "bundle-optimization" },
          { title: "Runtime Performance", anchor: "runtime-performance" },
          { title: "Network Optimization", anchor: "network-optimization" },
          { title: "Image & Asset Optimization", anchor: "image--asset-optimization" },
        ],
      },
    ],
  },
  {
    title: "TYPESCRIPT",
    entries: [
      {
        title: "TypeScript",
        slug: "part-i",
        file: "PART_I_TYPESCRIPT.md",
        subItems: [
          { title: "TypeScript Essentials", anchor: "typescript-essentials" },
          { title: "Advanced TypeScript Patterns", anchor: "advanced-typescript-patterns" },
        ],
      },
    ],
  },
  {
    title: "TESTING",
    entries: [
      {
        title: "Testing",
        slug: "part-j",
        file: "PART_J_TESTING.md",
        subItems: [
          { title: "Unit Testing", anchor: "unit-testing" },
          { title: "Integration Testing", anchor: "integration-testing" },
          { title: "E2E Testing", anchor: "e2e-testing" },
          { title: "Testing Best Practices", anchor: "testing-best-practices" },
        ],
      },
    ],
  },
  {
    title: "BUILD TOOLS & TOOLING",
    entries: [
      {
        title: "Build Tools & Tooling",
        slug: "part-k",
        file: "PART_K_BUILD_TOOLS_TOOLING.md",
        subItems: [
          { title: "Webpack, Vite, Rollup", anchor: "webpack-vs-vite-vs-rollup" },
          { title: "Build Optimization", anchor: "build-optimization" },
          { title: "Development Tools", anchor: "development-tools" },
          { title: "Frontend System Design", anchor: "frontend-system-design" },
        ],
      },
    ],
  },
  {
    title: "ADVANCED TOPICS",
    entries: [
      {
        title: "Advanced Topics",
        slug: "part-m",
        file: "PART_M_ADVANCED_TOPICS.md",
        subItems: [
          { title: "PWA & Service Workers", anchor: "pwa--service-workers" },
          { title: "Web Workers", anchor: "web-workers" },
          { title: "WebSockets & Real-time Communication", anchor: "websockets--real-time-communication" },
          { title: "GraphQL vs REST", anchor: "graphql-vs-rest" },
        ],
      },
    ],
  },
  {
    title: "PRODUCTION & DEPLOYMENT",
    entries: [
      {
        title: "Production & Deployment",
        slug: "part-n",
        file: "PART_N_PRODUCTION_DEPLOYMENT.md",
        subItems: [
          { title: "CI/CD Pipeline", anchor: "cicd-pipeline" },
          { title: "Monitoring & Debugging", anchor: "monitoring--debugging" },
          { title: "Production Deployment", anchor: "production-deployment" },
        ],
      },
    ],
  },
  {
    title: "LEADERSHIP & SOFT SKILLS",
    entries: [
      {
        title: "Leadership & Soft Skills",
        slug: "part-o",
        file: "PART_O_LEADERSHIP_SOFT_SKILLS.md",
        subItems: [
          { title: "Senior Developer Responsibilities", anchor: "senior-developer-responsibilities" },
          { title: "Code Review Best Practices", anchor: "code-review-best-practices" },
          { title: "Mentoring & Team Collaboration", anchor: "mentoring--team-collaboration" },
          { title: "Technical Communication", anchor: "technical-communication" },
        ],
      },
    ],
  },
  {
    title: "Senior Frontend Engineer – System Design Master Guide",
    entries: [
      { title: "Intro & Mindset", slug: "system-design-intro", file: "01_System_Design_Master_Guide_Intro.md" },
      { title: "40-Day Mastery Roadmap", slug: "40-day-mastery-roadmap", file: "02_40_Day_Mastery_Roadmap.md" },
      { title: "The 6 Pillars of Frontend System Design", slug: "six-pillars", file: "03_Six_Pillars_Frontend_System_Design.md" },
      { title: "System Design Cheat Sheet (Mental Models)", slug: "system-design-cheat-sheet", file: "04_System_Design_Cheat_Sheet.md" },
      { title: "Offline-First System Design (Deep Dive)", slug: "offline-first-system-design", file: "05_Offline_First_System_Design.md" },
      { title: "20 System Design Scenarios", slug: "20-system-design-scenarios", file: "06_20_System_Design_Scenarios.md" },
      { title: "The Senior Interview Playbook", slug: "senior-interview-playbook", file: "07_Senior_Interview_Playbook.md" },
      { title: "Conclusion & Resources", slug: "conclusion-and-resources", file: "08_Conclusion_And_Resources.md" },
    ],
  },
  {
    title: "Interview Strategy & Final Prep",
    entries: [
      { title: "Interview Strategy", slug: "final-section-interview-strategy", file: "09_Final_Section_Interview_Strategy.md" },
      { title: "Preparation & Checklists", slug: "interview-preparation-checklists", file: "Interview_Preparation_Checklists.md" },
      { title: "Interview Scenarios & Answers", slug: "youre-ready", file: "14_Youre_Ready.md" },
      { title: "Topics Summary & Survival Kit", slug: "topics-summary-and-survival-kit", file: "Topics_Summary_And_Survival_Kit.md" },
      { title: "Bonus: Additional Critical Topics", slug: "bonus-additional-critical-topics", file: "13_Bonus_Additional_Critical_Topics.md" },
      { title: "Final Reminder", slug: "final-reminder", file: "Final_Reminder.md" },
    ],
  },
];

/** All slugs for static generation and progress total count */
export const allSlugs: string[] = menuSections.flatMap((s) => s.entries.map((e) => e.slug));

/** Lookup: slug -> { title, file } */
const slugToEntry = new Map<string, MenuEntry>();
menuSections.forEach((s) => s.entries.forEach((e) => slugToEntry.set(e.slug, e)));

export function getEntryBySlug(slug: string): MenuEntry | undefined {
  return slugToEntry.get(slug);
}

export function getFirstSlug(): string {
  const first = menuSections[0]?.entries[0];
  return first ? first.slug : "part-a";
}
