import React from 'react'
import PropTypes from 'prop-types'

import { RegionDropdown } from 'react-country-region-selector'

import './input.scss'

const ReInputRegion = ({
  input,
  country,
  label,
  meta: { pristine, touched, error, warning }
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        pristine ? '' : ' re-input--filled'
      }`}
    >
      <label className="re-input-label">{label}</label>
      <RegionDropdown
        {...input}
        classes="re-field"
        country={country}
        defaultOptionLabel=""
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

ReInputRegion.propTypes = {
  input: PropTypes.object,
  size: PropTypes.oneOf([1, 2, 3, 4]),
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default ReInputRegion
