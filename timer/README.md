# Timer

Build a timer with start, stop, and reset functionality.

## Requirements

- Start button begins the timer
- Stop button pauses the timer
- Reset button stops and resets to 0
- Display time in MM:SS format
- Use `useEffect` for interval management
- Use `useRef` to store interval ID
- Properly cleanup interval on unmount

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
