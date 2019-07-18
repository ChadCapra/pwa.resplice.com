import React from 'react'

import Identicon from 'react-identicons'

import './avatar.scss'

interface Props {
  uuid: string
  avatar: string
}

const ReAvatar = ({ uuid, avatar }: Props) => {
  return (
    <div className="avatar">
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}
    </div>
  )
}

export default ReAvatar
