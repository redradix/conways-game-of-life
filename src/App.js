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
  const rows = 6
  const columns = 6

  const [data, setData] = useState([
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, true,  true,  true,  false,
    false, true,  true,  true,  false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false
  ])

  const [playing, setPlaying] = useState(false)

  const isAlive = ([x, y], data) => {
    return data[rows * x + y]
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

  const play = () => {
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
  }

  const printGeneration = () => {
    function bla(ary) {
      if (!ary.length) {
        return []
      }
      const head = ary.slice(0, columns)
      const tail = ary.slice(columns)
      return [head, ...bla(tail)]
    }

    const nose = data.map(x => x ? 'x' : '.')
    return bla(nose).map(x => x.join(' ')).join('\n')
  }

  return (
    <div className="App">
      <pre>
        {  printGeneration() }
      </pre>
      <button onClick={play} disabled={playing}>Play</button>
      <button onClick={pause} disabled={!playing}>Pause</button>
    </div>
  );
}

export default App;
