import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ContactProfilePic from './ContactProfilePic'
import CardList from '../Cards/CardList'
import ViewCard from '../Cards/ViewCard'
import ReModal from '../Modals/ReModal'
import ReTags from '../Util/ReTags'

import { handleAttributeAction } from '../../helpers'

const ReContactProfile = ({ profile: { uuid, name, tags } }) => {
  const [showTagModal, setShowTagModal] = useState(false)

  const handleAction = (actionType, { value }) => {
    handleAttributeAction(actionType, value)
  }

  const handleTagChange = value => {
    console.log(value)
  }

  return (
    <div className="profile">
      <ContactProfilePic uuid={uuid} />
      <div onClick={() => setShowTagModal(true)}>
        <h1 className="profile-name">{name}</h1>
        <div className="profile-tags">
          {tags.map((tag, idx) => (
            <span key={tag}>
              {tag} {idx !== tags.length - 1 ? '|' : ''}{' '}
            </span>
          ))}
        </div>
      </div>

      <CardList
        type="contact"
        Card={ViewCard}
        contactUuid={uuid}
        handleAction={handleAction}
      />

      <ReModal
        full
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
