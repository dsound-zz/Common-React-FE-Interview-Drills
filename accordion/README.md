# Accordion

Build an accordion component where only one panel can be open at a time.

## Requirements

- Multiple accordion sections
- Click header to expand/collapse
- Only one section open at a time (closing one opens another)
- Show + when closed, − when open
- Smooth expand/collapse

## Data

Accordion items are provided in `App.tsx`:

```typescript
const items: AccordionItem[] = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' }
]
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
