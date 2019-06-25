import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import ReAvatar from './ReAvatar'

import './contact.scss'

const ReContact = ({
  contact: { uuid, name, tags, avatar },
  dummy,
  addToRefMap
}) => {
  const [goContact, setContact] = useState(false)
  if (goContact && !dummy) return <Redirect push to={`/contacts/${uuid}`} />
  return (
    <div className="contact" onClick={() => setContact(true)} ref={addToRefMap}>
      <ReAvatar avatar={avatar} uuid={uuid} />
      <div className="contact-name">
        <span>{name}</span>
        <span className="contact-group">{tags}</span>
      </div>
    </div>
  )
}

ReContact.propTypes = {
  contact: PropTypes.object.isRequired,
  dummy: PropTypes.bool,
  addToRefMap: PropTypes.func
}

export default ReContact
