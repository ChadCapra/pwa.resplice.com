import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './input.scss'

const ReTextArea = ({
  input,
  label,
  type,
  meta: { pristine, touched, error, warning },
  ...props
}) => {
  const field = useRef(null)
  useEffect(() => {
    if (props.autoFocus) {
      field.current.focus()
    }
  }, [props.autoFocus])

  return (
    <>
      {label && <label>{label}</label>}
      <textarea
        {...input}
        {...props}
        className="re-text-area"
        ref={field}
        rows="10"
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </>
  )
}

ReTextArea.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired
}

export default ReTextArea
