# TESTING

## Unit Testing

### Jest & React Testing Library

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// 1. Basic Component Test
describe('Button', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// 2. Async Component Test
describe('UserProfile', () => {
  test('fetches and displays user', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser)
      })
    ) as jest.Mock;
    
    render(<UserProfile userId={1} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
    
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });
  
  test('handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock;
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

// 3. User Interactions
describe('Form', () => {
  test('submits form with user data', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(<Form onSubmit={handleSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(nameInput, 'Alice');
    await user.type(emailInput, 'alice@example.com');
    await user.click(submitButton);
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com'
    });
  });
});

// 4. Testing Custom Hooks
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  test('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  test('decrements counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
});

// 5. Testing with Context
describe('ThemedButton', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="light">
      {children}
    </ThemeProvider>
  );
  
  test('renders with theme from context', () => {
    render(<ThemedButton />, { wrapper });
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: '#fff' });
  });
});

// 6. Mock Modules
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Alice' }))
}));

import { fetchUser } from './api';

test('uses mocked API', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
  expect(fetchUser).toHaveBeenCalledWith(1);
});
```

## Integration Testing

```typescript
// Testing multiple components together
describe('Todo App Integration', () => {
  test('complete todo flow', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    // Add todo
    const input = screen.getByPlaceholderText(/add todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, 'Buy milk');
    await user.click(addButton);
    
    // Verify added
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    
    // Complete todo
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    // Verify completed
    const todo = screen.getByText('Buy milk');
    expect(todo).toHaveStyle({ textDecoration: 'line-through' });
    
    // Delete todo
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    // Verify deleted
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  });
});
```

## E2E Testing

### Playwright

```typescript
import { test, expect } from '@playwright/test';

test('user login flow', async ({ page }) => {
  // Navigate
  await page.goto('http://localhost:3000');
  
  // Fill form
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  
  // Click button
  await page.click('button[type="submit"]');
  
  // Wait for navigation
  await page.waitForURL('**/dashboard');
  
  // Verify logged in
  await expect(page.locator('text=Welcome')).toBeVisible();
});

test('visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Take screenshot and compare
  await expect(page).toHaveScreenshot('homepage.png');
});

test('network requests', async ({ page }) => {
  // Intercept network requests
  await page.route('**/api/users', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, name: 'Alice' }])
    });
  });
  
  await page.goto('http://localhost:3000/users');
  
  await expect(page.locator('text=Alice')).toBeVisible();
});

test('mobile viewport', async ({ page }) => {
  // Set viewport
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('http://localhost:3000');
  
  // Mobile menu should be visible
  await expect(page.locator('.mobile-menu')).toBeVisible();
});
```

---

