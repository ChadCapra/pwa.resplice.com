import React from 'react'

import MdClose from 'react-ionicons/lib/MdClose'
import MdCheck from 'react-ionicons/lib/MdCheckmark'

import './input.scss'

const renderIcon = ({ touched, error }) => {
  if (touched && error) {
    return (
      <MdClose className="re-input-icon" color="#fc3769" fontSize="2.5rem" />
    )
  } else if (touched) {
    return (
      <MdCheck className="re-input-icon" color="#1bbc9b" fontSize="2.5rem" />
    )
  }
}

const ReInputCode = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          {...input}
          className={`re-input ${error && touched ? 're-input--error' : ''}`}
          type={type}
          placeholder={placeholder}
        />
        {renderIcon({ touched, error })}
        {touched &&
          ((error && <span className="input-error-text">{error}</span>) ||
            (warning && <span className="input-warning-text">{warning}</span>))}
      </div>
    </div>
  )
}

export default ReInputCode
