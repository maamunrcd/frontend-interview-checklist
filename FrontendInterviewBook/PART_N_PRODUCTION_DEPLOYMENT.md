# PRODUCTION & DEPLOYMENT

## CI/CD Pipeline

### GitHub Actions Complete Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Job 1: Code Quality & Tests
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm run test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      
      - name: Security audit
        run: npm audit --audit-level=high

  # Job 2: Build
  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
          retention-days: 7

  # Job 3: Deploy to Staging
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.example.com
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./

  # Job 4: Deploy to Production
  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      
      - name: Deploy to Production
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      
      - name: Notify team
        if: success()
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-Type: application/json' \
            -d '{"text":"✅ Production deployment successful!"}'
```

## Monitoring & Debugging

### Error Tracking (Sentry)

```typescript
// sentry.config.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Performance Monitoring
  integrations: [
    new BrowserTracing({
      tracingOrigins: ['localhost', 'https://api.example.com'],
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      )
    })
  ],
  
  tracesSampleRate: 1.0, // 100% in dev, lower in prod
  
  // Filter errors
  beforeSend(event, hint) {
    // Don't send certain errors
    if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
      return null;
    }
    return event;
  },
  
  // Add user context
  beforeSendTransaction(event) {
    event.user = {
      id: getCurrentUserId(),
      email: getCurrentUserEmail()
    };
    return event;
  }
});

// Usage in React
function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Routes />
    </Sentry.ErrorBoundary>
  );
}

// Manual error tracking
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'checkout'
    },
    extra: {
      userId: user.id
    }
  });
}

// Performance tracking
const transaction = Sentry.startTransaction({
  name: 'Checkout Process'
});

const span = transaction.startChild({
  op: 'payment',
  description: 'Process payment'
});

await processPayment();

span.finish();
transaction.finish();
```

### Application Monitoring

```typescript
// Custom performance monitoring
class PerformanceMonitor {
  private metrics = new Map<string, number[]>();
  
  mark(name: string) {
    performance.mark(name);
  }
  
  measure(name: string, startMark: string, endMark?: string) {
    performance.measure(name, startMark, endMark);
    
    const measure = performance.getEntriesByName(name)[0] as PerformanceMeasure;
    
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name)!.push(measure.duration);
    
    // Send to analytics
    this.sendToAnalytics(name, measure.duration);
  }
  
  getAverage(name: string): number {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return 0;
    
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
  
  private sendToAnalytics(name: string, duration: number) {
    // Send to your analytics service
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: name,
        duration,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      })
    });
  }
  
  clearMarks() {
    performance.clearMarks();
    performance.clearMeasures();
  }
}

const monitor = new PerformanceMonitor();

// Usage
function ExpensiveComponent() {
  useEffect(() => {
    monitor.mark('render-start');
    
    return () => {
      monitor.mark('render-end');
      monitor.measure('component-render', 'render-start', 'render-end');
    };
  });
  
  // ...
}

// Web Vitals Monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  const body = JSON.stringify(metric);
  
  // Use sendBeacon for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body);
  } else {
    fetch('/api/analytics/vitals', {
      body,
      method: 'POST',
      keepalive: true
    });
  }
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

