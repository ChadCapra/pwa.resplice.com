import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

/**
 * Primary Button for Resplice. Used on forms, in modals, etc.
 */
const ReButton = ({ type, text, loading, width = '300px', onClick }) => {
  if (loading) {
    return (
      <button style={{ width }} className={`btn btn--${type} btn--loading`}>
        <span>{text}</span>
        <div className="re-ring re-spin" />
      </button>
    )
  }

  return (
    <button style={{ width }} className={`btn btn--${type}`} onClick={onClick}>
      <span>{text}</span>
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
