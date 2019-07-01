import React from 'react'
import PropTypes from 'prop-types'

// import MdMap from 'react-ionicons/lib/MdMap'
import MdText from 'react-ionicons/lib/MdText'
import MdMail from 'react-ionicons/lib/MdMail'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdCloseCircle from 'react-ionicons/lib/MdCloseCircle'

import './utils.scss'

const FABActionMenu = ({ onClick }) => {
  return (
    <div className="fab-action-menu">
      <MdCloseCircle
        color="#E5E5E5"
        fontSize="3em"
        onClick={() => onClick('clear')}
      />
      <MdText color="white" fontSize="3em" onClick={() => onClick('text')} />
      <MdMail color="white" fontSize="3em" onClick={() => onClick('email')} />
      <MdAddCircle
        color="white"
        fontSize="3em"
        onClick={() => onClick('share')}
      />
    </div>
  )
}

FABActionMenu.propTypes = {
  onClick: PropTypes.func
}

export default FABActionMenu
