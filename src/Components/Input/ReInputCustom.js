import React from 'react'

import './input.scss'

const ReInput = ({ placeholder, label, onFocus, onBlur, onChange }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        className="re-input"
        placeholder={placeholder}
      />
    </div>
  )
}

export default ReInput
