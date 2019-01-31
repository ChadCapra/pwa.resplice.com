import React from 'react'

import MdClose from 'react-ionicons/lib/MdClose'
import MdCheck from 'react-ionicons/lib/MdCheckmark'
import Ripple from '../Loading/Ripple'

import './input.scss'

const renderIcon = ({ touched, error, verifying }) => {
  return (
    touched &&
    ((error && (
      <MdClose className="re-input-icon" color="#fc3769" fontSize="2.5rem" />
    )) ||
      (verifying && <Ripple className="code-verifying" />) || (
        <MdCheck className="re-input-icon" color="#1bbc9b" fontSize="2.5rem" />
      ))
  )
}

const ReInputCode = ({
  input,
  placeholder,
  label,
  verifying,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          {...input}
          className={`re-input ${error && touched && 're-input--error'}`}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="7"
          placeholder={placeholder}
        />
        {renderIcon({ touched, error, verifying })}
        {touched &&
          ((error && <span className="input-error-text">{error}</span>) ||
            (warning && <span className="input-warning-text">{warning}</span>))}
      </div>
    </div>
  )
}

export default ReInputCode
