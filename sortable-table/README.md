# Sortable Table

Build a table that can be sorted by name column.

## Requirements

- Display a table with name and age columns
- Click name header to toggle sort: none → ascending → descending → none
- Show sort indicator (↕ ↑ ↓) based on current sort state
- Pure sort function `sortByName` must be extracted outside the component

## Data

The following data array is provided in `App.tsx`:

```typescript
const data: Person[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 32 }
]
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
