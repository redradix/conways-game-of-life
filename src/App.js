import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [aliveCells, setAliveCells] = useState('');
  const [isStarted, setIsStarted] = useState(false)
  console.log(rows);

  const generateGrid = () => {
    return ([...Array(rows).keys()].map((row) => (
      <div className='gridRow' key={row}>
        {[...Array(columns).keys()].map((column) => (
          <div className='gridColumn' key={row}>
            {aliveCells.some(cell => cell[0] === row && cell[1] === column) ? 'o' : '.'}
          </div>
        ))}
      </div>
    )))
  }

  const calculateRound = () => {
    [...Array(rows).keys()].map(row => {
      [...Array(columns).keys()].map(column => {

      })
    })
  }

  const getNeighbors = ({x, y}) => {

    return (
      [x-1, y-1], [x, y-1], [x+1, y-1],
      [x-1, y],             [x+1, y],
      [x-1, y+1], [x, y+1], [x+1, y+1]
    )
  } 

  return (
    <div className='App'>
      <input
        type='number'
        onChange={(event) => setRows(Number(event.target.value))}
        value={rows}
      />
      <input
        type='number'
        onChange={(event) => setColumns(Number(event.target.value))}
        value={columns}
      />
      <input
        type='text'
        onChange={(event) => setAliveCells(event.target.value.split('/').map(coords => coords.split(',').map(coord => +coord)))}
      />
      <button onClick={() => setIsStarted(true)}>Start</button>
      <button onClick={calculateRound}>Round</button>
      <div>
        {isStarted && generateGrid()}
      </div>
    </div>
  );
}

export default App;
