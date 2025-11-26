import { useState } from 'react'

interface Person {
  id: number
  name: string
  age: number
}

const data: Person[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 32 }
]

type SortOrder = 'asc' | 'desc' | null

function App() {
  return (
    <div className="app">
      <h1>Sortable Table</h1>
    </div>
  )
}

export default App
