import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import ReAvatar from './Avatar/ReAvatarThumbnail'

import { getTimeRemaining } from '../../helpers'

import './profile.scss'
import '../Contact/contact.scss'

const ReContact = ({
  profile: {
    uuid,
    name,
    avatar,
    tags,
    member_count,
    pending_expiration,
    selected
  },
  onSelect,
  onDeselect,
  style
}) => {
  const [toProfile, setToProfile] = useState(false)

  if (toProfile && member_count >= 0)
    return <Redirect push to={`group/${uuid}`} />
  if (toProfile) return <Redirect push to={`/contact/${uuid}`} />

  return (
    <div
      className={`profile-list-item${pending_expiration ? ' pending' : ''}${
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
        onClick={() => setToProfile(true)}
      >
        <span>{name}</span>
        <span className="profile-list-item-group">
          {pending_expiration
            ? `Expires in ${getTimeRemaining(
                new Date(pending_expiration),
                new Date()
              )}`
            : tags &&
              tags.map((tag, idx) => (
                <span key={tag}>
                  {tag} {idx !== tags.length - 1 ? '|' : null}{' '}
                </span>
              ))}
        </span>
      </div>
    </div>
  )
}

ReContact.propTypes = {
  profile: PropTypes.object.isRequired,
  style: PropTypes.object,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func
}

export default ReContact
