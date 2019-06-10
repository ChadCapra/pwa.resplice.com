import React from 'react'
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/dist/style.css'
import './input.scss'

const ReInputPhone = ({
  input,
  label,
  meta: { touched, error, warning },
  ...props
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        input.value ? ' re-input--filled' : ''
      }`}
    >
      <label className="re-input-label re-input-label--phone">{label}</label>
      <PhoneInput {...input} id="phone-input" {...props} />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

export default ReInputPhone
