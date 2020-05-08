import React, { useState, useRef } from 'react';
import useInterval from "./useInterval"
import logo from './logo.svg';
import './App.css';

function App() {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [aliveCells, setAliveCells] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const aliveCellsRef = useRef(aliveCells);
  aliveCellsRef.current = aliveCells;

  useInterval(() => {
    // Your custom logic here
    if (isStarted) {
      calculateRound();

    }
  }, 1000);

  const generateGrid = () => {
    return [...Array(rows).keys()].map((row) => (
      <div className='gridRow' key={row}>
        {[...Array(columns).keys()].map((column) => (
          <div className='gridColumn' key={`${row}-${column}`}>
            {aliveCells.some((cell) => cell[0] === row && cell[1] === column)
              ? 'o'
              : '.'}
          </div>
        ))}
      </div>
    ));
  };

  const isAlive = ([x, y]) => 
    aliveCells.some((cell) => cell[0] === x && cell[1] === y)

  const calculateRound = () => {
    const newAlives = []

    Array(rows).fill('').forEach((_,row) => {
      Array(columns).fill('').forEach((_,column) => {
        const current = [row, column]
        const isCurrentAlive = isAlive(current)
        const neighbors = getNeighbors(current)
        const aliveNeighbors = neighbors.map((neighbor) => isAlive(neighbor))
          .filter(aliveNeighbor => aliveNeighbor).length
        if (
          (!isCurrentAlive && aliveNeighbors === 3) || 
          (isCurrentAlive && [2,3].includes(aliveNeighbors))) 
        {
          newAlives.push(current)
        }
      });
    })

    setAliveCells(newAlives)
  };

  const getNeighbors = ([ x, y ]) => {
    return (
      [
        [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
        [x - 1, y], [x + 1, y], 
        [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
      ]
    );
  };

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
        onChange={(event) =>
          setAliveCells(
            event.target.value
              .split('/')
              .map((coords) => coords.split(',').map((coord) => +coord))
          )
        }
      />
      <button onClick={() => {
        setIsStarted(true)
        
      }}>Start</button>
      <button onClick={calculateRound}>Round</button>
      <div>{isStarted && generateGrid()}</div>
    </div>
  );
}

export default App;
