import { useState } from 'react'

const items = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`)
const ITEMS_PER_PAGE = 10

function App() {
  const [page, setPage] = useState<number>(1)

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const pages = () => {
    const start = (page - 1) * ITEMS_PER_PAGE
    const end = page * ITEMS_PER_PAGE

    return items.slice(start, end)
  }

  return (
    <div className="app">
      <h1>Pagination</h1>
      <div className="list-container">
        {pages().map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <h3>Page Number: {page}</h3>
      <h3>Total Pages: {totalPages}</h3>

      <div className="button-container">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
