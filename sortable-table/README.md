# Sortable Table

Build a table that can be sorted by name column.

## Requirements

- Show a centered page with a title like "Mini Issues Dashboard".
- Fetch issues asynchronously from a mock API with:
  - 300–1000ms delay
  - ~15% chance to fail
- Show loading and error states:
  - Loading indicator while fetching.
  - Error message with a Retry button when fetch fails.
- Render a table-like list of issues with columns:
  - Title, Status, Priority, Assignee
- Provide filter controls:
  - Status filter (All + unique statuses)
  - Assignee filter (All + unique assignees)
- Provide sorting controls:
  - Title (A–Z)
  - Priority (High > Normal > Low)
- Click a row to toggle an inline details panel that shows:
  - Title, description, status, priority, assignee
- Cache successful results in localStorage and read from cache on load.
- Closing an issue:
  - Show a "Close Issue" button when status is not Closed.
  - Optimistically update the UI.
  - Simulate an async call with ~20% failure rate.
  - Roll back if the close fails.

## Data

The following data array is provided in `App.tsx`:

```typescript
const data: Person[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 32 },
]
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
