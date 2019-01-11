import React from 'react'

import './input.scss'

const ReInput = ({
  input,
  placeholder,
  type,
  label,
  code,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <input
        {...input}
        className={`re-input ${error && touched ? 're-input--error' : ''}`}
        type={type}
        placeholder={placeholder}
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

export default ReInput
