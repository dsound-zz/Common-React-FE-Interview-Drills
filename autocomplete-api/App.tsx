import { useState } from 'react'
import { useDebounce } from './hooks/useDebounce'

const API_URL = 'http://localhost:3001/query?search='

function App() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle')
  const debouncedQuery = useDebounce(query, 220)

  // Placeholder for the actual fetch: the TODO block gives hints to implement
  const handleSearch = () => {
    const payloadQuery = debouncedQuery || query
    setStatus(`fetching fruits from ${API_URL}${payloadQuery}`)
    // TODO: debounce the query, request `${API_URL}${payloadQuery}`,
    //       filter matches, add keyboard navigation, and close the list on outside clicks.
  }

  return (
    <div className="app">
      <h1>Autocomplete API (Boilerplate)</h1>
      <p className="hint">
        Use the Fruityvice `/api/fruit/all` endpoint, keep the input controlled, and add
        the keyboard/mouse behaviors described in the README.
      </p>
      <div className="container">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Start typing a fruit..."
        />
        <button type="button" onClick={handleSearch}>
          Trigger fetch (placeholder)
        </button>
        <p className="status">{status}</p>
      </div>
    </div>
  )
}

export default App
