import React from 'react'

import './input.scss'

const ReInputDropdown = ({ input, label, name, options }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <select className="re-input" name={name} {...input}>
        <option label=" " />
        {options.map(option => {
          return (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ReInputDropdown
