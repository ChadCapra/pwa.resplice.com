import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

/**
 * Primary Button for Resplice. Used on forms, in modals, etc.
 */
const ReButton = ({ type, text, loading, width = '300px', onClick }) => {
  return loading ? (
    <button style={{ width }} className={`btn btn--${type} btn--loading`}>
      {text}
      <div className="re-ring re-spin" />
    </button>
  ) : (
    <button style={{ width }} className={`btn btn--${type}`} onClick={onClick}>
      {text}
    </button>
  )
}

ReButton.propTypes = {
  /**
   * The type of button, can be primary or secondary.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'small']).isRequired,
  text: PropTypes.string.isRequired,
  /**
   * Indicates loading state.
   */
  loading: PropTypes.bool,
  width: PropTypes.string,
  onClick: PropTypes.func
}

export default ReButton
