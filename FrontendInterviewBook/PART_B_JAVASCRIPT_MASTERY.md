# JAVASCRIPT MASTERY

## Event Loop & Async JavaScript

### How JavaScript Engine Works

```
┌─────────────────────────────────────┐
│         JavaScript Engine            │
│  ┌──────────────────────────────┐   │
│  │      Call Stack              │   │
│  │  (LIFO - Last In First Out)  │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │      Heap (Memory)           │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│         Web APIs                     │
│  - setTimeout                        │
│  - fetch                             │
│  - DOM events                        │
│  - Promise                           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Microtask Queue                 │
│  (Higher Priority)                   │
│  - Promise.then/catch/finally        │
│  - queueMicrotask                    │
│  - MutationObserver                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Macrotask Queue                 │
│  (Lower Priority)                    │
│  - setTimeout                        │
│  - setInterval                       │
│  - setImmediate (Node)               │
│  - I/O operations                    │
└─────────────────────────────────────┘
              ↓
         Event Loop
```

### Event Loop Execution Flow

```javascript
console.log('1'); // Call stack

setTimeout(() => {
  console.log('2'); // Macrotask queue
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Microtask queue
  return Promise.resolve();
}).then(() => {
  console.log('4'); // Microtask queue (chained)
});

console.log('5'); // Call stack

// Output: 1, 5, 3, 4, 2

// Why?
// 1. Sync code runs: 1, 5
// 2. Call stack empty → check microtask queue
// 3. Microtasks run: 3, 4
// 4. Microtask queue empty → check macrotask queue
// 5. Macrotasks run: 2
```

### Complex Event Loop Example

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => console.log('Promise 1'));
}, 0);

setTimeout(() => {
  console.log('Timeout 2');
  Promise.resolve().then(() => console.log('Promise 2'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 3');
    setTimeout(() => console.log('Timeout 3'), 0);
  })
  .then(() => console.log('Promise 4'));

console.log('End');

// Output:
// Start
// End
// Promise 3
// Promise 4
// Timeout 1
// Promise 1
// Timeout 2
// Promise 2
// Timeout 3

// Explanation:
// 1. Sync: Start, End
// 2. Microtasks: Promise 3, Promise 4
// 3. Macrotask: Timeout 1
// 4. Microtask after Timeout 1: Promise 1
// 5. Macrotask: Timeout 2
// 6. Microtask after Timeout 2: Promise 2
// 7. Macrotask (queued from Promise 3): Timeout 3
```

---

## Closures & Scope

### Lexical Scoping

```javascript
function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    const innerVar = 'I am inner';
    console.log(outerVar); // Can access outer scope
    console.log(innerVar); // Can access own scope
  }
  
  inner();
  // console.log(innerVar); // Error! Can't access inner scope
}

outer();
```

### Closure Real-World Examples

#### 1. Module Pattern
```javascript
const Calculator = (function() {
  // Private variables
  let history = [];
  
  // Private function
  function log(operation) {
    history.push(operation);
  }
  
  // Public API
  return {
    add(a, b) {
      const result = a + b;
      log(`${a} + ${b} = ${result}`);
      return result;
    },
    
    subtract(a, b) {
      const result = a - b;
      log(`${a} - ${b} = ${result}`);
      return result;
    },
    
    getHistory() {
      return [...history]; // Return copy
    },
    
    clearHistory() {
      history = [];
    }
  };
})();

Calculator.add(5, 3);      // 8
Calculator.subtract(10, 4); // 6
Calculator.getHistory();   // ['5 + 3 = 8', '10 - 4 = 6']
// Calculator.history        // undefined (private!)
```

#### 2. Function Factory
```javascript
function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    reset() {
      count = initialValue;
      return count;
    },
    getValue() {
      return count;
    }
  };
}

const counter1 = createCounter(0);
const counter2 = createCounter(10);

counter1.increment(); // 1
counter2.increment(); // 11
// Each has its own private 'count'!
```

#### 3. Partial Application
```javascript
function multiply(a, b) {
  return a * b;
}

function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

const double = partial(multiply, 2);
const triple = partial(multiply, 3);

double(5); // 10
triple(5); // 15
```

---

## This Keyword

### All Binding Rules in Detail

#### 1. Default Binding
```javascript
function globalFunction() {
  console.log(this); // window (or global in Node)
}

'use strict';
function strictFunction() {
  console.log(this); // undefined
}
```

#### 2. Implicit Binding
```javascript
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  },
  nested: {
    name: 'Nested',
    greet() {
      console.log(`Hello, ${this.name}`);
    }
  }
};

user.greet();        // 'Hello, Alice' (this = user)
user.nested.greet(); // 'Hello, Nested' (this = nested)

// Lost context
const greet = user.greet;
greet(); // 'Hello, undefined' (this = window/undefined)
```

#### 3. Explicit Binding (call, apply, bind)
```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'Bob' };

// call: Arguments individually
introduce.call(person, 'Hi', '!'); // Hi, I'm Bob!

// apply: Arguments as array
introduce.apply(person, ['Hey', '...']); // Hey, I'm Bob...

// bind: Returns new function with permanent binding
const boundIntroduce = introduce.bind(person);
boundIntroduce('Hello', '!'); // Hello, I'm Bob!

// Partial application with bind
const greet = introduce.bind(person, 'Hello');
greet('!');   // Hello, I'm Bob!
greet('!!!'); // Hello, I'm Bob!!! (second arg changes)
```

#### 4. new Binding
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  
  this.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const alice = new Person('Alice', 30);
alice.greet(); // Hi, I'm Alice

// What 'new' does:
// 1. Create empty object: const obj = {};
// 2. Set prototype: obj.__proto__ = Person.prototype;
// 3. Call constructor with 'this' = obj: Person.call(obj, 'Alice', 30);
// 4. Return obj (unless constructor returns object);
```

#### 5. Arrow Functions (Lexical this)
```javascript
const obj = {
  name: 'Test',
  
  regularMethod: function() {
    console.log(this.name); // 'Test'
    
    setTimeout(function() {
      console.log(this.name); // undefined (lost context)
    }, 100);
  },
  
  arrowMethod: function() {
    console.log(this.name); // 'Test'
    
    setTimeout(() => {
      console.log(this.name); // 'Test' (lexical this)
    }, 100);
  }
};

// Arrow function doesn't have its own 'this'
const arrowFunc = () => {
  console.log(this); // Inherits from parent scope
};

// Can't bind arrow functions
const attempt = arrowFunc.bind({ name: 'Bob' });
attempt(); // Still inherits from parent, not bound!
```

### Common this Pitfalls

```javascript
class Component {
  constructor() {
    this.name = 'Component';
  }
  
  // Problem: Loses context when passed as callback
  handleClick() {
    console.log(this.name);
  }
  
  render() {
    // ❌ Loses context
    button.addEventListener('click', this.handleClick);
    
    // ✅ Fix 1: Bind in constructor
    this.handleClick = this.handleClick.bind(this);
    
    // ✅ Fix 2: Arrow function wrapper
    button.addEventListener('click', () => this.handleClick());
    
    // ✅ Fix 3: Class field arrow function
    handleClick = () => {
      console.log(this.name);
    };
  }
}
```

---

## Prototypes & Inheritance

### Prototype Chain Deep Dive

```javascript
// Every object has __proto__
// Every function has prototype

function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log('Woof!');
};

const dog = new Dog('Rex', 'Labrador');

// Prototype chain:
// dog → Dog.prototype → Animal.prototype → Object.prototype → null

dog.bark();        // 'Woof!' (from Dog.prototype)
dog.eat();         // 'Rex is eating' (from Animal.prototype)
dog.toString();    // [object Object] (from Object.prototype)

// Property lookup:
// 1. Check dog own properties
// 2. Check Dog.prototype
// 3. Check Animal.prototype
// 4. Check Object.prototype
// 5. Return undefined
```

### Modern Class Syntax (Syntactic Sugar)

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  bark() {
    console.log('Woof!');
  }
  
  // Override parent method
  eat() {
    console.log(`${this.name} is eating dog food`);
    super.eat(); // Call parent method
  }
}

const dog = new Dog('Rex', 'Labrador');
dog.bark(); // Woof!
dog.eat();  // Rex is eating dog food
            // Rex is eating
```

### Object.create() Deep Dive

```javascript
const parent = {
  greet() {
    return `Hello from ${this.name}`;
  }
};

// Create object with specific prototype
const child = Object.create(parent);
child.name = 'Child';

child.greet(); // 'Hello from Child'
child.__proto__ === parent; // true

// Create object with null prototype (no inheritance)
const obj = Object.create(null);
obj.toString(); // Error! No prototype chain

// Use case: Clean object without inherited properties
const map = Object.create(null);
map['hasOwnProperty'] = 'value'; // Works! No conflict with Object.prototype
```

### Checking Prototype Relationships

```javascript
function Animal() {}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);

const dog = new Dog();

// instanceof
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true

// isPrototypeOf
console.log(Dog.prototype.isPrototypeOf(dog));    // true
console.log(Animal.prototype.isPrototypeOf(dog)); // true
console.log(Object.prototype.isPrototypeOf(dog)); // true

// hasOwnProperty (checks own properties, not inherited)
dog.name = 'Rex';
console.log(dog.hasOwnProperty('name')); // true
console.log(dog.hasOwnProperty('constructor')); // false (inherited)

// Object.getPrototypeOf
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true
```

---

## Advanced Patterns (JS)

### 1. Observer Pattern (Pub/Sub)

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// Usage
const emitter = new EventEmitter();

const unsubscribe = emitter.on('login', (user) => {
  console.log('User logged in:', user);
});

emitter.once('login', () => {
  console.log('First login only');
});

emitter.emit('login', { name: 'Alice' });
unsubscribe(); // Remove listener
```

### 2. Singleton Pattern

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = null;
    Database.instance = this;
  }
  
  connect() {
    if (!this.connection) {
      this.connection = 'Connected to DB';
      console.log(this.connection);
    }
    return this.connection;
  }
  
  query(sql) {
    return `Executing: ${sql}`;
  }
}

const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true (same instance)

// Better: Module pattern
const DatabaseSingleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      connection: null,
      connect() {
        this.connection = 'Connected';
        return this.connection;
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const db = DatabaseSingleton.getInstance();
```

### 3. Factory Pattern

```javascript
class Car {
  constructor(type) {
    this.type = type;
    this.wheels = 4;
  }
}

class Bike {
  constructor(type) {
    this.type = type;
    this.wheels = 2;
  }
}

class VehicleFactory {
  createVehicle(type) {
    switch (type) {
      case 'car':
        return new Car(type);
      case 'bike':
        return new Bike(type);
      default:
        throw new Error('Unknown vehicle type');
    }
  }
}

const factory = new VehicleFactory();
const car = factory.createVehicle('car');
const bike = factory.createVehicle('bike');
```

### 4. Decorator Pattern

```javascript
// Simple function decorator
function log(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = log(add);
loggedAdd(2, 3);
// Calling add with [2, 3]
// Result: 5

// Class decorator (using decorator proposal)
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  @readonly
  name = 'Alice';
}

const p = new Person();
p.name = 'Bob'; // Error in strict mode
```

### 5. Strategy Pattern

```javascript
// Different strategies for payment
class PayPalStrategy {
  pay(amount) {
    console.log(`Paid ${amount} via PayPal`);
  }
}

class CreditCardStrategy {
  pay(amount) {
    console.log(`Paid ${amount} via Credit Card`);
  }
}

class BitcoinStrategy {
  pay(amount) {
    console.log(`Paid ${amount} via Bitcoin`);
  }
}

class ShoppingCart {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  checkout(amount) {
    this.paymentStrategy.pay(amount);
  }
}

const cart = new ShoppingCart(new PayPalStrategy());
cart.checkout(100); // Paid 100 via PayPal

cart.setPaymentStrategy(new CreditCardStrategy());
cart.checkout(200); // Paid 200 via Credit Card
```

### 6. Lazy Evaluation with Generators

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3

// Take first n values
function* take(n, iterator) {
  let i = 0;
  for (const value of iterator) {
    if (i++ >= n) return;
    yield value;
  }
}

const first10Fibs = [...take(10, fibonacci())];
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

## Memory Management & Garbage Collection

### How Garbage Collection Works

```javascript
// Memory lifecycle:
// 1. Allocate: When creating variables
// 2. Use: Reading/writing
// 3. Release: Garbage collector frees unused memory

// Mark and Sweep Algorithm:
// 1. Mark: GC marks all reachable objects from root
// 2. Sweep: GC removes unmarked objects

// Roots:
// - Global objects
// - Current function local variables
// - Variables in scope chain
```

### Memory Leaks - Common Causes

#### 1. Global Variables
```javascript
// ❌ Accidental global (memory leak)
function leak() {
  leaked = 'I am global!'; // No var/let/const
}

// ✅ Fix: Use strict mode or proper declaration
'use strict';
function noLeak() {
  const notLeaked = 'I am local';
}
```

#### 2. Forgotten Timers
```javascript
// ❌ Timer never cleared (memory leak)
function Component() {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Component unmounts but timer keeps running!
}

// ✅ Fix: Clear timer on cleanup
function Component() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    return () => clearInterval(timer); // Cleanup!
  }, []);
}
```

#### 3. Closures Holding References
```javascript
// ❌ Closure keeps reference to large object
function createClosure() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    console.log(largeData[0]); // Holds entire array!
  };
}

// ✅ Fix: Only keep what you need
function createClosure() {
  const largeData = new Array(1000000).fill('data');
  const firstItem = largeData[0];
  
  return function() {
    console.log(firstItem); // Only holds one value
  };
}
```

#### 4. Detached DOM Elements
```javascript
// ❌ DOM element removed but still referenced
const elements = [];

function addElement() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  elements.push(div); // Holds reference
}

function removeElement() {
  const div = elements[0];
  div.remove(); // Removed from DOM but still in array!
}

// ✅ Fix: Remove from both
function removeElement() {
  const div = elements.shift();
  div.remove();
}
```

#### 5. Event Listeners Not Removed
```javascript
// ❌ Event listener not removed
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log('Clicked');
  }
  
  // Component destroyed but listener remains!
}

// ✅ Fix: Remove listener
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick);
  }
  
  destroy() {
    document.removeEventListener('click', this.handleClick);
  }
}
```

### Detecting Memory Leaks

```javascript
// Chrome DevTools:
// 1. Performance tab → Memory
// 2. Take heap snapshot
// 3. Interact with app
// 4. Take another snapshot
// 5. Compare snapshots
// 6. Look for objects that shouldn't grow

// Programmatically check memory
if (performance.memory) {
  console.log('Used:', performance.memory.usedJSHeapSize);
  console.log('Total:', performance.memory.totalJSHeapSize);
  console.log('Limit:', performance.memory.jsHeapSizeLimit);
}
```

### Best Practices for Memory Management

```javascript
// 1. Nullify large objects when done
let largeArray = new Array(1000000);
// ... use it
largeArray = null; // Help GC

// 2. Use WeakMap/WeakSet for object keys
const cache = new WeakMap();
let obj = { data: 'value' };
cache.set(obj, 'cached value');
obj = null; // WeakMap entry can be garbage collected

// 3. Avoid circular references
function createCircular() {
  const obj1 = {};
  const obj2 = {};
  obj1.ref = obj2;
  obj2.ref = obj1; // Circular!
  return obj1;
}

// 4. Clean up in React
function Component() {
  useEffect(() => {
    const subscription = api.subscribe();
    const timer = setInterval(() => {}, 1000);
    
    return () => {
      subscription.unsubscribe();
      clearInterval(timer);
    };
  }, []);
}
```

---

