import { useState, useRef, useEffect } from 'react'

function App() {
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const startTimerRef = useRef<any>(0)
  const intervalRef = useRef<any>(null)
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (isRunning) {
      startTimerRef.current = Date.now() - elapsedTime
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimerRef.current)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current) 
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, elapsedTime])

  const handleStart = () => setIsRunning(true) 
  const handleStop = () => setIsRunning(false) 
  const handleReset = () => {
    setElapsedTime(0) 
    setIsRunning(false) 
  }

  return (
    <div className="app">
      <h1>Timer</h1>
      <div className="timer-buttons">
        <button onClick={() => handleStart()}>Start</button>
        <button onClick={() => handleStop()}>Stop</button>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
      <div className="counter">
        {formatTime(elapsedTime)}
      </div>
    </div>
  )
}

export default App
