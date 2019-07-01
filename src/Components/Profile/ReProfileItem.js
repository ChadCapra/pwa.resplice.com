import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import ReAvatar from '../Contact/ReAvatar'

import { getTimeRemaining } from '../../helpers'

import './profile.scss'
import '../Contact/contact.scss'

const ReContact = ({
  contact: { uuid, name, tags, avatar, pending },
  dummy,
  selected,
  selectable,
  onSelect,
  style
}) => {
  const [goContact, setContact] = useState(false)
  if (goContact && !dummy && !selectable)
    return <Redirect push to={'/contact/1'} />
  // return <Redirect push to={`/contact/${uuid}`} />

  let buttonPressTimer = null

  const handleContactPress = () => {
    if (selectable) {
      onSelect(uuid)
    } else {
      buttonPressTimer = setTimeout(() => onSelect(uuid), 750)
    }
  }
  const handleContactRelease = () => {
    clearTimeout(buttonPressTimer)
  }

  console.log('rendering contact')
  return (
    <div
      className={`contact${pending ? ' pending' : ''}`}
      style={style}
      onClick={() => setContact(true)}
      onTouchStart={handleContactPress}
      onTouchEnd={handleContactRelease}
      onMouseDown={handleContactPress}
      onMouseUp={handleContactRelease}
      onMouseLeave={handleContactRelease}
    >
      {selected ? (
        <div className="contact-check flex--center">
          <MdCheckmark color="white" fontSize="3.5em" />
        </div>
      ) : (
        <ReAvatar avatar={avatar} uuid={uuid} />
      )}

      <div className="contact-name">
        <span>{name}</span>
        <span className="contact-group">
          {pending
            ? `Expires in ${getTimeRemaining(
                new Date('2019-06-30T21:09:10'),
                new Date()
              )}`
            : tags}
        </span>
      </div>
    </div>
  )
}

ReContact.propTypes = {
  contact: PropTypes.object.isRequired,
  dummy: PropTypes.bool,
  selected: PropTypes.bool,
  selectable: PropTypes.bool,
  style: PropTypes.object,
  onLongPress: PropTypes.func
}

export default ReContact
