import { useState } from "react"

const items = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`)
const ITEMS_PER_PAGE = 10

function App() {
  const [page, setPage] = useState<number>(1)

  const paginator = () => {
    const offset = (page - 1) * ITEMS_PER_PAGE 

    return items.slice(offset, offset +  ITEMS_PER_PAGE)
  }

  const handlePrev = () => {
    setPage(prev => prev - 1)
  }

  const handleNext = () => {
    setPage(prev => prev + 1)
  }

console.log(items.length)
  return (
    <div className="app">
      <h1>Pagination</h1>
      <div className="pages">
        {paginator().map((page) => (
          <div key={page}>{page}</div>
        ))}
      </div>
      <div className="buttons">
        <button disabled={page === 1} onClick={handlePrev}>Prev</button>
        <div>current page: {page} number of pages {items.length}</div>
        <button disabled={page === Math.ceil(items.length / ITEMS_PER_PAGE)} onClick={handleNext}>Next</button>

      </div>
    </div>
  )
}

export default App
