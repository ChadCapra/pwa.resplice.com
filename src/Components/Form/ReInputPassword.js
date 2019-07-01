import React from 'react'

import Eye from 'react-ionicons/lib/MdEye'

import './form.scss'

const ReInputPassword = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  let passInput = React.createRef()

  const showPass = () => {
    if (passInput.current.type === 'password') {
      passInput.current.type = 'text'
    } else {
      passInput.current.type = 'password'
    }
  }

  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          {...input}
          className={`re-input ${error && touched ? 're-input--error' : ''}`}
          type={type}
          placeholder={placeholder}
          ref={passInput}
        />
        <Eye
          className="re-input-icon"
          color="#1bbc9b"
          fontSize="2.5rem"
          onClick={showPass}
        />
        {touched &&
          ((error && <span className="input-error-text">{error}</span>) ||
            (warning && <span className="input-warning-text">{warning}</span>))}
      </div>
    </div>
  )
}

export default ReInputPassword
