
interface Post {
  id: number
  title: string
  body: string
}

const POSTS_API = `https://jsonplaceholder.typicode.com/posts?_limit=5`
const POST_POSTS_API = `https://jsonplaceholder.typicode.com/posts`

function App() {
  return (
    <div className="app">
      <h1>Fetch Demo</h1>
    </div>
  )
}

export default App
