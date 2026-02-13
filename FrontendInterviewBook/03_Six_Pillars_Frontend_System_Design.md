# 🏛️ The 6 Pillars of Frontend System Design

## 1. Communication & Networking
As a senior, you must choose the right protocol for the right job.

- **Request/Response (REST/GraphQL)**: Like ordering from a **Restaurant Menu**. You ask for something specific, and you get it back exactly once. Best for CRUD.
- **WebSockets**: Like a **Phone Call**. Two people talking at the same time. Best for Chat, Live Trading (Binance).
- **Server-Sent Events (SSE)**: Like a **Radio Station**. You tune in and listen to the music the DJ sends. Best for Price tickers, News feeds (Twitter/X).
- **gRPC-Web**: Like a **Contractual Business Agreement**. Very strict, fast, and binary. Best for high-performance internal apps.
- **HTTP/3**: Imagine a **Multi-lane Highway** where one car crashing doesn't stop the other lanes (Solving Head-of-line blocking).

## 2. Rendering & Performance Strategies
Don't just say "React is fast." Explain the strategy.

- **SSR (Server-Side Rendering)**: Like a **Restaurant Meal**. The chef (server) cooks the food and brings it to your table ready to eat. *Real-world: Netflix Landing Page (SEO/Speed).*
- **CSR (Client-Side Rendering)**: Like a **Meal Kit (HelloFresh)**. They send you the ingredients (JS bundle) and you have to cook it yourself on your stove (browser). *Real-world: Facebook/Admin Dashboards.*
- **SSG (Static Site Generation)**: Like **Canned Food**. It's pre-made and ready to go instantly, but it might not be the freshest. *Real-world: Blog posts/Documentation.*
- **ISR (Incremental Static Reg.)**: Like a **Vending Machine**. It's pre-filled, but a technician updates the items periodically without shutting down the machine. *Real-world: E-commerce Product pages.*
- **Web Vitals**: Think of them as the **"Pulse, Blood Pressure, and Temperature"** of your website. If one is off, the patient (UX) is sick.

## 3. Data Management & State
State is the most frequent source of bugs and performance issues.

- **Local State**: Like your **Pocket**. For things you need right now (form inputs).
- **Global State**: Like a **Family Ledger**. Everyone in the house needs to know the balance (Auth status, Theme).
- **Server State**: Like the **Library**. You borrow information, but you need to check if it's been updated since you took it out (Caching).
- **Normalization**: Like **Sorting Laundry**. You don't throw everything in one pile; you put socks with socks and shirts with shirts (ID-based mapping).
- **Persistence**: **Cookies** are like a passport stamp (Server needs to see it), **IndexedDB** is like a massive Filing Cabinet (Large local data).

## 4. Security & Resilience
Security is a first-class citizen in frontend design.

- **Authentication**: JWT vs. Session Cookies. Understanding the BFF (Backend-for-Frontend) pattern to keep tokens out of JS reach.
- **XSS (Cross-Site Scripting)**: Sanitize inputs and use Content Security Policy (CSP) headers.
- **CSRF (Cross-Site Request Forgery)**: Use SameSite cookies and Anti-CSRF tokens.
- **CORS**: Understanding cross-origin resource sharing and its implications.
- **Error Boundaries & Graceful Degradation**: Ensuring the entire app doesn't crash if one component fails.

## 5. Scalability & Infrastructure
How do you build for 100 developers and 100 million users?

- **Micro-frontends**: Like a **Shopping Mall**. One owner, but many different stores (Teams) that can open or close independently.
- **Design Systems**: Like **IKEA Furniture**. You have standard bolts and panels (Components) that you use to build everything consistently.
- **CI/CD**: Like a **Car Assembly Line**. Every part is tested before the car leaves the factory.
- **CDN Strategy**: Like a **7-Eleven on every corner**. You don't have to drive across the city (to the Origin server) for a snack; you just go to the local store (The Edge).

## 6. Testing & Quality Assurance
The testing pyramid for high-velocity teams.

- **Unit Tests**: Logic and utility functions (Vitest/Jest).
- **Integration Tests**: Component interaction and hooks.
- **E2E Tests**: Critical user flows (Playwright/Cypress).
- **Visual Regression**: Ensuring UI doesn't break aesthetically (Loki, Chromatic).

---

