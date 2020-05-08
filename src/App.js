import React, { useState, useRef, useReducer } from 'react'
import './App.css'

const reducer = (state = {}, action) => {
  const getNeighboursAlived = (x, y) => {
    const neighbours = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
      [x + 1, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x - 1, y - 1],
    ]

    return neighbours.filter(
      ([x, y]) =>
        x >= 0 &&
        y >= 0 &&
        x <= state.rows - 1 &&
        y <= state.columns - 1 &&
        state.board[x][y]
    ).length
  }

  const business = (row, column, neighboursAlived, nextBoard) => {
    if (
      state.board[row][column] &&
      (neighboursAlived < 2 || neighboursAlived > 3)
    ) {
      nextBoard[row][column] = false
    }
    if (!state.board[row][column] && neighboursAlived === 3) {
      nextBoard[row][column] = true
    }
  }

  switch (action.type) {
    case 'init': {
      const { columns, rows } = action.payload
      const board = []

      for (let i = 0; i < rows; i++) {
        board.push(Array(Number(columns)).fill(false))
      }

      return { board, columns, rows }
    }

    case 'toggle': {
      const { x, y } = action.payload
      const board = JSON.parse(JSON.stringify(state.board))

      board[x][y] = !state.board[x][y]

      return { ...state, board }
    }

    case 'nextBoard': {
      const nextBoard = JSON.parse(JSON.stringify(state.board))

      for (let row in state.board) {
        for (let column in state.board[row]) {
          const neighboursAlived = getNeighboursAlived(
            Number(row),
            Number(column)
          )
          business(row, column, neighboursAlived, nextBoard)
        }
      }

      return { ...state, board: nextBoard }
    }

    default: {
      return state
    }
  }
}

function App() {
  const boardInterval = useRef()

  const [game, dispatch] = useReducer(reducer, { board: [] })

  const [rows, setRows] = useState(10)
  const [columns, setColumns] = useState(10)

  const createBoard = () => {
    dispatch({ type: 'init', payload: { rows, columns } })
  }

  const startGame = () => {
    boardInterval.current = setInterval(() => {
      dispatch({ type: 'nextBoard' })
    }, 300)
  }

  const pauseGame = () => {
    clearInterval(boardInterval.current)
  }

  const resetGame = () => {
    dispatch({ type: 'init', payload: { rows: 0, columns: 0 } })
  }

  const toggleCell = (x, y) => () => {
    dispatch({ type: 'toggle', payload: { x, y } })
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
          gridTemplateRows: `repeat(${game.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${game.columns}, 1fr)`,
          height: '800px',
        }}
        className="board"
      >
        {game.board.map((row, x) =>
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
