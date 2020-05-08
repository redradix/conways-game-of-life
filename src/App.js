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

const copyGrid = grid => grid.map(row => [...row])

const setRowSize = w => row => {
  const smaller = row.slice(0, w)

  const difference = w - row.length

  if (difference <= 0) {
    return smaller
  }

  return [...smaller, ...Array(difference).fill(false)]
}

const setGridSize = (grid, w, h) => {
  const smaller = grid.slice(0, h).map(setRowSize(w))

  const difference = h - grid.length

  if (difference <= 0) {
    return smaller
  }

  return [
    ...smaller,
    ...Array(difference)
      .fill()
      .map(() =>
        Array(w)
          .fill()
          .map(() => false),
      ),
  ]
}

const stepGameOfLife = grid => {
  const newGrid = copyGrid(grid)

  const height = newGrid.length

  for (let y = 0; y < height; y++) {
    const width = newGrid[y].length

    for (let x = 0; x < width; x++) {
      const isAlive = grid[y][x]

      let aliveNeighbors = 0

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          // Discard itself
          if (dx === 0 && dy === 0) {
            continue
          }

          const xx = x + dx

          // Count outside (horizontal) as dead
          if (xx < 0 || xx >= width) {
            continue
          }

          const yy = y + dy

          // Count outside (vertical) as dead
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
            <span className="cell" key={x} onClick={handleClickCell(x, y)}>
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
    </div>
  )
}

export default App
