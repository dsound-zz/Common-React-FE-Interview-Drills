// import { useDebounce } from './hooks/useDebounce'

import { useEffect, useState } from "react"

const API_URL = 'http://localhost:3001/query?search='

function App() {
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false) 
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const debounced = useDebounce(query, 300) 

  useEffect(() => {
    if (!debounced) {
      setResults([])
      return
    }

    const controller = new AbortController()

    async function fetchResults() {
      setLoading(true) 
      setError(null)

    try {
      const res = await fetch(`${API_URL}${debounced}`, {
        signal: controller.signal
      })

      if (!res.ok) throw new Error("Failed to fetch")
      
      const data = await res.json() 
      setResults(data)
    } catch (err) {
      if (err?.name !== "AbortError") {
        setError("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

    fetchResults()

    return () => controller.abort()
    
  }, [debounced])



  return (
    <div className="app">
      <h1>Autocomplete API</h1>
      <p className="hint">
        Use the Fruityvice `http://localhost:3001/query?search=` endpoint, keep the input controlled, and add
        the keyboard/mouse behaviors described in the README.
      </p>
      <div className="container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <p className="status">status: {loading && <div>Loading...</div> || error && <div>Error...</div>}</p>
        <ul className="suggestions">
          {results.map((result) => (
            <div key={result}>{result}</div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App

const useDebounce = (q: string, delay = 200) => {
  const [debounced, setDebounced] = useState(q) 

  useEffect(() => {
    const id = setTimeout(() => setDebounced(q), delay)
    return () => clearTimeout(id) 
  }, [q, delay])

  return debounced
}
