import React from 'react'
import PhoneInput from 'react-phone-input-2'

import './input.scss'

const ReInputPhone = ({
  input,
  label,
  meta: { pristine, touched, error, warning }
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        pristine ? '' : ' re-input--filled'
      }`}
    >
      <label className="re-input-label re-input-label--phone">{label}</label>
      <PhoneInput
        {...input}
        id="phone-input"
        defaultCountry={'us'}
        disableAreaCodes
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

export default ReInputPhone
