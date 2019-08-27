import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReAvatar from '../Profile/Avatar/ReAvatar'
import CardList from '../Card/CardList'
import ViewCard from '../Card/ViewCard'
import ReModal from '../Modal/ReModal'
import ReTags from '../Util/ReTags'
import ReNotification from '../Util/Notification'
import ReButton from '../Button/ReButton'

import { handleAttributeAction, getTimeRemaining } from '../../helpers'

const ReContactProfile = ({
  profile: {
    uuid,
    name,
    avatar,
    tags,
    pending_expiration,
    attributes,
    collections
  },
  pendingValues,
  declinePending
}) => {
  const [showTagModal, setShowTagModal] = useState(false)

  const collectionsArray = Object.entries(collections)

  const handleAction = (actionType, { value }) => {
    handleAttributeAction(actionType, value)
  }

  const handleTagChange = value => {
    console.log(value)
  }

  return (
    <div className="profile">
      {pending_expiration && (
        <ReNotification type="info" style={{ marginBottom: '25px' }}>
          <ReNotification.Header>Pending Shares</ReNotification.Header>
          <ReNotification.Body>
            Share {pendingValues.join(' or ')} to unlock <br />
            Expires in{' '}
            {getTimeRemaining(new Date(pending_expiration), new Date())}
          </ReNotification.Body>
        </ReNotification>
      )}

      <ReAvatar uuid={uuid} avatar={avatar} viewOnly />

      <div onClick={() => setShowTagModal(true)}>
        <h1 className="profile-name">{name}</h1>
        <div className="profile-tags">
          {tags.map((tag, idx) => (
            <span key={tag}>
              {tag} {idx !== tags.length - 1 ? '|' : null}{' '}
            </span>
          ))}
        </div>
      </div>

      <>
        {collectionsArray.length ? (
          <CardList
            list={collectionsArray}
            Card={ViewCard}
            handleAction={handleAction}
          />
        ) : (
          'No Attributes Shared'
        )}
      </>
      <>
        {pending_expiration && (
          <ReButton
            type="secondary"
            style={{ border: '1px solid #6C7DD5', color: '#6C7DD5' }}
            onClick={() => declinePending(uuid)}
          >
            Decline Share
          </ReButton>
        )}
      </>

      <ReModal
        show={showTagModal}
        onClose={() => setShowTagModal(false)}
        headerText="Tags"
      >
        <div className="profile-tag-modal flex--center">
          <ReTags
            selectedTags={tags}
            tags={['Father', 'Dark Side', 'Friends']}
            onTagChange={handleTagChange}
          />
        </div>
      </ReModal>
    </div>
  )
}

ReContactProfile.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ReContactProfile
