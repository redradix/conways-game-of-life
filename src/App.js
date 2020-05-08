import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [aliveCells, setAliveCells] = useState();
  console.log(rows);

  return (
    <div className='App'>
      <input
        type='number'
        onChange={(event) => setRows(Number(event.target.value))}
      />
      <input
        type='number'
        onChange={(event) => setColumns(Number(event.target.value))}
      />
      <input
        type='number'
        onChange={(event) => setAliveCells(Number(event.target.value))}
      />
      <div>
        {[...Array(rows).keys()].map((row) => (
          <div className='gridRow'>
            {[...Array(columns).keys()].map((column) => (
              <div className='gridColumn'>x</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
