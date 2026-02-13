# 📋 The Senior Interview Playbook

System Design interviews are as much about **communication** as they are about technical knowledge. Follow this 4-step framework to ace the session.

---

## Phase 1: Clarify & Scope (5-10 Minutes)
*Never* jump straight into a diagram. Start with questions.

- **Confirm Functional Requirements**: "Are we building the mobile web version or a desktop dashboard?"
- **Define Non-Functional Requirements**: "What is the expected scale? 1,000 users or 10 million? Is offline support a requirement?"
- **Establish Constraints**: "Are there any specific browser support requirements or data residency (GDPR) concerns?"
- **State Your Assumptions**: "I'm assuming we'll use a centralized Auth service for this."

## Phase 2: High-Level Architecture (10-15 Minutes)
Draw the "Macro" view. Identify the major components.

- **Component Tree**: Mention the core page structure.
- **Data Flow**: Explain how data gets from the API to the UI.
- **External Services**: Mention CDNs, Analytics, Error Tracking, and Auth Providers.
- **Infrastructure**: Briefly mention where the app is hosted (S3 + Cloudfront, Vercel, etc.).

## Phase 3: Technical Deep Dives (15-20 Minutes)
This is where you show your expertise. Pick 2-3 areas to go deep.

- **API Design**: Define the schema. "We'll use a GraphQL mutation for this to allow the client to request only the feedback they need."
- **Data Modeling**: How is the data stored in the state? Show a normalized schema.
- **Component Design**: Explain the choice of a specific pattern (Compound Components, Render Props, HOCs).
- **Critical Flow**: Walk through a complex user action (e.g., "Here is exactly what happens when the user clicks 'Submit' while offline").

## Phase 4: Trade-offs & Wrap-up (5-10 Minutes)
The difference between a mid-level and a senior is the word **"It depends."**

- **Acknowledge the Downsides**: "This approach uses more client-side memory, but it provides a better offline experience."
- **Proactive Scaling**: "If we hit 1 million concurrent users, we would need to switch from Polling to WebSockets."
- **Alternative Approaches**: "We could have used Redux here, but for this specific scale, Zustand offers lower boilerplate."
- **Summary**: Tie everything back to the initial requirements. "This design meets our 100ms latency goal while ensuring zero data loss."

---

