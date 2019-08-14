import React from 'react'
import Identicon from 'react-identicons'

import MdCheckmark from 'react-ionicons/lib/MdCheckmark'

import './avatar.scss'

interface Props {
  avatar: string
  uuid: string
  selected?: boolean
  pad?: boolean
  onSelect: (uuid: string) => {}
  onDeselect: (uuid: string) => {}
}

const ReAvatarThumbnail = ({
  avatar,
  uuid,
  selected,
  pad,
  onSelect,
  onDeselect,
  ...props
}: Props) => {
  if (selected) {
    return (
      <div
        className="avatar-thumbnail checked"
        style={{ marginLeft: pad ? '16px' : '0' }}
        onClick={() => onDeselect && onDeselect(uuid)}
        {...props}
      >
        <MdCheckmark color="white" fontSize="3.5em" />
      </div>
    )
  } else {
    if (avatar) {
      return (
        <div
          className="avatar-thumbnail"
          style={{
            backgroundImage: `url(${avatar})`,
            marginLeft: pad ? '16px' : '0'
          }}
          onClick={() => onSelect && onSelect(uuid)}
          {...props}
        />
      )
    } else {
      return (
        <div
          className="avatar-thumbnail"
          style={{ marginLeft: pad ? '16px' : '0' }}
          onClick={() => onSelect && onSelect(uuid)}
          {...props}
        >
          <Identicon string={uuid} size={30} />
        </div>
      )
    }
  }
}

export default ReAvatarThumbnail
