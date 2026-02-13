# REACT ECOSYSTEM

## React Core Concepts

### Component Lifecycle Deep Dive

```javascript
// Class Component Lifecycle
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null; // or new state
  }
  
  componentDidMount() {
    console.log('4. componentDidMount');
    // After first render
    // Good for: API calls, subscriptions, timers
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate');
    // Return false to prevent re-render
    return true;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('6. getSnapshotBeforeUpdate');
    // Called before DOM updates
    return null; // or snapshot value
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('7. componentDidUpdate');
    // After re-render
    // Good for: Responding to prop/state changes
  }
  
  componentWillUnmount() {
    console.log('8. componentWillUnmount');
    // Before component removed
    // Good for: Cleanup (timers, subscriptions)
  }
  
  render() {
    console.log('3. Render');
    return <div>{this.state.count}</div>;
  }
}

// Functional Component with Hooks
function FunctionalComponent() {
  const [count, setCount] = useState(0);
  
  // Runs on every render
  console.log('Component body executes');
  
  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Effect runs');
  });
  
  // componentDidMount only
  useEffect(() => {
    console.log('Mount only');
  }, []);
  
  // componentDidUpdate (when count changes)
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('Cleanup/Unmount');
    };
  }, []);
  
  return <div>{count}</div>;
}
```

### useState Deep Dive

```javascript
// Lazy initialization (expensive computation)
const [state, setState] = useState(() => {
  const initialState = expensiveComputation();
  return initialState;
});

// Functional updates (when new state depends on old)
const [count, setCount] = useState(0);

// ❌ May be stale
const increment = () => setCount(count + 1);

// ✅ Always correct
const increment = () => setCount(prev => prev + 1);

// Multiple updates batched
const handleClick = () => {
  setCount(prev => prev + 1); // 1
  setCount(prev => prev + 1); // 2
  setCount(prev => prev + 1); // 3
  // Final count: 3
};

// Object state (immutable updates)
const [user, setUser] = useState({
  name: 'Alice',
  age: 30,
  address: { city: 'NYC' }
});

// ❌ Mutating
user.name = 'Bob'; // Don't do this!

// ✅ Immutable update (shallow)
setUser({ ...user, name: 'Bob' });

// ✅ Nested update
setUser({
  ...user,
  address: {
    ...user.address,
    city: 'LA'
  }
});

// Better: Use Immer for nested updates
import { produce } from 'immer';

setUser(produce(draft => {
  draft.address.city = 'LA';
}));
```

### useReducer for Complex State

```javascript
const initialState = {
  loading: false,
  data: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    
    case 'FETCH_ERROR':
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
}

function Component() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      });
  }, []);
  
  if (state.loading) return <Loading />;
  if (state.error) return <Error message={state.error} />;
  return <Data data={state.data} />;
}

// When to use useReducer vs useState:
// useState: Simple state (string, number, boolean)
// useReducer: Complex state with multiple sub-values
//             State transitions follow specific logic
//             Next state depends on previous state
```

### useRef - All Use Cases

```javascript
function Component() {
  // 1. DOM reference
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  // 2. Store mutable value (doesn't trigger re-render)
  const countRef = useRef(0);
  
  const increment = () => {
    countRef.current += 1;
    console.log(countRef.current); // Updates without re-render
  };
  
  // 3. Store previous value
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  const prevCount = prevCountRef.current;
  
  // 4. Store timer/interval ID
  const timerRef = useRef(null);
  
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };
  
  // 5. Instance variable (like class instance variable)
  const instanceRef = useRef({
    renderCount: 0,
    lastUpdate: null
  });
  
  instanceRef.current.renderCount += 1;
  instanceRef.current.lastUpdate = Date.now();
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// useRef vs useState:
// useState: Triggers re-render when changed
// useRef: Doesn't trigger re-render when changed
```

---

## State Management Deep Dive

### Context API - Complete Guide

```javascript
// 1. Create Context
const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

// 2. Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

// 3. Custom Hooks for consuming context
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function useThemeUpdate() {
  const context = useContext(ThemeUpdateContext);
  if (context === undefined) {
    throw new Error('useThemeUpdate must be used within ThemeProvider');
  }
  return context;
}

// 4. Usage in components
function ThemedButton() {
  const theme = useTheme(); // Only re-renders on theme change
  const toggleTheme = useThemeUpdate(); // Never re-renders
  
  return (
    <button
      onClick={toggleTheme}
      style={{ background: theme === 'light' ? '#fff' : '#000' }}
    >
      Toggle Theme
    </button>
  );
}

// 5. App wrapper
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Redux - Complete Implementation

```javascript
// 1. Actions
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const SET_VALUE = 'counter/setValue';

// Action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const setValue = (value) => ({ type: SET_VALUE, payload: value });

// Async action (with thunk)
const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: 'user/fetchStart' });
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    dispatch({ type: 'user/fetchSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'user/fetchError', payload: error.message });
  }
};

// 2. Reducer
const initialState = {
  count: 0
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    
    case SET_VALUE:
      return { ...state, count: action.payload };
    
    default:
      return state;
  }
}

// 3. Store
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// 4. React Integration
import { Provider, useSelector, useDispatch } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

### Redux Toolkit (Modern Redux)

```javascript
// 1. Create Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
    },
    updateUser: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;

// 2. Configure Store
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  }
});

// 3. Usage in Components
function UserProfile() {
  const { data, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUser(123));
  }, [dispatch]);
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return <div>{data?.name}</div>;
}
```

### Zustand (Lightweight Alternative)

```javascript
import create from 'zustand';

// 1. Create Store
const useStore = create((set, get) => ({
  // State
  count: 0,
  user: null,
  
  // Actions
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  setCount: (count) => set({ count }),
  
  // Async actions
  fetchUser: async (id) => {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    set({ user: data });
  },
  
  // Computed values
  doubleCount: () => get().count * 2
}));

// 2. Usage in Components
function Counter() {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  const decrement = useStore(state => state.decrement);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// 3. Selectors for optimization
const useCount = () => useStore(state => state.count);
const useIncrement = () => useStore(state => state.increment);

// 4. Middleware
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set(state => ({ count: state.count + 1 }))
    }),
    {
      name: 'counter-storage' // localStorage key
    }
  )
);
```

### Comparison: Context vs Redux vs Zustand

```javascript
// When to use what?

// Context API:
// ✅ Small to medium apps
// ✅ Infrequent updates
// ✅ Simple state
// ❌ Many frequent updates (performance issues)
// ❌ Complex state logic

// Redux:
// ✅ Large apps with complex state
// ✅ Predictable state updates
// ✅ Time-travel debugging
// ✅ Many state updates
// ❌ Boilerplate heavy (use Redux Toolkit!)
// ❌ Learning curve

// Zustand:
// ✅ Simple API, minimal boilerplate
// ✅ Good performance
// ✅ Works outside React components
// ✅ Small bundle size
// ❌ Less ecosystem/tooling than Redux
// ❌ No time-travel debugging
```

---

## React Performance Optimization

### React.memo Deep Dive

```javascript
// Basic usage
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.value}</div>;
});

// With custom comparison
const SmartComponent = React.memo(
  ({ user, config }) => {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (don't re-render)
    // Return false if props are different (re-render)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.config.version === nextProps.config.version
    );
  }
);

// When React.memo doesn't help:
function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ New object every render
  const data = { value: count };
  
  return <MemoizedChild data={data} />; // Still re-renders!
}

// ✅ Fix: useMemo
function Parent() {
  const [count, setCount] = useState(0);
  
  const data = useMemo(() => ({ value: count }), [count]);
  
  return <MemoizedChild data={data} />; // Only re-renders when count changes
}
```

### useMemo - When and How

```javascript
function Component({ items, filter }) {
  // ❌ Expensive calculation on every render
  const filteredItems = items
    .filter(item => item.category === filter)
    .sort((a, b) => b.price - a.price)
    .slice(0, 10);
  
  // ✅ Only recalculate when dependencies change
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items
      .filter(item => item.category === filter)
      .sort((a, b) => b.price - a.price)
      .slice(0, 10);
  }, [items, filter]);
  
  return <List items={filteredItems} />;
}

// Don't overuse useMemo!
// ❌ Not worth it (simple operation)
const doubled = useMemo(() => count * 2, [count]);

// ✅ Worth it (expensive operation)
const expensiveResult = useMemo(() => {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}, []);

// useMemo for referential equality
const config = useMemo(() => ({
  theme: 'dark',
  layout: 'grid'
}), []); // Same object reference on every render

// Without useMemo:
const config = { theme: 'dark', layout: 'grid' }; // New object every render
```

### useCallback - When and How

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // ❌ New function every render
  const handleClick = (id) => {
    console.log('Clicked', id);
  };
  
  // ✅ Stable function reference
  const handleClick = useCallback((id) => {
    console.log('Clicked', id);
  }, []); // Dependencies
  
  // With dependencies
  const handleItemClick = useCallback((id) => {
    console.log('Count:', count, 'ID:', id);
  }, [count]); // Recreated when count changes
  
  return (
    <>
      {items.map(item => (
        <MemoizedItem
          key={item.id}
          item={item}
          onClick={handleClick} // Stable reference
        />
      ))}
    </>
  );
}

// useCallback vs useMemo
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Equivalent to:
const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);
```

### Code Splitting Strategies

```javascript
// 1. Route-based splitting
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// 2. Component-based splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Analytics() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart data={data} />
        </Suspense>
      )}
    </div>
  );
}

// 3. Named exports splitting
const Dashboard = lazy(() =>
  import('./pages/Dashboard').then(module => ({
    default: module.Dashboard
  }))
);

// 4. Prefetching
function Navigation() {
  const handleMouseEnter = () => {
    // Prefetch on hover
    import('./pages/Dashboard');
  };
  
  return (
    <Link
      to="/dashboard"
      onMouseEnter={handleMouseEnter}
    >
      Dashboard
    </Link>
  );
}
```

### Virtualization for Large Lists

```javascript
import { FixedSizeList, VariableSizeList } from 'react-window';

// 1. Fixed size items
function FixedList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
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

// 2. Variable size items
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

// 3. Grid virtualization
import { FixedSizeGrid } from 'react-window';

function VirtualGrid({ data }) {
  return (
    <FixedSizeGrid
      columnCount={10}
      columnWidth={100}
      height={600}
      rowCount={100}
      rowHeight={100}
      width={1000}
    >
      {({ columnIndex, rowIndex, style }) => (
        <div style={style}>
          Item {rowIndex},{columnIndex}
        </div>
      )}
    </FixedSizeGrid>
  );
}

// 4. Infinite loading with virtualization
import { InfiniteLoader, FixedSizeList } from 'react-window';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMoreItems = async (startIndex, stopIndex) => {
    const newItems = await fetchItems(startIndex, stopIndex);
    setItems(prev => [...prev, ...newItems]);
    setHasMore(newItems.length > 0);
  };
  
  return (
    <InfiniteLoader
      isItemLoaded={index => index < items.length}
      itemCount={hasMore ? items.length + 1 : items.length}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={600}
          itemCount={items.length}
          itemSize={50}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {({ index, style }) => (
            <div style={style}>
              {items[index]?.name || 'Loading...'}
            </div>
          )}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
```

### Performance Profiling

```javascript
// 1. React DevTools Profiler
// Open DevTools → Profiler tab
// Click record → Interact → Stop
// Analyze flame graph and ranked chart

// 2. Profiler API (programmatic)
import { Profiler } from 'react';

function onRenderCallback(
  id,           // Component identifier
  phase,        // "mount" or "update"
  actualDuration, // Time spent rendering
  baseDuration,  // Estimated time without memoization
  startTime,
  commitTime,
  interactions  // Set of interactions
) {
  console.log(`${id} ${phase}: ${actualDuration}ms`);
  
  // Send to analytics
  analytics.track('render', {
    component: id,
    phase,
    duration: actualDuration
  });
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}

// 3. Why did you render?
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// 4. Performance marks
function ExpensiveComponent() {
  performance.mark('render-start');
  
  // ... expensive operation
  
  performance.mark('render-end');
  performance.measure(
    'Expensive Component Render',
    'render-start',
    'render-end'
  );
  
  const measure = performance.getEntriesByName(
    'Expensive Component Render'
  )[0];
  console.log(`Render took ${measure.duration}ms`);
}
```

---

## React Advanced Patterns

### Compound Components

```javascript
// Tabs component using compound pattern
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={activeTab === index ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabsContext);
  
  return activeTab === index ? (
    <div className="tab-panel">{children}</div>
  ) : null;
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
        <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        <Tabs.Tab index={2}>Tab 3</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panels>
        <Tabs.Panel index={0}>Content 1</Tabs.Panel>
        <Tabs.Panel index={2}>Content 2</Tabs.Panel>
        <Tabs.Panel index={2}>Content 3</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

### Controlled vs Uncontrolled Pattern

```javascript
// Controlled + Uncontrolled (Flexible component)
function Input({
  value: controlledValue,
  defaultValue,
  onChange,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  // Determine if controlled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };
  
  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
}

// Usage - Controlled
function ControlledExample() {
  const [value, setValue] = useState('');
  
  return (
    <Input
      value={value}
      onChange={setValue}
    />
  );
}

// Usage - Uncontrolled
function UncontrolledExample() {
  return (
    <Input
      defaultValue="Initial"
      onChange={(value) => console.log(value)}
    />
  );
}
```

### Prop Getters Pattern

```javascript
function useToggle(initialState = false) {
  const [on, setOn] = useState(initialState);
  
  const toggle = () => setOn(prev => !prev);
  const setOff = () => setOn(false);
  const setOnState = () => setOn(true);
  
  // Prop getter
  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      'aria-pressed': on,
      onClick: (...args) => {
        toggle();
        onClick?.(...args);
      },
      ...props
    };
  }
  
  return {
    on,
    toggle,
    setOff,
    setOn: setOnState,
    getTogglerProps
  };
}

// Usage
function Toggle() {
  const { on, getTogglerProps } = useToggle();
  
  return (
    <div>
      <button {...getTogglerProps()}>
        {on ? 'On' : 'Off'}
      </button>
      
      <button
        {...getTogglerProps({
          onClick: () => console.log('Custom click')
        })}
      >
        Toggle with custom handler
      </button>
    </div>
  );
}
```

### State Reducer Pattern

```javascript
function useCounter(initialValue = 0, reducer) {
  const [count, dispatch] = useReducer(
    reducer || defaultReducer,
    initialValue
  );
  
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const reset = () => dispatch({ type: 'reset' });
  
  return { count, increment, decrement, reset };
}

function defaultReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
}

// Usage - Custom reducer
function customReducer(state, action) {
  switch (action.type) {
    case 'increment':
      // Max limit
      return Math.min(state + 1, 10);
    case 'decrement':
      // Min limit
      return Math.max(state - 1, 0);
    default:
      return defaultReducer(state, action);
  }
}

function LimitedCounter() {
  const { count, increment, decrement } = useCounter(5, customReducer);
  
  return (
    <div>
      <p>Count: {count} (Limited 0-10)</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

---

## React Testing Strategies

### Unit Testing with Jest & React Testing Library

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  test('renders initial count', () => {
    render(<Counter initialCount={5} />);
    
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });
  
  test('increments count on button click', () => {
    render(<Counter initialCount={0} />);
    
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
  
  test('calls onChange when count changes', () => {
    const handleChange = jest.fn();
    render(<Counter initialCount={0} onChange={handleChange} />);
    
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);
    
    expect(handleChange).toHaveBeenCalledWith(1);
  });
  
  test('fetches user data on mount', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser)
      })
    );
    
    render(<UserProfile userId={1} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
    
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });
  
  test('user interactions with userEvent', async () => {
    const user = userEvent.setup();
    render(<Form />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(nameInput, 'Alice');
    await user.type(emailInput, 'alice@example.com');
    await user.click(submitButton);
    
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
```

### Testing Custom Hooks

```javascript
import { renderHook, act } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('useFetch', () => {
  test('returns data on successful fetch', async () => {
    const mockData = { id: 1, name: 'Alice' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
    
    const { result } = renderHook(() => useFetch('/api/users/1'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });
  
  test('returns error on failed fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    
    const { result } = renderHook(() => useFetch('/api/users/1'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toBe(null);
  });
  
  test('refetch function works', async () => {
    const mockData = { id: 1, name: 'Alice' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
    
    const { result } = renderHook(() => useFetch('/api/users/1'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.refetch();
    });
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
```

### Testing with Context

```javascript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { ThemedButton } from './ThemedButton';

describe('ThemedButton with Context', () => {
  test('renders with light theme', () => {
    render(
      <ThemeProvider initialTheme="light">
        <ThemedButton />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: '#fff' });
  });
  
  test('renders with dark theme', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemedButton />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: '#000' });
  });
  
  // Custom wrapper for multiple tests
  const wrapper = ({ children }) => (
    <ThemeProvider initialTheme="light">
      {children}
    </ThemeProvider>
  );
  
  test('toggles theme', async () => {
    const user = userEvent.setup();
    render(<ThemedButton />, { wrapper });
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(button).toHaveStyle({ background: '#000' });
  });
});
```

### Snapshot Testing

```javascript
import { render } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard snapshots', () => {
  test('matches snapshot with minimal props', () => {
    const { container } = render(
      <UserCard name="Alice" />
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
  
  test('matches snapshot with all props', () => {
    const user = {
      name: 'Alice',
      email: 'alice@example.com',
      avatar: 'avatar.jpg',
      role: 'Admin'
    };
    
    const { container } = render(
      <UserCard {...user} />
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
  
  // Inline snapshot
  test('renders correctly', () => {
    const { container } = render(<UserCard name="Alice" />);
    
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div class="user-card">
        <h3>Alice</h3>
      </div>
    `);
  });
});
```

---

