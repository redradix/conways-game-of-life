import React, { useState } from 'react'
import InputSetAxis from './components/InputSetAxis'

const DEFAULT_WIDTH = 10
const DEFAULT_HEIGHT = 10

const initGameOfLifeGrid = (width, height) =>
  Array(width)
    .fill()
    .map(() => Array(height).fill(false))

console.log(initGameOfLifeGrid(10, 10))

function App() {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [isRunning, setIsRunning] = useState(false)
  const [grid, setGrid] = useState(initGameOfLifeGrid(width, height))

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

    const grid = initGameOfLifeGrid(width, height)

    setGrid(grid)
  }

  return (
    <div>
      <pre>{JSON.stringify(grid, null, 2)}</pre>

      <InputSetAxis label="Width" value={width} onChange={handleChangeWidth} />
      <InputSetAxis
        label="Height"
        value={height}
        onChange={handleChangeHeight}
      />

      <button onClick={isRunning ? handlePause : handleStart}>
        {isRunning ? '❚❚' : '▶'}
      </button>
      <button onClick={handleStep} disabled={isRunning}>
        →
      </button>
      <button onClick={handleReset}>↺</button>
    </div>
  )
}

export default App
