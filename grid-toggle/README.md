# Grid Toggle

Build an 8x8 grid where clicking a cell toggles its state.

## Requirements

- 8x8 grid of cells
- Each cell is a boolean (toggled on/off)
- Click cell to toggle its state
- Chessboard coloring: use `(row + col) % 2` to determine base color
- Toggled cells should have different color (e.g., blue)

## Data

Grid size constant is provided:

```typescript
const GRID_SIZE = 8
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
