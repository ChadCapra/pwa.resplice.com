import React from 'react'
import PhoneInput from 'react-phone-input-2'

import './input.scss'

const ReInputPhone = ({ input, label, meta: { touched, error, warning } }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <PhoneInput
        {...input}
        id="phone-input"
        defaultCountry={'us'}
        disableAreaCodes={true}
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

export default ReInputPhone
