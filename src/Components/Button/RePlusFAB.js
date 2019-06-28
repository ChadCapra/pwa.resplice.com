import React from 'react'
import PropTypes from 'prop-types'

// import MdMap from 'react-ionicons/lib/MdMap'
import MdText from 'react-ionicons/lib/MdText'
import MdMail from 'react-ionicons/lib/MdMail'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdCloseCircle from 'react-ionicons/lib/MdCloseCircle'

import './button.scss'

const RePlusFAB = ({ selecting, onClick }) => {
  return selecting ? (
    <div className="fab-action-menu">
      <MdCloseCircle color="#E5E5E5" fontSize="3em" />
      <MdText color="white" fontSize="3em" />
      <MdMail color="white" fontSize="3em" />
      <MdAddCircle color="white" fontSize="3em" />
    </div>
  ) : (
    <div className="fab" onClick={onClick}>
      <MdAdd color="white" fontSize="2.5em" />
    </div>
  )
}

RePlusFAB.propTypes = {
  selecting: PropTypes.bool,
  onClick: PropTypes.func
}

export default RePlusFAB
