import React, { useState } from 'react'
import InputSetAxis from './components/InputSetAxis'

const DEFAULT_WIDTH = 10
const DEFAULT_HEIGHT = 10

function App() {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)

  const handleChangeWidth = width => {
    setWidth(width)
  }

  const handleChangeHeight = height => {
    setHeight(height)
  }

  return (
    <div>
      <InputSetAxis label="Width" value={width} onChange={handleChangeWidth} />
      <InputSetAxis
        label="Height"
        value={height}
        onChange={handleChangeHeight}
      />
    </div>
  )
}

export default App
