# QUICK REFERENCE

## Top 50 Most Asked Questions

### 🔥 JavaScript Questions (1-20)

#### 1. Event Loop Execution Order
**Question:** What's the output?
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

**Answer:** `1, 4, 3, 2`

**Explanation:**
- **Synchronous** (Call Stack): `1`, `4`
- **Microtasks** (Promise Queue): `3`
- **Macrotasks** (Task Queue): `2`

**Order:** Synchronous → Microtasks → Macrotasks

**Deep dive:** [Event Loop & Async JavaScript](/part-b#event-loop--async-javascript) (Part B)

---

#### 2. Closure Deep Understanding
**Question:** Explain closure with real-world use case

**Answer:**
```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return 'Insufficient funds';
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);   // 1500
account.balance;        // undefined (private!)
```

**Real-world uses:**
- Data privacy/encapsulation
- Module pattern
- Debounce/throttle
- Memoization
- Event handlers

**Deep dive:** [Closures & Scope](/part-b#closures--scope) (Part B)

---

#### 3. This Keyword - All Binding Rules

```javascript
// 1. Default Binding
function globalFunc() {
  console.log(this); // window (or undefined in strict mode)
}

// 2. Implicit Binding
const obj = {
  name: 'Alice',
  greet() { console.log(this.name); }
};
obj.greet(); // 'Alice'

// 3. Explicit Binding (call, apply, bind)
const person = { name: 'Bob' };
function sayHi(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
sayHi.call(person, 'Hi');   // Hi, Bob
sayHi.apply(person, ['Hi']); // Hi, Bob
const bound = sayHi.bind(person);
bound('Hello'); // Hello, Bob

// 4. New Binding
function Car(make) {
  this.make = make;
}
const car = new Car('Toyota'); // this = new object

// 5. Arrow Functions (Lexical this)
const objArrow = {
  name: 'Test',
  arrow: () => console.log(this.name) // undefined (lexical)
};
```

**Deep dive:** [This Keyword](/part-b#this-keyword) (Part B)

---

#### 4. Shallow vs Deep Copy

```javascript
const original = {
  name: 'Alice',
  address: {
    city: 'NYC'
  }
};

// ❌ Shallow copy (nested objects share reference)
const shallow = { ...original };
shallow.address.city = 'LA';
console.log(original.address.city); // 'LA' (modified!)

// ✅ Deep copy - Method 1: structuredClone
const deep1 = structuredClone(original);

// ✅ Deep copy - Method 2: JSON (limitations!)
const deep2 = JSON.parse(JSON.stringify(original));
// ❌ Fails with: Date, undefined, functions, Symbol, circular refs

// ✅ Deep copy - Method 3: Recursive
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj); // Circular ref
  
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}
```

---

#### 5. Debounce vs Throttle

```javascript
// DEBOUNCE: Wait for pause
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Use case: Search input
const searchAPI = debounce((query) => {
  fetch(`/api/search?q=${query}`);
}, 300);

// THROTTLE: Limit frequency
function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Use case: Scroll event
const trackScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100);
```

---

#### 6. Event Delegation

```javascript
// ❌ Bad: Multiple listeners
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// ✅ Good: Single listener on parent
document.getElementById('list').addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  
  const id = button.dataset.id;
  console.log('Clicked button:', id);
});

// Benefits:
// - Better performance
// - Works with dynamically added elements
// - Less memory usage
```

---

#### 7. Prototype Chain

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};

const alice = new Person('Alice');

// Prototype chain:
// alice → Person.prototype → Object.prototype → null

console.log(alice.greet()); // 'Hello, Alice'
console.log(alice.__proto__ === Person.prototype); // true
console.log(alice.constructor === Person); // true

// What happens with 'new':
// 1. Create empty object: {}
// 2. Set prototype: obj.__proto__ = Person.prototype
// 3. Call constructor: Person.call(obj, 'Alice')
// 4. Return object
```

---

#### 8. Promises Deep Dive

```javascript
// Promise states: pending → fulfilled/rejected

// Promise.all: All must succeed
Promise.all([p1, p2, p3])
  .then(results => console.log(results))
  .catch(err => console.log('One failed:', err)); // Fail fast

// Promise.allSettled: All settle (success or fail)
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach(r => {
      if (r.status === 'fulfilled') console.log(r.value);
      else console.log(r.reason);
    });
  });

// Promise.race: First to settle wins
Promise.race([p1, p2, p3])
  .then(result => console.log('First:', result));

// Promise.any: First to fulfill wins
Promise.any([p1, p2, p3])
  .then(result => console.log('First success:', result))
  .catch(err => console.log('All failed'));

// Implementation of Promise.all:
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Fail fast
    });
  });
}
```

---

#### 9. Async/Await Best Practices

```javascript
// ❌ Bad: Sequential (slow)
async function sequential() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  return { user, posts, comments };
}

// ✅ Good: Parallel (fast)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  return { user, posts, comments };
}

// ❌ Bad: No error handling
async function noErrorHandling() {
  const data = await fetch('/api/data');
  return data.json();
}

// ✅ Good: Error handling
async function withErrorHandling() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; // Re-throw or handle
  }
}

// ❌ Bad: async without await
async function unnecessary() {
  return fetch('/api'); // Just return the promise!
}

// ✅ Good: No async needed
function better() {
  return fetch('/api');
}
```

---

#### 10. Memoization

```javascript
// Simple memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Fibonacci with memoization
const fib = memoize((n) => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // Fast!

// Async memoization
function memoizeAsync(fn) {
  const cache = new Map();
  const pending = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) return cache.get(key);
    if (pending.has(key)) return pending.get(key);
    
    const promise = fn(...args)
      .then(result => {
        cache.set(key, result);
        pending.delete(key);
        return result;
      })
      .catch(err => {
        pending.delete(key);
        throw err;
      });
    
    pending.set(key, promise);
    return promise;
  };
}
```

---

#### 11. Curry Function

```javascript
// Manual curry
function add(a, b, c) {
  return a + b + c;
}

function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

curriedAdd(1)(2)(3); // 6

// Generic curry implementation
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

const curriedAdd2 = curry(add);
curriedAdd2(1)(2)(3); // 6
curriedAdd2(1, 2)(3); // 6
curriedAdd2(1)(2, 3); // 6
```

---

#### 12. Array Methods Deep Dive

```javascript
// map, filter, reduce implementations

Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  
  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  
  return accumulator;
};

// Practical reduce examples
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];

// Group by role
const grouped = users.reduce((acc, user) => {
  const { role, name } = user;
  if (!acc[role]) acc[role] = [];
  acc[role].push(name);
  return acc;
}, {});
// { admin: ['Alice', 'Charlie'], user: ['Bob'] }

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { apple: 3, banana: 2, orange: 1 }
```

---

#### 13. Flatten Array

```javascript
// Recursive flatten
function flatten(arr, depth = 1) {
  if (depth <= 0) return arr.slice();
  
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

const nested = [1, [2, [3, [4, [5]]]]];
flatten(nested, 1);      // [1, 2, [3, [4, [5]]]]
flatten(nested, 2);      // [1, 2, 3, [4, [5]]]
flatten(nested, Infinity); // [1, 2, 3, 4, 5]

// Built-in
nested.flat(2); // [1, 2, 3, [4, [5]]]
```

---

#### 14. Deep Equality Check

```javascript
function deepEqual(a, b) {
  // Same reference
  if (a === b) return true;
  
  // Null/undefined check
  if (a == null || b == null) return false;
  
  // Type check
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  // Array check
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  
  // Keys check
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  // Recursive check
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  
  return true;
}

deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
deepEqual({ a: 1 }, { a: '1' }); // false
```

---

#### 15. Remove Duplicates

```javascript
// Simple primitives
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// Objects with deep comparison
function removeDuplicatesDeep(arr) {
  const seen = new Set();
  return arr.filter(item => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
];
removeDuplicatesDeep(users); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// By specific property
const uniqueById = [...new Map(users.map(u => [u.id, u])).values()];
```

---

#### 16. First Non-Repeating Character

```javascript
function firstNonRepeatingChar(str) {
  const freq = {};
  
  // Count frequencies
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // Find first with count 1
  for (const char of str) {
    if (freq[char] === 1) return char;
  }
  
  return null;
}

firstNonRepeatingChar('aabbcde'); // 'c'
firstNonRepeatingChar('aabbcc');  // null
```

---

#### 17. Check Palindrome

```javascript
function isPalindrome(str) {
  // Normalize: lowercase, remove non-alphanumeric
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}

isPalindrome('A man, a plan, a canal: Panama'); // true
isPalindrome('race a car'); // false

// Two-pointer approach (more efficient)
function isPalindrome2(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = normalized.length - 1;
  
  while (left < right) {
    if (normalized[left] !== normalized[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

---

#### 18. Reverse String

```javascript
// Built-in
const reversed = str.split('').reverse().join('');

// Loop
function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// Recursive
function reverseStringRecursive(str) {
  if (str.length <= 1) return str;
  return reverseStringRecursive(str.slice(1)) + str[0];
}

// Two-pointer (in-place for array)
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
```

---

#### 19. Merge Two Sorted Arrays

```javascript
function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  
  // Add remaining elements
  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}

mergeSorted([1, 3, 5], [2, 4, 6]); // [1, 2, 3, 4, 5, 6]
```

---

#### 20. Array Intersection

```javascript
function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return [...new Set(arr1.filter(x => set2.has(x)))];
}

intersection([1, 2, 3, 4], [3, 4, 5, 6]); // [3, 4]

// With duplicates count
function intersectionWithCount(arr1, arr2) {
  const freq1 = {};
  const freq2 = {};
  
  arr1.forEach(x => freq1[x] = (freq1[x] || 0) + 1);
  arr2.forEach(x => freq2[x] = (freq2[x] || 0) + 1);
  
  const result = [];
  for (const key in freq1) {
    if (freq2[key]) {
      const count = Math.min(freq1[key], freq2[key]);
      for (let i = 0; i < count; i++) {
        result.push(Number(key));
      }
    }
  }
  return result;
}
```

---

### 🔥 React Questions (21-35)

#### 21. Component vs Element

```javascript
// Element: Plain object, immutable
const element = <h1>Hello</h1>;
// Actually: { type: 'h1', props: { children: 'Hello' } }

// Component: Function or class, reusable
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

---

#### 22. Rules of Hooks

```javascript
// ✅ Do: Top level
function Component() {
  const [state, setState] = useState(0);
  const [data, setData] = useState(null);
  
  return <div>{state}</div>;
}

// ❌ Don't: Inside conditions
function Bad() {
  if (condition) {
    const [state, setState] = useState(0); // ERROR!
  }
}

// ❌ Don't: Inside loops
function Bad2() {
  for (let i = 0; i < 10; i++) {
    const [state, setState] = useState(i); // ERROR!
  }
}

// ❌ Don't: Regular JavaScript function
function regularFunction() {
  const [state, setState] = useState(0); // ERROR!
}

// Why? React relies on call order to track hooks
```

---

#### 23. useEffect Deep Dive

```javascript
// Empty deps: Run once (componentDidMount)
useEffect(() => {
  console.log('Mounted');
}, []);

// No deps: Run on every render
useEffect(() => {
  console.log('Every render');
});

// With deps: Run when deps change
useEffect(() => {
  console.log('Count changed');
}, [count]);

// Cleanup function (componentWillUnmount)
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  
  return () => {
    clearInterval(timer); // Cleanup!
  };
}, []);

// Common pitfalls:

// ❌ Missing dependency
useEffect(() => {
  fetchData(userId); // userId not in deps!
}, []); // Stale closure!

// ✅ Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ Async useEffect
useEffect(async () => { // DON'T!
  const data = await fetch();
}, []);

// ✅ Async inside useEffect
useEffect(() => {
  async function loadData() {
    const data = await fetch();
    setData(data);
  }
  loadData();
}, []);
```

---

#### 24. useLayoutEffect vs useEffect

```javascript
// useEffect: Async, after paint
useEffect(() => {
  // Runs AFTER browser paints
  // Use for: data fetching, subscriptions
}, []);

// useLayoutEffect: Sync, before paint
useLayoutEffect(() => {
  // Runs BEFORE browser paints
  // Use for: DOM measurements, preventing flicker
  const height = ref.current.offsetHeight;
  setHeight(height);
}, []);

// Example: Preventing flicker
function Component() {
  const ref = useRef();
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  
  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setTooltipPos({ x: rect.left, y: rect.top });
  }, []);
  
  return (
    <div ref={ref}>
      <Tooltip style={{ left: tooltipPos.x, top: tooltipPos.y }} />
    </div>
  );
}
```

---

#### 25. useMemo vs useCallback vs React.memo

```javascript
// useMemo: Memoize COMPUTED VALUE
function Component({ items }) {
  const expensiveValue = useMemo(() => {
    console.log('Computing...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
}

// useCallback: Memoize FUNCTION REFERENCE
function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ New function every render
  const handleClick = () => console.log('Clicked');
  
  // ✅ Stable function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Dependencies
  
  return <MemoizedChild onClick={handleClick} />;
}

// React.memo: Memoize COMPONENT
const MemoizedChild = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

// Custom comparison
const MemoizedChild2 = React.memo(
  ({ data }) => <div>{data.value}</div>,
  (prevProps, nextProps) => {
    return prevProps.data.id === nextProps.data.id;
  }
);
```

---

#### 26. Controlled vs Uncontrolled Components

```javascript
// Controlled: React manages state
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// Uncontrolled: DOM manages state
function UncontrolledInput() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return (
    <>
      <input ref={inputRef} defaultValue="Initial" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

// When to use which?
// Controlled: Form validation, dynamic behavior
// Uncontrolled: Simple forms, file inputs
```

---

#### 27. Context API Optimization

```javascript
// ❌ Bad: Single context (everything re-renders)
const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ Good: Separate contexts
const UserContext = createContext();
const ThemeContext = createContext();

// ✅ Better: Split value and updater
const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

// Usage
function Component() {
  const theme = useContext(ThemeContext); // Only re-renders on theme change
  const setTheme = useContext(ThemeUpdateContext); // Never re-renders
}
```

---

#### 28. Higher-Order Component (HOC)

```javascript
// HOC: Function that takes component, returns enhanced component
function withAuth(Component) {
  return function AuthComponent(props) {
    const { user, loading } = useAuth();
    
    if (loading) return <Spinner />;
    if (!user) return <Redirect to="/login" />;
    
    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// Multiple HOCs
const EnhancedComponent = withAuth(withLogging(withAnalytics(Component)));

// Better: Composition
function EnhancedComponent(props) {
  return (
    <AuthProvider>
      <LoggingProvider>
        <AnalyticsProvider>
          <Component {...props} />
        </AnalyticsProvider>
      </LoggingProvider>
    </AuthProvider>
  );
}
```

---

#### 29. Render Props Pattern

```javascript
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {render(pos)}
    </div>
  );
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <h2>Mouse at {x}, {y}</h2>
  )}
/>

// Children as function
function DataProvider({ url, children }) {
  const [data, loading, error] = useFetch(url);
  
  return children({ data, loading, error });
}

<DataProvider url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error error={error} />;
    return <UserList users={data} />;
  }}
</DataProvider>
```

---

#### 30. Custom Hooks

```javascript
// useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}

// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [value, setStoredValue];
}
```

---

#### 31. Error Boundaries

```javascript
// Must be class component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>

// What Error Boundaries DON'T catch:
// - Event handlers (use try-catch)
// - Async code (setTimeout, promises)
// - Server-side rendering
// - Errors in error boundary itself
```

---

#### 32. Keys in Lists

```javascript
// ❌ Bad: Index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
// Problems: Wrong item updates, lost state, poor performance

// ✅ Good: Unique stable ID
{items.map(item => (
  <Item key={item.id} {...item} />
))}

// ❌ Bad: Random key
{items.map(item => (
  <Item key={Math.random()} {...item} />
))}
// Problem: New key every render → full re-mount

// ✅ Good: Composite key
{items.map((item, index) => (
  <Item key={`${item.type}-${item.id || index}`} {...item} />
))}

// Why keys matter:
// - React uses keys to identify elements
// - Helps with efficient re-rendering
// - Preserves component state
// - Optimizes reconciliation
```

---

#### 33. Preventing Unnecessary Re-renders

```javascript
// 1. React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering...');
  return <div>{data}</div>;
});

// 2. useMemo for expensive calculations
function Component({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  return <div>Total: {total}</div>;
}

// 3. useCallback for stable functions
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <MemoizedChild onClick={handleClick} />;
}

// 4. Split components
// ❌ Bad: Entire form re-renders on any field change
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  return (
    <>
      <Input value={name} onChange={setName} />
      <Input value={email} onChange={setEmail} />
      <Input value={address} onChange={setAddress} />
      <ExpensiveComponent /> {/* Re-renders unnecessarily */}
    </>
  );
}

// ✅ Good: Split into smaller components
function NameField() {
  const [name, setName] = useState('');
  return <Input value={name} onChange={setName} />;
}
```

---

#### 34. Component Composition

```javascript
// Instead of prop drilling, use composition

// ❌ Prop drilling
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} />;
}
function Layout({ user }) {
  return <Sidebar user={user} />;
}
function Sidebar({ user }) {
  return <UserMenu user={user} />;
}

// ✅ Composition
function App() {
  const [user, setUser] = useState(null);
  return (
    <Layout sidebar={<Sidebar><UserMenu user={user} /></Sidebar>}>
      <Content />
    </Layout>
  );
}

// Compound components
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeTab,
      onActivate: () => setActiveTab(index)
    });
  });
}

function Tab({ label, isActive, onActivate, children }) {
  return (
    <div>
      <button onClick={onActivate}>{label}</button>
      {isActive && <div>{children}</div>}
    </div>
  );
}

// Usage
<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
</Tabs>
```

---

#### 35. Virtual Scrolling (Large Lists)

```javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}        // Container height
      itemCount={items.length}
      itemSize={50}       // Each item height
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}

// Variable size list
import { VariableSizeList } from 'react-window';

function VariableList({ items }) {
  const getItemSize = (index) => {
    return items[index].expanded ? 200 : 50;
  };
  
  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].content}
        </div>
      )}
    </VariableSizeList>
  );
}
```

---

### 🔥 Next.js Questions (36-45)

#### 36. Server Components vs Client Components

```javascript
// Server Component (default in App Router)
// - Runs on server
// - Can access database directly
// - Smaller bundle size
// - No hooks, no interactivity
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // SSR
  });
  
  return <div>{data.title}</div>;
}

// Client Component
// - Runs on client
// - Can use hooks
// - Can handle events
// - Adds to bundle size
'use client';

function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// When to use which?
// Server: Data fetching, static content
// Client: Interactivity, hooks, browser APIs
```

---

#### 37. Data Fetching Strategies

```javascript
// 1. SSR (Server-Side Rendering) - Always fresh
async function Page() {
  const data = await fetch('https://api.example.com', {
    cache: 'no-store'
  });
  return <div>{data.content}</div>;
}

// 2. SSG (Static Site Generation) - Build time
async function Page() {
  const data = await fetch('https://api.example.com', {
    cache: 'force-cache'
  });
  return <div>{data.content}</div>;
}

// 3. ISR (Incremental Static Regeneration) - Revalidate
async function Page() {
  const data = await fetch('https://api.example.com', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  return <div>{data.content}</div>;
}

// 4. CSR (Client-Side Rendering)
'use client';

function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []);
  
  if (!data) return <Loading />;
  return <div>{data.content}</div>;
}
```

---

#### 38. NextAuth.js Authentication Flow

```javascript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        // 1. signIn callback: Authenticate
        const user = await validateUser(credentials);
        if (user) return user;
        return null;
      }
    })
  ],
  
  callbacks: {
    // 2. jwt callback: Create/update token
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    
    // 3. session callback: Create session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
    
    // 4. redirect callback: Handle redirects
    async redirect({ url, baseUrl }) {
      // Prevent open redirects
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return baseUrl + url;
      return baseUrl;
    }
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  pages: {
    signIn: '/login',
    error: '/auth/error',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Usage in component
import { useSession } from 'next-auth/react';

function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <Loading />;
  if (status === 'unauthenticated') return <Login />;
  
  return <div>Hello, {session.user.email}</div>;
}
```

---

#### 39. Server Actions (Next.js 14+)

```javascript
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Server-side logic
  await db.user.create({ data: { name, email } });
  
  revalidatePath('/users');
  return { success: true };
}

// app/components/Form.tsx
'use client';

import { createUser } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create User'}
    </button>
  );
}

export function UserForm() {
  const [state, formAction] = useFormState(createUser, null);
  
  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <SubmitButton />
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

---

#### 40. Route Groups & Parallel Routes

```javascript
// Route Groups: Organize without affecting URL
app/
  (auth)/
    login/
      page.tsx        // /login
    register/
      page.tsx        // /register
  (dashboard)/
    profile/
      page.tsx        // /profile
    settings/
      page.tsx        // /settings

// Parallel Routes: Render multiple pages simultaneously
app/
  @modal/
    login/
      page.tsx
  @sidebar/
    page.tsx
  layout.tsx

// layout.tsx
export default function Layout({ children, modal, sidebar }) {
  return (
    <>
      <div className="sidebar">{sidebar}</div>
      <main>{children}</main>
      {modal}
    </>
  );
}
```

---

### 🔥 HTML/CSS Questions (41-45)

#### 41. Semantic HTML Importance

```html
<!-- ❌ Bad: Non-semantic -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="content">
  <div class="article">...</div>
</div>

<!-- ✅ Good: Semantic -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>

<!-- Benefits:
- SEO: Search engines understand structure
- Accessibility: Screen readers navigate better
- Maintainability: Self-documenting code
-->
```

---

#### 42. CSS Box Model & box-sizing

```css
.element {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}

/* box-sizing: content-box (default) */
/* Total width = 200 + 40 (padding) + 10 (border) = 250px */

/* box-sizing: border-box */
.element {
  box-sizing: border-box;
  width: 200px; /* Total width = 200px (includes padding + border) */
}

/* Best practice: Set globally */
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

#### 43. Flexbox vs Grid

```css
/* Flexbox: One-dimensional (row OR column) */
.flex-container {
  display: flex;
  justify-content: space-between; /* Main axis */
  align-items: center;             /* Cross axis */
  gap: 1rem;
}

/* Use for: Navbar, cards row, centering */

/* Grid: Two-dimensional (rows AND columns) */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

/* Use for: Page layout, dashboard, complex layouts */

/* Responsive Grid (no media queries needed!) */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

---

#### 44. CSS Specificity

```css
/* Specificity calculation:
   !important    → 10000
   Inline styles → 1000
   IDs (#)       → 100
   Classes (.)   → 10
   Elements      → 1
*/

/* Examples: */
#header .nav li          /* 0-1-1-1 = 111 */
.nav .item              /* 0-0-2-0 = 20 */
div.nav                 /* 0-0-1-1 = 11 */
div                     /* 0-0-0-1 = 1 */

/* Tie-breaker: Last rule wins */

/* Avoid !important unless absolutely necessary */
```

---

#### 45. Modern CSS Features

```css
/* 1. :has() - Parent selector */
form:has(input:invalid) {
  border: 2px solid red;
}

.card:has(img) {
  padding: 0;
}

/* 2. :is() - Grouping selector */
:is(h1, h2, h3, h4, h5, h6) {
  margin-top: 0;
}

/* 3. Container Queries */
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* 4. Logical Properties (for RTL/LTR) */
.element {
  margin-inline-start: 1rem; /* Left in LTR, right in RTL */
  padding-block: 2rem;       /* Top and bottom */
}

/* 5. clamp() for responsive typography */
.heading {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* min: 1.5rem, preferred: 5vw, max: 3rem */
}
```

---

## Must-Know Code Implementations

### 1. Event Delegation
```javascript
document.getElementById('list').addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  console.log('Clicked:', button.dataset.id);
});
```

### 2. Virtual Scrolling
```javascript
function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 3. Intersection Observer (Lazy Loading)
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '50px', threshold: 0.1 }
  );
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
  
  return () => observer.disconnect();
}, []);
```

### 4. Multi-Source BFS (Zombie Spread)
```javascript
function zombieSpread(grid, zombies, hours) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  const infected = new Set();
  
  // Initialize with all zombies
  for (const { row, col } of zombies) {
    const key = `${row},${col}`;
    queue.push([row, col, 0]);
    infected.add(key);
  }
  
  const directions = [[0,1], [0,-1], [1,0], [-1,0]];
  
  while (queue.length > 0) {
    const [row, col, time] = queue.shift();
    if (time >= hours) continue;
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const key = `${newRow},${newCol}`;
      
      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        !infected.has(key)
      ) {
        infected.add(key);
        queue.push([newRow, newCol, time + 1]);
      }
    }
  }
  
  return infected;
}
```

---

## Interview Day Checklist

### 30 Minutes Before Interview

#### Quick Review Topics:
- [ ] Event loop execution order (sync → microtasks → macrotasks)
- [ ] Closure examples (data privacy, memoization)
- [ ] `this` binding (4 rules)
- [ ] Promise.all vs Promise.allSettled
- [ ] Debounce vs Throttle
- [ ] useEffect dependencies
- [ ] useMemo vs useCallback vs React.memo
- [ ] Keys in lists (why they matter)
- [ ] Server Components vs Client Components
- [ ] Web Vitals (FCP, LCP, CLS)

#### Environment Setup:
- [ ] Test coding environment
- [ ] Check internet connection
- [ ] Have backup (phone hotspot)
- [ ] Close unnecessary applications
- [ ] Have water and notes nearby

#### Mental Preparation:
- [ ] Good sleep (7-8 hours)
- [ ] Eat well before interview
- [ ] Join 5-10 minutes early
- [ ] Take deep breaths, stay calm

### During Interview:

#### Problem-Solving Framework:
1. **Clarify** (2-3 min): Restate problem, ask about edge cases
2. **Plan** (3-5 min): Discuss approach, explain trade-offs
3. **Implement** (15-20 min): Think out loud, write clean code
4. **Test** (3-5 min): Walk through examples, analyze complexity

#### Communication:
- ✅ Think out loud
- ✅ Ask clarifying questions
- ✅ Discuss trade-offs
- ✅ Explain your reasoning
- ✅ Admit when unsure

#### Don't:
- ❌ Jump to code immediately
- ❌ Stay silent
- ❌ Give up
- ❌ Memorize without understanding
- ❌ Panic

---

## Common Mistakes to Avoid

### JavaScript:
1. Not understanding closure scope
2. Confusing `==` vs `===`
3. Not handling async errors
4. Forgetting `this` context in callbacks
5. Mutating state directly

### React:
1. Missing useEffect dependencies
2. Using index as key
3. Not memoizing expensive calculations
4. Prop drilling instead of composition
5. Not cleaning up effects

### Performance:
1. Not lazy loading images/components
2. Rendering large lists without virtualization
3. Not optimizing bundle size
4. Ignoring Web Vitals
5. Not using memoization appropriately

### Security:
1. Storing tokens in localStorage (use HttpOnly cookies)
2. Not sanitizing user input
3. Missing CSP headers
4. Exposing API keys in frontend
5. Not validating on backend

### Accessibility:
1. Missing alt text on images
2. Not using semantic HTML
3. Poor keyboard navigation
4. Low color contrast
5. Missing ARIA labels

---

