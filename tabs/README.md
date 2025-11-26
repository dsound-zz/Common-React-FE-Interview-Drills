# Tabs

Build a tab component that switches between three tabs.

## Requirements

- Three tabs with labels: "Tab 1", "Tab 2", "Tab 3"
- Click tab to switch content
- Show active tab styling
- Display content for active tab only

## Data

Tab data is provided in `App.tsx`:

```typescript
const tabs = [
  { label: 'Tab 1', content: 'Content for Tab 1' },
  { label: 'Tab 2', content: 'Content for Tab 2' },
  { label: 'Tab 3', content: 'Content for Tab 3' }
]
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
