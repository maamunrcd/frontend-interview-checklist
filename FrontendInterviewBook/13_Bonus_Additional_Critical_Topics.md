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

