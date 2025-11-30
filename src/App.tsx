import { useState } from 'react'

const rows = 8
const cols = 8
const total = rows * cols
const cells = Array.from({ length: total }, (_, i) => i)

function App() {
  const [active, setActive] = useState<number | null>(0)

  const toggle = (i: number) => {
    setActive(prev => (prev === i ? null : i))
  }

  return (
    <div className="app">
      <h1>Grid Toggle</h1>
      <div className="grid">
        {cells.map(i => {
          const row = Math.floor(i / cols)
          const col = i % cols
          const isDark = (row + col) % 2 === 1

          return (
            <div
              key={i} className={`cell ${isDark ? "dark" : "light"}`}
              onClick={() => toggle(i)}
            >
              {active === i ? <div className="piece" /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
