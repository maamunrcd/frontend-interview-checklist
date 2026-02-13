# HTML, CSS & BROWSER

## HTML5 & Semantic Elements

### Semantic HTML Complete Guide

```html
<!-- Page Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description for SEO">
  <title>Page Title</title>
</head>
<body>
  <!-- Site Header -->
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <!-- Main Content (only ONE per page) -->
  <main>
    <!-- Self-contained content -->
    <article>
      <header>
        <h1>Article Title</h1>
        <p>By <span>Author</span> on <time datetime="2024-01-01">Jan 1, 2024</time></p>
      </header>
      
      <!-- Thematic grouping -->
      <section>
        <h2>Section Title</h2>
        <p>Content...</p>
      </section>
      
      <!-- Tangentially related content -->
      <aside>
        <h3>Related Info</h3>
      </aside>
      
      <footer>
        <p>Article footer</p>
      </footer>
    </article>
  </main>
  
  <!-- Sidebar -->
  <aside>
    <section>
      <h2>Recent Posts</h2>
    </section>
  </aside>
  
  <!-- Site Footer -->
  <footer>
    <p>&copy; 2024 Company</p>
  </footer>
</body>
</html>

<!-- Form Elements -->
<form action="/submit" method="POST">
  <fieldset>
    <legend>User Information</legend>
    
    <label for="name">Name</label>
    <input id="name" type="text" required aria-required="true">
    
    <label for="email">Email</label>
    <input id="email" type="email" required>
    
    <label for="country">Country</label>
    <select id="country">
      <option value="">Select...</option>
      <option value="us">United States</option>
    </select>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>

<!-- Media Elements -->
<figure>
  <img src="image.jpg" alt="Description of image">
  <figcaption>Image caption</figcaption>
</figure>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Your browser doesn't support audio.
</audio>

<video controls width="640" height="360">
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
  Your browser doesn't support video.
</video>

<!-- Details/Summary (Accordion) -->
<details>
  <summary>Click to expand</summary>
  <p>Hidden content revealed on click</p>
</details>

<!-- Dialog (Modal) -->
<dialog id="myDialog">
  <h2>Dialog Title</h2>
  <p>Dialog content</p>
  <button onclick="document.getElementById('myDialog').close()">Close</button>
</dialog>

<script>
  document.getElementById('myDialog').showModal();
</script>
```

### Script Loading Strategies

```html
<!-- 1. Regular: Blocks parsing, executes immediately -->
<script src="app.js"></script>

<!-- 2. async: Downloads parallel, executes ASAP (may block parsing) -->
<script src="analytics.js" async></script>

<!-- 3. defer: Downloads parallel, executes AFTER parsing (maintains order) -->
<script src="app.js" defer></script>
<script src="utils.js" defer></script>

<!-- 4. Module: Deferred by default -->
<script type="module" src="app.js"></script>

<!-- 5. Preload: Download priority resource early -->
<link rel="preload" href="critical.js" as="script">

<!-- When to use: -->
<!-- async: Independent scripts (analytics, ads) -->
<!-- defer: App scripts that need DOM or maintain order -->
<!-- module: ES modules -->
```

### Resource Hints

```html
<!-- Preconnect: Establish early connection -->
<link rel="preconnect" href="https://api.example.com">

<!-- DNS Prefetch: DNS lookup only -->
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- Prefetch: Low priority, future navigation -->
<link rel="prefetch" href="/next-page.html">

<!-- Preload: High priority, current page -->
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- Prerender: Render entire page in background -->
<link rel="prerender" href="/next-page.html">
```

### Responsive Images

```html
<!-- 1. Art Direction (different images) -->
<picture>
  <source media="(max-width: 600px)" srcset="small.jpg">
  <source media="(max-width: 1200px)" srcset="medium.jpg">
  <img src="large.jpg" alt="Responsive image">
</picture>

<!-- 2. Resolution Switching (same image, different sizes) -->
<img
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Product"
>

<!-- 3. Modern format with fallback -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>

<!-- 4. Lazy loading -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded">
```

---

## CSS Advanced Concepts

### Box Model Deep Dive

```css
/* Content-box (default) */
.element {
  box-sizing: content-box;
  width: 200px;      /* Content width */
  padding: 20px;     /* Added to width */
  border: 5px solid; /* Added to width */
  margin: 10px;      /* Not included in width */
  
  /* Total width = 200 + 40 (padding) + 10 (border) = 250px */
  /* Total space = 250 + 20 (margin) = 270px */
}

/* Border-box (recommended) */
.element {
  box-sizing: border-box;
  width: 200px; /* Includes content + padding + border */
  padding: 20px;
  border: 5px solid;
  
  /* Total width = 200px (padding + border included) */
  /* Content width = 200 - 40 - 10 = 150px */
}

/* Global setting (best practice) */
*, *::before, *::after {
  box-sizing: border-box;
}
```

### Flexbox Complete Guide

```css
/* Container Properties */
.flex-container {
  display: flex;
  
  /* Direction */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* Wrapping */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* Shorthand */
  flex-flow: row wrap;
  
  /* Main Axis Alignment */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* Cross Axis Alignment */
  align-items: stretch | flex-start | flex-end | center | baseline;
  
  /* Multiple Lines */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  
  /* Gap */
  gap: 1rem;
  row-gap: 1rem;
  column-gap: 1rem;
}

/* Item Properties */
.flex-item {
  /* Order */
  order: 0; /* Default 0, can be negative */
  
  /* Grow */
  flex-grow: 0; /* Default 0, proportion to grow */
  
  /* Shrink */
  flex-shrink: 1; /* Default 1, proportion to shrink */
  
  /* Basis */
  flex-basis: auto; /* Initial size */
  
  /* Shorthand */
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  flex: 0 0 200px; /* Don't grow/shrink, 200px fixed */
  
  /* Self Alignment */
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}

/* Common Patterns */

/* Center everything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Equal width columns */
.columns {
  display: flex;
}
.columns > * {
  flex: 1;
}

/* Holy Grail Layout */
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.header, .footer {
  flex-shrink: 0;
}
.body {
  display: flex;
  flex: 1;
}
.sidebar {
  flex: 0 0 200px;
}
.content {
  flex: 1;
}
```

### Grid Complete Guide

```css
/* Container Properties */
.grid-container {
  display: grid;
  
  /* Columns */
  grid-template-columns: 200px 1fr 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  /* Rows */
  grid-template-rows: auto 1fr auto;
  
  /* Named Areas */
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  
  /* Gap */
  gap: 1rem;
  row-gap: 1rem;
  column-gap: 1rem;
  
  /* Alignment (container level) */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  
  /* Alignment (grid itself) */
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
  
  /* Implicit Grid */
  grid-auto-rows: 100px;
  grid-auto-columns: 100px;
  grid-auto-flow: row | column | dense;
}

/* Item Properties */
.grid-item {
  /* Placement */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  
  /* Shorthand */
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  
  /* Span */
  grid-column: span 2;
  
  /* Area */
  grid-area: header;
  
  /* Self Alignment */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}

/* Responsive Grid (no media queries!) */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* 12-Column Grid System */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}
.span-6 {
  grid-column: span 6;
}
.span-4 {
  grid-column: span 4;
}
```

### Modern CSS Features

```css
/* 1. Custom Properties (CSS Variables) */
:root {
  --primary-color: #007bff;
  --spacing: 1rem;
  --font-size: 16px;
}

.element {
  color: var(--primary-color);
  padding: var(--spacing);
  font-size: var(--font-size);
}

/* 2. calc() */
.element {
  width: calc(100% - 2rem);
  height: calc(100vh - 60px);
  font-size: calc(1rem + 2vw);
}

/* 3. clamp() - Responsive values */
.element {
  /* min, preferred, max */
  font-size: clamp(1rem, 2.5vw, 3rem);
  width: clamp(300px, 50%, 800px);
}

/* 4. min() and max() */
.element {
  width: min(90%, 1200px); /* Smaller of the two */
  height: max(200px, 50vh); /* Larger of the two */
}

/* 5. :is() pseudo-class */
:is(h1, h2, h3, h4, h5, h6) {
  margin-top: 0;
}

:is(.dark-theme, .high-contrast) button {
  background: black;
}

/* 6. :where() - Zero specificity */
:where(h1, h2, h3) {
  line-height: 1.2;
}

/* 7. :has() - Parent selector */
form:has(input:invalid) {
  border: 2px solid red;
}

.card:has(img) {
  padding: 0;
}

li:has(> ul) {
  /* List item that contains a sublist */
}

/* 8. Container Queries */
.container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* 9. Cascade Layers */
@layer base, components, utilities;

@layer base {
  h1 {
    font-size: 2rem;
  }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
  }
}

/* 10. Logical Properties */
.element {
  /* Instead of left/right */
  margin-inline-start: 1rem;  /* Left in LTR, right in RTL */
  margin-inline-end: 1rem;
  
  /* Instead of top/bottom */
  margin-block-start: 1rem;   /* Top */
  margin-block-end: 1rem;     /* Bottom */
  
  /* Shorthand */
  padding-inline: 1rem;  /* left + right */
  padding-block: 1rem;   /* top + bottom */
}

/* 11. aspect-ratio */
.element {
  aspect-ratio: 16 / 9;
  width: 100%;
  /* Height calculated automatically */
}

/* 12. gap for Flexbox */
.flex {
  display: flex;
  gap: 1rem; /* Works in Flexbox now! */
}
```

### CSS Architecture Patterns

```css
/* BEM (Block Element Modifier) */
.block {}
.block__element {}
.block--modifier {}

.card {}
.card__title {}
.card__content {}
.card--featured {}

/* SMACSS (Scalable and Modular Architecture) */
/* Base */
html, body {}

/* Layout */
.l-header {}
.l-sidebar {}

/* Module */
.card {}
.button {}

/* State */
.is-active {}
.is-hidden {}

/* Theme */
.theme-dark {}

/* ITCSS (Inverted Triangle CSS) */
/* Settings */
:root { --color: blue; }

/* Tools */
@mixin clearfix {}

/* Generic */
* { box-sizing: border-box; }

/* Elements */
h1 {}

/* Objects */
.o-container {}

/* Components */
.c-button {}

/* Utilities */
.u-margin-top {}
```

---

## Browser APIs

### Intersection Observer (Complete)

```javascript
// Basic usage
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element visible:', entry.target);
      // Do something
    }
  });
}, {
  root: null,           // viewport
  rootMargin: '0px',    // margin around root
  threshold: 0.5        // 50% visible
});

// Observe elements
document.querySelectorAll('.lazy').forEach(el => {
  observer.observe(el);
});

// Lazy loading images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Infinite scroll
const sentinelObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, {
  threshold: 1.0
});

const sentinel = document.querySelector('.sentinel');
sentinelObserver.observe(sentinel);

// View tracking for analytics
const analyticsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      analytics.track('view', {
        element: element.id,
        timestamp: Date.now()
      });
      analyticsObserver.unobserve(element);
    }
  });
}, {
  threshold: 0.9
});

// Animation on scroll
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, {
  threshold: 0.1
});
```

### Mutation Observer

```javascript
// Watch for DOM changes
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('Type:', mutation.type);
    
    if (mutation.type === 'childList') {
      console.log('Added:', mutation.addedNodes);
      console.log('Removed:', mutation.removedNodes);
    }
    
    if (mutation.type === 'attributes') {
      console.log('Attribute changed:', mutation.attributeName);
      console.log('Old value:', mutation.oldValue);
    }
  });
});

// Start observing
mutationObserver.observe(document.body, {
  childList: true,        // Watch for children added/removed
  attributes: true,       // Watch for attribute changes
  characterData: true,    // Watch for text changes
  subtree: true,          // Watch entire subtree
  attributeOldValue: true,
  characterDataOldValue: true,
  attributeFilter: ['class', 'style'] // Only watch these attributes
});

// Stop observing
mutationObserver.disconnect();

// Use cases:
// 1. React to third-party script changes
// 2. Auto-initialize components when elements appear
// 3. Track dynamic content changes
// 4. Implement custom data binding
```

### Resize Observer

```javascript
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    console.log('Size:', entry.contentRect);
    console.log('Border box:', entry.borderBoxSize);
    console.log('Content box:', entry.contentBoxSize);
    
    // Respond to size changes
    if (entry.contentRect.width < 400) {
      entry.target.classList.add('compact');
    } else {
      entry.target.classList.remove('compact');
    }
  });
});

// Observe element
const element = document.querySelector('.responsive');
resizeObserver.observe(element);

// Unobserve
resizeObserver.unobserve(element);

// Use cases:
// - Responsive components based on container size
// - Chart/canvas resizing
// - Textarea auto-resize
// - Masonry layout recalculation
```

### localStorage & sessionStorage (Advanced)

```javascript
// Storage Service with fallback
class StorageService {
  constructor(storageType = 'local') {
    this.storage = this.getStorage(storageType);
  }
  
  getStorage(type) {
    try {
      const storage = type === 'local' 
        ? window.localStorage 
        : window.sessionStorage;
      
      // Test if available
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return storage;
    } catch (e) {
      console.warn('Storage not available, using memory');
      return this.createMemoryStorage();
    }
  }
  
  createMemoryStorage() {
    const store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value; },
      removeItem: (key) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach(k => delete store[k]); }
    };
  }
  
  // JSON auto-parse
  getItem(key) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return this.storage.getItem(key);
    }
  }
  
  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.error('Storage quota exceeded');
        // Implement cleanup strategy
        this.cleanup();
      }
    }
  }
  
  removeItem(key) {
    this.storage.removeItem(key);
  }
  
  clear() {
    this.storage.clear();
  }
  
  // Get storage size
  getSize() {
    return new Blob(Object.values(this.storage)).size;
  }
  
  // Cleanup old items
  cleanup() {
    const items = Object.keys(this.storage);
    const withTimestamps = items
      .map(key => ({
        key,
        data: this.getItem(key),
        timestamp: this.getItem(key)?.timestamp || 0
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove oldest 25%
    const toRemove = Math.ceil(items.length * 0.25);
    withTimestamps.slice(0, toRemove).forEach(item => {
      this.removeItem(item.key);
    });
  }
  
  // With expiration
  setWithExpiry(key, value, ttl) {
    const item = {
      value,
      expiry: Date.now() + ttl
    };
    this.setItem(key, item);
  }
  
  getWithExpiry(key) {
    const item = this.getItem(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.removeItem(key);
      return null;
    }
    
    return item.value;
  }
}

// Usage
const storage = new StorageService('local');

storage.setItem('user', { name: 'Alice', id: 123 });
const user = storage.getItem('user');

storage.setWithExpiry('token', 'abc123', 3600000); // 1 hour
const token = storage.getWithExpiry('token');
```

---

## Web Vitals & Performance Metrics

### Core Web Vitals

```javascript
// 1. LCP (Largest Contentful Paint)
// Good: < 2.5s, Poor: > 4s
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  
  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
  
  // Send to analytics
  analytics.track('lcp', {
    value: lastEntry.renderTime || lastEntry.loadTime,
    element: lastEntry.element
  });
}).observe({ entryTypes: ['largest-contentful-paint'] });

// How to improve LCP:
// - Optimize server response time
// - Eliminate render-blocking resources
// - Optimize images (WebP, lazy loading)
// - Preload critical resources
// - Use CDN
// - Implement SSR

// 2. FID (First Input Delay) → INP (Interaction to Next Paint)
// Good: < 100ms, Poor: > 300ms
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    const delay = entry.processingStart - entry.startTime;
    console.log('FID:', delay);
    
    analytics.track('fid', {
      value: delay,
      eventType: entry.name
    });
  });
}).observe({ entryTypes: ['first-input'] });

// How to improve FID:
// - Reduce JavaScript execution time
// - Break up long tasks
// - Use web workers
// - Code splitting
// - Defer non-critical JavaScript

// 3. CLS (Cumulative Layout Shift)
// Good: < 0.1, Poor: > 0.25
let clsScore = 0;

new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (!entry.hadRecentInput) {
      clsScore += entry.value;
      console.log('CLS:', clsScore);
      
      analytics.track('cls', {
        value: clsScore,
        entries: entry.sources
      });
    }
  });
}).observe({ entryTypes: ['layout-shift'] });

// How to improve CLS:
// - Set size attributes on images/videos
// - Reserve space for ads/embeds
// - Use font-display: swap
// - Avoid inserting content above existing
// - Use transform for animations (not top/left)

// Web Vitals Library (Recommended)
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);

// Send to analytics
function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta
  });
  
  navigator.sendBeacon('/analytics', body);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

### Performance Monitoring

```javascript
// Performance API
const perfData = performance.getEntriesByType('navigation')[0];

console.log('DNS Lookup:', perfData.domainLookupEnd - perfData.domainLookupStart);
console.log('TCP Connection:', perfData.connectEnd - perfData.connectStart);
console.log('Request Time:', perfData.responseStart - perfData.requestStart);
console.log('Response Time:', perfData.responseEnd - perfData.responseStart);
console.log('DOM Processing:', perfData.domComplete - perfData.domInteractive);
console.log('Load Complete:', perfData.loadEventEnd - perfData.loadEventStart);

// Performance Marks & Measures
performance.mark('start-fetch');

fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    performance.mark('end-fetch');
    performance.measure('fetch-duration', 'start-fetch', 'end-fetch');
    
    const measure = performance.getEntriesByName('fetch-duration')[0];
    console.log('Fetch took:', measure.duration, 'ms');
  });

// Resource Timing
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(`${resource.name}: ${resource.duration}ms`);
});

// Long Tasks API
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('Long task detected:', entry.duration, 'ms');
    
    // Tasks > 50ms can cause jank
    if (entry.duration > 50) {
      analytics.track('long-task', {
        duration: entry.duration,
        startTime: entry.startTime
      });
    }
  });
}).observe({ entryTypes: ['longtask'] });

// Navigation Timing
const navTiming = performance.getEntriesByType('navigation')[0];

const metrics = {
  // Time to First Byte
  ttfb: navTiming.responseStart - navTiming.requestStart,
  
  // DOM Content Loaded
  domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.fetchStart,
  
  // Load Complete
  loadComplete: navTiming.loadEventEnd - navTiming.fetchStart,
  
  // DOM Interactive
  domInteractive: navTiming.domInteractive - navTiming.fetchStart
};

console.log('Metrics:', metrics);
```

---

