import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CardList from '../Card/CardList'
import ViewCard from '../Card/ViewCard'
import ReModal from '../Modal/ReModal'
import ReNotification from '../Util/ReNotification'

import { handleAttributeAction, getTimeRemaining } from '../../helpers'

const ReGroupProfile = ({
  profile: { uuid, name, members, pending_expiration, pending_attribute_value }
}) => {
  const [showAddAttribute, setShowAddAttribute] = useState(0)

  const handleAction = (actionType, { value }) => {
    handleAttributeAction(actionType, value)
  }

  return (
    <div className="profile">
      {pending_expiration && (
        <ReNotification type="info" style={{ marginBottom: '25px' }}>
          <ReNotification.Header>Pending Contact</ReNotification.Header>
          <ReNotification.Body>
            Share {pending_attribute_value} to unlock <br />
            Expires in{' '}
            {getTimeRemaining(new Date(pending_expiration), new Date())}
          </ReNotification.Body>
        </ReNotification>
      )}

      <CardList
        type="contact"
        Card={ViewCard}
        contactUuid={uuid}
        handleAction={handleAction}
      />

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
