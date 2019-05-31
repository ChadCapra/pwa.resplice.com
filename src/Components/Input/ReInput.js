import React from 'react'
import PropTypes from 'prop-types'

import './input.scss'

const ReInput = ({
  input,
  type,
  label,
  meta: { pristine, touched, error, warning },
  ...props
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        pristine && type !== 'date' ? '' : ' re-input--filled'
      }`}
    >
      <label className="re-input-label">{label}</label>
      <input {...input} {...props} className="re-field" type={type} />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

ReInput.propTypes = {
  input: PropTypes.object,
  type: PropTypes.oneOf(['text', 'email', 'date']).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default ReInput
