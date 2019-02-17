import React from 'react'
import { withRouter } from 'react-router-dom'

import ReAvatar from './ReAvatar'
import './contact.scss'

const goToContact = (id, history, dummy) => {
  if (!dummy) {
    history.push(`/contact/${id}`)
  }
}

const ReContact = withRouter(
  ({ history, contact: { name, tags, avatar, id, uuid }, dummy }) => {
    return (
      <div className="contact" onClick={() => goToContact(id, history, dummy)}>
        <ReAvatar avatar={avatar} uuid={uuid} />
        <div className="contact-name">
          <span>{name}</span>
          <span className="contact-group">{tags}</span>
        </div>
      </div>
    )
  }
)

export default ReContact
