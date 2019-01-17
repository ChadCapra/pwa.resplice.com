import React from 'react'

import ReAvatar from './ReAvatar'
import './contact.scss'

const ReContact = ({ contact: { name, tags, avatar } }) => {
  return (
    <div className="contact">
      <ReAvatar avatar={avatar} name={name} />
      <div className="contact-name">
        <span>{name}</span>
        <span className="contact-group">{tags}</span>
      </div>
    </div>
  )
}

export default ReContact
