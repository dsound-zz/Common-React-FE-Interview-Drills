import { useState } from 'react'

const GRID_SIZE = 8

const board = Array.from({ length: GRID_SIZE }, (_, row) =>
  Array.from({ length: GRID_SIZE }, (_, col) => ({ row, col }))
)

function App() {
  const [active, setActive] = useState<{ row: Number; col: number } | null>(
    null
  )

  return (
    <div className="app">
      <h1>Grid Toggle</h1>
      <div className="board">
        {board.map(row =>
          row.map(cell => {
            const { row, col } = cell
            const isDark = (row + col) % 2 === 1

            const isActive = active?.row === row && active?.col === col
            return (
              <div
                key={`${row}-${col}`}
                className={`cell ${isDark ? 'dark' : 'light'} ${isActive ? 'active' : ''}`}
                onClick={() => setActive({ row, col })}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default App
