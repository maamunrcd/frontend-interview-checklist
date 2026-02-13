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

