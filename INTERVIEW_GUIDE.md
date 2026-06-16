# 🧠 Complete React Frontend Interview Guide

This guide accompanies the workspace drills. **The interviewer is grading thinking, not UI polish.**

Your goal is to demonstrate:
- Intentional state modeling
- Clear separation of concerns
- Predictable render behavior
- Minimal but sufficient JSX
- Comfort with async + derived state

### The Order You Should Think In (Always)

1. What is the single source of truth?
2. What can be derived instead of stored?
3. What data structures must exist before JSX?
4. What functions mutate state vs derive values?
5. What CSS is required so the UI doesn't look broken?

### Global Do's
- ✅ Prefer IDs/indices, not booleans
- ✅ Build arrays/grids outside JSX
- ✅ Derive values during render
- ✅ `useEffect` only for async, timers, subscriptions
- ✅ JSX should be boring

### Global Don'ts
- ❌ Don't store derived data
- ❌ Don't "wait for state" with effects
- ❌ Don't build data inline in JSX
- ❌ Don't mix async logic into render
- ❌ Don't invent state to fix confusion

---

## 🪗 Accordion

### Best State
```tsx
const [openIndex, setOpenIndex] = useState<number | null>(null)
```

### Core Functions
```tsx
function toggle(index: number) {
  setOpenIndex(prev => (prev === index ? null : index))
}
const isOpen = (i: number) => openIndex === i
```

**Do / Don't**
- ✅ Store index or Set of indices
- ❌ Don't store `isOpen` per item

---

## 🗂️ Tabs

### Best State
```tsx
const [activeIndex, setActiveIndex] = useState(0)
```

### Complete Implementation
```tsx
function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="tabs-container">
      <div className="tab-list">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={idx === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panels">
        {/* Derive the content during render */}
        {tabs[activeIndex].content}
      </div>
    </div>
  )
}
```

**Do / Don't**
- ✅ Store the index of the active tab.
- ✅ Derive the active content during render (`tabs[activeIndex].content`).
- ❌ Don't store the content of the active tab in state.

---

## 🧱 Modal

### Best State
```tsx
const [isOpen, setIsOpen] = useState(false)
```

### Core Effects
```tsx
useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') setIsOpen(false)
  }
  
  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }
}, [isOpen])
```

**Do / Don't**
- ✅ Use `e.stopPropagation()` on the modal content to prevent overlay clicks from closing it.
- ✅ Add keydown listener to document to handle `Escape` key, and clean it up.
- ❌ Don't render the modal DOM if it's closed (return null or use React Portals).

---

## 🔍 Autocomplete (Local)

### Best State
```tsx
const [query, setQuery] = useState('')
const [selectedIndex, setSelectedIndex] = useState(-1)
```

### Derived Data
```tsx
const filtered = query
  ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
  : []
```

**Do / Don't**
- ✅ Derive filtered list during render
- ✅ Use `onMouseDown` (not onClick) to prevent input blur
- ❌ Don't store filtered results in state

---

## 🌐 Autocomplete (API Server)

### Best State
```tsx
const [query, setQuery] = useState('')
const [debouncedQuery, setDebouncedQuery] = useState('')
const [results, setResults] = useState<string[]>([])
const [loading, setLoading] = useState(false)
```

### Fetch Effect
```tsx
useEffect(() => {
  if (!debouncedQuery) {
    setResults([])
    return
  }

  const controller = new AbortController()
  setLoading(true)

  fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`, {
    signal: controller.signal,
  })
    .then(r => r.json())
    .then(data => {
      setResults(data)
      setLoading(false)
    })
    .catch(e => {
      if (e.name !== 'AbortError') { /* Handle Error */ }
    })

  return () => controller.abort()
}, [debouncedQuery])
```

**Do / Don't**
- ✅ Debounce drives fetch
- ✅ Use `AbortController` to prevent race conditions (vital senior signal).
- ❌ Don't fetch on every single keystroke.

---

## 📡 Fetch Demo (Standard Data Loading)

### Best State
```tsx
const [data, setData] = useState<Post[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

### Effect Pattern
```tsx
useEffect(() => {
  const controller = new AbortController()
  
  async function loadData() {
    try {
      const res = await fetch(API_URL, { signal: controller.signal })
      if (!res.ok) throw new Error('Fetch failed')
      setData(await res.json())
    } catch (e: any) {
      if (e.name !== 'AbortError') setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  loadData()
  return () => controller.abort()
}, [])
```

**Do / Don't**
- ✅ Keep loading state `true` natively if fetching on mount.
- ✅ Await the result and ALWAYS catch/distinguish errors from AbortController cleanly.
- ❌ Don't leak memory by ignoring cleanup.

---

## 📄 Pagination

### Best State
```tsx
const [page, setPage] = useState(1)
const PER_PAGE = 10
```

### Derived Values
```tsx
const totalPages = Math.ceil(items.length / PER_PAGE)
const startIndex = (page - 1) * PER_PAGE
const currentItems = items.slice(startIndex, startIndex + PER_PAGE)
```

**Do / Don't**
- ✅ Page number is the only state
- ✅ Derive slice on every render
- ❌ Don't store sliced items in a new state variable

---

## 📊 Sortable Table

### Best State
```tsx
type SortKey = keyof Person
type SortDirection = 'asc' | 'desc'
const [sortConfig, setSortConfig] = useState<{ key: SortKey; dir: SortDirection } | null>(null)
```

### Derived Sorted Data
```tsx
const sortedData = useMemo(() => {
  if (!sortConfig) return [...data]
  
  // Create a shallow copy first because .sort() mutates the array in place!
  return [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.dir === 'asc' ? -1 : 1
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.dir === 'asc' ? 1 : -1
    return 0
  })
}, [data, sortConfig])
```

**Do / Don't**
- ✅ Shallow clone the array `[...data].sort(...)` before sorting.
- ✅ Derive the sorted data during render using `useMemo` if the data is large.
- ❌ Don't save the sorted list in state!

---

## ⏱️ Timer / Stopwatch

### Best State
```tsx
const [timeMs, setTimeMs] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const intervalRef = useRef<number | null>(null)
```

### Effects
```tsx
useEffect(() => {
  if (isRunning) {
    intervalRef.current = window.setInterval(() => {
      setTimeMs(prev => prev + 10)
    }, 10)
  } else if (intervalRef.current) {
    clearInterval(intervalRef.current)
  }
  
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
}, [isRunning])
```

**Do / Don't**
- ✅ Clean up your intervals meticulously.
- ✅ Update state via callback `prev => prev + time` rather than passing state as a dependency to strict interval execution.
- ❌ Don't forget that `setInterval` execution timing isn't 100% exact in JS, but it's acceptable for standard interview answers.

---

## ♟️ Grid Piece-Toggle

### Best State
```tsx
const [selected, setSelected] = useState<{ row: number; col: number } | null>(null)
```

### Grid Construction (outside JSX)
```tsx
const grid = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 8 }, (_, col) => ({ row, col }))
)
```

**Do / Don't**
- ✅ Single selected state (object with row/col)
- ✅ Build grid array logic natively before JSX mapping.
- ❌ Don't map 64 unique states.

---

## ❌⭕ Tic Tac Toe

### Best State
```tsx
type Player = 'X' | 'O'
type Cell = Player | null

const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
```

### Winning Logic (outside component)
```tsx
// Iterate lines and see if board[a] && board[a] === board[b] ...
function getWinner(board: Cell[]): Player | null { ... }
```

**Do / Don't**
- ✅ Derive winner on every render, do not store `winner` in state.
- ✅ Use a 1D array of 9 cells rather than a 2D array matrix for simplicity.

---

## 🟩🟨⬜ Wordle

### Best State
```tsx
const [guesses, setGuesses] = useState<string[]>([])
const [currentGuess, setCurrentGuess] = useState('')
// Note: gameStatus can also be derived:
// const isWon = guesses.includes(TARGET_WORD)
// const isLost = !isWon && guesses.length >= MAX_GUESSES
```

### Evaluation Logic (outside component)
Handling duplicates is key. Pass 1: exact matches (Green). Pass 2: partial matches (Yellow), tracking remaining supply.

**Do / Don't**
- ✅ Store `guesses` as an array of strings. Derive everything else from it!
- ❌ Don't compute exact letters inside JSX. Use a helper function `evaluateGuess`.

---

## 📝 Full CRUD Todo (API)

### Best State
```tsx
const [todos, setTodos] = useState<Todo[]>([])
// Loading/Error states ...
```

**Do / Don't**
- ✅ Keep async creation logic in handlers (`handleCreate`), update state optimistically or immediately upon API resolve.
- ❌ Don't mix render and async mutation logic. 

---

### End Note for Interviews
- **Think aloud**: Explain why you chose the state structure you did.
- **Edge cases**: Ask about empty states, error cases, boundaries.
- **Start simple**: Get it working, abstract later.
