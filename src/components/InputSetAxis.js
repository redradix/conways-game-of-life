import React from 'react'

const handleChange = onChange => e => {
  const value = Number(e.target.value)

  if (isNaN(value)) {
    return
  }

  onChange(value)
}

const InputSetAxis = ({ label, value, onChange }) => {
  return (
    <label>
      {label}:
      <input
        type="number"
        min={1}
        step={1}
        value={value}
        onChange={handleChange(onChange)}
      />
    </label>
  )
}

export default InputSetAxis
