# LEADERSHIP & SOFT SKILLS

## Senior Developer Responsibilities

### Code Review Best Practices

```
Code Review Checklist:

Functionality:
- [ ] Code solves the problem correctly
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] No bugs introduced

Code Quality:
- [ ] Follows coding standards
- [ ] Naming is clear and consistent
- [ ] No code duplication
- [ ] Functions are single responsibility
- [ ] Proper abstraction level

Performance:
- [ ] No unnecessary re-renders
- [ ] Efficient algorithms
- [ ] No memory leaks
- [ ] Bundle size considered

Security:
- [ ] Input validation
- [ ] No XSS vulnerabilities
- [ ] Secrets not exposed
- [ ] Authentication/authorization correct

Testing:
- [ ] Tests are comprehensive
- [ ] Tests are meaningful
- [ ] Edge cases tested
- [ ] Mock usage appropriate

Accessibility:
- [ ] Semantic HTML used
- [ ] Keyboard accessible
- [ ] ARIA attributes correct
- [ ] Color contrast sufficient

Documentation:
- [ ] Complex logic commented
- [ ] API changes documented
- [ ] README updated if needed
```

### Providing Constructive Feedback

```
✅ Good Code Review Comments:

"Consider using useMemo here since this calculation 
runs on every render and processes a large array.
Example: const filtered = useMemo(() => items.filter(...), [items])"

"This could cause a memory leak. The event listener 
should be removed in the cleanup function.
Add: return () => element.removeEventListener(...);"

"Great implementation! One suggestion: we could extract 
this logic into a custom hook for reusability."

❌ Poor Code Review Comments:

"This is wrong." (Not helpful, no explanation)

"Why didn't you use Redux?" (Assuming without context)

"I would have done it differently." (Not constructive)

Guidelines:
1. Be specific and actionable
2. Explain WHY, not just WHAT
3. Suggest alternatives
4. Ask questions instead of demanding
5. Praise good work
6. Focus on code, not the person
```

### Mentoring Junior Developers

```
Effective Mentoring Strategies:

1. Pair Programming:
   - Let them drive, you navigate
   - Ask leading questions
   - Explain your thought process
   - Share debugging strategies

2. Code Reviews as Teaching:
   - Explain reasoning behind suggestions
   - Share resources and articles
   - Point out patterns to learn
   - Encourage questions

3. Knowledge Sharing:
   - Weekly tech talks
   - Brown bag sessions
   - Document patterns and practices
   - Create learning resources

4. Gradual Responsibility:
   - Start with small tasks
   - Increase complexity gradually
   - Provide safety net
   - Celebrate progress

5. Encourage Best Practices:
   - Test-driven development
   - Performance consciousness
   - Security awareness
   - Accessibility first
```

## Technical Communication

### Explaining Technical Decisions

```
STAR Method for Technical Discussions:

Situation:
"Our dashboard was loading in 8+ seconds with 500+ product cards."

Task:
"I needed to reduce load time to under 2 seconds while maintaining
full functionality and user experience."

Action:
"I implemented a multi-pronged approach:
1. Virtual scrolling to render only visible items
2. Code splitting to reduce initial bundle
3. Image lazy loading with Intersection Observer
4. API response caching with SWR
5. Optimized re-renders with React.memo"

Result:
"Load time reduced to 1.2 seconds (85% improvement)
Bundle size decreased from 2.3MB to 800KB
Lighthouse performance score improved from 45 to 92
User engagement increased 40%"
```

### Presenting Technical Solutions

```
Structure for Technical Presentations:

1. Problem Statement (2 minutes)
   - What is the issue?
   - Why does it matter?
   - Who is affected?

2. Context (2 minutes)
   - Current state
   - Constraints
   - Requirements

3. Solution Options (5 minutes)
   - Option A: Pros and cons
   - Option B: Pros and cons
   - Recommended approach and why

4. Implementation Plan (3 minutes)
   - Technical approach
   - Timeline
   - Resources needed
   - Risks and mitigation

5. Q&A (3 minutes)
   - Address concerns
   - Clarify details
   - Get feedback
```

---

# FINAL SECTION: INTERVIEW STRATEGY

## Problem-Solving Framework

### 1. Clarification Phase (2-3 minutes)

```
Questions to Ask:

Functional Requirements:
- "What are the core features?"
- "Are there any specific edge cases I should consider?"
- "What should happen if [scenario]?"

Non-Functional Requirements:
- "Are there performance constraints?"
- "What browsers/devices need to be supported?"
- "Are there accessibility requirements?"

Constraints:
- "Can I use external libraries?"
- "Are there any limitations I should know about?"
- "What's the expected scale?"

Examples:
"Can you walk me through an example use case?"
"What would the input/output look like?"
```

### 2. Planning Phase (3-5 minutes)

```
Approach:

1. Restate the problem:
   "So we need to build a component that..."

2. Outline solution:
   "I'm thinking of using this approach because..."

3. Discuss trade-offs:
   "Option A is simpler but has X limitation.
    Option B is more complex but handles Y better.
    I'd go with A because..."

4. Get agreement:
   "Does this approach sound reasonable?"
```

### 3. Implementation Phase (15-25 minutes)

```
Best Practices:

1. Think out loud:
   "I'm creating this function to handle..."
   "I'm using useMemo here because..."

2. Start simple:
   - Core functionality first
   - Add features incrementally
   - Don't over-engineer

3. Handle edge cases:
   "Let me handle the empty array case..."
   "What if the input is null?"

4. Write clean code:
   - Meaningful variable names
   - Small, focused functions
   - Add comments for complex logic

5. Communicate blockers:
   "I'm not sure about X. Let me think..."
   "Can I look up the API for Y?"
```

### 4. Testing Phase (3-5 minutes)

```
Testing Strategy:

1. Walk through examples:
   "Let's test with input [1, 2, 3]..."
   "What if we have an empty array?"

2. Test edge cases:
   - Null/undefined
   - Empty arrays/objects
   - Very large inputs
   - Invalid inputs

3. Analyze complexity:
   "Time complexity is O(n) because we iterate once"
   "Space complexity is O(n) for the hash map"

4. Discuss improvements:
   "This could be optimized further by..."
   "In production, I'd also add..."
```

## Common Interview Patterns

### System Design Questions

```
Approach:

1. Gather Requirements (5 mins)
   - Functional requirements
   - Non-functional requirements
   - Scale expectations

2. High-Level Design (10 mins)
   - Component architecture
   - Data flow
   - State management approach
   - API design

3. Detailed Design (15 mins)
   - Component breakdown
   - Performance optimization
   - Error handling
   - Edge cases

4. Trade-offs Discussion (5 mins)
   - Alternative approaches
   - Scalability considerations
   - Future improvements
```

### Coding Questions

```
Pattern Recognition:

Two Pointers:
- Palindrome check
- Remove duplicates
- Merge sorted arrays

Sliding Window:
- Longest substring
- Maximum subarray
- Contains duplicate

Hash Map:
- Two sum
- Group anagrams
- First non-repeating character

BFS/DFS:
- Tree traversal
- Graph problems
- Island counting

Dynamic Programming:
- Fibonacci
- Climbing stairs
- Unique paths
```

---

# INTERVIEW PREPARATION TIMELINE

## 4-Week Plan

### Week 1: Fundamentals
- **Mon-Tue**: Event loop, closures, this, prototypes
- **Wed-Thu**: Promises, async/await, error handling
- **Fri**: Practice 5 JavaScript problems
- **Weekend**: React hooks deep dive

### Week 2: React & Performance
- **Mon-Tue**: Component patterns, state management
- **Wed-Thu**: Performance optimization, memoization
- **Fri**: Build a feature (virtualized list)
- **Weekend**: Next.js and SSR concepts

### Week 3: System Design & Algorithms
- **Mon-Tue**: Frontend system design patterns
- **Wed-Thu**: Algorithm practice (BFS, DFS, DP)
- **Fri**: Machine coding (build a component)
- **Weekend**: Security and accessibility

### Week 4: Integration & Mock Interviews
- **Mon-Tue**: Review all concepts
- **Wed-Thu**: Practice explaining out loud
- **Fri**: Mock interview (full simulation)
- **Weekend**: Final review, relax

---

# MUST MEMORIZE BEFORE INTERVIEW

## Quick Reference Card

### JavaScript
```
Event Loop: Sync → Microtasks → Macrotasks
Closure: Function + lexical scope
This: 4 rules (default, implicit, explicit, new)
Prototype: obj.__proto__ → Constructor.prototype
```

### React
```
useEffect deps: All used values must be in array
useMemo: Memoize VALUE
useCallback: Memoize FUNCTION
React.memo: Memoize COMPONENT
Keys: Unique, stable, not index
```

### Performance
```
Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
Reflow: Expensive (width, height, margin)
Repaint: Less expensive (color, background)
Composite: Cheapest (transform, opacity)
```

### Security
```
XSS: Sanitize input, use CSP
CSRF: SameSite cookies, CSRF token
Tokens: HttpOnly, Secure cookies
Never: Store secrets in frontend
```

### Accessibility
```
WCAG POUR: Perceivable, Operable, Understandable, Robust
Keyboard: Tab navigation, visible focus
ARIA: Use only when semantic HTML insufficient
Contrast: 4.5:1 normal text, 3:1 large text
```

---

# THE NIGHT BEFORE INTERVIEW

## Quick Review (30 minutes)

### JavaScript (10 minutes)
```javascript
// 1. Event Loop
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2

// 2. Closure
function outer() {
  const secret = 'private';
  return () => console.log(secret);
}

// 3. This
obj.method(); // this = obj
const fn = obj.method; fn(); // this = undefined

// 4. Deep copy
const copy = structuredClone(obj);
```

### React (10 minutes)
```javascript
// 1. useEffect
useEffect(() => {
  fetchData(userId);
  return () => cleanup();
}, [userId]); // ← Dependencies!

// 2. Optimization
const memoized = useMemo(() => expensiveCalc(data), [data]);
const callback = useCallback(() => doSomething(), []);
const Component = React.memo(MyComponent);

// 3. Keys
items.map(item => <Item key={item.id} {...item} />)
```

### Performance (5 minutes)
```
LCP: Optimize images, preload, SSR
FCP: Remove render-blocking, inline critical CSS
CLS: Set dimensions, reserve space
Bundle: Code split, tree shake, lazy load
```

### Security (5 minutes)
```
XSS: Sanitize input, CSP headers
CSRF: SameSite cookies, token validation
Tokens: HttpOnly, Secure cookies (server-side)
Never: eval(), innerHTML with user data, secrets in frontend
```

---

# BONUS: ADDITIONAL CRITICAL TOPICS

## SVG & ViewBox Deep Dive

### SVG Basics

```html
<!-- 1. Inline SVG -->
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>

<!-- 2. SVG as image -->
<img src="logo.svg" alt="Logo">

<!-- 3. SVG as background -->
<div style="background-image: url('pattern.svg')"></div>

<!-- 4. SVG as object/embed -->
<object data="diagram.svg" type="image/svg+xml"></object>
<embed src="diagram.svg" type="image/svg+xml">

<!-- 5. SVG Basic Shapes -->
<svg width="200" height="200">
  <!-- Circle -->
  <circle cx="50" cy="50" r="40" fill="red" />
  
  <!-- Rectangle -->
  <rect x="10" y="10" width="80" height="60" fill="blue" />
  
  <!-- Ellipse -->
  <ellipse cx="100" cy="100" rx="50" ry="30" fill="green" />
  
  <!-- Line -->
  <line x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="2" />
  
  <!-- Polyline -->
  <polyline points="0,0 50,50 100,0" stroke="purple" fill="none" />
  
  <!-- Polygon -->
  <polygon points="50,0 100,100 0,100" fill="orange" />
</svg>
```

### ViewBox Explained

```html
<!-- viewBox="min-x min-y width height" -->

<!-- No viewBox: Fixed size -->
<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" />
</svg>

<!-- With viewBox: Scalable -->
<svg width="200" height="200" viewBox="0 0 100 100">
  <!-- Coordinates 0-100, but renders at 200x200 (scaled 2x) -->
  <circle cx="50" cy="50" r="25" />
</svg>

<!-- Responsive SVG (no width/height) -->
<svg viewBox="0 0 100 100">
  <!-- Takes full container width, maintains aspect ratio -->
  <circle cx="50" cy="50" r="25" />
</svg>

<!-- viewBox for zooming -->
<svg width="200" height="200" viewBox="0 0 50 50">
  <!-- viewBox smaller than actual → zoomed in (2x) -->
  <circle cx="25" cy="25" r="12.5" />
</svg>

<svg width="200" height="200" viewBox="0 0 400 400">
  <!-- viewBox larger than actual → zoomed out (0.5x) -->
  <circle cx="200" cy="200" r="100" />
</svg>

<!-- preserveAspectRatio -->
<svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
  <!-- xMidYMid: Center alignment -->
  <!-- meet: Fit entirely (like background-size: contain) -->
  <!-- slice: Fill container (like background-size: cover) -->
  <rect width="100" height="50" fill="blue" />
</svg>

<svg viewBox="0 0 100 50" preserveAspectRatio="none">
  <!-- Stretches to fill (no aspect ratio preserved) -->
  <rect width="100" height="50" fill="blue" />
</svg>
```

### SVG Paths

```html
<svg viewBox="0 0 100 100">
  <path d="
    M 10 10           <!-- Move to (10, 10) -->
    L 90 10           <!-- Line to (90, 10) -->
    L 90 90           <!-- Line to (90, 90) -->
    L 10 90           <!-- Line to (10, 90) -->
    Z                 <!-- Close path -->
  " fill="none" stroke="black" stroke-width="2" />
  
  <!-- Cubic Bezier Curve -->
  <path d="
    M 10 80           <!-- Start point -->
    C 40 10, 65 10, 95 80  <!-- C x1 y1, x2 y2, x y -->
    S 150 150, 180 80 <!-- S x2 y2, x y (smooth curve) -->
  " fill="none" stroke="blue" stroke-width="2" />
  
  <!-- Arc -->
  <path d="
    M 30 50           <!-- Start -->
    A 20 20 0 0 1 70 50  <!-- A rx ry rotation large-arc sweep x y -->
  " fill="none" stroke="red" stroke-width="2" />
</svg>

<!-- Path Commands:
M/m: Move to
L/l: Line to
H/h: Horizontal line
V/v: Vertical line
C/c: Cubic Bezier
S/s: Smooth cubic Bezier
Q/q: Quadratic Bezier
T/t: Smooth quadratic Bezier
A/a: Arc
Z/z: Close path

Uppercase = absolute coordinates
Lowercase = relative coordinates
-->
```

### SVG Styling & Animation

```css
/* Styling SVG with CSS */
svg {
  width: 100%;
  height: auto;
}

circle {
  fill: blue;
  stroke: black;
  stroke-width: 2;
  opacity: 0.8;
}

/* Hover effects */
circle:hover {
  fill: red;
  transform: scale(1.1);
  transform-origin: center;
}

/* CSS Animations */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rotating-circle {
  animation: rotate 2s linear infinite;
  transform-origin: center;
}

/* SVG-specific properties */
.path {
  fill: none;
  stroke: blue;
  stroke-width: 2;
  stroke-linecap: round;  /* butt, round, square */
  stroke-linejoin: round; /* miter, round, bevel */
  stroke-dasharray: 5 5;  /* Dashed line */
}
```

```html
<!-- SMIL Animation (deprecated but still works) -->
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="20">
    <animate
      attributeName="r"
      from="20"
      to="40"
      dur="1s"
      repeatCount="indefinite"
    />
  </circle>
</svg>

<!-- JavaScript Animation -->
<script>
const circle = document.querySelector('circle');
let r = 20;
let growing = true;

function animate() {
  r += growing ? 0.5 : -0.5;
  
  if (r >= 40) growing = false;
  if (r <= 20) growing = true;
  
  circle.setAttribute('r', r.toString());
  requestAnimationFrame(animate);
}

animate();
</script>
```

### SVG Optimization

```html
<!-- Before optimization -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style type="text/css">
      .cls-1{fill:#ff0000;}
    </style>
  </defs>
  <circle class="cls-1" cx="50" cy="50" r="40" />
  <!-- Many unnecessary attributes, comments, metadata -->
</svg>

<!-- After optimization (SVGO) -->
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="red"/>
</svg>

<!-- Optimization tools:
- SVGO (Node.js)
- SVGOMG (Web UI)
- ImageOptim
-->
```

```bash
# Using SVGO
npm install -g svgo
svgo input.svg -o output.svg

# With config
svgo --config svgo.config.js *.svg
```

### SVG Sprites

```html
<!-- Define sprites -->
<svg style="display: none;">
  <symbol id="icon-user" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </symbol>
  
  <symbol id="icon-settings" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61..."/>
  </symbol>
</svg>

<!-- Use sprites -->
<svg class="icon" width="24" height="24">
  <use href="#icon-user" />
</svg>

<svg class="icon" width="24" height="24">
  <use href="#icon-settings" />
</svg>

<!-- External sprite sheet -->
<svg class="icon">
  <use href="sprites.svg#icon-user" />
</svg>
```

### Accessible SVG

```html
<!-- 1. As image (decorative) -->
<svg aria-hidden="true" focusable="false">
  <circle cx="50" cy="50" r="40" />
</svg>

<!-- 2. As meaningful graphic -->
<svg role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Sales Chart</title>
  <desc id="chart-desc">Monthly sales from January to December 2024</desc>
  <!-- Chart content -->
</svg>

<!-- 3. Interactive SVG -->
<svg role="img" aria-label="Menu">
  <g role="button" tabindex="0" aria-label="Open menu">
    <rect width="20" height="2" />
    <rect y="7" width="20" height="2" />
    <rect y="14" width="20" height="2" />
  </g>
</svg>

<!-- 4. Link in SVG -->
<svg>
  <a href="/home" aria-label="Go to homepage">
    <circle cx="50" cy="50" r="40" />
    <text x="50" y="55" text-anchor="middle">Home</text>
  </a>
</svg>
```

---

## Bkash/Vivasoft Specific Topics

### CSS Units: vh vs dvh

```css
/* vh: Viewport Height */
.element {
  height: 100vh; /* 100% of viewport height */
}

/* Problem with vh on mobile:
   Address bar causes layout shift
   100vh includes the space behind address bar
*/

/* dvh: Dynamic Viewport Height (new!) */
.element {
  height: 100dvh; /* Adjusts as browser UI shows/hides */
}

/* Other viewport units: */
.element {
  /* svh: Small Viewport Height (browser UI visible) */
  height: 100svh;
  
  /* lvh: Large Viewport Height (browser UI hidden) */
  height: 100lvh;
  
  /* Same for width: dvw, svw, lvw */
  width: 100dvw;
}

/* Use case: Full-screen mobile layouts */
.mobile-screen {
  height: 100dvh; /* Better than vh for mobile */
  width: 100dvw;
}
```

### CSS Combinator Selectors

```css
/* 1. Descendant Combinator (space) */
/* Selects ALL descendants */
nav li {
  color: blue;
}

/* 2. Child Combinator (>) */
/* Selects DIRECT children only */
nav > ul > li {
  color: red;
}

/* Example:
<nav>
  <ul>
    <li>Direct child - RED</li>
    <li>
      <ul>
        <li>Nested child - BLUE (not direct)</li>
      </ul>
    </li>
  </ul>
</nav>
*/

/* 3. Adjacent Sibling (+) */
/* Selects element IMMEDIATELY after */
h1 + p {
  font-weight: bold;
}

/* Example:
<h1>Title</h1>
<p>First paragraph - BOLD</p>
<p>Second paragraph - normal</p>
*/

/* 4. General Sibling (~) */
/* Selects ALL siblings after */
h1 ~ p {
  color: gray;
}

/* Example:
<h1>Title</h1>
<p>First paragraph - GRAY</p>
<div>Divider</div>
<p>Third paragraph - GRAY</p>
*/

/* Real-world examples: */

/* Style first paragraph after heading differently */
h2 + p {
  font-size: 1.2em;
  margin-top: 0;
}

/* Add margin to all paragraphs after first */
p + p {
  margin-top: 1em;
}

/* Style form elements after error */
.error + input {
  border-color: red;
}

/* Navigation active state */
.nav-item.active ~ .nav-item {
  opacity: 0.6;
}
```

### Margin Collapse Rules

```css
/* Vertical Margin Collapse */

/* Same values */
.top { margin-bottom: 50px; }
.bottom { margin-top: 50px; }
/* Total space between: 50px (NOT 100px) - margins collapse to larger */

/* Different values */
.top { margin-bottom: 50px; }
.bottom { margin-top: 20px; }
/* Total space: 50px (larger value wins) */

/* Horizontal Margins DON'T Collapse */
.left { margin-right: 50px; }
.right { margin-left: 50px; }
/* Total space: 100px */

/* Preventing margin collapse: */

/* 1. Add padding to parent */
.parent {
  padding: 1px 0; /* Prevents collapse */
}

/* 2. Add border to parent */
.parent {
  border-top: 1px solid transparent;
}

/* 3. Use flexbox/grid (no collapse) */
.parent {
  display: flex;
  flex-direction: column;
  gap: 50px; /* Use gap instead of margins */
}

/* 4. Position absolute/fixed */
.element {
  position: absolute;
  /* No margin collapse */
}

/* 5. Float */
.element {
  float: left;
  /* No margin collapse */
}

/* 6. Overflow other than visible */
.parent {
  overflow: auto; /* or hidden, scroll */
}
```

### Display Property Values

```css
/* Inline */
span {
  display: inline;
  /* Can't set width/height */
  /* Respects left/right margin, padding */
  /* Doesn't respect top/bottom margin */
  /* Doesn't break line */
}

/* Inline-block */
.inline-block {
  display: inline-block;
  /* CAN set width/height */
  /* Respects all margin/padding */
  /* Doesn't break line */
  /* Whitespace between elements matters */
}

/* Remove whitespace between inline-block elements */
.container {
  font-size: 0; /* Parent */
}
.inline-block {
  font-size: 16px; /* Reset on child */
}

/* Or use flexbox */
.container {
  display: flex;
  gap: 1rem; /* Better than inline-block */
}

/* Block */
div {
  display: block;
  /* Takes full width */
  /* CAN set width/height */
  /* Breaks to new line */
}

/* Flex */
.flex {
  display: flex; /* or inline-flex */
  /* Children become flex items */
}

/* Grid */
.grid {
  display: grid; /* or inline-grid */
  /* Children become grid items */
}

/* None */
.hidden {
  display: none;
  /* Removes from layout (not rendered) */
}

/* Contents (removes box) */
.wrapper {
  display: contents;
  /* Children act as if wrapper doesn't exist */
}
```

### CSS Transform Deep Dive

```css
/* 1. Translate: Move element */
.element {
  transform: translate(50px, 100px); /* x, y */
  transform: translateX(50px);
  transform: translateY(100px);
  transform: translate3d(50px, 100px, 0); /* Hardware accelerated */
}

/* 2. Scale: Resize element */
.element {
  transform: scale(1.5);        /* 150% both directions */
  transform: scale(2, 0.5);     /* 200% width, 50% height */
  transform: scaleX(2);
  transform: scaleY(0.5);
}

/* 3. Rotate: Spin element */
.element {
  transform: rotate(45deg);     /* Clockwise */
  transform: rotate(-45deg);    /* Counter-clockwise */
  transform: rotateX(45deg);    /* 3D rotation on X axis */
  transform: rotateY(45deg);    /* 3D rotation on Y axis */
  transform: rotateZ(45deg);    /* Same as rotate() */
}

/* 4. Skew: Slant element */
.element {
  transform: skew(20deg, 10deg); /* x-axis, y-axis */
  transform: skewX(20deg);
  transform: skewY(10deg);
}

/* 5. Multiple Transforms */
.element {
  transform: translateX(50px) rotate(45deg) scale(1.5);
  /* Order matters! */
}

/* 6. Transform Origin */
.element {
  transform-origin: center;      /* Default */
  transform-origin: top left;
  transform-origin: 50% 50%;
  transform-origin: 100px 100px;
  
  transform: rotate(45deg);
  /* Rotates around transform-origin */
}

/* Why transform is performant: */
/* - Uses GPU (compositor thread) */
/* - No reflow/repaint */
/* - Smooth 60fps animations */

/* ❌ Bad: Triggers reflow */
.element {
  left: 100px;
  top: 100px;
}

/* ✅ Good: No reflow */
.element {
  transform: translate(100px, 100px);
}
```

### Pulse Animation Effect

```css
/* Button pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
}

.pulse-button {
  animation: pulse 2s infinite;
}

/* Alternative: Using pseudo-element */
.pulse-button-2 {
  position: relative;
}

.pulse-button-2::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 123, 255, 0.5);
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
```

### Chat Box Scroll to Bottom

```css
/* Make last message visible using flex-direction: column-reverse */
.chat-container {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  height: 400px;
}

.message {
  /* Messages render from bottom */
  /* Latest message is always at bottom */
}

/* Alternative: JavaScript approach */
<script>
function scrollToBottom() {
  const container = document.querySelector('.chat-container');
  container.scrollTop = container.scrollHeight;
}

// After adding message
messages.push(newMessage);
setTimeout(scrollToBottom, 0);
</script>

/* Alternative: scroll-snap */
.chat-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}

.message:last-child {
  scroll-snap-align: end;
}
```

---

## Bkash Interview - Specific Questions & Answers

### Q: Output of spread operator with nested objects

```javascript
const a = {
  name: "A",
  address: {
    name: "AAA",
  },
};

const b = { ...a };
b.name = "B";
b.address.name = "BBB";

console.log(a.name);         // "A" (primitive copied)
console.log(b.name);         // "B"
console.log(a.address.name); // "BBB" (reference copied! ⚠️)
console.log(b.address.name); // "BBB"

// Explanation:
// Spread operator creates SHALLOW copy
// - Primitives are copied by value
// - Objects are copied by reference
// - Nested objects share the same reference!

// Fix: Deep copy
const c = structuredClone(a);
// Or
const d = JSON.parse(JSON.stringify(a));
```

### Q: How to serve assets from different locations?

```javascript
// Using CDN with geo-routing

// 1. CloudFront (AWS)
// Automatically routes to nearest edge location
const imageUrl = 'https://d111111abcdef8.cloudfront.net/logo.png';

// 2. Cloudflare
// Similar geo-routing
const assetUrl = 'https://assets.example.com/image.jpg';

// 3. Custom implementation
function getAssetUrl(path) {
  const userRegion = getUserRegion(); // Detect user location
  
  const cdnMap = {
    'us': 'https://us-cdn.example.com',
    'eu': 'https://eu-cdn.example.com',
    'asia': 'https://asia-cdn.example.com'
  };
  
  return `${cdnMap[userRegion] || cdnMap['us']}${path}`;
}

// Usage
<img src={getAssetUrl('/images/logo.png')} alt="Logo" />

// 4. Server-side detection
app.get('/asset-url', (req, res) => {
  const country = req.headers['cloudfront-viewer-country'];
  
  const cdnMap = {
    'US': 'https://us-cdn.example.com',
    'BD': 'https://asia-cdn.example.com'
  };
  
  res.json({
    cdn: cdnMap[country] || cdnMap['US']
  });
});
```

### Q: Passing data from child to parent

```typescript
// Method 1: Callback function
function Parent() {
  const handleDataFromChild = (data: string) => {
    console.log('Data from child:', data);
  };
  
  return <Child onData={handleDataFromChild} />;
}

function Child({ onData }: { onData: (data: string) => void }) {
  return (
    <button onClick={() => onData('Hello from child')}>
      Send Data
    </button>
  );
}

// Method 2: Using ref (advanced)
import { useImperativeHandle, forwardRef } from 'react';

const Child = forwardRef((props, ref) => {
  const [internalValue, setInternalValue] = useState('');
  
  useImperativeHandle(ref, () => ({
    getValue: () => internalValue,
    setValue: (val: string) => setInternalValue(val)
  }));
  
  return <input value={internalValue} onChange={e => setInternalValue(e.target.value)} />;
});

function Parent() {
  const childRef = useRef();
  
  const handleClick = () => {
    const value = childRef.current.getValue();
    console.log('Child value:', value);
  };
  
  return (
    <>
      <Child ref={childRef} />
      <button onClick={handleClick}>Get Child Data</button>
    </>
  );
}

// Method 3: Context (if deeply nested)
const DataContext = createContext();

function Parent() {
  const [dataFromChild, setDataFromChild] = useState(null);
  
  return (
    <DataContext.Provider value={setDataFromChild}>
      <DeepNestedChild />
      <div>Data: {dataFromChild}</div>
    </DataContext.Provider>
  );
}

function DeepNestedChild() {
  const setData = useContext(DataContext);
  
  return (
    <button onClick={() => setData('Hello from deep child')}>
      Send Data Up
    </button>
  );
}
```

### Q: Event bubbling - prevent propagation

```javascript
function Card() {
  const handleCardClick = () => {
    console.log('Card clicked');
  };
  
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent bubbling to card
    console.log('Button clicked');
  };
  
  return (
    <div onClick={handleCardClick}>
      <h3>Card Title</h3>
      <button onClick={handleButtonClick}>
        Delete
      </button>
    </div>
  );
}

// Event flow:
// Capturing: Window → Document → ... → Target
// Target: Element itself
// Bubbling: Target → ... → Document → Window

// Use capture phase
element.addEventListener('click', handler, true); // Capture
element.addEventListener('click', handler, false); // Bubble (default)

// Stop propagation
e.stopPropagation();        // Stop bubbling
e.stopImmediatePropagation(); // Stop ALL handlers

// Prevent default
e.preventDefault(); // Prevent default action (form submit, link navigation)
```

### Q: event.target vs event.currentTarget

```javascript
// event.target: Element that triggered event
// event.currentTarget: Element that has the event listener

document.getElementById('parent').addEventListener('click', (e) => {
  console.log('target:', e.target);           // Clicked element
  console.log('currentTarget:', e.currentTarget); // Parent (has listener)
});

// Example:
<div id="parent">
  <button id="child">Click me</button>
</div>

// Click button:
// e.target = button#child
// e.currentTarget = div#parent

// Real-world usage:
function List() {
  const handleClick = (e) => {
    const button = e.target.closest('button');
    
    if (!button) return;
    
    const itemId = button.dataset.id;
    console.log('Clicked item:', itemId);
  };
  
  return (
    <ul onClick={handleClick}>
      <li><button data-id="1">Item 1</button></li>
      <li><button data-id="2">Item 2</button></li>
    </ul>
  );
}
```

### Q: Tailwind CSS Customization

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: '#007bff',
      },
      
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

// Usage
<div className="bg-primary-500 text-white p-128 rounded-4xl shadow-custom">
  Custom styled element
</div>
```

### Q: TypeScript - Combine User & Driver types

```typescript
// Given:
type User = {
  id: string;
  name: string;
  email: string;
};

type Driver = {
  licenseNumber: string;
  vehicleType: string;
};

// Solution 1: Intersection type
type DriverUser = User & Driver;

const driverUser: DriverUser = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  licenseNumber: 'DL123',
  vehicleType: 'Sedan'
};

// Solution 2: Interface extends (if using interfaces)
interface UserInterface {
  id: string;
  name: string;
  email: string;
}

interface DriverInterface {
  licenseNumber: string;
  vehicleType: string;
}

interface DriverUserInterface extends UserInterface, DriverInterface {}

// Solution 3: Type with utility
type DriverUser2 = User & Driver & {
  hireDate: Date; // Additional properties
};

// Partial combination
type PartialDriverUser = User & Partial<Driver>;
// Driver properties are optional
```

### Q: Next.js Middleware for refreshing tokens

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  if (!token) {
    // Not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // Check if token expires soon (< 5 minutes)
  const expiresIn = (token.exp as number) * 1000 - Date.now();
  
  if (expiresIn < 5 * 60 * 1000) {
    try {
      // Refresh token
      const response = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: req.headers.get('cookie') || ''
        }
      });
      
      if (response.ok) {
        const newToken = await response.json();
        
        // Update cookie
        const res = NextResponse.next();
        res.cookies.set('next-auth.session-token', newToken.sessionToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax'
        });
        
        return res;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
};

// Refresh API endpoint
// app/api/auth/refresh/route.ts
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh-token')?.value;
  
  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 });
  }
  
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    
    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_SECRET,
      { expiresIn: '15m' }
    );
    
    // Generate new refresh token (rotation)
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    
    const response = Response.json({
      accessToken: newAccessToken
    });
    
    // Set new refresh token cookie
    response.cookies.set('refresh-token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });
    
    return response;
  } catch (error) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}
```

---

## GraphQL vs REST

### REST API

```javascript
// REST: Multiple endpoints, multiple requests

// Get user
fetch('/api/users/1')
  .then(r => r.json())
  .then(user => console.log(user));

// Get user's posts
fetch('/api/users/1/posts')
  .then(r => r.json())
  .then(posts => console.log(posts));

// Get post comments
fetch('/api/posts/1/comments')
  .then(r => r.json())
  .then(comments => console.log(comments));

// Problems:
// - Over-fetching (get data you don't need)
// - Under-fetching (need multiple requests)
// - Multiple round trips
```

### GraphQL

```javascript
// GraphQL: Single endpoint, single request

const query = `
  query {
    user(id: 1) {
      id
      name
      email
      posts {
        title
        comments {
          text
          author {
            name
          }
        }
      }
    }
  }
`;

fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
  .then(r => r.json())
  .then(data => console.log(data));

// Benefits:
// - Get exactly what you need
// - Single request
// - Strongly typed
// - Self-documenting

// Using Apollo Client
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      posts {
        title
      }
    }
  }
`;

function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId }
  });
  
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  
  return (
    <div>
      <h1>{data.user.name}</h1>
      {data.user.posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// Mutations
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

function CreateUserForm() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await createUser({
      variables: {
        name: 'Alice',
        email: 'alice@example.com'
      },
      refetchQueries: [{ query: GET_USERS }] // Refresh user list
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Algorithm Patterns

### Pattern 1: Two Pointers

```javascript
// 1. Palindrome check
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// 2. Remove duplicates from sorted array
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let slow = 0;
  
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  
  return slow + 1;
}

// 3. Container with most water
function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    maxArea = Math.max(maxArea, width * height);
    
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}
```

### Pattern 2: Sliding Window

```javascript
// 1. Maximum sum of subarray of size k
function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Initial window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// 2. Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// 3. Minimum window substring
function minWindow(s, t) {
  const need = new Map();
  const have = new Map();
  
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;
  let formed = 0;
  const required = need.size;
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    have.set(char, (have.get(char) || 0) + 1);
    
    if (need.has(char) && have.get(char) === need.get(char)) {
      formed++;
    }
    
    while (formed === required && left <= right) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      
      const leftChar = s[left];
      have.set(leftChar, have.get(leftChar) - 1);
      
      if (need.has(leftChar) && have.get(leftChar) < need.get(leftChar)) {
        formed--;
      }
      
      left++;
    }
  }
  
  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}
```

### Pattern 3: Hash Map

```javascript
// 1. Two Sum
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// 2. Group Anagrams
function groupAnagrams(strs) {
  const map = new Map();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    
    map.get(sorted).push(str);
  }
  
  return Array.from(map.values());
}

groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

// 3. Longest consecutive sequence
function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLength = 0;
  
  for (const num of set) {
    // Only start sequence if num-1 doesn't exist
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;
      
      while (set.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }
      
      maxLength = Math.max(maxLength, currentLength);
    }
  }
  
  return maxLength;
}
```

### Pattern 4: BFS/DFS

```javascript
// 1. Binary Tree Level Order Traversal (BFS)
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}

// 2. Number of Islands (DFS)
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  let count = 0;
  
  function dfs(i, j) {
    if (
      i < 0 || i >= grid.length ||
      j < 0 || j >= grid[0].length ||
      grid[i][j] === '0'
    ) {
      return;
    }
    
    grid[i][j] = '0'; // Mark as visited
    
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}

// 3. Clone Graph (Both BFS and DFS)
function cloneGraph(node) {
  if (!node) return null;
  
  const visited = new Map();
  
  function dfs(node) {
    if (visited.has(node)) {
      return visited.get(node);
    }
    
    const clone = { val: node.val, neighbors: [] };
    visited.set(node, clone);
    
    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    
    return clone;
  }
  
  return dfs(node);
}
```

### Pattern 5: Dynamic Programming

```javascript
// 1. Fibonacci with memoization
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

// Tabulation approach
function fibTabulation(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 2. Climbing Stairs
function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev = 1, curr = 2;
  
  for (let i = 3; i <= n; i++) {
    const temp = curr;
    curr = prev + curr;
    prev = temp;
  }
  
  return curr;
}

// 3. Coin Change
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 4. Longest Increasing Subsequence
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;
  
  const dp = new Array(nums.length).fill(1);
  let maxLen = 1;
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  
  return maxLen;
}
```

---

## React Native (Bonus for Full-Stack Frontend)

### Token Storage in React Native

```typescript
// ❌ Don't use AsyncStorage for sensitive data
import AsyncStorage from '@react-native-async-storage/async-storage';

// ❌ Not secure enough
await AsyncStorage.setItem('token', 'secret-token');

// ✅ Use Encrypted Storage (react-native-encrypted-storage)
import EncryptedStorage from 'react-native-encrypted-storage';

// Secure token storage
async function storeToken(token: string) {
  try {
    await EncryptedStorage.setItem('access_token', token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
}

async function getToken(): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem('access_token');
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
}

async function removeToken() {
  try {
    await EncryptedStorage.removeItem('access_token');
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
}

// ✅ Better: Use Keychain/Keystore (react-native-keychain)
import * as Keychain from 'react-native-keychain';

// Store credentials
async function storeCredentials(username: string, password: string) {
  await Keychain.setGenericPassword(username, password);
}

// Retrieve credentials
async function getCredentials() {
  const credentials = await Keychain.getGenericPassword();
  
  if (credentials) {
    return {
      username: credentials.username,
      password: credentials.password
    };
  }
  
  return null;
}

// Remove credentials
async function removeCredentials() {
  await Keychain.resetGenericPassword();
}
```

---

## Additional Critical Concepts

### Hoisting Deep Dive

```javascript
// Variable hoisting
console.log(a); // undefined (hoisted, not initialized)
var a = 5;

console.log(b); // ReferenceError: Cannot access before initialization
let b = 10;

console.log(c); // ReferenceError
const c = 15;

// Function hoisting
sayHello(); // Works! Function declarations are hoisted
function sayHello() {
  console.log('Hello');
}

sayGoodbye(); // TypeError: sayGoodbye is not a function
var sayGoodbye = function() {
  console.log('Goodbye');
};

// Temporal Dead Zone (TDZ)
{
  // TDZ starts
  console.log(x); // ReferenceError
  // TDZ continues
  let x = 5; // TDZ ends
  console.log(x); // 5
}

// Class hoisting
const p = new Person(); // ReferenceError
class Person {
  constructor(name) {
    this.name = name;
  }
}

// Function vs variable hoisting priority
console.log(foo); // [Function: foo]

var foo = 'variable';
function foo() {
  return 'function';
}

console.log(foo); // 'variable'
```

### Type Coercion

```javascript
// == vs ===

// Loose equality (==) with type coercion
console.log(5 == '5');        // true
console.log(null == undefined); // true
console.log([] == false);     // true
console.log(0 == false);      // true

// Strict equality (===) without coercion
console.log(5 === '5');       // false
console.log(null === undefined); // false
console.log([] === false);    // false
console.log(0 === false);     // false

// Truthy/Falsy values
// Falsy: false, 0, '', null, undefined, NaN
// Everything else is truthy (including [], {}, '0', 'false')

if ([]) {
  console.log('Empty array is truthy!'); // This runs
}

// Coercion examples
console.log('5' + 3);    // '53' (string concatenation)
console.log('5' - 3);    // 2 (numeric subtraction)
console.log('5' * '2');  // 10 (numeric multiplication)
console.log(true + 1);   // 2 (true → 1)
console.log(false + 1);  // 1 (false → 0)
console.log('5' + null); // '5null' (null → 'null')
console.log('5' - null); // 5 (null → 0)

// Nullish coalescing (??) vs OR (||)
const value1 = 0 || 'default';  // 'default' (0 is falsy)
const value2 = 0 ?? 'default';  // 0 (only null/undefined are nullish)

const value3 = '' || 'default'; // 'default' ('' is falsy)
const value4 = '' ?? 'default'; // '' (only null/undefined)

// Optional chaining (?.)
const user = null;
console.log(user?.name);              // undefined (no error)
console.log(user?.address?.city);     // undefined
console.log(user?.getName?.());       // undefined (method call)
console.log(user?.['prop-name']);     // undefined (bracket notation)
```

### Map, Set, WeakMap, WeakSet

```javascript
// Map: Key-value pairs, any type as key
const map = new Map();

map.set('key', 'value');
map.set(1, 'number key');
map.set({}, 'object key');

console.log(map.get('key'));  // 'value'
console.log(map.has('key'));  // true
console.log(map.size);        // 3

map.delete('key');
map.clear();

// Iteration
map.forEach((value, key) => {
  console.log(key, value);
});

for (const [key, value] of map) {
  console.log(key, value);
}

// Set: Unique values
const set = new Set();

set.add(1);
set.add(2);
set.add(2); // Duplicate, ignored

console.log(set.has(1)); // true
console.log(set.size);   // 2

set.delete(1);
set.clear();

// Remove duplicates
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// WeakMap: Keys must be objects, can be garbage collected
const weakMap = new WeakMap();

let obj = { id: 1 };
weakMap.set(obj, 'value');

obj = null; // Object can be garbage collected

// Use case: Private data
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { password: 'secret' });
    this.name = name;
  }
  
  getPassword() {
    return privateData.get(this).password;
  }
}

// WeakSet: Objects only, can be garbage collected
const visited = new WeakSet();

function traverse(node) {
  if (visited.has(node)) return;
  
  visited.add(node);
  // Process node...
}

// Map vs Object
// Map:
// - Any type as key
// - Maintains insertion order
// - Size property
// - Better performance for frequent additions/deletions

// Object:
// - Only string/symbol keys
// - No guaranteed order (though usually insertion order)
// - No size property
// - Better for static structure
```

### ES6+ Features

```javascript
// 1. Destructuring
const { name, age } = user;
const { name: userName, age: userAge = 0 } = user; // Rename, default

const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 2. Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 3. Rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

sum(1, 2, 3, 4); // 10

// 4. Default parameters
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}`;
}

// 5. Template literals
const name = 'Alice';
const age = 30;
console.log(`Name: ${name}, Age: ${age}`);

// Tagged template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}

const message = highlight`Hello ${name}, you are ${age} years old`;

// 6. Arrow functions
const add = (a, b) => a + b;
const square = x => x * x;
const log = () => console.log('Hi');

// 7. Object shorthand
const name = 'Alice';
const age = 30;

const user = { name, age }; // { name: 'Alice', age: 30 }

// Method shorthand
const obj = {
  method() {
    return 'value';
  }
};

// 8. Computed property names
const propName = 'dynamicKey';
const obj = {
  [propName]: 'value',
  [`${propName}2`]: 'value2'
};

// 9. Optional chaining & nullish coalescing
const city = user?.address?.city ?? 'Unknown';

// 10. Promise methods
Promise.all([p1, p2, p3]);      // All must succeed
Promise.race([p1, p2, p3]);     // First to settle
Promise.allSettled([p1, p2]);   // All settle (success or fail)
Promise.any([p1, p2, p3]);      // First to succeed
```

---

## Performance Debugging Checklist

### Identifying Performance Issues

```javascript
// 1. React DevTools Profiler
// - Record interaction
// - Look for:
//   * Components that render too often
//   * Long render times
//   * Expensive calculations

// 2. Chrome DevTools Performance Tab
// - Record
// - Look for:
//   * Long tasks (> 50ms)
//   * Layout thrashing
//   * Excessive garbage collection
//   * Main thread blocking

// 3. Lighthouse
// - Run audit
// - Check:
//   * Performance score
//   * Opportunities
//   * Diagnostics

// 4. Bundle Analysis
// - webpack-bundle-analyzer
// - Look for:
//   * Large dependencies
//   * Duplicate code
//   * Unused exports

// Common Issues & Fixes:

// Issue 1: Large bundle size
// ✅ Fix:
// - Code splitting
// - Tree shaking
// - Remove unused dependencies
// - Use smaller alternatives (date-fns instead of moment)

// Issue 2: Too many re-renders
// ✅ Fix:
// - React.memo for components
// - useMemo for values
// - useCallback for functions
// - Split components

// Issue 3: Slow initial load
// ✅ Fix:
// - Lazy load components
// - Defer non-critical scripts
// - Optimize images
// - Use CDN

// Issue 4: Memory leaks
// ✅ Fix:
// - Clean up effects
// - Remove event listeners
// - Clear timers
// - Unsubscribe from observables

// Issue 5: Jank animations
// ✅ Fix:
// - Use transform instead of top/left
// - Use will-change sparingly
// - Debounce/throttle scroll handlers
// - Use requestAnimationFrame
```

---

# YOU'RE READY! 🚀

## REAL INTERVIEW SCENARIOS & ANSWERS

### Scenario 1: "How would you optimize a React app rendering 100k+ items?"

**Answer:**
```
I would approach this systematically:

1. Virtual Scrolling (react-window):
   - Render only visible items (~20-50)
   - Huge performance gain
   - Example: 100k items → render 30 → 60fps smooth

2. Pagination/Infinite Scroll:
   - Load data in chunks (20-50 items)
   - Fetch more on scroll
   - Reduce initial load time

3. Memoization:
   - React.memo for list items
   - useMemo for filtering/sorting
   - useCallback for event handlers

4. Code Splitting:
   - Lazy load the list component
   - Reduce initial bundle

5. Optimistic Updates:
   - Update UI immediately
   - Sync with server in background

Implementation:
import { FixedSizeList } from 'react-window';

function OptimizedList({ items }) {
  const Row = memo(({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  ));
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Scenario 2: "Memory leak in production—how do you debug?"

**Answer:**
```
Step 1: Reproduce
- Try to reproduce locally
- Check error monitoring (Sentry)
- Review recent deployments

Step 2: Use Chrome DevTools
- Take heap snapshot
- Interact with app
- Take another snapshot
- Compare → look for growing objects

Step 3: Common culprits
- Event listeners not removed
- Timers (setTimeout/setInterval) not cleared
- Closures holding references
- Detached DOM nodes

Step 4: Fix
// ❌ Memory leak
function Component() {
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    // No cleanup!
  }, []);
}

// ✅ Fixed
function Component() {
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer);
  }, []);
}

Step 5: Verify
- Monitor memory usage
- Check heap snapshots
- Ensure memory stabilizes
```

### Scenario 3: "Upgrade library broke component—how to manage?"

**Answer:**
```
1. Check Breaking Changes:
   - Read CHANGELOG/release notes
   - Identify breaking changes
   - Check migration guide

2. Review Error Messages:
   - Stack trace analysis
   - TypeScript errors
   - Console warnings

3. Use Version Range:
   // package.json
   {
     "dependencies": {
       "library": "^1.2.0" // Auto-update patch versions
     }
   }

4. Lock File:
   - Commit package-lock.json
   - Ensures consistent installs
   - npm ci (uses lock file exactly)

5. Testing:
   - Run full test suite
   - Manual testing
   - Check in staging first

6. Gradual Rollout:
   - Feature flag for new version
   - Canary deployment
   - Monitor errors

7. Rollback Plan:
   - Keep old version in git
   - Quick rollback if issues
   - Document the issue
```

### Scenario 4: "Debug performance bottleneck"

**Answer:**
```
1. Identify bottleneck:
   - Chrome DevTools Performance tab
   - React DevTools Profiler
   - Lighthouse audit

2. Common bottlenecks:
   
   a) Excessive re-renders:
   - Use React DevTools Profiler
   - Highlight updates
   - Add React.memo, useMemo, useCallback
   
   b) Large bundle:
   - webpack-bundle-analyzer
   - Remove unused dependencies
   - Code splitting
   
   c) Slow network:
   - Network tab waterfall
   - Reduce requests
   - Use CDN
   - Enable compression
   
   d) Layout thrashing:
   - Performance tab
   - Batch DOM reads/writes
   - Use transform instead of top/left

3. Measure before/after:
   - Web Vitals
   - Lighthouse score
   - Real user metrics (RUM)

4. Implementation:
   // Before: Slow
   function SlowList({ items }) {
     const filtered = items.filter(i => i.active);
     const sorted = filtered.sort((a, b) => b.price - a.price);
     
     return sorted.map(item => <Item item={item} />);
   }
   
   // After: Fast
   const FastList = memo(({ items }) => {
     const processed = useMemo(() => {
       return items
         .filter(i => i.active)
         .sort((a, b) => b.price - a.price);
     }, [items]);
     
     return processed.map(item => (
       <MemoizedItem key={item.id} item={item} />
     ));
   });
```

### Scenario 5: "Implement A/B testing without affecting users"

**Answer:**
```typescript
// Feature Flag System

// 1. Feature Flag Service
interface FeatureFlags {
  newCheckout: boolean;
  redesignedHeader: boolean;
  experimentalFeature: boolean;
}

class FeatureFlagService {
  private flags: Map<string, boolean> = new Map();
  
  async initialize(userId: string) {
    // Fetch flags from server
    const response = await fetch(`/api/flags?userId=${userId}`);
    const flags = await response.json();
    
    Object.entries(flags).forEach(([key, value]) => {
      this.flags.set(key, value as boolean);
    });
  }
  
  isEnabled(flagName: string): boolean {
    return this.flags.get(flagName) || false;
  }
  
  track(flagName: string, event: string) {
    analytics.track('feature-flag-event', {
      flag: flagName,
      event,
      userId: getCurrentUserId()
    });
  }
}

const featureFlags = new FeatureFlagService();

// 2. React Hook
function useFeatureFlag(flagName: string): boolean {
  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    featureFlags.initialize(getCurrentUserId()).then(() => {
      setEnabled(featureFlags.isEnabled(flagName));
    });
  }, [flagName]);
  
  return enabled;
}

// 3. Component Usage
function CheckoutPage() {
  const useNewCheckout = useFeatureFlag('newCheckout');
  
  if (useNewCheckout) {
    return <NewCheckout />;
  }
  
  return <OldCheckout />;
}

// 4. Server-side assignment (A/B test)
app.get('/api/flags', async (req, res) => {
  const userId = req.query.userId;
  
  // Consistent assignment (same user always gets same variant)
  const userHash = hashUserId(userId);
  const variant = userHash % 2; // 0 or 1
  
  const flags = {
    newCheckout: variant === 0, // 50% get new checkout
    redesignedHeader: shouldEnableForUser(userId)
  };
  
  res.json(flags);
});

// 5. Analytics tracking
function Checkout() {
  const useNew = useFeatureFlag('newCheckout');
  
  useEffect(() => {
    featureFlags.track('newCheckout', 'viewed');
  }, []);
  
  const handlePurchase = () => {
    featureFlags.track('newCheckout', 'purchased');
    // ...
  };
  
  return useNew ? <NewCheckout /> : <OldCheckout />;
}
```

---

## Common Interview Questions Bank

### JavaScript Questions (Quick Fire)

**Q1: What's the difference between `null` and `undefined`?**
- `undefined`: Variable declared but not assigned
- `null`: Intentional absence of value

**Q2: What is event bubbling?**
Events propagate from target → ancestors → document → window

**Q3: What are Promises?**
Object representing eventual completion/failure of async operation

**Q4: What is async/await?**
Syntactic sugar over Promises, makes async code look synchronous

**Q5: What are arrow functions?**
Concise syntax, lexical `this`, can't be used as constructors

**Q6: What is destructuring?**
Extract values from objects/arrays into variables

**Q7: What is the spread operator?**
Expands iterables (arrays, objects) into individual elements

**Q8: What are template literals?**
String literals with embedded expressions: `` `Hello ${name}` ``

**Q9: What is a Set?**
Collection of unique values

**Q10: What is a Map?**
Key-value pairs where keys can be any type

### React Questions (Quick Fire)

**Q1: What is Virtual DOM?**
Lightweight copy of actual DOM, React compares and updates efficiently

**Q2: What is reconciliation?**
Process of comparing Virtual DOM with real DOM and updating changes

**Q3: What are React keys?**
Help React identify which items changed, added, or removed

**Q4: What is prop drilling?**
Passing props through multiple levels of components

**Q5: What is Context API?**
Share data across component tree without prop drilling

**Q6: What is React.memo?**
HOC that memoizes component, re-renders only if props change

**Q7: What is useMemo?**
Hook that memoizes computed value

**Q8: What is useCallback?**
Hook that memoizes function reference

**Q9: What is useRef?**
Hook that creates mutable reference that persists across renders

**Q10: What is useReducer?**
Hook for complex state logic, alternative to useState

---

## Final Knowledge Check

### Can you explain these in 1 minute each?

**JavaScript:**
- [ ] How event loop works
- [ ] What closures are and why they're useful
- [ ] The 4 rules of `this` binding
- [ ] Difference between Promise.all and Promise.allSettled
- [ ] How async/await works under the hood

**React:**
- [ ] Component lifecycle
- [ ] When to use useEffect vs useLayoutEffect
- [ ] How to prevent unnecessary re-renders
- [ ] Difference between controlled vs uncontrolled
- [ ] How Context API works

**Performance:**
- [ ] What are Web Vitals (LCP, FID, CLS)
- [ ] Difference between reflow and repaint
- [ ] How to optimize bundle size
- [ ] What is code splitting
- [ ] How virtual scrolling works

**Security:**
- [ ] What is XSS and how to prevent it
- [ ] What is CSRF and how to prevent it
- [ ] Where to store auth tokens
- [ ] What is CSP
- [ ] What are security headers

**Accessibility:**
- [ ] WCAG POUR principles
- [ ] When to use ARIA
- [ ] Keyboard navigation requirements
- [ ] Color contrast requirements
- [ ] How to make forms accessible

If you can explain all of these clearly, you're interview-ready! ✅

---

## Final Checklist

### Knowledge ✅
- [ ] Understand event loop execution
- [ ] Can explain closures with examples
- [ ] Know all `this` binding rules
- [ ] Understand React rendering
- [ ] Can optimize performance
- [ ] Know security best practices
- [ ] Understand accessibility basics

### Skills ✅
- [ ] Can implement debounce/throttle
- [ ] Can write async code correctly
- [ ] Can optimize React components
- [ ] Can debug performance issues
- [ ] Can implement common patterns

### Communication ✅
- [ ] Can explain concepts clearly
- [ ] Can think out loud while coding
- [ ] Can discuss trade-offs
- [ ] Can ask good questions
- [ ] Can handle not knowing something

### Mindset ✅
- [ ] It's a conversation, not interrogation
- [ ] Show thought process
- [ ] Ask for clarification
- [ ] Stay calm under pressure
- [ ] Learn from every interview

---

# REMEMBER DURING INTERVIEW

## DO:
✅ **Ask clarifying questions** before coding  
✅ **Think out loud** - share your reasoning  
✅ **Start simple** - core logic first  
✅ **Test your solution** with examples  
✅ **Discuss trade-offs** and alternatives  
✅ **Communicate** if you're stuck  
✅ **Stay calm** - take a breath if needed  

## DON'T:
❌ **Jump to code** without planning  
❌ **Stay silent** - interviewer can't read your mind  
❌ **Ignore edge cases** - mention them  
❌ **Give up** - show problem-solving process  
❌ **Panic** - every developer gets stuck  
❌ **Memorize without understanding**  

---

# FINAL WORDS

You've prepared thoroughly. You understand:
- **JavaScript** fundamentals and advanced concepts
- **React** patterns and optimization techniques
- **Browser** APIs and rendering pipeline
- **Security** best practices
- **Accessibility** guidelines
- **Performance** optimization strategies
- **System design** principles

## On Interview Day:

1. **Get good sleep** (7-8 hours)
2. **Eat well** before the interview
3. **Join early** (5-10 minutes)
4. **Stay calm** - you've got this!
5. **Be yourself** - authenticity matters
6. **Show enthusiasm** - genuine interest goes far
7. **Ask questions** - shows engagement
8. **Have fun** - it's just a conversation

## Remember:

> "The goal isn't to know everything. It's to demonstrate your **problem-solving ability**, **technical knowledge**, and **communication skills**."

> "Every interview is a learning experience. Even if you don't get the job, you've practiced and improved."

> "You don't need to be perfect. You need to be **competent**, **collaborative**, and **curious**."

---

# 🎯 YOU'VE GOT THIS!

You're prepared. You're capable. You're ready.

Now go crack that interview! 💪🚀

**Good luck!** 🍀

---

## Quick SOS (If You're Stuck in Interview)

**Stuck on a problem?**
- "Let me think about this for a moment..."
- "Can we break this down into smaller parts?"
- "What if we simplify this first, then optimize?"

**Don't know something?**
- "I'm not familiar with X, but here's my approach..."
- "I haven't used X, but I know Y which is similar..."
- "That's a great question. Can you give me a hint?"

**Made a mistake?**
- "Actually, I think there's an issue here. Let me fix it..."
- "Good catch! I need to handle that edge case..."
- "Thanks for pointing that out. Here's the correction..."

**Need time to think?**
- "Let me think through this step by step..."
- "Give me a moment to work through this..."
- "I want to make sure I understand correctly..."

**Remember:**
- **Thinking out loud is good!**
- **Asking questions shows engagement**
- **Admitting uncertainty is honest**
- **Showing problem-solving is the goal**

You've got this! 🚀

---

# COMPREHENSIVE TOPICS COVERAGE SUMMARY

## ✅ What This Guide Covers

### JavaScript (100+ concepts)
- ✅ Event Loop & Async (microtasks, macrotasks, execution order)
- ✅ Closures & Scope (lexical scoping, practical uses)
- ✅ This Keyword (all 5 binding rules)
- ✅ Prototypes & Inheritance (prototype chain, Object.create)
- ✅ Advanced Patterns (module, singleton, factory, observer)
- ✅ Memory Management (garbage collection, leak prevention)
- ✅ ES6+ Features (destructuring, spread, arrow functions, etc.)
- ✅ Promises (all methods, implementation)
- ✅ Async/Await (error handling, parallel execution)
- ✅ Type Coercion (==vs===, truthy/falsy)
- ✅ Hoisting (var, let, const, functions, TDZ)
- ✅ Map, Set, WeakMap, WeakSet
- ✅ Generators & Iterators

### React (80+ concepts)
- ✅ Component Lifecycle (class & functional)
- ✅ Hooks (useState, useEffect, useRef, useMemo, useCallback, useReducer)
- ✅ Performance Optimization (React.memo, virtualization)
- ✅ State Management (Context, Redux, Zustand)
- ✅ Advanced Patterns (HOC, render props, compound components)
- ✅ Error Boundaries
- ✅ Code Splitting & Lazy Loading
- ✅ Keys in Lists
- ✅ Controlled vs Uncontrolled
- ✅ Custom Hooks
- ✅ Testing (Jest, React Testing Library)

### Next.js (40+ concepts)
- ✅ App Router vs Pages Router
- ✅ Server Components vs Client Components
- ✅ Data Fetching (SSR, SSG, ISR, CSR)
- ✅ Dynamic Routes
- ✅ Route Groups & Parallel Routes
- ✅ Middleware
- ✅ Server Actions
- ✅ NextAuth.js (complete implementation)
- ✅ Image Optimization
- ✅ Performance Optimization

### HTML & CSS (70+ concepts)
- ✅ Semantic HTML Elements
- ✅ Box Model & box-sizing
- ✅ Flexbox (complete guide)
- ✅ Grid (complete guide)
- ✅ Positioning (static, relative, absolute, fixed, sticky)
- ✅ Specificity
- ✅ Modern CSS Features (:has, :is, container queries)
- ✅ Responsive Design
- ✅ CSS Units (rem, em, vh, dvh, vw, etc.)
- ✅ Animations & Transitions
- ✅ Transform & GPU Acceleration
- ✅ Combinator Selectors
- ✅ Pseudo-classes & Pseudo-elements
- ✅ SVG & ViewBox

### Browser (50+ concepts)
- ✅ Critical Rendering Path
- ✅ Reflow vs Repaint
- ✅ Event Loop
- ✅ Storage APIs (localStorage, sessionStorage, cookies)
- ✅ Intersection Observer
- ✅ Mutation Observer
- ✅ Resize Observer
- ✅ Performance API
- ✅ Web Vitals (LCP, FID, CLS, FCP, TTFB)
- ✅ Resource Hints (preload, prefetch, preconnect)
- ✅ Script Loading (async, defer)

### Security (40+ concepts)
- ✅ XSS Prevention
- ✅ CSRF Protection
- ✅ Content Security Policy (CSP)
- ✅ Security Headers (complete set)
- ✅ Token Storage (best practices)
- ✅ Authentication & Authorization
- ✅ CORS Configuration
- ✅ Input Validation & Sanitization
- ✅ OWASP Top 10
- ✅ Secure Coding Practices

### Accessibility (35+ concepts)
- ✅ WCAG Guidelines (POUR principles)
- ✅ Semantic HTML
- ✅ ARIA (roles, properties, states)
- ✅ Keyboard Navigation
- ✅ Screen Reader Support
- ✅ Focus Management
- ✅ Color Contrast
- ✅ Accessible Forms
- ✅ Testing (manual & automated)

### Performance (45+ concepts)
- ✅ Bundle Optimization (code splitting, tree shaking)
- ✅ Runtime Optimization (debounce, throttle, memoization)
- ✅ Network Optimization (caching, compression, CDN)
- ✅ Image Optimization (formats, lazy loading, responsive)
- ✅ Font Optimization
- ✅ Critical Rendering Path Optimization
- ✅ Web Workers
- ✅ Service Workers
- ✅ PWA
- ✅ Monitoring & Profiling

### TypeScript (30+ concepts)
- ✅ Type vs Interface
- ✅ Utility Types (Partial, Pick, Omit, Record, etc.)
- ✅ Generics
- ✅ Conditional Types
- ✅ Mapped Types
- ✅ Template Literal Types
- ✅ Type Guards
- ✅ TypeScript with React

### Testing (25+ concepts)
- ✅ Unit Testing (Jest)
- ✅ React Testing Library
- ✅ Integration Testing
- ✅ E2E Testing (Playwright)
- ✅ Testing Hooks
- ✅ Mocking
- ✅ Snapshot Testing

### Build Tools (20+ concepts)
- ✅ Webpack Configuration
- ✅ Vite Configuration
- ✅ Code Splitting
- ✅ Minification & Compression
- ✅ Bundle Analysis

### Advanced Topics (30+ concepts)
- ✅ Service Workers
- ✅ PWA
- ✅ Web Workers
- ✅ WebSockets
- ✅ GraphQL vs REST
- ✅ Micro-frontends
- ✅ System Design

### Production (25+ concepts)
- ✅ CI/CD Pipeline
- ✅ Deployment Strategies
- ✅ Monitoring (Sentry, analytics)
- ✅ Error Tracking
- ✅ Performance Monitoring
- ✅ Security in Production

### Soft Skills (15+ topics)
- ✅ Code Review
- ✅ Mentoring
- ✅ Technical Communication
- ✅ Problem-Solving Framework
- ✅ STAR Method

---

## Total Coverage

**📊 Statistics:**
- **600+ Concepts** explained
- **300+ Code Examples** with explanations
- **100+ Interview Questions** answered
- **50+ Real-world scenarios**
- **30+ Best Practice Guidelines**
- **20+ Complete Implementations**

**📚 What makes this guide special:**
1. **Comprehensive**: Covers everything from basics to advanced
2. **Practical**: Real-world examples and scenarios
3. **Interview-focused**: Common questions with answers
4. **Code-heavy**: Runnable examples for every concept
5. **Structured**: Easy to navigate and review
6. **Progressive**: Builds from fundamentals to advanced
7. **Battle-tested**: Based on real interview experiences

---

## How to Use This Guide

### First-Time Study (4 weeks)
**Week 1:** JavaScript fundamentals + Browser basics  
**Week 2:** React ecosystem + Performance  
**Week 3:** Security + Accessibility + System Design  
**Week 4:** Mock interviews + Review

### Pre-Interview Review (1 day)
**Morning:** Quick Reference Section + Top 50 Questions  
**Afternoon:** Practice implementations  
**Evening:** Relax, light review

### Last Hour Before Interview
**30 min:** Must-Know Implementations  
**20 min:** Common Mistakes to Avoid  
**10 min:** Deep breaths, confidence boost

### During Interview
1. Open "Problem-Solving Framework" section
2. Reference "Interview Strategy" tips
3. Stay calm, you know this!

---

## Success Stories Pattern

### When They Ask: "Tell me about yourself"

```
"I'm a Senior Frontend Developer with X years of experience
specializing in React and TypeScript.

I've built scalable applications serving Y users, focusing on
performance optimization and accessibility.

Recently, I improved page load time by 85% through code splitting
and virtual scrolling, and I'm passionate about writing clean,
maintainable code that delivers great user experiences.

I'm excited about this opportunity because [reason related to role]."

Keep it: 
- Under 90 seconds
- Relevant to role
- Shows impact (numbers/metrics)
- Genuine enthusiasm
```

### When They Ask: "Why should we hire you?"

```
"I bring three key strengths:

1. Technical Depth: I understand not just how to use React,
   but how it works internally - reconciliation, fiber architecture,
   performance optimization.

2. Production Experience: I've debugged memory leaks in production,
   optimized applications serving 100k+ users, and implemented
   robust security practices.

3. Leadership: I mentor junior developers, conduct thorough code
   reviews, and make architectural decisions considering long-term
   maintainability.

I'm not just looking for a job - I want to contribute to building
something meaningful, and I believe my skills align perfectly with
what you're building here."
```

---

# YOUR INTERVIEW SURVIVAL KIT

## If You Forget Something...

**Forgot exact syntax?**
→ "I don't remember the exact syntax, but the concept is..."
→ Show you understand the concept, syntax can be looked up

**Don't know something?**
→ "I haven't worked with X, but I understand Y which is similar..."
→ "That's interesting! Can you tell me more about X?"
→ Show willingness to learn

**Made a mistake?**
→ "Actually, I see an issue here. Let me fix it..."
→ Shows self-awareness and debugging skills

**Need time to think?**
→ "Let me think through this step by step..."
→ "Give me a moment to work through this..."
→ Silence is OK while thinking!

**Completely stuck?**
→ "I'm not sure about the optimal approach. Could you give me a hint?"
→ "Let me break this down into smaller parts..."
→ Show problem-solving process

---

# THE ULTIMATE REMINDER

## What Interviewers REALLY Look For

### Not looking for:
❌ Someone who knows everything  
❌ Someone who codes perfectly first try  
❌ Someone who never gets stuck  
❌ Someone who memorized answers  

### Looking for:
✅ **Clear thinking process**  
✅ **Problem-solving ability**  
✅ **Communication skills**  
✅ **Willingness to learn**  
✅ **Collaboration mindset**  
✅ **Production awareness**  
✅ **Passion for craft**  

---

# LAST WORDS BEFORE YOU GO

## Remember These Truths:

1. **You don't need to be perfect**
   - Even senior developers Google things
   - It's OK to not know something
   - Show how you'd find the answer

2. **Communication > Code**
   - Explain your thinking
   - Ask questions
   - Discuss trade-offs
   - Show collaboration

3. **Process > Solution**
   - How you approach problems matters
   - Show debugging skills
   - Demonstrate learning ability
   - Think systematically

4. **It's a conversation**
   - Not an interrogation
   - Not a test
   - Two-way evaluation
   - Build rapport

5. **Every interview is practice**
   - Learn from each one
   - Get better each time
   - Don't take rejection personally
   - Keep improving

---

## You've Prepared. Now Trust Yourself.

✨ You understand JavaScript deeply  
✨ You know React patterns  
✨ You can optimize performance  
✨ You write secure code  
✨ You build accessible UIs  
✨ You solve problems systematically  
✨ You communicate clearly  
✨ **You're ready**  

---

## On Interview Day:

**Morning:**
- ☕ Good breakfast
- 🧘 Take deep breaths
- 💪 Remind yourself: "I've got this"
- 📖 Quick review of Top 50 questions

**Before Interview:**
- 🖥️ Test your setup
- 📝 Have pen and paper ready
- 💧 Have water nearby
- 😊 Smile (even on video calls!)

**During Interview:**
- 🎯 Listen carefully
- 💬 Think out loud
- ❓ Ask questions
- 🤝 Be yourself
- ✨ Have fun!

**After Interview:**
- 📝 Note what went well
- 📝 Note what to improve
- 🎉 Celebrate that you did it!
- 🚀 Keep learning

---

# 🎯 FINAL MOTIVATION

```
You've spent hours preparing.
You've learned hundreds of concepts.
You've practiced dozens of problems.
You've read thousands of lines of code.

Now it's time to show them what you can do.

Walk in confident.
Think clearly.
Communicate effectively.
Be yourself.

You're not just a developer who codes.
You're a problem solver.
You're a team player.
You're a continuous learner.

They'd be lucky to have you.

Now go ace that interview! 🚀
```

---

# 🏆 YOU'RE READY TO CRACK ANY INTERVIEW!

**This guide covered EVERYTHING:**

📘 **13,000+ lines** of comprehensive content  
💡 **600+ concepts** explained in detail  
💻 **300+ code examples** you can run  
❓ **100+ interview questions** answered  
🎯 **50+ real scenarios** with solutions  
✅ **30+ checklists** for quick reference  

**Remember:**
> "Success is where preparation meets opportunity"

**You've prepared.  
Now go seize the opportunity!**

**Good luck! You've absolutely got this! 💪🚀🎉**

---

## Quick Access Guide

**Interview in 1 hour?** → Read [Top 50 Most Asked Questions](#top-50-most-asked-questions)

**Interview tomorrow?** → Review [Final Knowledge Check](#final-knowledge-check)

**Learning for first time?** → Start from [Part B: JavaScript Mastery](#part-b-javascript-mastery)

**Specific topic?** → Use Table of Contents

**Need confidence boost?** → Read [Final Motivation](#final-motivation)

---

**Created with ❤️ for developers who want to excel**

**Last Updated:** December 25, 2024  
**Version:** 1.0 - Complete Edition

---

*"The expert in anything was once a beginner." - Helen Hayes*

*"The only way to do great work is to love what you do." - Steve Jobs*

*"Code is like humor. When you have to explain it, it's bad." - Cory House*

**Now stop reading and go ace that interview! 🚀**
---

## 🚀 PART P: ADVANCED NETWORKING & PERFORMANCE PATTERNS

### 1. Advanced Networking (tRPC, gRPC, Webhooks)
- **tRPC**: End-to-end typesafe APIs without code generation. It uses TypeScript as the schema. Best for Full-stack TS apps (Next.js).
- **gRPC**: Uses Protocol Buffers (binary) instead of JSON. Extremely fast, but requires a proxy (gRPC-web) for browser use.
- **Webhooks**: "Don't call us, we'll call you." Server pushes data to a client URL when an event happens. Essentially an HTTP POST triggered by the server.

### 2. Modern Loading Patterns
- **Import on Interaction**: Lazy load a component only when the user clicks/hovers (e.g., a Chat Widget).
  ```javascript
  const loadChat = () => import('./ChatWidget').then(mod => mod.show());
  <button onClick={loadChat}>Chat Now</button>
  ```
- **Import on Visibility**: Use `IntersectionObserver` to load a component when it scrolls into view (e.g., a heavy Graph or Video).
- **Prefetch vs Preload**:
  - **Preload**: High priority. Load this NOW because we definitely need it for the current page.
  - **Prefetch**: Low priority. Load this when the browser is idle because the user might need it on the *next* page.

### 3. Tree Shaking & Compression
- **Tree Shaking**: Removing unreachable code. Requires ES Modules (`import/export`).
- **Compression**: Gzip (standard) vs Brotli (Next-gen). Brotli offers 15-20% better compression than Gzip for text assets.

### 4. Modern Web Vitals
- **LCP (Largest Contentful Paint)**: Measures loading performance (< 2.5s).
- **CLS (Cumulative Layout Shift)**: Measures visual stability (< 0.1).
- **INP (Interaction to Next Paint)**: The NEW metric replacing FID. Measures how fast the UI responds to user clicks/keys throughout the entire page lifecycle. (Goal: < 200ms).

### 5. Virtual Lists
When rendering 10k items, don't create 10k DOM nodes. Only render what's visible + a small buffer.
- **Concept**: Compute the scroll offset → figure out which item indices are in view → render only those rows (plus overscan). As the user scrolls, recycle DOM nodes or re-render the visible window.
- **Key metrics**: Item height (fixed vs variable), total count, container height. Variable height is harder (measure on render or estimate).
- **Tools**: `react-window`, `react-virtualized`, `TanStack Virtual`. TanStack Virtual is headless (framework-agnostic) and very flexible; react-window is lightweight and simple for fixed-height lists.
- **When to use**: Long lists (100+ items), feeds, tables, dropdowns with many options. Not needed for small lists.

### 6. Request Deduplication & Caching
- **Deduplication**: If the same request (e.g. `GET /user/1`) is in flight, don't fire a second one—reuse the first promise. Libraries: React Query, SWR, Apollo (for GraphQL).
- **Caching**: Store responses in memory (or SW cache) with a TTL. Stale-while-revalidate: show cached data immediately, refetch in background, then update UI.
- **Cache invalidation**: Invalidate by query key when a mutation affects that data (e.g. after `POST /todos`, invalidate `todos` list).

### 7. Debounce & Throttle (Network & UI)
- **Debounce**: Wait until the user stops doing something for X ms, then run (e.g. search input: wait 300ms after last keystroke before calling API). Reduces API calls.
- **Throttle**: Run at most once every X ms while the action continues (e.g. scroll handler, resize). Keeps UI responsive without firing on every event.
- Use for: search, resize/scroll handlers, button double-clicks, autosave.

### 8. Service Workers & Offline
- **Service Worker**: Script that runs in the background, can intercept fetch requests, cache responses, and serve cached content when offline.
- **Strategies**: Cache-first (offline-first), network-first (fresh data when online), stale-while-revalidate.
- **Use cases**: PWAs, offline support, faster repeat visits, background sync.

---

