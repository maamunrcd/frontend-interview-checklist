# 🚀 FRONTEND INTERVIEW PREPARATION ROADMAP

This roadmap is divided into two parts: **Essential DSA patterns** and **Machine Coding challenges**. It is focused on logic, performance, and implementation skills.

---

## 📊 PART 1: 30 ESSENTIAL DSA PROBLEMS
These problems focus on logic and data structures frequently tested in the initial rounds.

### Arrays & Hashing
Focus on time complexity and efficient data retrieval.

- [ ] **Day 1: Two Sum** (~15 min)
    **Explanation:** Find two numbers in an array that add up to a target value.
    **Key Logic:** Use a **Hash Map** to store each number's index as you iterate. For each number, check if its "complement" (target - current) exists in the map.
    ```javascript
    const twoSum = (nums, target) => {
      const map = new Map();
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
      }
    };
    ```

- [ ] **Day 2: Contains Duplicate** (~10 min)
    **Explanation:** Check if any value appears more than once.
    **Key Logic:** Use a **Set**. A Set only stores unique values; if the size of the set is less than the array length, a duplicate exists.
    ```javascript
    const containsDuplicate = nums => new Set(nums).size !== nums.length;
    ```

- [ ] **Day 3: Best Time to Buy and Sell Stock** (~15 min)
    **Explanation:** Find the max profit by picking a day to buy and a later day to sell.
    **Key Logic:** **Sliding Window**. Keep track of the `minPrice` seen so far. For each new price, calculate the potential profit and update `maxProfit`.
    ```javascript
    const maxProfit = prices => {
      let minPrice = Infinity, maxProfit = 0;
      for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
      }
      return maxProfit;
    };
    ```

- [ ] **Day 4: Maximum Subarray (Kadane’s)** (~20 min)
    **Explanation:** Find the contiguous subarray (at least one number) which has the largest sum.
    **Key Logic:** **Dynamic Programming**. At each index, decide whether to start a new subarray or continue the current one: `currentSum = Math.max(num, currentSum + num)`.
    ```javascript
    const maxSubArray = nums => {
      let currentSum = nums[0], maxSum = nums[0];
      for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
      }
      return maxSum;
    };
    ```

- [ ] **Day 5: Product of Array Except Self** (~25 min)
    **Explanation:** Return an array where each `res[i]` is the product of all elements except `nums[i]`, without using division.
    **Key Logic:** **Prefix & Suffix Products**. Create an array and fill it with products of all numbers to the left, then iterate backwards multiplying by products of all numbers to the right.

- [ ] **Day 6: Merge Intervals** (~25 min)
    **Explanation:** Given a collection of intervals, merge all overlapping intervals.
    **Key Logic:** **Sorting**. Sort intervals by start time. Iterate and compare the current interval's start with the last merged interval's end. Merge if they overlap.

- [ ] **Day 7: Move Zeroes** (~10 min)
    **Explanation:** Move all `0`'s to the end of an array while maintaining the relative order of non-zero elements.
    **Key Logic:** **Two-Pointer**. Keep a pointer `lastNonZeroFoundAt`. Iterate through the array; if the element is non-zero, swap it with the element at `lastNonZeroFoundAt` and increment the pointer.

- [ ] **Day 8: Remove Duplicates from Sorted Array** (~15 min)
    **Explanation:** Remove duplicates in-place such that each unique element appears only once.
    **Key Logic:** **Two-Pointer**. Since it's sorted, duplicates are adjacent. Use one pointer to track the unique position and another to scan the array.

---

### Strings & Sliding Window
Patterns for searching and string processing.

- [ ] **Day 9: Valid Parentheses** (~15 min)
    **Explanation:** Check if brackets `()`, `[]`, `{}` are closed in the correct order.
    **Key Logic:** **Stack**. Push early opening brackets onto a stack. When you hit a closing bracket, pop the top of the stack and see if it matches.
    ```javascript
    const isValid = s => {
      const stack = [], map = {')':'(', '}':'{', ']':'['};
      for (let char of s) {
        if (map[char]) {
          if (stack.pop() !== map[char]) return false;
        } else stack.push(char);
      }
      return stack.length === 0;
    };
    ```

- [ ] **Day 10: Valid Anagram** (~10 min)
    **Explanation:** Determine if two strings use the exact same characters same number of times.
    **Key Logic:** **Frequency Counter**. Use an object or a Map to count character occurrences in one string and subtract them using the other. If all counts are zero, it's an anagram.

- [ ] **Day 11: Longest Substring Without Repeating Characters** (~25 min)
    **Explanation:** Find the length of the longest substring with unique characters.
    **Key Logic:** **Sliding Window + Set**. Move the right pointer to expand the window. If a character is repeated, move the left pointer to shrink the window until it's unique again.

- [ ] **Day 12: Longest Palindromic Substring** (~30 min)
    **Explanation:** Identify the longest part of a string that reads the same forwards and backwards.
    **Key Logic:** **Expand From Center**. Treat each character (and each gap between characters) as a potential center of a palindrome and expand outwards as long as characters match.

- [ ] **Day 13: Valid Palindrome** (~15 min)
    **Explanation:** Check if a string is a palindrome, ignoring non-alphanumeric characters and case.
    **Key Logic:** **Filter & Reverse** or **Two-Pointer**. Clean the string using regex, then check if it equals its reverse or use pointers from both ends.

- [ ] **Day 14: Group Anagrams** (~25 min)
    **Explanation:** Group an array of strings into sub-lists of anagrams.
    **Key Logic:** **Categorization**. For each string, sort its characters (this is the key). Store strings in a Map where the key is the sorted form and the value is the list of original strings.

---

### Linked Lists & Trees
Understanding pointers and non-linear data structures.

- [ ] **Day 15: Reverse a Linked List** (~20 min)
    **Explanation:** Flip the direction of pointers in a singly linked list.
    **Key Logic:** **Iterative Swap**. Keep three pointers: `prev` (initially null), `current` (head), and `next`. Iterate and reassign `current.next = prev`.

- [ ] **Day 16: Linked List Cycle** (~20 min)
    **Explanation:** Detect if a linked list has a loop.
    **Key Logic:** **Floyd’s Tortoise and Hare**. Use two pointers: one slow (moves 1 step) and one fast (moves 2 steps). If they ever meet, there is a cycle.

- [ ] **Day 17: Merge Two Sorted Lists** (~20 min)
    **Explanation:** Combine two sorted lists into one sorted list.
    **Key Logic:** **Dummy Node**. Create a dummy head node. Compare the current nodes of both lists and attach the smaller one to the result list.

- [ ] **Day 18: Invert/Flip Binary Tree** (~15 min)
    **Explanation:** For every node, swap its left and right children.
    **Key Logic:** **Recursion (DFS)**. Swap left and right children of the current node, then recursively call invert on the new left and right children.

- [ ] **Day 19: Maximum Depth of Binary Tree** (~15 min)
    **Explanation:** Calculate the longest path from the root node down to the farthest leaf node.
    **Key Logic:** **Recursion**. `1 + Math.max(maxDepth(root.left), maxDepth(root.right))`.

- [ ] **Day 20: Validate Binary Search Tree** (~25 min)
    **Explanation:** Ensure that for every node, all nodes to its left are smaller and all nodes to its right are larger.
    **Key Logic:** **Recursive Bounds**. Pass a `min` and `max` value down the recursion. Each node's value must be strictly between its `min` and `max`.

---

### JavaScript Core Polyfills
Essential "Machine Coding" patterns for vanilla JS rounds.

- [ ] **Day 21: Implement Debounce** (~20 min)
    **Explanation:** Delay function execution until a specific amount of time has passed since the last call.
    **Key Logic:** **Timer Management**. Use `clearTimeout` to reset the timer on every call.
    ```javascript
    function debounce(fn, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    }
    ```

- [ ] **Day 22: Implement Throttle** (~20 min)
    **Explanation:** Ensure a function is called at most once per specified time interval.
    **Key Logic:** **Locking**. Use a flag (`inThrottle`) to block execution until the timer clears it.
    ```javascript
    function throttle(fn, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
    ```

- [ ] **Day 23: Flatten a Nested Array** (~20 min)
    **Explanation:** Convert `[1, [2, [3, 4], 5]]` into `[1, 2, 3, 4, 5]`.
    **Key Logic:** **Recursion**. Iterate through the array; if an element is an array, call flatten recursively, otherwise push to results.

- [ ] **Day 24: Deep Clone an Object** (~25 min)
    **Explanation:** Create a new object with the same values, including nested objects, without keeping references.
    **Key Logic:** **Recursive Copy or structuredClone**. Handle primitive types, Arrays, and Objects separately. Be aware of circular references in complex cases.

- [ ] **Day 25: Polyfill for Array.map** (~15 min)
    **Explanation:** Recreate `Array.prototype.map` manually.
    **Key Logic:** **Prototypes**. Define a function on `Array.prototype`. It should create a new array, loop through `this`, apply the callback, and return the result.

- [ ] **Day 26: Polyfill for Promise.all** (~30 min)
    **Explanation:** Recreate `Promise.all` which waits for all promises to resolve or one to reject.
    **Key Logic:** **Counter & Results Array**. Return a new Promise. Keep a counter of resolved promises. Store each result at the correct index. Resolve once the counter matches the input length.

---

### Optimization & Graphs
Complex problem solving and space/time trade-offs.

- [ ] **Day 27: Climbing Stairs** (~15 min)
    **Explanation:** You can climb 1 or 2 steps. How many distinct ways can you reach the top?
    **Key Logic:** **Fibonacci Pattern**. The number of ways to reach step `n` is `ways(n-1) + ways(n-2)`.

- [ ] **Day 28: Coin Change** (~30 min)
    **Explanation:** Find the fewest number of coins needed to make up a specific amount.
    **Key Logic:** **DP Bottom-Up**. Create an array `dp` where `dp[i]` is the min coins for amount `i`. `dp[i] = Math.min(dp[i], 1 + dp[i - coin])`.

- [ ] **Day 29: Number of Islands** (~35 min)
    **Explanation:** Given a grid of '1's (land) and '0's (water), count the number of islands.
    **Key Logic:** **DFS Traversals**. Loop through every cell. When you find land ('1'), increment count and use DFS to "sink" (change to '0') all connected land cells.

- [ ] **Day 30: Search in Rotated Sorted Array** (~30 min)
    **Explanation:** Find a target in a sorted array that has been rotated (e.g., `[4,5,6,7,0,1,2]`) in $O(\log n)$ time.
    **Key Logic:** **Modified Binary Search**. Identify which half is sorted. Use the sorted half to determine if the target is within its range to adjust `low` or `high`.

---

## 🛠️ PART 2: 15 MACHINE CODING CHALLENGES
Build these components from scratch (Vanilla JS or React).

- [ ] **Challenge 1: Star Rating Widget** (~30 min)
    **Key Goal:** Interactive rating system.
    **Implementation:** Use a container with `mouseEnter` and `onClick` events. Use state to track "hovered" and "selected" stars. Style them based on these states.

- [ ] **Challenge 2: Accordion (FAQ)** (~20 min)
    **Key Goal:** Collapsible content sections.
    **Implementation:** Manage an `activeIndex` state. Render content only if `index === activeIndex`. Use CSS transitions for smooth height changes.

- [ ] **Challenge 3: Tabs Component** (~25 min)
    **Key Goal:** Switch between content views.
    **Implementation:** Keep `currentTab` in state. Render tab headers in a loop; apply "active" class to the current one. Conditionally render the panel content.

- [ ] **Challenge 4: Modal Dialog** (~35 min)
    **Key Goal:** Overlay that blocks main interactions.
    **Implementation:** Use a Portal (in React) to render at the end of `body`. Handle "Click Outside" to close. Disable body scroll when open.

- [ ] **Challenge 5: Countdown Timer** (~30 min)
    **Key Goal:** Real-time clock counting down to zero.
    **Implementation:** Use `useState` for time. Use `useEffect` with `setInterval`. Crucially, **clear the interval** on unmount or when time hits zero.

- [ ] **Challenge 6: Autocomplete Search** (~45 min)
    **Key Goal:** Suggestions based on user input.
    **Implementation:** Input + Results List. Bind `onChange` to fetch data. **Use Debouncing** to limit API calls. Support keyboard navigation (Up/Down/Enter).

- [ ] **Challenge 7: Infinite Scroll** (~50 min)
    **Key Goal:** Load content dynamically as user scrolls.
    **Implementation:** Use **Intersection Observer API** on a "sentinel" element at the list end. When visible, trigger the `fetchNextPage` function.

- [ ] **Challenge 8: Pagination** (~30 min)
    **Key Goal:** Split large data into pages.
    **Implementation:** Keep `currentPage` and `pageSize` in state. Slice your data array: `data.slice((page-1)*size, page*size)`. Render page numbers button.

- [ ] **Challenge 9: Data Table** (~45 min)
    **Key Goal:** Table with Sorting and Search.
    **Implementation:** Store `sortConfig` (key, direction) in state. Use `.sort()` on the data. Use `.filter()` for search functionality.

- [ ] **Challenge 10: Image Carousel** (~40 min)
    **Key Goal:** Sliding image gallery.
    **Implementation:** Container with `overflow: hidden`. Inner div moving with `transform: translateX`. Use `setInterval` for auto-play and buttons for manual.

- [ ] **Challenge 11: Todo App (CRUD)** (~45 min)
    **Key Goal:** Full create-read-update-delete cycle.
    **Implementation:** Array of objects in state. Persist to **localStorage**. Use separate components for input, list, and items.

- [ ] **Challenge 12: Multi-step Form** (~50 min)
    **Key Goal:** Collect data across multiple screens.
    **Implementation:** Step index state + Data object state. Render current step based on index. "Next" button validates current step before incrementing.

- [ ] **Challenge 13: Nested Comments** (~60 min)
    **Key Goal:** Tree-like structure for discussions.
    **Implementation:** **Recursive Component**. Each `<Comment>` component renders its data and then maps over its `replies` to render itself again.

- [ ] **Challenge 14: Shopping Cart** (~55 min)
    **Key Goal:** Manage product quantities and totals.
    **Implementation:** Use **Context API** or Redux for global cart state. Actions: `ADD_TO_CART`, `REMOVE`, `UPDATE_QTY`. Calculate total using `.reduce()`.

- [ ] **Challenge 15: Toast Notifications** (~40 min)
    **Key Goal:** Temporary pop-ups with auto-dismiss.
    **Implementation:** Queue (Array) of toast objects in state. Each toast gets a timer to remove itself from the queue after X seconds. Layout them in a fixed corner.
