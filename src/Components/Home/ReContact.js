import React from 'react'

import ReAvatar from './ReAvatar'
import './contact.scss'

const ReContact = ({ contact }) => {
  return (
    <div className="contact">
      <div className="contact-avatar">
        <ReAvatar contact={contact} />
      </div>
      <div className="contact-name">
        <span>{contact.name}</span>
        <span className="contact-group">{contact.username}</span>
      </div>
    </div>
  )
}

export default ReContact
