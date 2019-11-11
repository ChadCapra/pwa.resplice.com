import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import FlexBox from '../Layout/FlexBox'
import Notification from '../Util/Notification'
import ProfileLoading from '../Loading/ReProfileLoading'
import Avatar from '../Profile/Avatar/ReAvatar'
import CardList from '../Contact/CardList'
import ReButton from '../Button/ReButton'

import { getTimeRemaining, getPendingValues } from '../../helpers'
import { fetchGroup } from '../../state/actions'

const GroupProfile = ({ uuid, profile, fetchGroup }) => {
  useEffect(() => {
    fetchGroup(uuid)
  }, [fetchGroup, uuid])

  if (!profile.collections) return <ProfileLoading />

  const handleAction = action => {
    console.log(action)
  }

  const collections = Object.entries(profile.collections)
  const pendingValues = getPendingValues(profile.attributes)

  return (
    <FlexBox direction="column" align="center" style={{ padding: '16px 0' }}>
      {profile.pending_expiration && (
        <Notification type="info" style={{ marginBottom: '25px' }}>
          <Notification.Header>Pending Membership</Notification.Header>
          <Notification.Body>
            Share {pendingValues.join(' or ')} to unlock <br />
            Expires in{' '}
            {getTimeRemaining(new Date(profile.pending_expiration), new Date())}
          </Notification.Body>
        </Notification>
      )}

      <Avatar uuid={profile.uuid} avatar={profile.avatar} viewOnly />

      {collections.length ? (
        <CardList list={collections} handleAction={handleAction} />
      ) : (
        'No Attributes Added'
      )}

      {profile.pending_expiration && (
        <ReButton
          type="secondary"
          style={{ border: '1px solid #6C7DD5', color: '#6C7DD5' }}
          onClick={() => console.log(uuid)}
        >
          Decline Membership
        </ReButton>
      )}
    </FlexBox>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.groupState.groups[ownProps.uuid]
  }
}

export default connect(
  mapStateToProps,
  { fetchGroup }
)(GroupProfile)
