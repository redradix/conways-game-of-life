import React, { useState, useRef } from 'react'
import InputSetAxis from './components/InputSetAxis'
import { initGrid, setGridSize, stepGrid, copyGrid } from './core/game-of-life'

const DEFAULT_WIDTH = 10
const DEFAULT_HEIGHT = 10
const ALIVE_PROBABILITY = 0.7
const DRAW_INTERVAL_MSECS = 200

function App() {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [isRunning, setIsRunning] = useState(false)
  const [grid, setGrid] = useState(initGrid(width, height, ALIVE_PROBABILITY))

  const intervalRef = useRef()

  const handleChangeWidth = width => {
    setWidth(width)
    const newGrid = setGridSize(grid, width, height)
    setGrid(newGrid)
  }

  const handleChangeHeight = height => {
    setHeight(height)
    const newGrid = setGridSize(grid, width, height)
    setGrid(newGrid)
  }

  const handleStart = () => {
    setIsRunning(true)
    intervalRef.current = setInterval(handleStep, DRAW_INTERVAL_MSECS)
  }

  const handlePause = () => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }

  const handleStep = () => {
    setGrid(stepGrid)
  }

  const handleReset = () => {
    const newGrid = initGrid(width, height, ALIVE_PROBABILITY)
    setGrid(newGrid)
  }

  const handleEmpty = () => {
    setGrid(setGridSize([], width, height))
  }

  const handleClickCell = (x, y) => () => {
    const newGrid = copyGrid(grid)
    newGrid[y][x] = !newGrid[y][x]
    setGrid(newGrid)
  }

  return (
    <div>
      <pre className="gol-grid">
        {grid.map((row, y) => [
          ...row.map((isAlive, x) => (
            <span
              className="cell"
              key={`${x}-${y}`}
              onClick={handleClickCell(x, y)}
            >
              {isAlive ? '#' : '·'}
            </span>
          )),
          '\n',
        ])}
      </pre>

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
      <button onClick={handleEmpty}>Empty</button>
    </div>
  )
}

export default App
