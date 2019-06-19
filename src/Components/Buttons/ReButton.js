import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

/**
 * Primary Button for Resplice. Used on forms, in modals, etc.
 */
const ReButton = ({ type, text, loading, disabled, onClick, ...props }) => {
  return loading ? (
    <button className={`btn btn--${type} btn--loading`} disabled {...props}>
      {text}
      <div className="re-ring re-spin" />
    </button>
  ) : disabled ? (
    <button className={`btn btn--${type} btn--disabled`} disabled {...props}>
      {text}
    </button>
  ) : (
    <button className={`btn btn--${type}`} onClick={onClick} {...props}>
      {text}
    </button>
  )
}

ReButton.propTypes = {
  /**
   * The type of button, can be primary or secondary.
   */
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  text: PropTypes.string.isRequired,
  /**
   * Indicates loading state.
   */
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default ReButton
