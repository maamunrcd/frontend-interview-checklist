# NEXT.JS & SSR

## Next.js Architecture

### App Router vs Pages Router

```javascript
// Pages Router (Legacy)
// pages/index.js
export default function HomePage({ data }) {
  return <div>{data.title}</div>;
}

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data } };
}

// App Router (Modern)
// app/page.tsx
async function HomePage() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // SSR
  });
  const data = await res.json();
  
  return <div>{data.title}</div>;
}

export default HomePage;
```

### Data Fetching Strategies

```javascript
// 1. Server-Side Rendering (SSR) - Always Fresh
async function SSRPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  
  return <div>{data.title}</div>;
}

// 2. Static Site Generation (SSG) - Build Time
async function SSGPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache'
  });
  
  return <div>{data.title}</div>;
}

// 3. Incremental Static Regeneration (ISR)
async function ISRPage() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  return <div>{data.title}</div>;
}

// 4. Client-Side Rendering (CSR)
'use client';

function CSRPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []);
  
  if (!data) return <Loading />;
  return <div>{data.title}</div>;
}
```

### Dynamic Routes

```javascript
// app/blog/[slug]/page.tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map(post => ({
    slug: post.slug
  }));
}

// Catch-all routes: [...slug]
// app/docs/[...slug]/page.tsx
async function DocsPage({ params }: { params: { slug: string[] } }) {
  const path = params.slug.join('/');
  const doc = await getDoc(path);
  
  return <div>{doc.content}</div>;
}

// Optional catch-all: [[...slug]]
// Matches /docs and /docs/a/b/c
```

---

## Server Components vs Client Components

### When to Use What

```javascript
// Server Component (default)
// ✅ Good for:
// - Data fetching
// - Accessing backend resources
// - Keeping sensitive info on server
// - Reducing client-side JavaScript

async function ServerComponent() {
  // Can access database directly
  const data = await db.query('SELECT * FROM users');
  
  // Can use server-only packages
  const fs = require('fs');
  
  return <div>{data.length} users</div>;
}

// Client Component
// ✅ Good for:
// - Interactivity (onClick, onChange)
// - Using hooks (useState, useEffect)
// - Browser APIs (localStorage, window)
// - Event listeners

'use client';

function ClientComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Composing Server + Client
async function Page() {
  const data = await fetchData(); // Server
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientComponent data={data} />
    </div>
  );
}
```

### Passing Props from Server to Client

```javascript
// ✅ Can pass:
// - Serializable data (JSON)
// - Strings, numbers, booleans
// - Arrays, plain objects
// - Date objects

// Server Component
async function ServerPage() {
  const data = await fetchData();
  
  return (
    <ClientComponent
      title="Hello"
      count={42}
      items={['a', 'b', 'c']}
      config={{ theme: 'dark' }}
      date={new Date()}
    />
  );
}

// ❌ Cannot pass:
// - Functions
// - Class instances
// - Symbols
// - Server-only modules

// ❌ This won't work:
<ClientComponent
  onClick={() => console.log('click')} // Function!
  instance={new MyClass()}              // Class instance!
/>

// ✅ Fix: Define function in Client Component
'use client';

function ClientComponent({ data }) {
  const handleClick = () => {
    console.log('click', data);
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

---

## NextAuth & Authentication

### Complete NextAuth Implementation

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user) {
          throw new Error('User not found');
        }
        
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isValid) {
          throw new Error('Invalid password');
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // Control who can sign in
      if (account?.provider === 'google') {
        return profile?.email?.endsWith('@company.com') ?? false;
      }
      return true;
    },
    
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      // Update token on session update
      if (trigger === 'update' && session) {
        token.name = session.name;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Prevent open redirect vulnerabilities
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`);
    },
    async signOut({ session }) {
      console.log(`User signed out`);
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Using Auth in Components

```typescript
// Server Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function ServerComponent() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return <div>Hello, {session.user.name}</div>;
}

// Client Component
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

function ClientComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'unauthenticated') {
    return (
      <button onClick={() => signIn()}>
        Sign In
      </button>
    );
  }
  
  return (
    <div>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}

// Root Layout (required for client components)
'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

### Protecting Routes with Middleware

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('Authorized:', req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        }
        
        // Protect dashboard
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token;
        }
        
        return true;
      }
    }
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

### Role-Based Access Control

```typescript
// lib/auth-helpers.ts
export async function requireAuth(requiredRole?: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  if (requiredRole && session.user.role !== requiredRole) {
    redirect('/unauthorized');
  }
  
  return session;
}

// Usage in Server Component
async function AdminPage() {
  await requireAuth('admin');
  
  return <div>Admin Content</div>;
}

// HOC for Client Components
function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: string
) {
  return function AuthComponent(props: P) {
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        redirect('/auth/signin');
      }
    });
    
    if (status === 'loading') {
      return <Loading />;
    }
    
    if (requiredRole && session.user.role !== requiredRole) {
      return <div>Unauthorized</div>;
    }
    
    return <Component {...props} />;
  };
}

// Usage
const AdminDashboard = withAuth(Dashboard, 'admin');
```

---

