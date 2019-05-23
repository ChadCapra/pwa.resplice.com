import React from 'react'
import PropTypes from 'prop-types'

const ReAuthHeader = ({ logo, children }) => {
  return (
    <div className="auth-header">
      {logo && (
        <img
          src={require('../../assets/resplice_logo_alt.svg')}
          alt="Resplice Logo"
          width="80px"
        />
      )}
      {children}
    </div>
  )
}

ReAuthHeader.propTypes = {
  logo: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default ReAuthHeader
