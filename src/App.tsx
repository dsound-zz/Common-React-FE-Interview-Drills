import { useEffect, useState } from 'react'
import { useDebounce } from './hooks/useDebounce'

const API_URL = 'http://localhost:3001/query?search='

function App() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle')
  const debouncedQuery = useDebounce(query, 220)

  useEffect(() => {
    const payloadQuery = debouncedQuery || query
    setStatus(`fetching fruits from ${API_URL}${payloadQuery}`)
  }, [query, debouncedQuery])


  return (
    <div className="app">
      <h1>Autocomplete API (Boilerplate)</h1>
      <p className="hint">
        Use the Fruityvice `/api/fruit/all` endpoint, keep the input controlled, and add
        the keyboard/mouse behaviors described in the README.
      </p>
    </div>
  )
}

export default App
