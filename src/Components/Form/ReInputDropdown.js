import React from 'react'

import './form.scss'

const ReInputDropdown = ({
  input,
  label,
  options,
  meta: { touched, error }
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        input.value ? ' re-input--filled' : ''
      }`}
    >
      <label className="re-input-label">{label}</label>
      <select className="re-field" {...input}>
        <option label=" " />
        {options.map(option => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ReInputDropdown
