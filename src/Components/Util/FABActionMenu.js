import React from 'react'
import PropTypes from 'prop-types'

// import MdMap from 'react-ionicons/lib/MdMap'
import MdText from 'react-ionicons/lib/MdText'
import MdMail from 'react-ionicons/lib/MdMail'
import MdClose from 'react-ionicons/lib/MdClose'

import './utils.scss'

const FABActionMenu = ({ count, onClick }) => {
  return (
    <div className="fab-action-menu">
      <div className="fab-action-menu-count">
        <MdClose
          color="#363636"
          fontSize="1.2em"
          onClick={() => onClick('clear')}
        />{' '}
        {count === 1 ? `${count} person selected` : `${count} people selected`}
      </div>
      <div className="fab-action-menu-actions">
        <MdText color="white" fontSize="3em" onClick={() => onClick('sms')} />
        <MdMail color="white" fontSize="3em" onClick={() => onClick('email')} />
      </div>
    </div>
  )
}

FABActionMenu.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

export default FABActionMenu
