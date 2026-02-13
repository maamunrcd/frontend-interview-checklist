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

