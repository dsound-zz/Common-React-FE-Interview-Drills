# Autocomplete

Build an autocomplete input with dropdown suggestions.

## Requirements

- Controlled input that filters items as user types
- Dropdown shows filtered matches
- Highlight matching text in dropdown items
- Click on dropdown item to fill the input
- Helper function `highlightMatch` should be extracted outside the component

## Data

The following items array is provided in `App.tsx`:

```typescript
const items = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Blueberry',
  'Cherry', 'Coconut', 'Cranberry',
  'Date', 'Elderberry', 'Fig',
  'Grape', 'Grapefruit', 'Guava',
  'Kiwi', 'Lemon', 'Lime', 'Lychee',
  'Mango', 'Melon', 'Orange',
  'Papaya', 'Peach', 'Pear', 'Pineapple', 'Plum',
  'Raspberry', 'Strawberry', 'Watermelon'
]
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
