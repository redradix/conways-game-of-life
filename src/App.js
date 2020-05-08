import React, { useState } from 'react'
import InputSetAxis from './components/InputSetAxis'

const DEFAULT_WIDTH = 10
const DEFAULT_HEIGHT = 10

const initGameOfLifeGrid = (width, height) =>
  Array(height)
    .fill()
    .map(() =>
      Array(width)
        .fill()
        .map(() => Math.random() > 0.7),
    )

const stepGameOfLife = grid => {
  const newGrid = grid.map(row => [...row])

  const height = newGrid.length

  for (let y = 0; y < height; y++) {
    const width = newGrid[y].length

    for (let x = 0; x < width; x++) {
      const isAlive = grid[y][x]

      let aliveNeighbors = 0

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx

          if (xx < 0 || xx >= width) {
            continue
          }

          const yy = y + dy

          if (yy < 0 || yy >= height) {
            continue
          }

          const isNeighborAlive = grid[yy][xx]

          if (isNeighborAlive) {
            aliveNeighbors++
          }
        }
      }

      // Any live cell with two or three live neighbors survives.
      if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
        newGrid[y][x] = true
      }
      // Any dead cell with three live neighbors becomes a live cell.
      else if (!isAlive && aliveNeighbors === 3) {
        newGrid[y][x] = true
      }
      // All other live cells die in the next generation.
      else if (isAlive) {
        newGrid[y][x] = false
      }
      // Similarly, all other dead cells stay dead.
      else {
      }
    }
  }

  return newGrid
}

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
    const newGrid = stepGameOfLife(grid)

    setGrid(newGrid)
  }

  const handleReset = () => {
    const newGrid = initGameOfLifeGrid(width, height)
    setGrid(newGrid)
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
