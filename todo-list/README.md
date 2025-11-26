# Todo List

Build a todo list application with the following features:

## Requirements

- Add new todos via a controlled form input
- Toggle todo completion status (click to toggle)
- Delete todos
- Use minimal state shape (array of todo objects)
- Each todo should have: `id`, `text`, `completed`

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
