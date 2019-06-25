import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import ReAvatar from './ReAvatar'

import { dateToReadable } from '../../helpers'

import './contact.scss'

const ReContact = ({
  contact: { uuid, name, tags, avatar, pending },
  dummy,
  addToRefMap,
  onLongPress
}) => {
  const [goContact, setContact] = useState(false)
  let buttonPressTimer = null
  if (goContact && !dummy) return <Redirect push to={`/contacts/${uuid}`} />

  const handleContactPress = () => {
    buttonPressTimer = setTimeout(() => onLongPress(), 750)
  }
  const handleContactRelease = () => {
    clearTimeout(buttonPressTimer)
  }

  return (
    <div
      className={`contact${pending ? ' pending' : ''}`}
      onClick={() => setContact(true)}
      ref={addToRefMap}
      onTouchStart={handleContactPress}
      onTouchEnd={handleContactRelease}
      onMouseDown={handleContactPress}
      onMouseUp={handleContactRelease}
      onMouseLeave={handleContactRelease}
    >
      <ReAvatar avatar={avatar} uuid={uuid} />
      <div className="contact-name">
        <span>{name}</span>
        <span className="contact-group">
          {pending ? `Expires in ${dateToReadable()}` : tags}
        </span>
      </div>
    </div>
  )
}

ReContact.propTypes = {
  contact: PropTypes.object.isRequired,
  dummy: PropTypes.bool,
  addToRefMap: PropTypes.func,
  onLongPress: PropTypes.func
}

export default ReContact
