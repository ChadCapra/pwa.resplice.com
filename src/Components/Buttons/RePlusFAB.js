import React from 'react'
import PropTypes from 'prop-types'

import MdAdd from 'react-ionicons/lib/MdAdd'

import './button.scss'

const RePlusFAB = ({ onClick }) => {
  return (
    <div className="fab" onClick={onClick}>
      <MdAdd color="white" fontSize="2.5em" />
    </div>
  )
}

RePlusFAB.propTypes = {
  onClick: PropTypes.func
}

export default RePlusFAB
