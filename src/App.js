import React, { useState, useEffect, useCallback } from 'react';

const getNeightbours = ([x, y]) => {
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y    ],             [x + 1, y    ],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ]
}

const business = (amIAlive, aliveNeightbours) =>
  !amIAlive && aliveNeightbours === 3
  ? true
  : amIAlive && aliveNeightbours >= 2 && aliveNeightbours <= 3
  ? true
  : false
  
const getCoordinates = (rows, columns) => {
  const coordinates = []
  for(let x = 0; x < rows; x++) {
    for(let y = 0; y < columns; y++) {
      coordinates.push([x, y])
    }
  }
  return coordinates
}

function App() {
  const [inputRows, setRows] = useState(6)
  const [inputColumns, setColumns] = useState(6)
  const [[rows, columns], setGridSize] = useState([0, 0])
  const [data, setData] = useState([])
  const [playing, setPlaying] = useState(false)

  const isAlive = ([x, y], data) => {
    return data[rows * x + y]
  }

  const setAlive = i => {
    const newData = [...data]
    newData[i] = true
    setData(newData)
  }

  const nextGeneration = useCallback(() => {
    const coordinates = getCoordinates(rows, columns)
    return coordinates.map(coordinate => {
        const aliveNeightbours = getNeightbours(coordinate)
          .map(neightbour => isAlive(neightbour, data))
          .filter(alive => alive)
          .length
        const amIAlive = isAlive(coordinate, data)
        return business(amIAlive, aliveNeightbours)
      })
  }, [data])

  useEffect(() => {
    if (playing) {
      const timer = setTimeout(() => {
        setData(nextGeneration())
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [nextGeneration, playing])

  const init = () => {
    setGridSize([inputRows, inputColumns])
    setData(Array(inputColumns * inputRows).fill(false))
  }

  const play = () => {
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
  }

  return (
    <div className="App">
      <input
        min='5'
        type='number'
        value={inputRows}
        onChange={ev => setRows(ev.target.value) } />

      <input
        min='5'
        type='number'
        value={inputColumns}
        onChange={ev => setColumns(ev.target.value) } />

      <button onClick={init} disabled={playing}>Init</button>
      <button onClick={play} disabled={playing || !data.length}>Play</button>
      <button onClick={pause} disabled={!playing}>Pause</button>

      <br />
      <br />

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        height: '800px',
        width: '800px'
      }}>
        {data.map((x, i) => <span
          onClick={() => !playing && setAlive(i)}
          key={i}
          style={{
            background: x ? 'black' : 'white',
            border: '1px solid black',
            alignSelf: 'strech'
          }}></span>
        )}
      </div>
    </div>
  );
}

export default App;
