import React, { useState } from 'react'
import './App.css'

const pauseGame = () => { }

const resetGame = () => { }


function App() {
  const [board, setBoard] = useState([])

  const [rows, setRows] = useState(5)
  const [columns, setColumns] = useState(5)

  const x = (x, y) => {
    const neightbords = []

    // const y1 = (x, y + 1)
    // const y2 = (x, y - 1)
    // const x1 = (x + 1, y)
    // const x2 = (x - 1, y)
    // const d1 = (x + 1, y - 1)
    // const d2 = (x + 1, y + 1)
    // const d3 = (x - 1, y + 1)
    // const d4 = (x - 1, y - 1)

    if (x === 0 && y === 0) {
      const y1 = [x, y + 1]
      const x1 = [x + 1, y]
      const d2 = [x + 1, y + 1]
      neightbords.push(y1)
      neightbords.push(x1)
      neightbords.push(d2)
      neightbords.map(([x, y]) => console.log(board[x][y]))

    }
    if (x === columns) {

    }
    if (y === 0) {

    }
    if (y === rows) {

    }
  }

  const createBoard = () => {
    const _board = []

    for (let i = 0; i < rows; i++) {
      _board.push(Array(Number(columns)).fill(false))
    }

    setBoard(_board)
  }

  const startGame = () => {
    console.log("HOLA")
    x(0, 0)
  }

  const toggleCell = (x, y) => () => {
    const _board = [...board]
    _board[x][y] = !_board[x][y]
    setBoard(_board)
  }

  return (
    <div className="App">
      <button onClick={createBoard}>Create board</button>
      <button onClick={startGame}>Start</button>
      <button onClick={pauseGame}>Pause</button>
      <button onClick={resetGame}>Reset</button>

      <input
        placeholder="rows"
        value={rows}
        onChange={(e) => setRows(e.target.value)}
      />

      <input
        placeholder="columns"
        value={columns}
        onChange={(e) => setColumns(e.target.value)}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          height: '800px',
        }}
        className="board"
      >
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              style={{
                backgroundColor: cell ? 'black' : null,
                border: '1px solid black',
                alignSelf: 'stretch',
              }}
              key={`${x}-${y}`}
              onClick={toggleCell(x, y)}
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
