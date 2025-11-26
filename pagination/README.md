# Pagination

Build a pagination component that displays 10 items per page.

## Requirements

- Display 10 items per page
- Show current page number and total pages
- Prev button disabled on first page
- Next button disabled on last page
- Handle boundary cases correctly

## Data

The following items array is provided in `App.tsx`:

```typescript
const items = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`)
const ITEMS_PER_PAGE = 10
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
