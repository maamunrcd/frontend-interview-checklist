# WEB ACCESSIBILITY (A11y)

## WCAG Guidelines

### POUR Principles

**1. Perceivable**
- Information must be presented in ways users can perceive
- Provide text alternatives for non-text content
- Don't rely on color alone
- Ensure sufficient contrast
- Make content adaptable

**2. Operable**
- All functionality available via keyboard
- Provide enough time to read and use content
- Don't cause seizures (< 3 flashes/second)
- Help users navigate and find content

**3. Understandable**
- Make text readable and understandable
- Make content appear and operate predictably
- Help users avoid and correct mistakes

**4. Robust**
- Compatible with assistive technologies
- Use valid, semantic HTML
- Ensure compatibility

### WCAG Levels
- **A**: Minimum level
- **AA**: Mid level (required for most laws)
- **AAA**: Highest level

```html
<!-- WCAG AA Requirements -->

<!-- 1. Color Contrast -->
<!-- Normal text: 4.5:1 -->
<!-- Large text (18pt+): 3:1 -->
<p style="color: #757575; background: #ffffff">
  <!-- Contrast ratio: 4.54:1 ✅ -->
</p>

<!-- 2. Resize Text -->
<!-- Must work at 200% zoom without horizontal scrolling -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- 3. Keyboard Navigation -->
<!-- All interactive elements must be keyboard accessible -->
<button>Click me</button> <!-- ✅ -->
<div onclick="...">Click</div> <!-- ❌ Not keyboard accessible -->

<!-- 4. Focus Indicators -->
<!-- Must have visible focus -->
:focus {
  outline: 2px solid blue;
}

<!-- 5. Labels -->
<!-- All inputs must have labels -->
<label for="email">Email</label>
<input id="email" type="email">
```

---

## Accessibility Implementation

### Semantic HTML for Accessibility

```html
<!-- ❌ Bad: Div soup -->
<div class="header">
  <div class="nav">
    <div onclick="navigate()">Home</div>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="title">Title</div>
  </div>
</div>

<!-- ✅ Good: Semantic HTML -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Title</h1>
  </article>
</main>

<!-- Benefits: -->
<!-- - Screen readers can navigate by landmarks -->
<!-- - Skip to main content -->
<!-- - Understand page structure -->
```

### ARIA (Accessible Rich Internet Applications)

```html
<!-- Rule: Use ARIA only when semantic HTML isn't enough -->

<!-- 1. Roles -->
<div role="button" tabindex="0">Custom Button</div>
<div role="dialog" aria-modal="true">Modal</div>
<nav role="navigation">Navigation</nav> <!-- Redundant! -->

<!-- 2. Properties (describe state) -->
<input
  type="text"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="error-msg"
>
<span id="error-msg">Error message</span>

<!-- 3. States (dynamic) -->
<button aria-pressed="false">Toggle</button>
<button aria-expanded="true">Accordion</button>
<div aria-hidden="true">Hidden from screen readers</div>

<!-- 4. Labels -->
<!-- aria-label: Direct label -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby: Reference element -->
<h2 id="dialog-title">Confirm</h2>
<div role="dialog" aria-labelledby="dialog-title">...</div>

<!-- aria-describedby: Additional description -->
<input
  aria-labelledby="username-label"
  aria-describedby="username-help"
>
<label id="username-label">Username</label>
<span id="username-help">3-20 characters</span>

<!-- 5. Live Regions -->
<div aria-live="polite" aria-atomic="true">
  <!-- Screen reader announces changes -->
  <p>3 new messages</p>
</div>

<div aria-live="assertive">
  <!-- Interrupts current announcement -->
  <p>Error: Form submission failed</p>
</div>

<!-- aria-live values: -->
<!-- - off: No announcement -->
<!-- - polite: Wait for pause -->
<!-- - assertive: Interrupt immediately -->
```

### Accessible Forms

```html
<form>
  <!-- 1. Label + Input Association -->
  <label for="email">Email Address</label>
  <input id="email" type="email" required>
  
  <!-- 2. Fieldset + Legend for groups -->
  <fieldset>
    <legend>Shipping Address</legend>
    
    <label for="street">Street</label>
    <input id="street" type="text">
    
    <label for="city">City</label>
    <input id="city" type="text">
  </fieldset>
  
  <!-- 3. Error Messages -->
  <label for="password">Password</label>
  <input
    id="password"
    type="password"
    aria-invalid="true"
    aria-describedby="password-error"
  >
  <span id="password-error" role="alert">
    Password must be at least 8 characters
  </span>
  
  <!-- 4. Required Fields -->
  <label for="name">
    Name <span aria-label="required">*</span>
  </label>
  <input id="name" required aria-required="true">
  
  <!-- 5. Help Text -->
  <label for="username">Username</label>
  <input
    id="username"
    aria-describedby="username-help"
  >
  <span id="username-help">
    3-20 characters, letters and numbers only
  </span>
</form>
```

### Keyboard Navigation

```javascript
// Accessible Button Component
function AccessibleButton({ onClick, children, ...props }) {
  const handleKeyDown = (e) => {
    // Enter or Space activates button
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

// Focus Management
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocus.current = document.activeElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Trap focus
      const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      
      document.addEventListener('keydown', handleTab);
      
      return () => {
        document.removeEventListener('keydown', handleTab);
        previousFocus.current?.focus();
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// Skip Links
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Accessible Components

```javascript
// Accessible Tabs
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  
  const handleKeyDown = (e, index) => {
    let newIndex = index;
    
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabRefs.current.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabRefs.current.length) % tabRefs.current.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabRefs.current.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setActiveTab(newIndex);
    tabRefs.current[newIndex]?.focus();
  };
  
  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={el => tabRefs.current[index] = el}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {panels.map((panel, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}

// Accessible Dropdown
function Dropdown({ label, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          onChange(options[selectedIndex]);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };
  
  return (
    <div>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        {label}
      </button>
      
      {isOpen && (
        <ul role="listbox">
          {options.map((option, index) => (
            <li
              key={index}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Accessibility Testing

### Manual Testing

```javascript
// 1. Keyboard Navigation Test
// - Tab through all interactive elements
// - Verify visible focus indicators
// - Test all keyboard shortcuts
// - Verify skip links work

// 2. Screen Reader Test
// MacOS: VoiceOver (Cmd + F5)
// Windows: NVDA (free) or JAWS
// Test:
// - Page structure (landmarks, headings)
// - Form labels and errors
// - Button and link text
// - Image alt text
// - Dynamic content announcements

// 3. Color Contrast Test
// Chrome DevTools:
// - Inspect element
// - Check contrast ratio
// - Use Lighthouse accessibility audit

// 4. Zoom Test
// - Zoom to 200%
// - Verify no horizontal scroll
// - Verify all content visible
// - Verify functionality works

// 5. Motion Test
// - Test for seizure-inducing content
// - Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Automated Testing

```javascript
// 1. axe-core (most popular)
import { axe } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  
  expect(results).toHaveNoViolations();
});

// 2. Testing Library accessibility queries
import { render, screen } from '@testing-library/react';

test('accessible form', () => {
  render(<LoginForm />);
  
  // Get by accessible role
  const button = screen.getByRole('button', { name: /submit/i });
  const emailInput = screen.getByLabelText(/email/i);
  
  expect(button).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

// 3. Lighthouse CI
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000']
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }]
      }
    }
  }
};

// 4. Pa11y
const pa11y = require('pa11y');

async function testAccessibility() {
  const results = await pa11y('http://localhost:3000', {
    standard: 'WCAG2AA',
    runners: ['axe', 'htmlcs']
  });
  
  console.log(results.issues);
}

// 5. React component testing
import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button is accessible', async () => {
  const { container } = render(
    <button aria-label="Close dialog">×</button>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

