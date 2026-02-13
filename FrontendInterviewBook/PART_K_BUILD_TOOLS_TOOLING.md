# BUILD TOOLS & TOOLING

## Webpack vs Vite vs Rollup

### Webpack Configuration

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        }
      }
    }
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true
  }
};
```

### Vite Configuration

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios']
        }
      }
    }
  },
  
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

---

# 🎯 Senior Frontend Engineer - System Design Master Guide

> **Complete guide to scenario-based system design interviews for React-focused Frontend Engineers**

---

## 🧠 The Senior Engineer Mindset (Post-AI Era)

> "Coding is increasingly becoming a commodity. Architecture and System Design are the last frontiers of true engineering value."

In an era where AI can generate components in seconds, a Senior Engineer's value is no longer in *writing* the code, but in **designing the systems** that are:
1.  **Scalable**: Can handle 10x traffic without breaking.
2.  **Maintainable**: Can be modified by other engineers without unintended side effects.
3.  **Resilient**: Handles network failures, browser crashes, and edge cases gracefully.
4.  **Performant**: Delivers a premium experience regardless of device or network quality.

---

## 📑 Table of Contents

1. [🏛️ The 6 Pillars of Frontend System Design](#🏛️-the-6-pillars-of-frontend-system-design)
2. [🧠 System Design Cheat Sheet (Mental Models)](#🧠-system-design-cheat-sheet-mental-models)
3. [🚀 Offline-First System Design (Deep Dive)](#🚀-offline-first-system-design-deep-dive)
4. [🎯 20 System Design Scenarios](#🎯-20-system-design-scenarios)
5. [📋 The Senior Interview Playbook](#📋-the-senior-interview-playbook)
6. [🎓 Conclusion & Resources](#🎓-conclusion)

---

# 📅 40-Day Mastery Roadmap

*Follow this structured plan to master Frontend System Design in 40 days. Mark each day as complete `[x]` as you progress.*

### **Week 1: The Foundations & Mindset**
- [ ] **Day 1**: Senior Mindset & The Post-AI Era (Pillar 1: Communication)
- [ ] **Day 2**: Pillar 2: Rendering Strategies (SSR, CSR, ISR, SSG)
- [ ] **Day 3**: Pillar 3: Data Management & State Normalization
- [ ] **Day 4**: Pillar 4: Security & Resilience (XSS, CSRF, CSP, Auth)
- [ ] **Day 5**: Pillar 5: Scalability & Infrastructure (Micro-frontends, CDNs)
- [ ] **Day 6**: Pillar 6: Testing & Quality Assurance (Testing Pyramid)
- [ ] **Day 7**: System Design Cheat Sheet & Mental Models (Push vs Pull, State Ownership)

### **Week 2: The Offline-First Mastery**
- [ ] **Day 8**: Offline-First Scenarios & Clarifying Requirements
- [ ] **Day 9**: Identify Offline vs Online Operations & State Strategy
- [ ] **Day 10**: Local Storage Strategy (IndexedDB vs localStorage vs Cache API)
- [ ] **Day 11**: Optimistic UI Patterns & Implementation
- [ ] **Day 12**: Sync Mechanism Design & Queue Management
- [ ] **Day 13**: Conflict Resolution (LWW, OT, CRDTs)
- [ ] **Day 14**: Backend API Design for Offline (Idempotency, Versioning)
- [ ] **Day 15**: Edge Cases & User Communication (Sync status, Conflict UI)

### **Week 3: Scenario Training (Part 1)**
- [ ] **Day 16**: Scenario 1: Real-time Chat Application (WebSockets/SSE)
- [ ] **Day 17**: Scenario 2: E-commerce Product Catalog (ISR/Search/Filters)
- [ ] **Day 18**: Scenario 3: Social Media Feed (Virtualization/Caching)
- [ ] **Day 19**: Scenario 4: Video Streaming (HLS/DASH/CDN)
- [ ] **Day 20**: Scenario 5: Collaborative Document Editor (OT/CRDTs)
- [ ] **Day 21**: Scenario 6: Task Management System (Offline-Ready)
- [ ] **Day 22**: Scenario 7: Payment Processing (Stripe-like/Security)

### **Week 4: Scenario Training (Part 2)**
- [ ] **Day 23**: Scenario 8: Analytics Dashboard (Data Aggregation/Visualization)
- [ ] **Day 24**: Scenario 9: Search Engine (Auto-complete/Debounce)
- [ ] **Day 25**: Scenario 10: Notification System (Push API/Service Workers)
- [ ] **Day 26**: Scenario 11: File Management (S3/Uploads/Cloud)
- [ ] **Day 27**: Scenario 12: Booking System (Inventory/Concurrency)
- [ ] **Day 28**: Scenario 13: Code Editor (VS Code-like/LSP)
- [ ] **Day 29**: Scenario 14: Music Player (Audio Buffering/Streaming)

### **Week 5: Advanced Scenarios & Playbook**
- [ ] **Day 30**: Scenario 15: Map & Location Services (Vector Tiles/GPS)
- [ ] **Day 31**: Scenario 16: Form Builder (JSON Schema/Engine)
- [ ] **Day 32**: Scenario 17: Live Polling System (Real-time Spikes)
- [ ] **Day 33**: Scenario 18: Multi-tenant SaaS (RBAC/Isolation)
- [ ] **Day 34**: Scenario 19: Gaming Leaderboard (Sorted Sets/Caching)
- [ ] **Day 35**: Scenario 20: Healthcare System (HIPAA/Video Consultation)

### **Week 6: Final Strategy & Review**
- [ ] **Day 36**: Interview Playbook: Clarify & Scope Phase
- [ ] **Day 37**: Interview Playbook: High-Level Architecture & Deep Dives
- [ ] **Day 38**: Interview Playbook: Trade-offs & Communication
- [ ] **Day 39**: Final Deep-Dive Review (Pick your weakest 3 scenarios)
- [ ] **Day 40**: Mock Interview & Self-Reflection

---

# 🏛️ The 6 Pillars of Frontend System Design

## 1. Communication & Networking
As a senior, you must choose the right protocol for the right job.

- **Request/Response (REST/GraphQL)**: Like ordering from a **Restaurant Menu**. You ask for something specific, and you get it back exactly once. Best for CRUD.
- **WebSockets**: Like a **Phone Call**. Two people talking at the same time. Best for Chat, Live Trading (Binance).
- **Server-Sent Events (SSE)**: Like a **Radio Station**. You tune in and listen to the music the DJ sends. Best for Price tickers, News feeds (Twitter/X).
- **gRPC-Web**: Like a **Contractual Business Agreement**. Very strict, fast, and binary. Best for high-performance internal apps.
- **HTTP/3**: Imagine a **Multi-lane Highway** where one car crashing doesn't stop the other lanes (Solving Head-of-line blocking).

## 2. Rendering & Performance Strategies
Don't just say "React is fast." Explain the strategy.

- **SSR (Server-Side Rendering)**: Like a **Restaurant Meal**. The chef (server) cooks the food and brings it to your table ready to eat. *Real-world: Netflix Landing Page (SEO/Speed).*
- **CSR (Client-Side Rendering)**: Like a **Meal Kit (HelloFresh)**. They send you the ingredients (JS bundle) and you have to cook it yourself on your stove (browser). *Real-world: Facebook/Admin Dashboards.*
- **SSG (Static Site Generation)**: Like **Canned Food**. It's pre-made and ready to go instantly, but it might not be the freshest. *Real-world: Blog posts/Documentation.*
- **ISR (Incremental Static Reg.)**: Like a **Vending Machine**. It's pre-filled, but a technician updates the items periodically without shutting down the machine. *Real-world: E-commerce Product pages.*
- **Web Vitals**: Think of them as the **"Pulse, Blood Pressure, and Temperature"** of your website. If one is off, the patient (UX) is sick.

## 3. Data Management & State
State is the most frequent source of bugs and performance issues.

- **Local State**: Like your **Pocket**. For things you need right now (form inputs).
- **Global State**: Like a **Family Ledger**. Everyone in the house needs to know the balance (Auth status, Theme).
- **Server State**: Like the **Library**. You borrow information, but you need to check if it's been updated since you took it out (Caching).
- **Normalization**: Like **Sorting Laundry**. You don't throw everything in one pile; you put socks with socks and shirts with shirts (ID-based mapping).
- **Persistence**: **Cookies** are like a passport stamp (Server needs to see it), **IndexedDB** is like a massive Filing Cabinet (Large local data).

## 4. Security & Resilience
Security is a first-class citizen in frontend design.

- **Authentication**: JWT vs. Session Cookies. Understanding the BFF (Backend-for-Frontend) pattern to keep tokens out of JS reach.
- **XSS (Cross-Site Scripting)**: Sanitize inputs and use Content Security Policy (CSP) headers.
- **CSRF (Cross-Site Request Forgery)**: Use SameSite cookies and Anti-CSRF tokens.
- **CORS**: Understanding cross-origin resource sharing and its implications.
- **Error Boundaries & Graceful Degradation**: Ensuring the entire app doesn't crash if one component fails.

## 5. Scalability & Infrastructure
How do you build for 100 developers and 100 million users?

- **Micro-frontends**: Like a **Shopping Mall**. One owner, but many different stores (Teams) that can open or close independently.
- **Design Systems**: Like **IKEA Furniture**. You have standard bolts and panels (Components) that you use to build everything consistently.
- **CI/CD**: Like a **Car Assembly Line**. Every part is tested before the car leaves the factory.
- **CDN Strategy**: Like a **7-Eleven on every corner**. You don't have to drive across the city (to the Origin server) for a snack; you just go to the local store (The Edge).

## 6. Testing & Quality Assurance
The testing pyramid for high-velocity teams.

- **Unit Tests**: Logic and utility functions (Vitest/Jest).
- **Integration Tests**: Component interaction and hooks.
- **E2E Tests**: Critical user flows (Playwright/Cypress).
- **Visual Regression**: Ensuring UI doesn't break aesthetically (Loki, Chromatic).

---

# 🧠 System Design Cheat Sheet (Mental Models)

Use these mental models to simplify complex decisions during the interview.

### 1. The "Push vs. Pull" Model
- **Pull (Polling)**: Client asks "Anything new?" every 5 seconds. (Simple, but high traffic).
- **Push (WebSockets/SSE)**: Server says "Hey, here is something new!" immediately. (Efficient, but complex connection management).

### 2. The "State Ownership" Model
- **Who owns this data?**
  - If UI-only: **Local State**.
  - If Multiple Pages: **Global State**.
  - If the Database: **Server State** (React Query).

### 3. The "Cost of Failure" Model
- **What happens if this fails?**
  - App crashes? Use **Error Boundaries**.
  - Data is lost? Use **Persistence/Sync Queue**.
  - Slow load? Use **Skeleton Screens/Optimistic UI**.

### 4. Common Interview "Traps" (Avoid These!)

- ❌ **Over-Engineering**: Don't suggest Micro-frontends for a simple Todo list.
- ❌ **Ignoring Scale**: Don't use `localStorage` for 1GB of data; use `IndexedDB`.
- ❌ **Vague Tech Choices**: Don't say "I'll use React because it's good." Say "I'll use React's Concurrent Mode to prioritize user input over background rendering."
- ❌ **Forgetting Accessibility**: A senior engineer always mentions Screen Readers (ARIA) and Keyboard shortcuts.

---

# 🚀 Offline-First System Design (Deep Dive)

## Scenario: Design a Rapid Response, Offline-First System

**Real-world Example**: WhatsApp, bKash mobile app, Google Docs

---

## Step 1: Clarify Requirements

### Functional Requirements

**Must Ask:**
- What operations need to work offline?
- What data needs to be cached locally?
- How long can the system be offline?
- What happens when connection is restored?
- Do multiple users need to collaborate offline?

**Example Answers:**
- ✅ Users can create/edit/delete messages offline
- ✅ Users can view cached conversations
- ✅ Messages sync when connection is restored
- ✅ System works offline for up to 7 days
- ✅ Multiple users can edit same document (conflict resolution needed)

### Non-Functional Requirements

**Performance:**
- First paint: < 1 second
- Offline operations: < 100ms response time
- Sync should not block UI

**Reliability:**
- Zero data loss
- 99.9% sync success rate
- Handle network failures gracefully

**Scalability:**
- Support 1M+ users
- Handle 10K+ concurrent syncs
- Store 100MB+ data per user locally

**Security:**
- Encrypt local storage
- Secure sync endpoints
- Prevent data tampering

---

## Step 2: Identify Offline vs Online Operations

### ✅ Must Work Offline

```
┌─────────────────────────────────────┐
│         OFFLINE OPERATIONS          │
├─────────────────────────────────────┤
│ • Create new items                  │
│ • Edit existing items               │
│ • Delete items                      │
│ • View cached data                  │
│ • Search local data                 │
│ • Basic validation                  │
└─────────────────────────────────────┘
```

**Examples:**
- WhatsApp: Send messages, view chat history
- bKash: View balance, transaction history
- Google Docs: Edit document, view previous versions

### 🌐 Online-Only Operations

```
┌─────────────────────────────────────┐
│         ONLINE OPERATIONS            │
├─────────────────────────────────────┤
│ • User authentication               │
│ • Real-time collaboration           │
│ • Heavy analytics                   │
│ • Large file uploads               │
│ • Payment processing                │
│ • Live notifications                │
└─────────────────────────────────────┘
```

---

## Step 3: Frontend Architecture Design

### 3.1 State Management Strategy

**Layered State Architecture:**

```
┌─────────────────────────────────────────┐
│         UI Layer (React Components)      │
│  - Optimistic UI updates                │
│  - Loading states                       │
│  - Error boundaries                     │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│      State Management (Zustand/Redux)   │
│  - Optimistic state                     │
│  - Sync queue                           │
│  - Conflict resolution state            │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│      Local Storage Layer                │
│  - IndexedDB (large data)               │
│  - localStorage (small config)          │
│  - Cache API (assets)                  │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│      Sync Service                       │
│  - Queue management                     │
│  - Retry logic                          │
│  - Background sync                      │
└─────────────────────────────────────────┘
```

**Implementation Example (React + Zustand):**

```typescript
// store/useOfflineStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
  id: string;
  text: string;
  status: 'local' | 'syncing' | 'synced' | 'error';
  timestamp: number;
  version: number; // For conflict resolution
}

interface OfflineStore {
  messages: Message[];
  syncQueue: Message[];
  isOnline: boolean;
  
  // Actions
  addMessage: (text: string) => void;
  updateMessage: (id: string, text: string) => void;
  deleteMessage: (id: string) => void;
  syncMessages: () => Promise<void>;
}

export const useOfflineStore = create<OfflineStore>()(
  persist(
    (set, get) => ({
      messages: [],
      syncQueue: [],
      isOnline: navigator.onLine,
      
      addMessage: (text: string) => {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          text,
          status: 'local',
          timestamp: Date.now(),
          version: 1,
        };
        
        set((state) => ({
          messages: [...state.messages, newMessage],
          syncQueue: [...state.syncQueue, newMessage],
        }));
        
        // Try to sync immediately if online
        if (get().isOnline) {
          get().syncMessages();
        }
      },
      
      syncMessages: async () => {
        const { syncQueue, isOnline } = get();
        if (!isOnline || syncQueue.length === 0) return;
        
        // Process queue
        for (const message of syncQueue) {
          try {
            set((state) => ({
              messages: state.messages.map((m) =>
                m.id === message.id ? { ...m, status: 'syncing' } : m
              ),
            }));
            
            // API call
            await fetch('/api/messages', {
              method: 'POST',
              body: JSON.stringify(message),
            });
            
            set((state) => ({
              messages: state.messages.map((m) =>
                m.id === message.id ? { ...m, status: 'synced' } : m
              ),
              syncQueue: state.syncQueue.filter((m) => m.id !== message.id),
            }));
          } catch (error) {
            set((state) => ({
              messages: state.messages.map((m) =>
                m.id === message.id ? { ...m, status: 'error' } : m
              ),
            }));
          }
        }
      },
    }),
    {
      name: 'offline-storage',
      // Use IndexedDB for large data
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);
```

### 3.2 Local Storage Strategy

**Storage Hierarchy:**

```
┌─────────────────────────────────────┐
│  IndexedDB (Primary)                │
│  - Large datasets (messages, docs)  │
│  - Complex queries                  │
│  - 100MB+ capacity                  │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│  localStorage (Secondary)           │
│  - User preferences                 │
│  - Small configs                    │
│  - 5-10MB capacity                  │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│  Cache API (Assets)                 │
│  - Images, fonts                    │
│  - API responses (short TTL)        │
└─────────────────────────────────────┘
```

**IndexedDB Wrapper Example:**

```typescript
// utils/indexedDB.ts
class OfflineDB {
  private db: IDBDatabase | null = null;
  
  async init(dbName: string, version: number) {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('messages')) {
          const store = db.createObjectStore('messages', { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('status', 'status', { unique: false });
        }
      };
    });
  }
  
  async save<T>(storeName: string, data: T): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) throw new Error('DB not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineDB = new OfflineDB();
```

### 3.3 Optimistic UI Pattern

**How It Works:**

```
User Action → Update UI Immediately → Queue for Sync → Sync in Background
     ↓              ↓                        ↓                    ↓
  Click        Show success            Add to queue        Update status
```

**Implementation:**

```typescript
// components/MessageList.tsx
function MessageList() {
  const { messages, addMessage, isOnline } = useOfflineStore();
  
  const handleSend = async (text: string) => {
    // 1. Optimistic update (immediate UI feedback)
    addMessage(text);
    
    // 2. Show visual indicator
    // Message appears with "sending..." status
    
    // 3. Background sync happens automatically
  };
  
  return (
    <div>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          status={msg.status} // local, syncing, synced, error
        />
      ))}
    </div>
  );
}
```

---

## Step 4: Sync Mechanism Design

### 4.1 Sync Queue Architecture

```
┌─────────────────────────────────────────┐
│         Sync Queue Manager              │
├─────────────────────────────────────────┤
│  Queue Structure:                       │
│  - Priority (high/medium/low)           │
│  - Retry count                          │
│  - Timestamp                            │
│  - Operation type (create/update/delete)│
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Retry Strategy                   │
│  - Exponential backoff                  │
│  - Max retries: 5                       │
│  - Timeout: 30s per request             │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Background Sync                 │
│  - Service Worker                       │
│  - Background Sync API                  │
│  - Periodic sync (every 5 min)          │
└─────────────────────────────────────────┘
```

**Sync Queue Implementation:**

```typescript
// services/syncQueue.ts
interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string; // 'message', 'document', etc.
  data: any;
  priority: 'high' | 'medium' | 'low';
  retryCount: number;
  timestamp: number;
}

class SyncQueue {
  private queue: SyncOperation[] = [];
  private isProcessing = false;
  private maxRetries = 5;
  
  add(operation: Omit<SyncOperation, 'id' | 'retryCount' | 'timestamp'>) {
    const syncOp: SyncOperation = {
      ...operation,
      id: crypto.randomUUID(),
      retryCount: 0,
      timestamp: Date.now(),
    };
    
    this.queue.push(syncOp);
    this.queue.sort((a, b) => {
      // Sort by priority, then timestamp
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority] ||
             a.timestamp - b.timestamp;
    });
    
    this.processQueue();
  }
  
  private async processQueue() {
    if (this.isProcessing || !navigator.onLine) return;
    if (this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const operation = this.queue[0];
      
      try {
        await this.executeOperation(operation);
        this.queue.shift(); // Remove on success
      } catch (error) {
        operation.retryCount++;
        
        if (operation.retryCount >= this.maxRetries) {
          // Move to failed queue or notify user
          this.handleFailedOperation(operation);
          this.queue.shift();
        } else {
          // Exponential backoff
          const delay = Math.pow(2, operation.retryCount) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    this.isProcessing = false;
  }
  
  private async executeOperation(op: SyncOperation) {
    const endpoint = `/api/${op.entity}s`;
    const method = op.type === 'create' ? 'POST' :
                   op.type === 'update' ? 'PUT' : 'DELETE';
    
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(op.data),
    });
    
    if (!response.ok) throw new Error(`Sync failed: ${response.statusText}`);
  }
  
  private handleFailedOperation(op: SyncOperation) {
    // Notify user, save to failed queue, or show retry button
    console.error('Operation failed after max retries:', op);
  }
}

export const syncQueue = new SyncQueue();
```

### 4.2 Background Sync with Service Worker

```typescript
// public/sw.js (Service Worker)
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Get pending operations from IndexedDB
  const operations = await getPendingOperations();
  
  for (const op of operations) {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(op),
      });
      await markAsSynced(op.id);
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }
}

// Register in main app
if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
  navigator.serviceWorker.ready.then((registration) => {
    // Trigger background sync
    (registration as any).sync.register('sync-messages');
  });
}
```

### 4.3 Network Status Detection

```typescript
// hooks/useNetworkStatus.ts
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Also listen to actual network requests
    const checkConnection = async () => {
      try {
        await fetch('/api/health', { method: 'HEAD' });
        setIsOnline(true);
      } catch {
        setIsOnline(false);
      }
    };
    
    const interval = setInterval(checkConnection, 30000); // Every 30s
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);
  
  return isOnline;
}
```

---

## Step 5: Conflict Resolution Strategies

### 5.1 Conflict Types

```
┌─────────────────────────────────────┐
│      Conflict Scenarios              │
├─────────────────────────────────────┤
│ 1. Last-Write-Wins (LWW)            │
│    - Simple, fast                   │
│    - May lose data                   │
│                                     │
│ 2. Operational Transformation (OT)  │
│    - Google Docs style              │
│    - Complex, preserves all edits   │
│                                     │
│ 3. Version Vectors                  │
│    - Track versions per device      │
│    - Merge conflicts intelligently  │
│                                     │
│ 4. Manual Resolution                │
│    - Show conflicts to user          │
│    - User chooses winner            │
└─────────────────────────────────────┘
```

### 5.2 Last-Write-Wins (LWW) Implementation

**Use Case**: Simple messaging, todo items

```typescript
interface Document {
  id: string;
  content: string;
  version: number;
  lastModified: number;
  deviceId: string;
}

function resolveConflict(local: Document, server: Document): Document {
  // Simple: latest timestamp wins
  if (local.lastModified > server.lastModified) {
    return { ...local, version: Math.max(local.version, server.version) + 1 };
  }
  return { ...server, version: Math.max(local.version, server.version) + 1 };
}
```

### 5.3 Operational Transformation (OT) - Simplified

**Use Case**: Collaborative editing (Google Docs)

```typescript
interface Operation {
  type: 'insert' | 'delete' | 'retain';
  position: number;
  content?: string;
  length?: number;
}

function transformOperation(op1: Operation, op2: Operation): Operation {
  // If operations don't conflict, apply both
  if (op1.position + (op1.length || 0) < op2.position) {
    return op2; // No conflict
  }
  
  // If op2 happens before op1, adjust op1's position
  if (op2.position < op1.position) {
    if (op2.type === 'insert') {
      return { ...op1, position: op1.position + op2.content!.length };
    } else if (op2.type === 'delete') {
      return { ...op1, position: op1.position - op2.length! };
    }
  }
  
  // Complex conflict resolution logic here
  return op1;
}
```

### 5.4 Version Vectors (Advanced)

**Use Case**: Multi-device sync (WhatsApp)

```typescript
interface VersionVector {
  [deviceId: string]: number; // Version per device
}

interface Document {
  id: string;
  content: string;
  versions: VersionVector;
}

function mergeVersions(local: Document, server: Document): Document {
  const mergedVersions: VersionVector = {};
  
  // Merge version vectors
  const allDevices = new Set([
    ...Object.keys(local.versions),
    ...Object.keys(server.versions),
  ]);
  
  for (const device of allDevices) {
    mergedVersions[device] = Math.max(
      local.versions[device] || 0,
      server.versions[device] || 0
    );
  }
  
  // Determine winner based on version vector
  const localMax = Math.max(...Object.values(local.versions));
  const serverMax = Math.max(...Object.values(server.versions));
  
  if (localMax > serverMax) {
    return { ...local, versions: mergedVersions };
  }
  return { ...server, versions: mergedVersions };
}
```

### 5.5 Manual Conflict Resolution UI

```typescript
// components/ConflictResolver.tsx
function ConflictResolver({ local, server, onResolve }: Props) {
  return (
    <div className="conflict-modal">
      <h3>Conflict Detected</h3>
      
      <div className="conflict-comparison">
        <div>
          <h4>Your Version (Local)</h4>
          <pre>{local.content}</pre>
          <button onClick={() => onResolve(local)}>Use This</button>
        </div>
        
        <div>
          <h4>Server Version</h4>
          <pre>{server.content}</pre>
          <button onClick={() => onResolve(server)}>Use This</button>
        </div>
      </div>
      
      <button onClick={() => onResolve(mergeVersions(local, server))}>
        Merge Both
      </button>
    </div>
  );
}
```

---

## Step 6: Backend API Design

### 6.1 Idempotency

**Why**: Prevent duplicate operations when retrying

```typescript
// Backend API with idempotency
POST /api/messages
Headers:
  Idempotency-Key: uuid-v4

// Server checks if this key was already processed
if (cache.has(idempotencyKey)) {
  return cache.get(idempotencyKey); // Return previous response
}

// Process request
const result = await createMessage(data);
cache.set(idempotencyKey, result, TTL_24_HOURS);
return result;
```

**Frontend Implementation:**

```typescript
async function syncMessage(message: Message) {
  const idempotencyKey = `${message.id}-${message.version}`;
  
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(message),
  });
  
  return response.json();
}
```

### 6.2 Versioning Strategy

**Optimistic Locking:**

```typescript
// Backend
PUT /api/messages/:id
Body: { content: "...", version: 5 }

// Server checks version
if (serverVersion !== requestVersion) {
  return 409 Conflict; // Version mismatch
}

// Update and increment version
updateMessage(id, content, version + 1);
```

**Frontend Handling:**

```typescript
async function updateMessage(id: string, content: string) {
  const message = getMessage(id);
  
  try {
    const response = await fetch(`/api/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content,
        version: message.version,
      }),
    });
    
    if (response.status === 409) {
      // Conflict - fetch latest and show resolver
      const latest = await fetch(`/api/messages/${id}`).then(r => r.json());
      showConflictResolver(message, latest);
    }
  } catch (error) {
    // Queue for retry
    syncQueue.add({ type: 'update', entity: 'message', data: { id, content } });
  }
}
```

### 6.3 Batch Sync Endpoint

**Efficient for multiple operations:**

```typescript
// Backend
POST /api/sync
Body: {
  operations: [
    { type: 'create', entity: 'message', data: {...} },
    { type: 'update', entity: 'message', data: {...} },
    { type: 'delete', entity: 'message', id: '...' },
  ]
}

Response: {
  results: [
    { success: true, id: '...' },
    { success: false, error: '...' },
  ]
}
```

**Frontend:**

```typescript
async function batchSync(operations: SyncOperation[]) {
  const response = await fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify({ operations }),
  });
  
  const { results } = await response.json();
  
  // Update local state based on results
  results.forEach((result, index) => {
    if (result.success) {
      markAsSynced(operations[index].id);
    } else {
      handleSyncError(operations[index], result.error);
    }
  });
}
```

---

## Step 7: Edge Cases & Failure Scenarios

### 7.1 Edge Cases

```
┌─────────────────────────────────────┐
│         Edge Cases to Handle         │
├─────────────────────────────────────┤
│ 1. Storage Quota Exceeded           │
│    → Show warning, cleanup old data  │
│                                     │
│ 2. Partial Sync Failure             │
│    → Retry failed items only        │
│                                     │
│ 3. Clock Skew                       │
│    → Use server timestamps          │
│                                     │
│ 4. Concurrent Edits                 │
│    → Use version vectors or OT      │
│                                     │
│ 5. Large File Uploads               │
│    → Chunk upload, resume support   │
│                                     │
│ 6. Browser Tab Closed During Sync   │
│    → Service Worker continues       │
│                                     │
│ 7. Multiple Devices                 │
│    → Sync all, resolve conflicts    │
└─────────────────────────────────────┘
```

### 7.2 Storage Quota Management

```typescript
// utils/storageManager.ts
async function checkStorageQuota() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    const usage = estimate.usage || 0;
    const quota = estimate.quota || 0;
    const percentage = (usage / quota) * 100;
    
    if (percentage > 80) {
      // Cleanup old data
      await cleanupOldData();
    }
    
    if (percentage > 95) {
      // Critical - show warning to user
      showStorageWarning();
    }
  }
}

async function cleanupOldData() {
  // Delete synced items older than 30 days
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  await offlineDB.deleteOlderThan('messages', cutoff);
}
```

### 7.3 Partial Sync Failure Handling

```typescript
interface SyncResult {
  success: boolean;
  operationId: string;
  error?: string;
}

async function syncWithPartialFailure(operations: SyncOperation[]) {
  const results: SyncResult[] = [];
  
  for (const op of operations) {
    try {
      await executeOperation(op);
      results.push({ success: true, operationId: op.id });
    } catch (error) {
      results.push({
        success: false,
        operationId: op.id,
        error: error.message,
      });
      // Continue with next operation
    }
  }
  
  // Retry failed operations
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    scheduleRetry(failed.map(f => f.operationId));
  }
  
  return results;
}
```

---

## Step 8: Trade-offs Explained Simply

### 8.1 Storage: IndexedDB vs localStorage

**IndexedDB:**
- ✅ Large capacity (100MB+)
- ✅ Complex queries
- ✅ Async API
- ❌ More complex to use
- ❌ Slower for simple operations

**localStorage:**
- ✅ Simple API
- ✅ Synchronous
- ✅ Good for small data
- ❌ Limited size (5-10MB)
- ❌ String-only storage

**Decision**: Use IndexedDB for app data, localStorage for config.

### 8.2 Sync Frequency: Immediate vs Batched

**Immediate Sync:**
- ✅ Real-time feel
- ✅ Faster conflict detection
- ❌ More API calls
- ❌ Battery drain

**Batched Sync:**
- ✅ Fewer API calls
- ✅ Better battery life
- ✅ Can optimize batch operations
- ❌ Delayed updates
- ❌ Larger conflict windows

**Decision**: Hybrid - immediate for critical operations, batched for others.

### 8.3 Conflict Resolution: Simple vs Complex

**Last-Write-Wins:**
- ✅ Simple implementation
- ✅ Fast
- ❌ Data loss possible

**Operational Transformation:**
- ✅ No data loss
- ✅ Smooth collaboration
- ❌ Complex implementation
- ❌ Higher latency

**Decision**: Start with LWW, upgrade to OT if needed.

### 8.4 Optimistic UI: Always vs Conditional

**Always Optimistic:**
- ✅ Instant feedback
- ✅ Better UX
- ❌ More rollback logic needed

**Conditional Optimistic:**
- ✅ Simpler error handling
- ✅ Less state management
- ❌ Slower perceived performance

**Decision**: Use optimistic UI for all user actions.

---

## 📝 Interview Follow-up Questions

### Question 1: How would you handle a scenario where a user edits a document offline on Device A, then edits the same document on Device B (also offline), and both devices come online at the same time?

**Expected Answer:**
1. Both devices have different versions in their version vectors
2. When syncing, server detects conflict (both have version 2, but different content)
3. Server returns 409 Conflict with both versions
4. Frontend shows conflict resolver UI
5. User chooses winner or merges manually
6. Winner becomes version 3, loser is discarded or merged

**If answer is wrong:** Guide them to think about version vectors, conflict detection, and user intervention.

### Question 2: What happens if the user's device runs out of storage while trying to cache data offline?

**Expected Answer:**
1. Monitor storage quota using Storage API
2. When approaching limit (80%), trigger cleanup:
   - Delete old synced data
   - Compress cached data
   - Remove unused assets
3. If still full, show warning to user
4. Allow user to manually clear cache
5. Consider implementing data compression

**If answer is wrong:** Explain Storage API, quota management, and graceful degradation.

### Improvement Question: How would you improve this system to support real-time collaboration (like Google Docs) where multiple users can edit simultaneously?

**Expected Answer Should Include:**
1. **WebSocket Connection**: Real-time updates instead of polling
2. **Operational Transformation**: Transform operations to preserve all edits
3. **Conflict-free Replicated Data Types (CRDTs)**: Alternative to OT
4. **Presence Indicators**: Show who's editing what
5. **Cursors/Selections**: Show other users' cursors
6. **Change Tracking**: Track changes per user
7. **Undo/Redo**: Per-user operation stack

**Key Points:**
- Move from sync-on-connect to continuous sync
- Implement operation transformation or CRDTs
- Add presence and collaboration features
- Handle network partitions gracefully

---

# 🎯 20 System Design Scenarios

---

## 1. Real-time Chat Application

### Requirements Clarification

**Functional:**
- Send/receive messages in real-time
- Support 1-on-1 and group chats
- Message delivery status (sent/delivered/read)
- Typing indicators
- File/image sharing
- Message search
- Offline message queuing

**Non-Functional:**
- < 100ms message delivery latency
- Support 10K+ concurrent users per chat
- 99.9% uptime
- End-to-end encryption

### Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│  ┌──────────────────────────────────┐  │
│  │  Chat UI Components               │  │
│  │  - MessageList                    │  │
│  │  - MessageInput                   │  │
│  │  - TypingIndicator                │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  State Management                 │  │
│  │  - Messages cache                 │  │
│  │  - Online users                   │  │
│  │  - Typing states                  │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  WebSocket Client                 │  │
│  │  - Connection management          │  │
│  │  - Reconnection logic             │  │
│  │  - Heartbeat                      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕ WebSocket
┌─────────────────────────────────────────┐
│         Backend Services                │
│  - WebSocket Server (Socket.io)         │
│  - Message Service                      │
│  - Presence Service                     │
│  - File Upload Service                  │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **WebSocket over Polling**: Real-time requires persistent connection
2. **Message Pagination**: Load messages in chunks (50 at a time)
3. **Optimistic Updates**: Show messages immediately, confirm delivery
4. **Local Caching**: Store recent messages in IndexedDB
5. **Reconnection Strategy**: Exponential backoff with jitter

### Trade-offs

- **WebSocket vs Server-Sent Events**: WebSocket for bidirectional, SSE for one-way
- **Message Ordering**: Use sequence numbers or timestamps
- **Delivery Guarantees**: At-least-once vs exactly-once

### Interview Questions

1. How would you handle message ordering if messages arrive out of sequence?
2. What happens if WebSocket disconnects during message send?

**Improvement**: Add message reactions, replies, and message editing with conflict resolution.

---

## 2. E-commerce Product Catalog

### Requirements Clarification

**Functional:**
- Browse products with filters (category, price, rating)
- Search products
- Product details page
- Add to cart (offline support)
- Wishlist
- Product recommendations
- Image lazy loading

**Non-Functional:**
- < 2s page load time
- Support 1M+ products
- Handle 100K+ concurrent users
- SEO-friendly

### Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│  ┌──────────────────────────────────┐  │
│  │  Product Listing                 │  │
│  │  - Virtual scrolling             │  │
│  │  - Infinite scroll               │  │
│  │  - Filter sidebar                │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  State Management                │  │
│  │  - Product cache (React Query)   │  │
│  │  - Filter state                  │  │
│  │  - Cart state (Zustand)          │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Image Optimization               │  │
│  │  - Lazy loading                   │  │
│  │  - Responsive images              │  │
│  │  - Blur placeholders              │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         API Layer                        │
│  - REST/GraphQL                          │
│  - CDN for images                        │
│  - Search API (Elasticsearch)            │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Virtual Scrolling**: Render only visible items (react-window)
2. **Image CDN**: Use Cloudinary/Imgix for optimization
3. **Search**: Client-side for small datasets, server-side for large
4. **Caching**: React Query with stale-while-revalidate
5. **Cart Persistence**: localStorage + sync on login

### Trade-offs

- **SSR vs CSR**: SSR for SEO, CSR for interactivity
- **Filter State**: URL params vs local state
- **Image Format**: WebP with JPEG fallback

### Interview Questions

1. How would you handle product inventory updates in real-time?
2. What's your strategy for handling product image loading failures?

**Improvement**: Add AR product preview, personalized recommendations using ML.

---

## 3. Social Media Feed

### Requirements Clarification

**Functional:**
- Infinite scroll feed
- Post creation (text, images, videos)
- Like, comment, share
- Real-time updates
- Story feature
- Trending topics

**Non-Functional:**
- < 1s feed load time
- Support 10M+ posts
- Handle viral posts (1M+ likes)
- Real-time engagement updates

### Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│  ┌──────────────────────────────────┐  │
│  │  Feed Component                  │  │
│  │  - Virtual scrolling             │  │
│  │  - Intersection Observer         │  │
│  │  - Optimistic updates            │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  State Management                 │  │
│  │  - Feed cache (normalized)        │  │
│  │  - Engagement counts              │  │
│  │  - Real-time subscriptions        │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Media Handling                   │  │
│  │  - Image optimization              │  │
│  │  - Video lazy loading             │  │
│  │  - Progressive loading             │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Feed Algorithm**: Chronological vs algorithmic (ML-based)
2. **Normalized State**: Store posts/users separately (Redux pattern)
3. **Optimistic Updates**: Update UI before server confirmation
4. **Pagination**: Cursor-based for infinite scroll
5. **Real-time**: WebSocket for engagement, polling for feed updates

### Trade-offs

- **Feed Order**: Real-time vs batched updates
- **Media Loading**: Eager vs lazy
- **Engagement Sync**: Immediate vs debounced

### Interview Questions

1. How would you prevent duplicate posts when user scrolls quickly?
2. What's your approach to handling a post that goes viral (sudden spike in engagement)?

**Improvement**: Add AI-powered content moderation, personalized feed ranking.

---

## 4. Video Streaming Platform

### Requirements Clarification

**Functional:**
- Video playback with quality selection
- Playlist management
- Watch history
- Recommendations
- Subtitles/closed captions
- Live streaming support

**Non-Functional:**
- < 2s video start time
- Adaptive bitrate streaming
- Support 4K playback
- Handle network interruptions

### Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│  ┌──────────────────────────────────┐  │
│  │  Video Player                    │  │
│  │  - HLS/DASH player               │  │
│  │  - Quality selector               │  │
│  │  - Buffer management             │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Playback State                   │  │
│  │  - Current position               │  │
│  │  - Playback speed                 │  │
│  │  - Quality preference             │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Offline Support                  │  │
│  │  - Download manager               │  │
│  │  - DRM handling                   │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Streaming Protocol**: HLS for compatibility, DASH for efficiency
2. **Adaptive Bitrate**: Adjust quality based on network
3. **Buffering Strategy**: Preload next segments
4. **Offline Downloads**: Encrypted storage with DRM
5. **Progress Tracking**: Save position every 5 seconds

### Trade-offs

- **Quality vs Bandwidth**: Adaptive streaming
- **Startup Time**: Lower initial quality for faster start
- **Storage**: Compress downloads vs quality

### Interview Questions

1. How would you handle video playback when network switches from WiFi to mobile data?
2. What's your strategy for preventing video piracy in offline downloads?

**Improvement**: Add social features (watch parties), AI-generated thumbnails.

---

## 5. Collaborative Document Editor

### Requirements Clarification

**Functional:**
- Real-time collaborative editing
- Multiple cursors/selections
- Version history
- Comments and suggestions
- Offline editing with sync
- Export to PDF/Word

**Non-Functional:**
- < 50ms operation latency
- Support 100+ concurrent editors
- Handle large documents (100K+ words)
- Conflict-free editing

### Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│  ┌──────────────────────────────────┐  │
│  │  Editor Component                 │  │
│  │  - Rich text editor (Slate/Draft) │  │
│  │  - Operation tracking             │  │
│  │  - Cursor rendering               │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Operational Transformation       │  │
│  │  - Transform operations           │  │
│  │  - Apply remote changes           │  │
│  │  - Conflict resolution            │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  WebSocket Client                 │  │
│  │  - Send operations                │  │
│  │  - Receive operations             │  │
│  │  - Presence updates               │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **OT Library**: Use ShareJS or Yjs (CRDT-based)
2. **Operation Batching**: Batch rapid edits
3. **Undo/Redo**: Per-user operation stack
4. **Presence**: Show cursors and selections
5. **Offline**: Queue operations, sync on reconnect

### Trade-offs

- **OT vs CRDT**: OT is complex but proven, CRDT is simpler
- **Operation Granularity**: Character vs word level
- **Sync Frequency**: Immediate vs batched

### Interview Questions

1. How would you handle a user who types very fast (100+ chars/sec) without overwhelming the server?
2. What happens if two users delete the same word simultaneously?

**Improvement**: Add AI-powered suggestions, voice comments, mobile editing support.

---

## 6. Task Management System

### Requirements Clarification

**Functional:**
- Create/edit/delete tasks
- Task assignments
- Due dates and reminders
- Task dependencies
- Project organization
- Offline support
- Real-time updates

**Non-Functional:**
- < 100ms UI interaction latency
- Support 100K+ tasks per user
- Offline-first (Trello/Asana style)
- Real-time sync across devices

### Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│  ┌──────────────────────────────────┐  │
│  │  Kanban/List Views               │  │
│  │  - Drag & Drop (react-beautiful-dnd)│  │
│  │  - Virtualized Lists             │  │
│  │  - Nested Subtasks               │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Offline Layer                   │  │
│  │  - IndexedDB (Task Database)     │  │
│  │  - Cache-first Strategy          │  │
│  │  - Sync Queue Manager            │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         API & Real-time Layer            │
│  - WebSocket for live updates           │
│  - Conflict resolution on server        │
│  - Push notifications for due dates     │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Normalized State**: Use ID-based lookups for tasks to make updates and D&D efficient.
2. **Drag and Drop UX**: Use placeholders and optimistic movement to make the UI feel snappy.
3. **Local-First Data**: All writes go to IndexedDB first, then sync to the server.
4. **Relational Constraints**: Maintain parent-child relationships for subtasks and dependencies locally.
5. **Conflict Handling**: Last-write-wins for task titles, but merged lists for tags/comments.

### Trade-offs

- **Granular vs Coarse Sync**: Syncing every drag vs syncing after a debounce period.
- **Deep Nesting**: Complexity of state management vs user flexibility.
- **Initial Load**: Fetching all tasks vs fetching project-by-project.

### Interview Questions

1. How would you handle a circular dependency if two tasks are set to depend on each other?
2. What strategy would you use to sync changes across multiple open tabs?

**Improvement**: Add Gantt chart visualizations, automated workflows, and AI task estimation.

---

## 7. Payment Processing System (Stripe-like)

### Requirements Clarification

**Functional:**
- Securely collect payment information
- Support multiple payment methods (Card, UPI, Wallet)
- Show real-time payment status
- Handle coupons and discounts
- Support subscriptions and one-time payments

**Non-Functional:**
- PCI-DSS Compliance (Security)
- < 100ms response time for UI interactions
- No duplicate charges (Idempotency)
- High availability (99.99%)

### Architecture

```
┌─────────────────────────────────────────┐
│         Payment Frontend UI             │
│  - Element/Component Injection (Iframe) │
│  - Input Validation                     │
│  - Error Handling                       │
└─────────────────────────────────────────┘
              ↕ (Tokenization)
┌─────────────────────────────────────────┐
│         Payment Gateway SDK             │
│  - Encrypt sensitive data               │
│  - Return one-time use tokens           │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Payment Server                  │
│  - Idempotency key handling             │
│  - Webhook listener                     │
│  - Receipt generation                   │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Security (Iframes/Elements)**: Never handle raw card data on your own domain to minimize PCI scope.
2. **Idempotency Keys**: Generate a unique key for every transaction attempt to prevent double charging.
3. **Polling vs Webhooks**: Use Webhooks for final status as third-party redirects might not return to the app.
4. **State Machine**: Use a strict state machine (Pending -> Processing -> Success/Fail) for the UI.

### Trade-offs

- **Custom UI vs Hosted Fields**: Full control vs easier security compliance.
- **Immediate vs Delayed Capture**: Better UX vs handling fraud risk.

### Interview Questions

1. How do you handle a scenario where the user closes the browser during a "Processing" payment state?
2. Why is an idempotency key crucial in payment systems?

**Improvement**: Add biometric authentication (Apple/Google Pay) and dynamic 3DS handling.

---

## 8. Analytics Dashboard

### Requirements Clarification

**Functional:**
- Real-time data visualization (Charts, Tables)
- Custom date ranges and filters
- Exporting data to PDF/CSV
- Drill-down capabilities
- User-defined dashboards

**Non-Functional:**
- Handle large datasets (100K+ data points) without lag
- < 1s initial graph rendering
- Responsive design for mobile viewing
- Data accuracy

### Architecture

```
┌─────────────────────────────────────────┐
│         Dashboard Frontend              │
│  ┌──────────────────────────────────┐  │
│  │  Visualization Layer (D3/Recharts)│  │
│  │  - WebWorker for processing data  │  │
│  │  - Canvas vs SVG rendering        │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Data Orchestration               │  │
│  │  - Prefetching & Caching          │  │
│  │  - Search/Filter debouncing       │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Web Workers**: Move heavy data aggregation and formatting off the main thread to prevent UI freezing.
2. **Memoization**: Heavily use `useMemo` for derived data to avoid re-calculating on every render.
3. **Windowing/Sampling**: If data is too large, sample points or use "windowing" to only show what’s needed.
4. **Library Choice**: SVG (Recharts) for interactive charts, Canvas (Chart.js) for high-performance datasets.

### Trade-offs

- **Client-side vs Server-side Aggregation**: Flexibility vs Performance.
- **Real-time vs Polling**: Complexity vs Data freshness.

### Interview Questions

1. How would you debug a performance bottleneck in a dashboard with 10 complex charts?
2. How do you handle "missing data" intervals in a time-series graph?

**Improvement**: Integrated AI for anomaly detection and automated insights generation.

---

## 9. Search Engine Frontend (Google/Amazon style)

### Requirements Clarification

**Functional:**
- Instant search (type-ahead)
- Result snippets and highlighting
- Advanced filters and sorting
- Voice search
- Recent search history

**Non-Functional:**
- Extremely low latency (< 50ms for suggestions)
- Accessible (ARIA standards)
- Mobile-optimized performance
- Handles network latency (debouncing)

### Architecture

```
┌─────────────────────────────────────────┐
│         Search Frontend                 │
│  - Search Bar + Suggestion List         │
│  - Result List (Virtual Scrolling)      │
│  - Filter/Facet Sidebar                 │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Search API / Edge               │
│  - Debouncing/Throttling                │
│  - Request Cancellation (AbortController)│
│  - Cache suggestions at Edge            │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Debouncing**: Delay API calls until the user stops typing for 200-300ms.
2. **Request Cancellation**: Cancel previous pending requests using `AbortController` if the user types a new character.
3. **Keyboard Navigation**: Fully support arrow keys and 'Enter' for selection within suggestions.
4. **Local History**: Store recent searches in `localStorage` for instant retrieval.

### Trade-offs

- **Prefetching**: Predicting what the user will type vs wasting bandwidth.
- **Client-side Filter**: Fast filtering vs fetching huge payloads.

### Interview Questions

1. How do you handle race conditions where search results for "A" arrive after results for "AB"?
2. How would you implement "Search-as-you-type" for a screen reader?

**Improvement**: Visual search (uploading an image) and semantic search integration.

---

## 10. Notification System

### Requirements Clarification

**Functional:**
- Real-time push notifications
- Notification center (In-app history)
- Mark as read/unread
- Actionable notifications (Buttons)
- Preference settings (Opt-in/out)

**Non-Functional:**
- No missed notifications
- Support for multiple devices
- Low battery consumption (for mobile)
- Minimal noise (Grouping/Aggregating)

### Architecture

```
┌─────────────────────────────────────────┐
│         Client Notification Manager     │
│  - Service Worker (Push API)            │
│  - Toast/Snack-bar UI                   │
│  - WebSocket Listener                   │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Notification Backend            │
│  - FCM (Firebase Cloud Messaging)       │
│  - Queue (Redis)                        │
│  - User Preferences DB                  │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Service Workers**: Use the Push API to receive notifications even when the browser is closed.
2. **State Sync**: When a notification is read on one device, update the red badge on all others via WebSocket.
3. **Optimistic Dismissal**: Remove toast immediately on click, sync deletion in the background.
4. **Batching**: Group multiple likes/comments into a single "X and 5 others liked..." notification.

### Trade-offs

- **Polling vs WebSockets vs Push**: Battery life vs Real-time delivery.
- **In-app vs OS-level**: Visibility vs Customizability.

### Interview Questions

1. How do you prevent "Notification Fatigue"? 
2. How does the browser receive a push message if the website isn't open?

**Improvement**: Context-aware notifications (Geo-fencing) and smart snooze.

---

## 11. File Upload & Management (Dropbox-like)

### Requirements Clarification

**Functional:**
- Multi-file upload (Drag & Drop)
- Progress bars and Pause/Resume
- Folder structure management
- File previews (Images, PDF, Video)
- Sharing and permissions

**Non-Functional:**
- Support for large files (GBs)
- Resume after network failure
- Low memory footprint during upload
- Security (Anti-virus scanning UI)

### Architecture

```
┌─────────────────────────────────────────┐
│         Upload Frontend                 │
│  - Chunking Engine                      │
│  - Parallel Upload Manager              │
│  - Thumbnail/Preview Generator          │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Storage API / S3                │
│  - Presigned URLs                       │
│  - Multipart Upload API                 │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **File Chunking**: Split large files into 5MB chunks using the `Blob.slice()` API.
2. **Concurrent Uploads**: Upload 3-5 chunks in parallel to maximize bandwidth.
3. **Resumable Uploads**: Store chunk progress in `localStorage` or `IndexedDB` to resume after a refresh.
4. **Main Thread Safety**: Use Web Workers to calculate file hashes (MD5/SHA) for integrity checks.

### Trade-offs

- **Client vs Server Preview**: Performance vs Accuracy.
- **Immediate vs Background**: Block user during upload vs background processing.

**Improvement**: Differential sync (only upload parts of a file that changed) and AI-categorization.

---

## 12. Booking/Reservation System (Airbnb/Hotels style)

### Requirements Clarification

**Functional:**
- Date range selection (Calendar)
- Real-time availability check
- Seat/Room selection map
- Reservation timer (Hold period)
- Multi-step checkout flow

**Non-Functional:**
- Prevent double-booking (Race conditions)
- Fast calendar interactions
- Mobile-first responsiveness
- Handle high traffic during sales

### Architecture

```
┌─────────────────────────────────────────┐
│         Booking Frontend                │
│  - Optimized Calendar Component         │
│  - Polling for availability             │
│  - State Machine for Checkout           │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Pre-fetching Availability**: Fetch availability for the next 3 months as soon as the user opens the calendar.
2. **Optimistic Locking UI**: Show "Held" state for the user while the API confirms the reservation hold.
3. **Countdown Timers**: Implement a client-side timer synchronized with server-side expiration.
4. **SVG Seat Maps**: Use interactive SVGs for seat selection for crisp rendering and easy interaction.

**Improvement**: Dynamic pricing visualization and integration with travel insurance.

---

## 13. Code Editor (VS Code-like)

### Requirements Clarification

**Functional:**
- Syntax highlighting
- IntelliSense / Autocomplete
- File tree navigation
- Multi-tab support
- Integrated terminal

**Non-Functional:**
- Handle files with 10k+ lines without lag
- < 10ms typing latency
- Extensibility (Plugin support)
- Theme support

### Architecture

```
┌─────────────────────────────────────────┐
│         Editor Frontend                 │
│  ┌──────────────────────────────────┐  │
│  │  View Layer (Monaco/CodeMirror)   │  │
│  │  - Viewport-based rendering       │  │
│  │  - Decoration management          │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Language Client Layer            │  │
│  │  - LSP Protocol handler            │  │
│  │  - WebWorker for Syntax parsing    │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕ (LSP / WebSocket)
┌─────────────────────────────────────────┐
│         Language Server (LSP)           │
│  - Static analysis                   │
│  - Autocomplete engine               │
│  - Go-to-definition mapping          │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Virtualized Rendering**: Only render rows currently in the viewport to handle files with millions of lines.
2. **Web Workers**: Move heavy parsing, linting, and AST generation to background threads to keep the UI at 60fps.
3. **LSP Integration**: Use the Language Server Protocol to decouple editor UI from language-specific logic.
4. **Efficient Buffer**: Use a Piece Table or specialized string buffer for fast edits in the middle of large files.

### Trade-offs

- **Monaco vs CodeMirror**: Feature-richness vs Bundle size/Customizability.
- **Client-Side vs Server-Side Parsing**: Latency vs Feature completeness.

### Interview Questions

1. How do you implement "Undo/Redo" for a file with 50,000 lines without consuming GBs of memory?
2. How would you render a 1GB log file in the browser efficiently?

**Improvement**: Add AI-pair programming (Copilot-like) and real-time live sharing (Live Share).

---

## 14. Music Player Application (Spotify-like)

### Requirements Clarification

**Functional:**
- Audio playback (Play/Pause/Skip)
- Queue management & Shuffling
- Offline downloads
- Lyrics synchronization
- Cross-device sync (Spotify Connect style)

**Non-Functional:**
- Gapless playback
- < 100ms playback start latency
- Efficient battery and data usage
- High-fidelity audio support

### Architecture

```
┌─────────────────────────────────────────┐
│         Player Frontend                 │
│  ┌──────────────────────────────────┐  │
│  │  UI Components (Album Art, Seek)   │  │
│  │  - State Synchronization          │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Audio Engine (Web Audio API)     │  │
│  │  - Buffer Management              │  │
│  │  - Audio Context handling         │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Content Delivery (CDN)          │
│  - Chunked Audio Streaming           │
│  - Service Worker Caching            │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Web Audio API**: Use for complex audio tasks like cross-fading, equalizers, and visualizers.
2. **Service Workers**: Intercept audio requests to provide offline support via the Cache API.
3. **Global State**: Keep playback state independent of routing to ensure music doesn't stop during navigation.
4. **Media Session API**: Integrate with OS-level playback controls (locked screen, media keys).

### Trade-offs

- **Format (MP3 vs OGG/WebM)**: Compatibility vs Compression efficiency.
- **Buffering Strategy**: Deep buffering (better for poor nets) vs Memory usage.

### Interview Questions

1. How do you synchronize lyrics precisely down to the millisecond with the audio?
2. How would you handle a scenario where the network drops mid-song?

**Improvement**: Social listening rooms and AI-generated mood-based playlists.

---

## 15. Map & Location Services (Google Maps-like)

### Requirements Clarification

**Functional:**
- Interactive map (Zoom/Pan/Rotate)
- Search for places & Auto-complete
- Directions (Routing)
- Street view / Satellite view
- Current location tracking

**Non-Functional:**
- Smooth 60fps zooming and panning
- Fast tile loading & Rendering
- Conserve mobile battery during navigation
- Offline map areas

### Architecture

```
┌─────────────────────────────────────────┐
│         Map Frontend                    │
│  ┌──────────────────────────────────┐  │
│  │  Render Engine (WebGL / Canvas)    │  │
│  │  - Vector Tile Rendering          │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Geometry Engine                  │  │
│  │  - Projection (Mercator)          │  │
│  │  - Distance calculation           │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Tile Server / Geo API           │
│  - PBF Vector Tiles                  │
│  - Routing Service (OSRM/GraphHopper)│
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Vector Tiles**: Use PBF format vector tiles for smaller size and client-side styling/rotation.
2. **WebGL**: Use WebGL (Mapbox/MapLibre) for high-performance rendering of thousands of shapes.
3. **GeoJSON**: Efficiently transport custom markers and paths.
4. **Mercator Projection**: Standardize coordinate mapping to screen pixels.

### Trade-offs

- **Raster vs Vector Tiles**: Legacy support vs Flexibility/Performance.
- **Battery vs Accuracy**: Tracking frequency (High vs Balanced).

**Improvement**: Real-time traffic overlays and AR navigation markers.

---

## 16. Form Builder Platform (Typeform/Google Forms)

### Requirements Clarification

**Functional:**
- Drag & Drop field builder
- Conditional logic (Branching)
- Theme/Branding customization
- Multi-mode (One question at a time vs scrolling)
- Response Analytics

**Non-Functional:**
- Zero-code experience for admins
- Extremely fast form rendering for end-users
- Auto-save to prevent data loss
- Fully accessible (WCAG compliant)

### Architecture

```
┌─────────────────────────────────────────┐
│         Form Builder UI                 │
│  - DND Engine (dnd-kit)                 │
│  - JSON Schema Generator                │
└─────────────────────────────────────────┘
              ↕ (Schema JSON)
┌─────────────────────────────────────────┐
│         Form Renderer Engine            │
│  - Dynamic Component Injection          │
│  - Logic Processor (Conditionals)       │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **JSON Schema**: Standardize form definitions in JSON to allow easy saving and versioning.
2. **Standard Components**: Build a library of atomic components (Input, Choice, Rating) that are reused in the builder and renderer.
3. **Logic Engine**: Create a server-independent logic engine that can evaluate `If [Name] contains 'X' show [Question 2]`.
4. **Performance**: Only load components used in the specific form (code splitting).

### Trade-offs

- **Custom Styles vs Theme Engine**: Design flexibility vs Builder complexity.
- **Validation**: Real-time vs On-submit.

**Improvement**: Conversational AI forms and integration with Zapier/Make.

---

## 17. Live Polling/Voting System

### Requirements Clarification

**Functional:**
- Create/Join live polls (via Code or URL)
- Real-time result charting (Bar/Pie/WordCloud)
- Prevent multiple votes (Fingerprinting/Auth)
- Moderator controls (Close poll, Reset)

**Non-Functional:**
- Handle massive spikes (10k+ concurrent votes)
- < 200ms result update latency
- High uptime during events
- Mobile-friendly (Quick interaction)

### Architecture

```
┌─────────────────────────────────────────┐
│         Voter Client                    │
│  - Quick interaction UI                 │
│  - Fingerprint generation               │
└─────────────────────────────────────────┘
              ↕ (WebSocket)
┌─────────────────────────────────────────┐
│         Presenter Dashboard             │
│  - Live Data Visualization (D3)         │
│  - State management (Zustand)           │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **WebSockets/SSE**: Use for broadcasting results to all presenters and voters simultaneously.
2. **Debounced Animations**: Update the result data immediately, but debounce or throttle UI animation updates (graphs) to avoid flickering.
3. **In-Memory Counting (Server)**: If traffic is extreme, use Redis for counting before flushing to DB.
4. **Fingerprinting**: Use browser fingerprinting + localStorage for guest voting to prevent easy re-voting.

### Trade-offs

- **WebSocket vs Long Polling**: Real-time feel vs Server resource usage (Conns).
- **Security vs Friction**: Email verification vs Guest "Quick" voting.

**Improvement**: QR code integration and emotional sentiment analysis based on comments.

---

## 18. Multi-tenant SaaS Dashboard

### Requirements Clarification

**Functional:**
- Multi-organization hierarchy
- Role-Based Access Control (RBAC)
- Custom Domain & White-labeling
- Billing/Plan management
- Audit logs

**Non-Functional:**
- Strict data isolation between tenants
- Performance consistency
- Customizable theme per tenant
- Scalable configuration

### Architecture

```
┌─────────────────────────────────────────┐
│         SaaS Core Frontend              │
│  - Tenant Resolver (URL based)          │
│  - Permission-based Routing             │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Tenant Config Service           │
│  - Dynamic Branding (CSS Variables)     │
│  - Feature Flags (Unleash/LaunchDarkly) │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Tenant Identification**: Identify tenant via subdomain (`acme.saas.com`) or custom domain.
2. **CSS Variables for Branding**: Inject tenant's primary colors/font as variables at the root level.
3. **Permission Wrapper**: Create a `<HasPermission code="VIEW_REPORTS">` wrapper to hide/show UI elements.
4. **Data Isolation**: Ensure every API request includes a tenant ID header.

### Trade-offs

- **Subdomain vs Path-based**: SEO differences vs Routing complexity.
- **Strict Isolation vs Shared Components**: Reliability vs Code reuse.

**Improvement**: Tenant-specific SSO (SAML/Okta) and usage-based automated billing alerts.

---

## 19. Gaming Leaderboard System

### Requirements Clarification

**Functional:**
- Global and Friend-based leaderboards
- Real-time rank updates (Climbing animation)
- User profiles/stat pages
- Reward claiming UI
- Search/Filter by region/mode

**Non-Functional:**
- Handle 10M+ users
- < 100ms data retrieval
- Mobile-responsive (Quick check)
- Anti-cheat visual indicators

### Architecture

```
┌─────────────────────────────────────────┐
│         Leaderboard Frontend            │
│  - Virtualized List (FlashList/Window)  │
│  - Ranking State Management             │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Ranking Service (Redis Sorted) │
│  - ZADD / ZRANGE operations             │
│  - Rank recalculation                   │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Redis Sorted Sets**: (On backend) Use for O(log N) ranking updates.
2. **Client-side Virtualization**: Only render the current portion of the leaderboard the user is scrolling through.
3. **Optimistic Ranking**: Move the user's position immediately when a new score is recorded.
4. **Caching**: Cache top 100 on a CDN as they are fetched most frequently.

### Trade-offs

- **Real-time vs Hourly Refresh**: Server load vs competitive excitement.
- **Exact vs Approximate Rank**: Fetching true rank for 1M+ users vs buckets.

**Improvement**: Interactive "Climb" animations and 3D avatar display for top winners.

---

## 20. Healthcare Appointment System

### Requirements Clarification

**Functional:**
- Find doctors (Specialty, Location, Rating)
- Calendar Booking & Rescheduling
- Integrated Video Consultation (WebRTC)
- Secure Document/Report Upload
- Digital Prescriptions

**Non-Functional:**
- **HIPAA Compliance** (Security)
- High reliability (System cannot fail during emergencies)
- Offline-ready prescription access
- Extremely accessible (Large fonts, high contrast)

### Architecture

```
┌─────────────────────────────────────────┐
│         Health Platform UI              │
│  - Booking Engine                       │
│  - WebRTC Video Interface               │
│  - Encrypted Document Viewer            │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         Encrypted Health Service        │
│  - E2EE (End-to-End Encryption)         │
│  - Appointment Scheduler                │
│  - Records DB                           │
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Security**: Encryption-at-rest and in-transit. Use E2EE for private doctor-patient messages.
2. **WebRTC**: Integrate a reliable WebRTC wrapper (Daily.co / Agora) for telehealth sessions.
3. **Validation State Machine**: Ensure no double bookings and handle time-zone conversions meticulously.
4. **Accessibility**: Enforce strict accessibility standards to support elderly or visually impaired patients.

### Trade-offs

- **Native App vs Web**: Push notification capability vs Zero-install frictionless access.
- **Direct WebRTC vs Turn Server**: Cost vs Reliability in restricted networks.

**Improvement**: AI-driven symptom checker and automated medicine reminders.


---

# 📋 The Senior Interview Playbook

System Design interviews are as much about **communication** as they are about technical knowledge. Follow this 4-step framework to ace the session.

---

## Phase 1: Clarify & Scope (5-10 Minutes)
*Never* jump straight into a diagram. Start with questions.

- **Confirm Functional Requirements**: "Are we building the mobile web version or a desktop dashboard?"
- **Define Non-Functional Requirements**: "What is the expected scale? 1,000 users or 10 million? Is offline support a requirement?"
- **Establish Constraints**: "Are there any specific browser support requirements or data residency (GDPR) concerns?"
- **State Your Assumptions**: "I'm assuming we'll use a centralized Auth service for this."

## Phase 2: High-Level Architecture (10-15 Minutes)
Draw the "Macro" view. Identify the major components.

- **Component Tree**: Mention the core page structure.
- **Data Flow**: Explain how data gets from the API to the UI.
- **External Services**: Mention CDNs, Analytics, Error Tracking, and Auth Providers.
- **Infrastructure**: Briefly mention where the app is hosted (S3 + Cloudfront, Vercel, etc.).

## Phase 3: Technical Deep Dives (15-20 Minutes)
This is where you show your expertise. Pick 2-3 areas to go deep.

- **API Design**: Define the schema. "We'll use a GraphQL mutation for this to allow the client to request only the feedback they need."
- **Data Modeling**: How is the data stored in the state? Show a normalized schema.
- **Component Design**: Explain the choice of a specific pattern (Compound Components, Render Props, HOCs).
- **Critical Flow**: Walk through a complex user action (e.g., "Here is exactly what happens when the user clicks 'Submit' while offline").

## Phase 4: Trade-offs & Wrap-up (5-10 Minutes)
The difference between a mid-level and a senior is the word **"It depends."**

- **Acknowledge the Downsides**: "This approach uses more client-side memory, but it provides a better offline experience."
- **Proactive Scaling**: "If we hit 1 million concurrent users, we would need to switch from Polling to WebSockets."
- **Alternative Approaches**: "We could have used Redux here, but for this specific scale, Zustand offers lower boilerplate."
- **Summary**: Tie everything back to the initial requirements. "This design meets our 100ms latency goal while ensuring zero data loss."

---

# 🎓 Conclusion

Mastering frontend system design is about seeing the "Big Picture." It's not just about writing components; it's about **data flow, scalability, resilience, and user experience.** Use this guide to structure your thoughts during interviews and build world-class applications.

# 📚 Resources
 
 - **Books**: 
   - *Designing Data-Intensive Applications* by Martin Kleppmann (Essential for systems thinking)
   - *Architecture Patterns with Python* (Good for domain-driven design concepts)
 - **Blogs**:
   - [Engineering at Meta](https://engineering.fb.com/)
   - [Netflix Tech Blog](https://netflixtechblog.com/)
   - [Uber Engineering](https://eng.uber.com/)
 - **Tools**:
   - [Excalidraw](https://excalidraw.com/) (For diagrams)
   - [Eraser.io](https://eraser.io/) (For architectural documentation)
 
 ---
 
