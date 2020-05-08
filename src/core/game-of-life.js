export const initGrid = (width, height, aliveProbability) =>
  Array(height)
    .fill()
    .map(() =>
      Array(width)
        .fill()
        .map(() => Math.random() <= aliveProbability),
    )

export const copyGrid = grid => grid.map(row => [...row])

const setRowSize = w => row => {
  const smaller = row.slice(0, w)

  const difference = w - row.length

  if (difference <= 0) {
    return smaller
  }

  return [...smaller, ...Array(difference).fill(false)]
}

export const setGridSize = (grid, w, h) => {
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

export const stepGrid = grid => {
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
