import React from 'react'
import { connect } from 'react-redux'

import {
  addGroupShare,
  removeGroupShare,
  leaveGroup
} from '../../state/actions'

import { buildPendingAttributeValues } from '../../helpers'

import ReProfileShares from '../Profile/ReProfileShares'

const ReGroupShares = ({
  profile,
  userCollections,
  addGroupShare,
  removeGroupShare,
  leaveGroup
}) => {
  const pendingValues = buildPendingAttributeValues(profile.attributes)

  return (
    <ReProfileShares
      profile={profile}
      collections={userCollections}
      pendingValues={pendingValues}
      addShare={addGroupShare}
      removeShare={removeGroupShare}
      deleteOrLeave={leaveGroup}
      noShareBtnText="Leave Group"
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.groupState.groups[ownProps.ruuid],
    userCollections: state.userState.collections
  }
}

export default connect(
  mapStateToProps,
  { addGroupShare, removeGroupShare, leaveGroup }
)(ReGroupShares)
