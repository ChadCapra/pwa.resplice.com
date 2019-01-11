import React from 'react'

const ReAvatar = ({ contact }) => {
  if (contact.avatarUrl) {
    return <div>OO</div>
  } else {
    return <div className="char-avatar">{parseName(contact.name)}</div>
  }
}

const parseName = name => {
  const names = name.split(' ')
  const firstName = names[0]
  const secondName = names[1]
  return (firstName[0] + (secondName[0] || '')).toUpperCase()
}

export default ReAvatar
