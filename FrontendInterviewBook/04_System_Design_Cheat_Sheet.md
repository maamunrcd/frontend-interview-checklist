# 🧠 System Design Cheat Sheet (Mental Models)

Use these mental models to simplify complex decisions during the interview.

### 1. The "Push vs. Pull" Model
- **Pull (Polling)**: Client asks "Anything new?" every 5 seconds. (Simple, but high traffic).
- **Push (WebSockets/SSE)**: Server says "Hey, here is something new!" immediately. (Efficient, but complex connection management).

### 2. The "State Ownership" Model
- **Who owns this data?**
  - If UI-only: **Local State**.
  - If Multiple Pages: **Global State**.
  - If the Database: **Server State** (React Query).

### 3. The "Cost of Failure" Model
- **What happens if this fails?**
  - App crashes? Use **Error Boundaries**.
  - Data is lost? Use **Persistence/Sync Queue**.
  - Slow load? Use **Skeleton Screens/Optimistic UI**.

### 4. Common Interview "Traps" (Avoid These!)

- ❌ **Over-Engineering**: Don't suggest Micro-frontends for a simple Todo list.
- ❌ **Ignoring Scale**: Don't use `localStorage` for 1GB of data; use `IndexedDB`.
- ❌ **Vague Tech Choices**: Don't say "I'll use React because it's good." Say "I'll use React's Concurrent Mode to prioritize user input over background rendering."
- ❌ **Forgetting Accessibility**: A senior engineer always mentions Screen Readers (ARIA) and Keyboard shortcuts.

---

