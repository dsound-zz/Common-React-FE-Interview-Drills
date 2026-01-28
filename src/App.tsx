import { useState } from 'react'

const winners = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [player, setPlayer] = useState<string>('X')

  function turn(index: number) {
    if (board[index] || isWinner) return

    setBoard(prev => {
      const next = [...prev]
      next[index] = player
      return next
    })

    setPlayer(prev => (prev === 'X' ? 'O' : 'X'))
  }

  function getWinner(board: any): string | null {
    for (const [a, b, c] of winners) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const isWinner = getWinner(board)

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={`${cell}-${index}`}
            className="cell"
            onClick={() => turn(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <h1>The winner is: {isWinner ?? ''}</h1>
    </div>
  )
}

export default App
