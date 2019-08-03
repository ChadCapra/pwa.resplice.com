import React from 'react'
import Identicon from 'react-identicons'

import './avatar.scss'

interface Props {
  avatar: string
  uuid: string
  selected?: boolean
}

const ReAvatar = ({ avatar, uuid, selected, ...props }: Props) => {
  if (avatar) {
    return (
      <div
        className="avatar-thumbnail"
        style={{ backgroundImage: `url(${avatar})` }}
        {...props}
      />
    )
  } else {
    return (
      <div className="avatar-thumbnail" {...props}>
        <Identicon string={uuid} size={30} />
      </div>
    )
  }
}

export default ReAvatar
