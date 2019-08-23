import React from 'react'
import Identicon from 'react-identicons'

import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdRemove from 'react-ionicons/lib/MdRemove'

import './avatar.scss'

interface Props {
  avatar: string
  uuid: string
  icon?: 'check' | 'add' | 'remove' | 'remove-alt'
  pad?: boolean
  onSelect: (uuid: string) => {}
  onDeselect: (uuid: string) => {}
}

const ReAvatarThumbnail = ({
  avatar,
  uuid,
  icon,
  pad,
  onSelect,
  onDeselect,
  ...props
}: Props) => {
  const renderIcon = () => {
    switch (icon) {
      case 'check':
        return <MdCheckmark color="white" fontSize="3.5em" />
      case 'add':
        return <MdAdd color="white" fontSize="3.5em" />
      case 'remove':
        return <MdRemove color="white" fontSize="3.5em" />
      case 'remove-alt':
      default:
        throw new Error('This icon is not supported')
    }
  }
  if (icon) {
    return (
      <div
        className="avatar-thumbnail checked"
        style={{ marginLeft: pad ? '16px' : '0' }}
        onClick={() => onDeselect && onDeselect(uuid)}
        {...props}
      >
        {renderIcon()}
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
