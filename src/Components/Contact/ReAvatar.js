import React from 'react'

import './contact.scss'

const ReAvatar = ({ avatar, name }) => {
  if (avatar) {
    return (
      <div className="avatar" style={{ backgroundImage: `url(${avatar})` }} />
    )
  } else {
    return <div className="char-avatar">{parseName(name)}</div>
  }
}

const parseName = name => {
  const names = name.split(' ')
  const firstName = names[0]
  const secondName = names[1]
  return (firstName[0] + (secondName[0] || '')).toUpperCase()
}

export default ReAvatar
