import React from 'react'
import PropTypes from 'prop-types'

const ReCheckbox = ({ checked, onClick }) => {
  return (
    <div className={`checkbox${checked ? ' checked' : ''}`} onClick={onClick} />
  )
}

ReCheckbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default ReCheckbox
