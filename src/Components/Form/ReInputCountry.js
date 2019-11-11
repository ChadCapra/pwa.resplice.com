import React from 'react'
import PropTypes from 'prop-types'

import { CountryDropdown } from 'react-country-region-selector'

import './form.scss'

const ReInputCountry = ({
  input,
  label,
  meta: { pristine, touched, error, warning }
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        input.value ? ' re-input--filled' : ''
      }`}
    >
      <label className="re-input-label">{label}</label>
      <CountryDropdown
        {...input}
        classes="re-field"
        priorityOptions={['US']}
        defaultOptionLabel=""
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

ReInputCountry.propTypes = {
  input: PropTypes.object,
  size: PropTypes.oneOf([1, 2, 3, 4]),
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default ReInputCountry
