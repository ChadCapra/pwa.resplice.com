import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import ReAvatar from './Avatar/ReAvatarThumbnail'

import { getTimeRemaining } from '../../helpers'

import './profile.scss'
import '../Contact/contact.scss'

const ReContact = ({
  contact: { uuid, name, tags, avatar, pending, selected },
  onSelect,
  onDeselect,
  style
}) => {
  const [toContact, setToContact] = useState(false)

  if (toContact) return <Redirect push to={'/contact/1'} />
  // return <Redirect push to={`/contact/${uuid}`} />

  return (
    <div
      className={`profile-list-item${pending ? ' pending' : ''}${
        selected ? ' selected' : ''
      }`}
      style={style}
    >
      {selected ? (
        <div
          className="profile-checked flex--center"
          onClick={() => onDeselect(uuid)}
        >
          <MdCheckmark color="white" fontSize="3.5em" />
        </div>
      ) : (
        <ReAvatar avatar={avatar} uuid={uuid} onClick={() => onSelect(uuid)} />
      )}

      <div
        className="profile-list-item-name"
        onClick={() => setToContact(true)}
      >
        <span>{name}</span>
        <span className="profile-list-item-group">
          {pending
            ? `Expires in ${getTimeRemaining(
                new Date('2019-06-30T21:09:10'),
                new Date()
              )}`
            : tags}
        </span>
      </div>
    </div>
  )
}

ReContact.propTypes = {
  contact: PropTypes.object.isRequired,
  style: PropTypes.object,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func
}

export default ReContact
