# FINAL SECTION: INTERVIEW STRATEGY

## Problem-Solving Framework

### 1. Clarification Phase (2-3 minutes)

```
Questions to Ask:

Functional Requirements:
- "What are the core features?"
- "Are there any specific edge cases I should consider?"
- "What should happen if [scenario]?"

Non-Functional Requirements:
- "Are there performance constraints?"
- "What browsers/devices need to be supported?"
- "Are there accessibility requirements?"

Constraints:
- "Can I use external libraries?"
- "Are there any limitations I should know about?"
- "What's the expected scale?"

Examples:
"Can you walk me through an example use case?"
"What would the input/output look like?"
```

### 2. Planning Phase (3-5 minutes)

```
Approach:

1. Restate the problem:
   "So we need to build a component that..."

2. Outline solution:
   "I'm thinking of using this approach because..."

3. Discuss trade-offs:
   "Option A is simpler but has X limitation.
    Option B is more complex but handles Y better.
    I'd go with A because..."

4. Get agreement:
   "Does this approach sound reasonable?"
```

### 3. Implementation Phase (15-25 minutes)

```
Best Practices:

1. Think out loud:
   "I'm creating this function to handle..."
   "I'm using useMemo here because..."

2. Start simple:
   - Core functionality first
   - Add features incrementally
   - Don't over-engineer

3. Handle edge cases:
   "Let me handle the empty array case..."
   "What if the input is null?"

4. Write clean code:
   - Meaningful variable names
   - Small, focused functions
   - Add comments for complex logic

5. Communicate blockers:
   "I'm not sure about X. Let me think..."
   "Can I look up the API for Y?"
```

### 4. Testing Phase (3-5 minutes)

```
Testing Strategy:

1. Walk through examples:
   "Let's test with input [1, 2, 3]..."
   "What if we have an empty array?"

2. Test edge cases:
   - Null/undefined
   - Empty arrays/objects
   - Very large inputs
   - Invalid inputs

3. Analyze complexity:
   "Time complexity is O(n) because we iterate once"
   "Space complexity is O(n) for the hash map"

4. Discuss improvements:
   "This could be optimized further by..."
   "In production, I'd also add..."
```

## Common Interview Patterns

### System Design Questions

```
Approach:

1. Gather Requirements (5 mins)
   - Functional requirements
   - Non-functional requirements
   - Scale expectations

2. High-Level Design (10 mins)
   - Component architecture
   - Data flow
   - State management approach
   - API design

3. Detailed Design (15 mins)
   - Component breakdown
   - Performance optimization
   - Error handling
   - Edge cases

4. Trade-offs Discussion (5 mins)
   - Alternative approaches
   - Scalability considerations
   - Future improvements
```

### Coding Questions

```
Pattern Recognition:

Two Pointers:
- Palindrome check
- Remove duplicates
- Merge sorted arrays

Sliding Window:
- Longest substring
- Maximum subarray
- Contains duplicate

Hash Map:
- Two sum
- Group anagrams
- First non-repeating character

BFS/DFS:
- Tree traversal
- Graph problems
- Island counting

Dynamic Programming:
- Fibonacci
- Climbing stairs
- Unique paths
```

---

