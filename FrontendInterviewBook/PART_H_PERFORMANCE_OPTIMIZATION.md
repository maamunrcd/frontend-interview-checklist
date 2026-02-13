# PERFORMANCE OPTIMIZATION

## Bundle Optimization

### Code Splitting

```javascript
// 1. Route-based splitting
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}

// 2. Component-based splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}

// 3. Library splitting
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          priority: 20
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 5
        }
      }
    }
  }
};

// 4. Dynamic imports
async function loadModule() {
  if (condition) {
    const module = await import('./heavy-module');
    module.doSomething();
  }
}

// 5. Prefetching
const Dashboard = lazy(() =>
  import(/* webpackPrefetch: true */ './Dashboard')
);

// Preloading
const Chart = lazy(() =>
  import(/* webpackPreload: true */ './Chart')
);
```

### Tree Shaking

```javascript
// ✅ Good: Named imports (tree-shakeable)
import { map, filter } from 'lodash-es';

// ❌ Bad: Default import (entire library)
import _ from 'lodash';

// ✅ Good: Specific imports
import debounce from 'lodash/debounce';

// package.json
{
  "sideEffects": false // Enable tree shaking
}

// Or specify files with side effects:
{
  "sideEffects": [
    "*.css",
    "src/polyfills.js"
  ]
}

// webpack.config.js
module.exports = {
  mode: 'production', // Enables tree shaking
  optimization: {
    usedExports: true, // Mark unused exports
    minimize: true      // Remove them
  }
};
```

### Minification & Compression

```javascript
// 1. JavaScript Minification (Terser)
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.logs
            drop_debugger: true
          },
          mangle: true // Shorten variable names
        }
      })
    ]
  }
};

// 2. CSS Minification
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
};

// 3. gzip Compression
// Express
const compression = require('compression');
app.use(compression());

// Nginx
# nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

// 4. Brotli Compression (better than gzip)
const shrinkRay = require('shrink-ray-current');
app.use(shrinkRay());

// Nginx
brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

### Bundle Analysis

```javascript
// 1. webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};

// 2. source-map-explorer
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'

// 3. Next.js bundle analyzer
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  // Next.js config
});

// Run: ANALYZE=true npm run build

// 4. Vite bundle visualizer
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
};
```

---

## Runtime Performance

### Debounce & Throttle

```javascript
// Debounce: Wait for pause
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage: Search input
const searchAPI = debounce((query) => {
  fetch(`/api/search?q=${query}`)
    .then(r => r.json())
    .then(results => setResults(results));
}, 300);

<input onChange={(e) => searchAPI(e.target.value)} />

// Throttle: Limit frequency
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage: Scroll tracking
const trackScroll = throttle(() => {
  analytics.track('scroll', {
    position: window.scrollY
  });
}, 1000);

window.addEventListener('scroll', trackScroll);

// React Hooks
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

function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));
    
    return () => clearTimeout(handler);
  }, [value, limit]);
  
  return throttledValue;
}
```

### Optimize Re-renders

```javascript
// 1. React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.value}</div>;
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
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <MemoizedChild onClick={handleClick} />;
}

// 4. Split components
// ❌ Bad: Entire list re-renders on any change
function TodoList({ todos }) {
  return todos.map(todo => <TodoItem todo={todo} />);
}

// ✅ Good: Only changed items re-render
const MemoizedTodoItem = React.memo(TodoItem);

function TodoList({ todos }) {
  return todos.map(todo => <MemoizedTodoItem key={todo.id} todo={todo} />);
}

// 5. Virtualize long lists
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

### Web Workers

```javascript
// worker.js
self.addEventListener('message', (e) => {
  const { type, data } = e.data;
  
  if (type === 'PROCESS_DATA') {
    // Heavy computation
    const result = processHeavyData(data);
    
    self.postMessage({
      type: 'RESULT',
      result
    });
  }
});

function processHeavyData(data) {
  // Expensive operation that would block main thread
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    result += Math.sqrt(data[i]);
  }
  return result;
}

// main.js
const worker = new Worker('worker.js');

worker.addEventListener('message', (e) => {
  const { type, result } = e.data;
  
  if (type === 'RESULT') {
    console.log('Result from worker:', result);
    setResult(result);
  }
});

function processData(data) {
  worker.postMessage({
    type: 'PROCESS_DATA',
    data
  });
}

// React Hook
function useWorker(workerFunction) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef(null);
  
  useEffect(() => {
    // Create worker from function
    const blob = new Blob(
      [`(${workerFunction.toString()})()`],
      { type: 'application/javascript' }
    );
    const url = URL.createObjectURL(blob);
    workerRef.current = new Worker(url);
    
    workerRef.current.onmessage = (e) => {
      setResult(e.data);
      setLoading(false);
    };
    
    return () => {
      workerRef.current?.terminate();
      URL.revokeObjectURL(url);
    };
  }, [workerFunction]);
  
  const run = (data) => {
    setLoading(true);
    workerRef.current?.postMessage(data);
  };
  
  return { result, loading, run };
}
```

---

## Network Optimization

### Resource Hints

```html
<!-- 1. DNS Prefetch: Resolve DNS early -->
<link rel="dns-prefetch" href="https://api.example.com">

<!-- 2. Preconnect: Establish connection -->
<link rel="preconnect" href="https://api.example.com">

<!-- 3. Prefetch: Low priority, future navigation -->
<link rel="prefetch" href="/next-page.html">
<link rel="prefetch" href="/styles/next-page.css">

<!-- 4. Preload: High priority, current page -->
<link rel="preload" href="/font.woff2" as="font" crossorigin>
<link rel="preload" href="/hero.jpg" as="image">
<link rel="preload" href="/critical.css" as="style">

<!-- 5. Modulepreload: ES modules -->
<link rel="modulepreload" href="/app.js">
```

### HTTP/2 & HTTP/3

```javascript
// HTTP/2 Benefits:
// - Multiplexing: Multiple requests over one connection
// - Server Push: Send resources before requested
// - Header Compression: Reduce overhead

// No need for:
// - Domain sharding
// - Concatenating files (can use smaller chunks)
// - Image sprites

// HTTP/3 (QUIC):
// - Faster connection setup
// - Better mobile performance
// - No head-of-line blocking

// Server Push example (Express with SPDY)
const spdy = require('spdy');
const fs = require('fs');

spdy.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}, (req, res) => {
  if (req.url === '/') {
    // Push CSS before HTML is fully parsed
    const stream = res.push('/styles.css', {
      request: {
        accept: 'text/css'
      },
      response: {
        'content-type': 'text/css'
      }
    });
    stream.end(fs.readFileSync('./styles.css'));
    
    res.end(fs.readFileSync('./index.html'));
  }
}).listen(443);
```

### Caching Strategies

```javascript
// 1. Service Worker Caching
// sw.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return cached response
        if (response) {
          return response;
        }
        
        // Clone request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Invalid response
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Clone response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// 2. HTTP Caching Headers
// Express
app.get('/api/data', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=3600', // 1 hour
    'ETag': generateETag(data)
  });
  res.json(data);
});

// Static assets
app.use('/static', express.static('public', {
  maxAge: '1y', // Cache for 1 year
  immutable: true
}));

// 3. Cache Strategies

// Network First (for API)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return caches.match(request);
  }
}

// Cache First (for static assets)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}

// Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  });
  
  return cached || fetchPromise;
}
```

---

## Image & Asset Optimization

### Image Optimization

```html
<!-- 1. Modern Formats -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>

<!-- 2. Responsive Images -->
<img
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Responsive image"
>

<!-- 3. Lazy Loading -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded">

<!-- 4. Placeholder Techniques -->

<!-- Blur-up -->
<div style="background: url('tiny-placeholder.jpg'); filter: blur(10px);">
  <img src="full-image.jpg" onload="this.parentElement.style.background='none'">
</div>

<!-- SVG Placeholder -->
<img
  src="image.jpg"
  style="background: url('data:image/svg+xml,...')"
  alt="Image"
>

<!-- 5. Image CDN (Cloudinary, imgix) -->
<img
  src="https://res.cloudinary.com/demo/image/upload/w_400,f_auto,q_auto/sample.jpg"
  alt="Optimized"
>

<!-- Parameters: -->
<!-- w_400: width 400px -->
<!-- f_auto: automatic format (WebP if supported) -->
<!-- q_auto: automatic quality -->
```

### Font Optimization

```css
/* 1. font-display */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* or optional, fallback, block */
}

/* font-display values: */
/* - auto: Browser default */
/* - block: Hide text (FOIT - Flash of Invisible Text) */
/* - swap: Show fallback immediately (FOUT - Flash of Unstyled Text) */
/* - fallback: Short block period, then swap */
/* - optional: Very short block, may not swap */

/* 2. Subsetting (only include needed characters) */
/* Use tools like glyphhanger or font-spider */

/* 3. Preload Fonts */
<link
  rel="preload"
  href="/fonts/custom.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>

/* 4. Variable Fonts (one file, multiple weights) */
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900; /* Full range */
}

/* 5. System Font Stack (no download needed) */
body {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Helvetica Neue',
    sans-serif;
}
```

---

