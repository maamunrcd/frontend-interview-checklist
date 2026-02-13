# SECURITY & BEST PRACTICES

## Frontend Security

### XSS (Cross-Site Scripting) - Complete Guide

```javascript
// Types of XSS:
// 1. Stored XSS: Malicious script stored in database
// 2. Reflected XSS: Script in URL parameters
// 3. DOM-based XSS: Client-side manipulation

// ❌ Vulnerable Code Examples:

// 1. innerHTML with user input
function displayMessage(message) {
  document.getElementById('msg').innerHTML = message;
  // If message = "<script>alert('XSS')</script>", it executes!
}

// 2. eval() with user input
const userInput = "alert('XSS')";
eval(userInput); // Executes malicious code!

// 3. document.write()
document.write(userInput); // Can inject scripts

// 4. Unescaped template
const template = `<div>${userInput}</div>`;
element.innerHTML = template; // Vulnerable!

// ✅ Safe Alternatives:

// 1. Use textContent instead of innerHTML
function displayMessageSafe(message) {
  document.getElementById('msg').textContent = message;
  // Script tags rendered as text, not executed
}

// 2. Sanitize HTML with DOMPurify
import DOMPurify from 'dompurify';

function displayHTML(html) {
  const clean = DOMPurify.sanitize(html);
  element.innerHTML = clean;
}

// 3. React automatically escapes
function Component({ userInput }) {
  return <div>{userInput}</div>; // Auto-escaped, safe!
}

// ❌ React dangerouslySetInnerHTML (only use with sanitized HTML)
function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Safe with sanitization
function SafeComponent({ html }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// 4. CSP (Content Security Policy)
// Set in HTTP headers or meta tag
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' https://trusted-cdn.com"
>

// Server-side (Express)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted-cdn.com"
  );
  next();
});

// 5. Input Validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .slice(0, 100);        // Limit length
}
```

### CSRF (Cross-Site Request Forgery)

```javascript
// ❌ Vulnerable: No CSRF protection
app.post('/transfer', (req, res) => {
  const { to, amount } = req.body;
  // Attacker can trigger this from their site!
  transferMoney(req.user.id, to, amount);
});

// ✅ Protection 1: CSRF Token
// Server generates token and includes in form
app.get('/transfer-form', (req, res) => {
  const csrfToken = generateToken();
  req.session.csrfToken = csrfToken;
  
  res.send(`
    <form action="/transfer" method="POST">
      <input type="hidden" name="_csrf" value="${csrfToken}">
      <input name="amount">
      <button>Transfer</button>
    </form>
  `);
});

// Server validates token
app.post('/transfer', (req, res) => {
  if (req.body._csrf !== req.session.csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  
  // Proceed with transfer
  transferMoney(req.user.id, req.body.to, req.body.amount);
});

// ✅ Protection 2: SameSite Cookies
res.cookie('sessionId', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' // or 'lax'
});

// SameSite values:
// - Strict: No cross-site requests at all
// - Lax: Cross-site GET only (safe)
// - None: All cross-site (must be Secure)

// ✅ Protection 3: Origin/Referer Header Check
app.post('/transfer', (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://myapp.com'];
  
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send('Invalid origin');
  }
  
  // Proceed
});

// React + API with CSRF
function TransferForm() {
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    // Get CSRF token from server
    fetch('/csrf-token')
      .then(r => r.json())
      .then(data => setCsrfToken(data.token));
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await fetch('/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ amount, to }),
      credentials: 'include' // Include cookies
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Secure Authentication & Token Storage

```javascript
// ❌ Bad: Store in localStorage (vulnerable to XSS)
localStorage.setItem('token', 'secret-token');

// ❌ Bad: Store in regular cookie (vulnerable to CSRF)
document.cookie = 'token=secret-token';

// ✅ Good: HttpOnly, Secure, SameSite cookie
// Server sets cookie:
res.cookie('token', token, {
  httpOnly: true,    // No JavaScript access
  secure: true,      // HTTPS only
  sameSite: 'strict',// CSRF protection
  maxAge: 3600000    // 1 hour
});

// Frontend: Cookie sent automatically
fetch('/api/protected', {
  credentials: 'include' // Include cookies
});

// ✅ Good: Short-lived access token + refresh token
// Access token: 15 minutes, in memory
// Refresh token: 30 days, HttpOnly cookie

let accessToken = null;

async function login(credentials) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include' // Receive refresh token cookie
  });
  
  const data = await response.json();
  accessToken = data.accessToken; // Store in memory only!
}

async function apiCall(url, options = {}) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  });
  
  // If access token expired, refresh it
  if (response.status === 401) {
    const refreshResponse = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include' // Send refresh token cookie
    });
    
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      accessToken = data.accessToken;
      
      // Retry original request
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  }
  
  return response;
}

// Server: Refresh endpoint
app.post('/auth/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    
    // Generate new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );
    
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});
```

### Content Security Policy (CSP)

```javascript
// CSP Header (most secure)
const csp = `
  default-src 'self';
  script-src 'self' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

// Express middleware
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', csp);
  next();
});

// Next.js config
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ];
  }
};

// CSP Directives Explained:
// - default-src: Fallback for other directives
// - script-src: Where scripts can load from
// - style-src: Where styles can load from
// - img-src: Where images can load from
// - connect-src: Where fetch/XHR can connect to
// - font-src: Where fonts can load from
// - frame-ancestors: Who can embed this page in iframe
// - base-uri: Restrict <base> tag URLs
// - form-action: Where forms can submit to

// CSP Reporting
const cspWithReporting = `
  ${csp}
  report-uri /csp-violation;
  report-to csp-endpoint;
`;

// Handle violation reports
app.post('/csp-violation', (req, res) => {
  console.log('CSP Violation:', req.body);
  // Log to monitoring service
  res.status(204).end();
});

// Nonce-based CSP (for inline scripts)
app.get('/', (req, res) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'nonce-${nonce}'`
  );
  
  res.send(`
    <script nonce="${nonce}">
      console.log('This script is allowed');
    </script>
  `);
});
```

### Security Headers (Complete Set)

```javascript
// Express middleware for all security headers
const helmet = require('helmet');

app.use(helmet());

// Or manually:
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection (legacy, CSP preferred)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HSTS (Force HTTPS)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (formerly Feature Policy)
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self)'
  );
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', csp);
  
  next();
});

// Next.js headers
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};
```

---

## OWASP Top 10 for Frontend

### 1. Injection Attacks

```javascript
// SQL Injection (backend, but frontend should validate)
// ❌ Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Safe: Use prepared statements
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

// NoSQL Injection
// ❌ Vulnerable
db.users.find({ email: req.body.email });

// ✅ Safe: Validate input
const email = validateEmail(req.body.email);
db.users.find({ email });

// HTML Injection
// ❌ Vulnerable
element.innerHTML = userInput;

// ✅ Safe
element.textContent = userInput;
// Or sanitize:
element.innerHTML = DOMPurify.sanitize(userInput);
```

### 2. Broken Authentication

```javascript
// ✅ Best Practices:

// 1. Strong password requirements
function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecial
  );
}

// 2. Rate limiting
const loginAttempts = new Map();

app.post('/login', (req, res) => {
  const ip = req.ip;
  const attempts = loginAttempts.get(ip) || 0;
  
  if (attempts >= 5) {
    return res.status(429).json({
      error: 'Too many attempts. Try again in 15 minutes.'
    });
  }
  
  // Validate credentials...
  if (!valid) {
    loginAttempts.set(ip, attempts + 1);
    setTimeout(() => loginAttempts.delete(ip), 15 * 60 * 1000);
  }
});

// 3. Multi-factor authentication
async function verify2FA(userId, code) {
  const secret = await getUser2FASecret(userId);
  return authenticator.verify({ token: code, secret });
}

// 4. Session management
// - Regenerate session ID after login
// - Expire sessions
// - Secure session cookies
app.post('/login', (req, res) => {
  // Authenticate...
  
  // Regenerate session
  req.session.regenerate((err) => {
    req.session.userId = user.id;
    res.json({ success: true });
  });
});
```

### 3. Sensitive Data Exposure

```javascript
// ✅ Best Practices:

// 1. Never expose secrets in frontend
// ❌ Bad
const API_KEY = '12345-secret-key';

// ✅ Good: Use backend proxy
// Frontend
fetch('/api/proxy/external-service', {
  method: 'POST',
  body: JSON.stringify(data)
});

// Backend
app.post('/api/proxy/external-service', async (req, res) => {
  const response = await fetch('https://external-service.com/api', {
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(req.body)
  });
  
  res.json(await response.json());
});

// 2. Encrypt sensitive data
const crypto = require('crypto');

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: cipher.getAuthTag().toString('hex')
  };
}

// 3. Hash passwords (backend)
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// 4. Don't log sensitive data
// ❌ Bad
console.log('User:', { email, password, ssn });

// ✅ Good
console.log('User:', { email });
```

---

