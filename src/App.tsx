import { useState } from "react"

const solution = "REACT"

type GameStatus = "playing" | "won" | "lost"
type TileStatus = "correct" | "present" | "absent" | "empty" | "tbd"

interface TileData {
  letter: string;
  status: TileStatus;
}

function evaluateGuess(guess: string): TileData[] {
  const result: TileData[] = Array(5).fill(null).map((_, i) => ({
    letter: guess[i],
    status: 'absent' as TileStatus
  }))

  const solutionChars = solution.split("")
  const guessChars = guess.split("")

  // Pass 1: correct positions (green)
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      result[i].status = "correct"
      solutionChars[i] = "#" // consume
      guessChars[i] = "*" // mark as done 
    }
  })

  // Pass 2: present but wrong position (yellow)
  // Two passes because of the duplicate letter problem
  guessChars.forEach((char, i) => {
    if (char === "*") return
    const idx = solutionChars.indexOf(char)
    // if that index does exist?
    if (idx !== -1) {
      // mark the status as present (we're not doing correct anymore)
      result[i].status = 'present'
      // again we consume
      solutionChars[idx] = '#'
    }
  })

  return result
}



function App() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState<string>("")
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')

  function handleSubmit() {
    setGuesses(prev => [...prev, currentGuess])
    setCurrentGuess('')
  }

  return (
    <div className="app">
      <h1>Wordle</h1>
      <input value={currentGuess} onChange={e => setCurrentGuess(e.target.value.toUpperCase())} />
      <button disabled={currentGuess.length !== 5} onClick={handleSubmit}>Submit</button>
      <div className="guesses">
        {guesses.map((guess, guessIndex) => (
          <div key={guessIndex} className="guess-row">
            {evaluateGuess(guess).map(({ letter, status }, i) => (
              <div key={i} className={`tile tile--${status}`}>{letter}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
