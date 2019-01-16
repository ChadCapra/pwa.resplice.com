import React from 'react'

import ReButton from '../Buttons/ReButton'

import './profile.scss'

const ReUpdate = ({ name, item, isGroupInvite }) => {
  if (isGroupInvite) {
    return (
      <div className="re-update">
        <div className="re-update-text">
          <span className="update-text-name">{name}</span>
          <span> asked you to share with the group </span>
          <span className="update-text-item">{item}</span>
        </div>
        <div className="update-btns">
          <ReButton type="primary" text="Share" width="125px" />
          <ReButton type="secondary" text="Ignore" width="125px" />
        </div>
      </div>
    )
  }
  return (
    <div className="re-update">
      <div className="re-update-text">
        <span className="update-text-name">{name}</span>
        <span> asked for your </span>
        <span className="update-text-item">{item}</span>
      </div>
      <div className="update-btns">
        <ReButton type="primary" text="Share" width="125px" />
        <ReButton type="secondary" text="Ignore" width="125px" />
      </div>
    </div>
  )
}

export default ReUpdate
