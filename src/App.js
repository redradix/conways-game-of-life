import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [data, setData] = useState([])
  const [playing, setPlaying] = useState(false)

  const nextGeneration = useCallback(() => {
    if (!data.length) {
      return (Array(5).fill(1))
    } else {
      return (data.map(x => x + 1))
    }
  }, [data])

  useEffect(() => {
    if (playing) {
      const timer = setTimeout(() => {
        setData(nextGeneration())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [nextGeneration])

  return (
    <div className="App">
      { JSON.stringify(data) }
    </div>
  );
}

export default App;
