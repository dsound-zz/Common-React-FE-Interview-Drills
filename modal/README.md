# Modal

Build a modal component with overlay.

## Requirements

- Button to open modal
- Modal displays with overlay (semi-transparent background)
- Click overlay to close modal
- Click inside modal content should NOT close modal (use `stopPropagation`)
- Close button inside modal

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
