import React from 'react'
import Identicon from 'react-identicons'

import './contact.scss'

const ReAvatar = ({ avatar, uuid }) => {
  if (avatar) {
    return (
      <div className="avatar" style={{ backgroundImage: `url(${avatar})` }} />
    )
  } else {
    return (
      <div className="avatar">
        <Identicon string={uuid} size={30} />
      </div>
    )
  }
}

export default ReAvatar
