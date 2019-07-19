import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CardList from '../Card/CardList'
import ViewCard from '../Card/ViewCard'
import ReAvatar from '../Profile/Avatar/ReAvatar'
import ReModal from '../Modal/ReModal'
import ReNotification from '../Util/ReNotification'
import RePlusFAB from '../Button/RePlusFAB'
import ReAddAttribute from '../Profile/ReAddAttribute'

import {
  handleAttributeAction,
  getTimeRemaining,
  buildPendingAttributeValues
} from '../../helpers'

const ReGroupProfile = ({
  ruuid,
  profile: {
    uuid,
    name,
    avatar,
    member_count,
    pending_expiration,
    attributes,
    collections = {}
  },
  attributeTypes
}) => {
  const [showAddAttribute, setShowAddAttribute] = useState(false)

  const collectionsArray = Object.entries(collections)
  const pendingValues = buildPendingAttributeValues(attributes)

  const handleAction = (actionType, { value }) => {
    handleAttributeAction(actionType, value)
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
      <div>
        <h1 className="profile-name">{name}</h1>
        <div className="profile-tags">
          {member_count === 1
            ? `${member_count} person`
            : `${member_count} people`}
        </div>
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

      <RePlusFAB onClick={() => setShowAddAttribute(true)} />

      <ReModal
        full
        show={showAddAttribute}
        onClose={() => setShowAddAttribute(false)}
      >
        <ReAddAttribute
          groupUuid={uuid}
          onAttributeAdd={() => setShowAddAttribute(false)}
          types={attributeTypes}
        />
      </ReModal>
    </div>
  )
}

ReGroupProfile.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.groupState.groups[ownProps.ruuid],
    attributeTypes: state.groupState.types
  }
}

export default connect(mapStateToProps)(ReGroupProfile)
