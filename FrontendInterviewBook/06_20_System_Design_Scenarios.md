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

