# Fetch Demo

Build a component that fetches and displays posts, and allows creating new posts.

## Requirements

- On mount, GET posts from API and display them
- Form to create new post (title and body inputs)
- POST new post on form submit
- Display loading state while fetching
- Display submitting state while posting
- Update posts list after successful POST

## API Endpoints

- **GET posts:** `https://jsonplaceholder.typicode.com/posts?_limit=5`
- **POST post:** `https://jsonplaceholder.typicode.com/posts`

POST request body:
```json
{
  "title": "string",
  "body": "string",
  "userId": 1
}
```

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
