# ADVANCED TOPICS

## PWA & Service Workers

### Service Worker Lifecycle

```javascript
// sw.js - Service Worker
const CACHE_NAME = 'app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js',
  '/images/logo.png'
];

// 1. Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
  );
  
  // Activate immediately
  self.skipWaiting();
});

// 2. Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control immediately
  self.clients.claim();
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone and cache response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
  );
});

// 4. Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-posts') {
    event.waitUntil(syncPosts());
  }
});

async function syncPosts() {
  const cache = await caches.open('pending-posts');
  const requests = await cache.keys();
  
  return Promise.all(
    requests.map(async (request) => {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch (error) {
        console.error('Sync failed:', error);
      }
    })
  );
}

// 5. Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.message,
    icon: '/icon.png',
    badge: '/badge.png',
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Register Service Worker
// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('SW registration failed:', error);
      });
  });
}
```

### Progressive Web App (PWA)

```json
// manifest.json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A progressive web application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#007bff">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/icon-192.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="MyPWA">
</head>
</html>
```

---

## WebSockets & Real-time Communication

```typescript
// WebSocket Client
class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners = new Map<string, Set<Function>>();
  
  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
      this.emit('connected', null);
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.emit(data.type, data.payload);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };
    
    this.ws.onclose = () => {
      console.log('Disconnected');
      this.emit('disconnected', null);
      this.reconnect(url);
    };
  }
  
  reconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      setTimeout(() => {
        console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);
        this.connect(url);
      }, delay);
    }
  }
  
  send(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.error('WebSocket not connected');
    }
  }
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }
  
  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }
  
  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => {
      callback(data);
    });
  }
  
  disconnect() {
    this.ws?.close();
  }
}

// React Hook
function useWebSocket(url: string) {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocketClient | null>(null);
  
  useEffect(() => {
    const ws = new WebSocketClient();
    wsRef.current = ws;
    
    ws.on('connected', () => setConnected(true));
    ws.on('disconnected', () => setConnected(false));
    ws.connect(url);
    
    return () => {
      ws.disconnect();
    };
  }, [url]);
  
  const send = useCallback((type: string, payload: any) => {
    wsRef.current?.send(type, payload);
  }, []);
  
  const subscribe = useCallback((event: string, callback: Function) => {
    wsRef.current?.on(event, callback);
    
    return () => {
      wsRef.current?.off(event, callback);
    };
  }, []);
  
  return { connected, send, subscribe };
}

// Usage
function ChatApp() {
  const { connected, send, subscribe } = useWebSocket('wss://api.example.com/chat');
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    return subscribe('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });
  }, [subscribe]);
  
  const sendMessage = (text: string) => {
    send('message', { text });
  };
  
  return (
    <div>
      <div>Status: {connected ? 'Connected' : 'Disconnected'}</div>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
```

---

