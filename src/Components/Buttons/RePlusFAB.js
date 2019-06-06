import React from 'react'

import MdAdd from 'react-ionicons/lib/MdAdd'

import './button.scss'

const RePlusFAB = ({ onClick }) => {
  return (
    <div className="fab" onClick={onClick}>
      <MdAdd color="white" fontSize="2.5em" />
    </div>
  )
}

export default RePlusFAB
