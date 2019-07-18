import React from 'react'

import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'

const ReProfileHeaderSummary = ({
  profile: { uuid, name, avatar, tags, member_count }
}) => {
  return (
    <div className="profile-list-item">
      <ReAvatarThumbnail avatar={avatar} uuid={uuid} />
      <div className="profile-list-item-text">
        <span>{name}</span>
        <span className="profile-list-item-subtext">
          {member_count
            ? member_count === 1
              ? `${member_count} person`
              : `${member_count} people`
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

export default ReProfileHeaderSummary
