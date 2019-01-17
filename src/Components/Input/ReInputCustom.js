import React from 'react'

import './input.scss'

const ReInput = ({ placeholder, label }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <input className="re-input" placeholder={placeholder} />
    </div>
  )
}

export default ReInput
