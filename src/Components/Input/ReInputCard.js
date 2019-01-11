import React from 'react'

import './input.scss'

const ReInputCard = ({ input, placeholder, type }) => {
  return (
    <div className="re-input-card">
      <input
        {...input}
        className="re-input-card-code"
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default ReInputCard
