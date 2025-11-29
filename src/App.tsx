import { useEffect, useState } from "react"

interface Post {
  id: number
  title: string
  body: string
}

const POSTS_API = `https://jsonplaceholder.typicode.com/posts?_limit=5`
const POST_POSTS_API = `https://jsonplaceholder.typicode.com/posts`

function App() {
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  const sendDisabled = title.length === 0 || body.length === 0

  const loadPosts = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(POSTS_API)
      const data = await res.json()
      setData(data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send request"
      setError(msg);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    if (sendDisabled) {
      setError("Title and Body must not be empty")
      setSending(false)
      return
    }

    try {
      const res = await fetch(POST_POSTS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: Date.now(),
          title,
          body
        })

      })

      const newPost = await res.json()
      setData(prev => [newPost, ...prev])
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send request"
      setError(msg);

    } finally {
      setSending(false)
      setTitle("")
      setBody("")
    }
  }

  return (
    <>
      <div className="app">
        <h1>Fetch Demo</h1>
        {loading && <div>Loading...</div>}
        {sending && <div>Sending...</div>}
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} value={title} />
            <button disabled={sendDisabled} type="submit">Submit</button></div>
          <textarea placeholder="Enter body" onChange={(e) => setBody(e.target.value)} value={body} />
        </form>

        <main className="container">
          {data.map((d) => {
            return (
              <div className="posts" key={d.id}>
                <h2>{d.title}</h2>
                <p>{d.body}</p>
              </div>
            )
          })}
        </main>
      </div>
    </>
  )
}

export default App
