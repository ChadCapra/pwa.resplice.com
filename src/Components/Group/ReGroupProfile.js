import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CardList from '../Card/CardList'
import ViewCard from '../Card/ViewCard'
import ReAvatar from '../Profile/Avatar/ReAvatarContact'
import ReModal from '../Modal/ReModal'
import ReNotification from '../Util/ReNotification'

import { handleAttributeAction, getTimeRemaining } from '../../helpers'

const ReGroupProfile = ({
  profile: {
    uuid,
    name,
    avatar,
    member_count,
    pending_expiration,
    attributes,
    collections
  }
}) => {
  const [showAddAttribute, setShowAddAttribute] = useState(false)

  const collectionsArray = Object.entries(collections)

  const handleAction = (actionType, { value }) => {
    handleAttributeAction(actionType, value)
  }

  const renderPendingAttributeValues = () => {
    const values = Object.values(attributes).map(attr => {
      if (attr.pending_attribute_value) {
        return Object.values(attr.pending_attribute_value).map((value, idx) => {
          if (idx === Object.values(attr.pending_attribute_value).length - 1)
            return value
          else return `${value}, `
        })
      } else {
        return ''
      }
    })
    // Flatten, array, create a set to remove duplicates and return an array
    return [...new Set(values.flat())]
  }

  return (
    <div className="profile">
      {pending_expiration && (
        <ReNotification type="info" style={{ marginBottom: '25px' }}>
          <ReNotification.Header>Pending Shares</ReNotification.Header>
          <ReNotification.Body>
            Share {renderPendingAttributeValues()} to unlock <br />
            Expires in{' '}
            {getTimeRemaining(new Date(pending_expiration), new Date())}
          </ReNotification.Body>
        </ReNotification>
      )}

      <ReAvatar uuid={uuid} avatar={avatar} viewOnly />
      <div>
        <h1 className="profile-name">{name}</h1>
        <div className="profile-tags">{member_count}</div>
      </div>

      {collectionsArray.length ? (
        <CardList
          list={collectionsArray}
          Card={ViewCard}
          handleAction={handleAction}
        />
      ) : (
        'No Group Attributes'
      )}

      <ReModal
        show={showAddAttribute}
        onClose={() => setShowAddAttribute(false)}
        headerText="Add Attribute"
      >
        Add Attribute
      </ReModal>
    </div>
  )
}

ReGroupProfile.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ReGroupProfile
