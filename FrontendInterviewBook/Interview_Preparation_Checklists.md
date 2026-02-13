# Interview Preparation & Checklists

One place for **timeline**, **must-memorize** facts, and **night-before** checklist. Use with [Interview Strategy](09_Final_Section_Interview_Strategy.md) and [Interview Scenarios & Answers](14_Youre_Ready.md).

---

## 4-Week Preparation Timeline

### Week 1: Fundamentals
- **Mon–Tue:** Event loop, closures, `this`, prototypes
- **Wed–Thu:** Promises, async/await, error handling
- **Fri:** Practice 5 JavaScript problems
- **Weekend:** React hooks deep dive

### Week 2: React & Performance
- **Mon–Tue:** Component patterns, state management
- **Wed–Thu:** Performance optimization, memoization
- **Fri:** Build a feature (e.g. virtualized list)
- **Weekend:** Next.js and SSR concepts

### Week 3: System Design & Practice
- **Mon–Tue:** Frontend system design patterns
- **Wed–Thu:** Algorithm practice (BFS, DFS, DP)
- **Fri:** Machine coding (build a component)
- **Weekend:** Security and accessibility

### Week 4: Integration & Mock Interviews
- **Mon–Tue:** Review all concepts
- **Wed–Thu:** Practice explaining out loud
- **Fri:** Mock interview (full simulation)
- **Weekend:** Final review, relax

---

## Must Memorize Before Interview

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

## The Night Before Interview

### Quick review (30 minutes)

**JavaScript (10 min)**
```javascript
// Event Loop
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2

// Closure, this, deep copy
const copy = structuredClone(obj);
```

**React (10 min)**
```javascript
useEffect(() => {
  fetchData(userId);
  return () => cleanup();
}, [userId]);

const memoized = useMemo(() => expensiveCalc(data), [data]);
const callback = useCallback(() => doSomething(), []);
items.map(item => <Item key={item.id} {...item} />)
```

**Performance & Security (10 min)**
```
LCP: Optimize images, preload, SSR
XSS: Sanitize input, CSP | CSRF: SameSite, token
Tokens: HttpOnly, Secure cookies (server-side)
```

---

## Day-of checklist

- [ ] Good sleep (7–8 hours)
- [ ] Good breakfast
- [ ] Join call early (5–10 min)
- [ ] Test setup (camera, mic, link)
- [ ] Pen and paper, water
- [ ] Quick skim: Top 50 + Must Memorize (above)
