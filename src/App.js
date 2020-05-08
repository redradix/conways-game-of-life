import React, { useState } from 'react'
import './App.css'

const pauseGame = () => {}

const resetGame = () => {}

function App() {
  const [board, setBoard] = useState([])

  const [rows, setRows] = useState(5)
  const [columns, setColumns] = useState(5)

  const startGame = () => {
    const _board = []

    for (let i = 0; i < rows; i++) {
      _board.push(Array(Number(columns)).fill(false))
    }

    setBoard(_board)
  }

  const toggleCell = (x, y) => () => {
    const _board = [...board]
    _board[x][y] = !_board[x][y]
    setBoard(_board)
  }

  return (
    <div className="App">
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
