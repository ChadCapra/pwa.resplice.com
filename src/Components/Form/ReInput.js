import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './form.scss'

const ReInput = ({
  input,
  type,
  label,
  meta: { pristine, touched, error, warning },
  autoFocus,
  ...props
}) => {
  const field = useRef(null)
  useEffect(() => {
    if (autoFocus) {
      field.current.focus()
    }
  }, [autoFocus])

  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        input.value || type === 'date' ? ' re-input--filled' : ''
      }`}
    >
      <label className="re-input-label">{label}</label>
      <input
        {...input}
        {...props}
        className="re-field"
        type={type}
        ref={field}
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

ReInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'date']).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default ReInput
