import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './hooks/useDebounce';

const API_URL = 'http://localhost:3001/query?search='

function highlighter(chars: string, query: string) {
  const lower = chars.toLowerCase();
  const q = query.toLowerCase();
  const i = lower.indexOf(q);

  if (i === -1) {
    return { start: chars, match: "", end: "" };
  }

  return {
    start: chars.slice(0, i),
    match: chars.slice(i, i + query.length),
    end: chars.slice(i + query.length),
  };
}

function App() {
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const isSelectingRef = useRef(false)
  const debouncedQuery = useDebounce(query, 300)


  const fetchQuery = async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}${debouncedQuery}`)
      const data = await res.json()
      setSuggestions(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "There was an issue fetching"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  // User clicked a suggestion
  if (isSelectingRef.current) {
    isSelectingRef.current = false;
    return;
  }

  // Empty query
  if (!debouncedQuery.trim()) {
    setIsOpen(false);
    setSuggestions([]);
    return;
  }

  // Normal search flow
  fetchQuery();
  setIsOpen(true);
}, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    switch (e.key) {

      case 'Enter':
        if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
          e.preventDefault()
          handleSuggestionClicked(suggestions[highlightIndex])
        }
        break

      case 'Escape':
        setIsOpen(false)
        setHighlightIndex(-1)
        break;

      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightIndex(i =>
          i < suggestions.length - 1 ? i + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setHighlightIndex(i =>
          i > 0 ? i - 1 : suggestions.length - 1
        );
        break;

      default:
        break
    }
  }

  useEffect(() => {
    setHighlightIndex(-1);
  }, [suggestions]);

  const handleSuggestionClicked = (suggestion: string) => {
    isSelectingRef.current = true
    setQuery(suggestion)
    setIsOpen(false)
    setHighlightIndex(-1);
  }
  console.log(debouncedQuery, suggestions, isOpen)
  return (
    <div className="app">
      <h1>Autocomplete API (Boilerplate)</h1>

      <div className="container">
        {debouncedQuery.length && !suggestions.length ? <div>No results...</div> : null}
        {loading ? <div>Loading...</div> : null}
        {error ? <div>{error}</div> : null}
        <input type="text" value={query} onChange={(e) => {
          setQuery(e.target.value)
          isSelectingRef.current = false
        }} onKeyDown={handleKeyDown} />
        {isOpen ? (
          <ul className="suggestions">
            {suggestions.map((suggestion) => {
              const { start, match, end } = highlighter(suggestion, debouncedQuery)
              return (
                <li key={suggestion} onClick={() => handleSuggestionClicked(suggestion)}>{start}<strong>{match}</strong>{end}</li>
              )
            })}
          </ul>
        ) : null}

      </div>
    </div>
  )
}

export default App
