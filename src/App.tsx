import { useEffect, useRef, useState } from 'react'
import { useDebounce } from './hooks/useDebounce'

const API_URL = 'http://localhost:3001/query?search='

function highLightText(item: string, query: string): JSX.Element | string {
  const index = item.toLowerCase().indexOf(query.toLowerCase())

  if (index === -1) return item

  const start = item.slice(0, index)
  const middle = item.slice(index, index + query.length)
  const end = item.slice(index + query.length)

  return (
    <>
      {start}
      <strong>{middle}</strong>
      {end}
    </>
  )
}

function App() {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  const debounceQuery = useDebounce(query, 300)

  useEffect(() => {
    const controller = new AbortController()
    const search = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${API_URL}${debounceQuery}`, {
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error('There was a problem fettching fruits')
        }
        const data = await res.json()

        setResults(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        const errorMessage =
          err instanceof Error ? err.message : 'There was an issue fetching'
        setError(errorMessage)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    search()

    return () => controller.abort()
  }, [debounceQuery])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setResults([])
      }
    }

    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isOpen = results.length > 0 && !error

  const hasResults = results.length > 0

  function select(value: string) {
    setQuery(value)
    setResults([])
    setActiveIndex(-1)
  }

  return (
    <div ref={ref} className="container">
      <div className="input">
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </div>
      {loading && (
        <div>
          <h4 style={{ color: 'orange' }}>Loading...</h4>
        </div>
      )}
      {error && (
        <div>
          <h4 style={{ color: 'red' }}>{error}</h4>
        </div>
      )}
      {!hasResults ? (
        <div>
          <h4>No Results</h4>
        </div>
      ) : (
        <div>
          <ul style={{ textDecoration: 'none' }} className="dropdown">
            {results.map((item, index) => (
              <li
                key={item}
                role="option"
                onMouseDown={() => select(item)}
                className={index === activeIndex ? 'active' : ''}
              >
                {highLightText(item, query)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
