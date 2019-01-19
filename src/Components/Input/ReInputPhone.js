import React from 'react'
import PhoneInput from 'react-phone-input-2'

import './input.scss'

const ReInputPhone = ({ input, label }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <PhoneInput
        {...input}
        id="phone-input"
        defaultCountry={'us'}
        onChange={val => console.log(val)}
      />
    </div>
  )
}

export default ReInputPhone
