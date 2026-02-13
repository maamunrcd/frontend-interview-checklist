# TYPESCRIPT

## Type vs Interface

```typescript
// Interface: For object shapes, extensible
interface User {
  id: string;
  name: string;
  email: string;
}

// Type: For unions, primitives, tuples
type ID = string | number;
type Status = 'pending' | 'approved' | 'rejected';
type Point = [number, number];

// Both can describe objects
type UserType = {
  id: string;
  name: string;
};

interface UserInterface {
  id: string;
  name: string;
}

// Key Differences:

// 1. Declaration Merging (Interfaces only)
interface Window {
  myCustomProp: string;
}

interface Window {
  anotherProp: number;
}
// Window now has both properties ✅

// 2. Extending

// Interface
interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Type (using intersection)
type AdminType = User & {
  role: 'admin';
  permissions: string[];
};

// 3. Implementing

class UserClass implements User {
  id = '1';
  name = 'Alice';
  email = 'alice@example.com';
}

// 4. Union Types (Types only)
type StringOrNumber = string | number;

// ❌ Can't do this with interface
interface StringOrNumber extends string | number {} // Error!

// When to use what:
// Interface: Public APIs, libraries, extensibility
// Type: Unions, tuples, complex type compositions
```

## Utility Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user';
}

// 1. Partial - Make all properties optional
type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; age?: number; role?: 'admin' | 'user'; }

function updateUser(id: string, updates: Partial<User>) {
  // Can pass any combination of User properties
}

// 2. Required - Make all properties required
type RequiredUser = Required<Partial<User>>;

// 3. Pick - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: string; name: string; }

// 4. Omit - Exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;
// { id: string; name: string; age: number; role: 'admin' | 'user'; }

// 5. Record - Create object type
type UserRoles = Record<'admin' | 'user' | 'guest', User[]>;
// { admin: User[]; user: User[]; guest: User[]; }

type PageInfo = Record<string, { title: string; url: string }>;
// { [key: string]: { title: string; url: string } }

// 6. Exclude - Remove from union
type Role = 'admin' | 'user' | 'guest';
type NonGuestRole = Exclude<Role, 'guest'>;
// 'admin' | 'user'

// 7. Extract - Extract from union
type AdminRole = Extract<Role, 'admin'>;
// 'admin'

// 8. NonNullable - Remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

// 9. ReturnType - Extract function return type
function getUser() {
  return { id: '1', name: 'Alice' };
}
type UserReturn = ReturnType<typeof getUser>;
// { id: string; name: string; }

// 10. Parameters - Extract function parameters
function createUser(name: string, age: number, role: Role) {
  // ...
}
type CreateUserParams = Parameters<typeof createUser>;
// [string, number, 'admin' | 'user' | 'guest']

// 11. Awaited - Unwrap Promise type
type PromisedUser = Promise<User>;
type UnwrappedUser = Awaited<PromisedUser>;
// User

// 12. Readonly - Make properties readonly
type ReadonlyUser = Readonly<User>;
// { readonly id: string; readonly name: string; ... }

// 13. ReadonlyArray
type Users = ReadonlyArray<User>;
// Can't push, pop, etc.
```

## Advanced TypeScript Patterns

### Generics

```typescript
// 1. Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity('hello'); // Type inference

// 2. Generic Constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength('hello');     // ✅ string has length
logLength([1, 2, 3]);   // ✅ array has length
logLength({ length: 5 }); // ✅ object with length
// logLength(42);        // ❌ number doesn't have length

// 3. Using keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
getProperty(user, 'name'); // ✅ string
getProperty(user, 'age');  // ✅ number
// getProperty(user, 'invalid'); // ❌ Error

// 4. Generic Interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: '1', name: 'Alice', email: 'a@a.com', age: 30, role: 'user' },
  status: 200,
  message: 'Success'
};

// 5. Generic Classes
class GenericStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T | undefined {
    return this.items[index];
  }
  
  getAll(): T[] {
    return [...this.items];
  }
}

const userStore = new GenericStore<User>();
userStore.add({ id: '1', name: 'Alice', email: 'a@a.com', age: 30, role: 'user' });

// 6. Multiple Type Parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: 'Alice' }, { age: 30 });
// { name: string; age: number; }

// 7. Default Generic Parameters
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const response: ApiResponse = { // T defaults to unknown
  data: { anything: true },
  status: 200
};
```

### Conditional Types

```typescript
// 1. Basic Conditional Type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 2. Extract Type from Promise
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type A = Unwrap<Promise<string>>; // string
type B = Unwrap<number>;          // number

// 3. Function Return Type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { name: 'Alice', age: 30 };
}

type UserType = ReturnType<typeof getUser>;
// { name: string; age: number; }

// 4. Distributive Conditional Types
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// string[] | number[] (not (string | number)[])

// 5. Exclude Implementation
type MyExclude<T, U> = T extends U ? never : T;

type A = MyExclude<'a' | 'b' | 'c', 'a'>;
// 'b' | 'c'

// 6. NonNullable Implementation
type MyNonNullable<T> = T extends null | undefined ? never : T;

type A = MyNonNullable<string | null | undefined>;
// string
```

### Mapped Types

```typescript
// 1. Basic Mapped Type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;

// 2. Optional Properties
type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 3. Remove Optional
type Required<T> = {
  [P in keyof T]-?: T[P]; // '-?' removes optional
};

// 4. Remove Readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]; // '-readonly' removes readonly
};

// 5. Getters
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }

// 6. Filter Properties
type FilterByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface Example {
  id: number;
  name: string;
  age: number;
  email: string;
}

type NumberProps = FilterByType<Example, number>;
// { id: number; age: number; }

type StringProps = FilterByType<Example, string>;
// { name: string; email: string; }
```

### Template Literal Types

```typescript
// 1. Basic Template Literals
type Greeting = `Hello ${string}`;

const greet: Greeting = 'Hello World'; // ✅
// const greet: Greeting = 'Hi World'; // ❌

// 2. Union in Template
type Color = 'red' | 'blue' | 'green';
type Shade = 'light' | 'dark';

type ColorShade = `${Shade}-${Color}`;
// 'light-red' | 'light-blue' | 'light-green' | 'dark-red' | 'dark-blue' | 'dark-green'

// 3. Event Handler Names
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;
// 'onClick' | 'onFocus' | 'onBlur'

// 4. CSS Properties
type CSSUnit = 'px' | 'em' | 'rem' | '%';
type Size = `${number}${CSSUnit}`;

const width: Size = '100px'; // ✅
const height: Size = '2rem'; // ✅
// const invalid: Size = '100';  // ❌

// 5. String Manipulation
type LowercaseGreeting = Lowercase<'HELLO WORLD'>;
// 'hello world'

type UppercaseGreeting = Uppercase<'hello world'>;
// 'HELLO WORLD'

type CapitalizedGreeting = Capitalize<'hello world'>;
// 'Hello world'

type UncapitalizedGreeting = Uncapitalize<'Hello World'>;
// 'hello World'
```

### Type Guards & Narrowing

```typescript
// 1. typeof guard
function print(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // string
  } else {
    console.log(value.toFixed(2));    // number
  }
}

// 2. instanceof guard
class Dog {
  bark() { console.log('Woof'); }
}

class Cat {
  meow() { console.log('Meow'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// 3. Custom Type Guard
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TypeScript knows it's Fish
  } else {
    pet.fly();  // TypeScript knows it's Bird
  }
}

// 4. Discriminated Unions
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustiveness check
      const _exhaustive: never = shape;
      throw new Error('Unhandled shape');
  }
}

// 5. Nullish narrowing
function greet(name: string | null | undefined) {
  if (name == null) {
    console.log('Hello, stranger');
  } else {
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}

// 6. Truthiness narrowing
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  }
}
```

### TypeScript with React

```typescript
// 1. Component Props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// 2. Event Handlers
function Form() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ...
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}

// 3. useState with TypeScript
const [user, setUser] = useState<User | null>(null);
const [count, setCount] = useState<number>(0);
const [items, setItems] = useState<string[]>([]);

// Type inference
const [name, setName] = useState('Alice'); // inferred as string

// 4. useRef with TypeScript
const inputRef = useRef<HTMLInputElement>(null);
const timeoutRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  inputRef.current?.focus();
  
  timeoutRef.current = setTimeout(() => {
    console.log('Timeout');
  }, 1000);
  
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);

// 5. Custom Hooks
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch<User>('/api/user/1');

// 6. Context with TypeScript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 7. Children Types
interface ContainerProps {
  children: React.ReactNode;
}

interface RenderProps {
  children: (data: User) => React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div>{children}</div>;
}

function DataProvider({ children }: RenderProps) {
  const [data] = useState<User>({ id: '1', name: 'Alice', email: 'a@a.com', age: 30, role: 'user' });
  return <>{children(data)}</>;
}
```

---

