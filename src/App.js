import React, { useState } from 'react'
import InputSetAxis from './components/InputSetAxis'

const DEFAULT_WIDTH = 10
const DEFAULT_HEIGHT = 10

function App() {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [isRunning, setIsRunning] = useState(false)

  const handleChangeWidth = width => {
    setWidth(width)
  }

  const handleChangeHeight = height => {
    setHeight(height)
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStep = () => {
    alert('step')
  }

  const handleReset = () => {
    alert('reset')
  }
  return (
    <div>
      <InputSetAxis label="Width" value={width} onChange={handleChangeWidth} />
      <InputSetAxis
        label="Height"
        value={height}
        onChange={handleChangeHeight}
      />

      <button onClick={isRunning ? handlePause : handleStart}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleStep} disabled={isRunning}>
        Step
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default App
