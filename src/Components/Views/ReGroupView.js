import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import { swiped, fetchGroup } from '../../state/actions'

import ReGroupProfile from '../Group/ReGroupProfile'
import ReGroupShares from '../Group/ReGroupShares'
import ReHeader from '../Header/ReHeader'
import ReProfileError from '../Profile/ReProfileError'
import ReProfileLoading from '../Loading/ReProfileLoading'
import ReMemberList from '../Group/ReMemberList'

import '../Group/group.scss'
import { buildPendingAttributeValues } from '../../helpers'

const ReGroupView = ({ group, swiped, fetchGroup, match, loading, error }) => {
  useEffect(() => {
    swiped(1)
    fetchGroup(match.params.uuid)
  }, [swiped, fetchGroup, match])

  if (loading || !group.attributes) return <ReProfileLoading group />
  if (error) return <ReProfileError />

  const pendingValues = buildPendingAttributeValues(group.attributes)

  return (
    <div className="view">
      <ReHeader menus={['Members', 'Group', 'Shares']} exitRoute={'/'} />
      <div className="view-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 1,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-item-container">
            <ReMemberList uuid={group.uuid} memberUuids={group.member_uuids} />
          </div>
          <div className="swipe-item-container">
            <ReGroupProfile profile={group} pendingValues={pendingValues} />
          </div>
          <div className="swipe-item-container">
            <ReGroupShares profile={group} pendingValues={pendingValues} />
          </div>
        </ReactSwipe>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groupState.groups[ownProps.match.params.uuid],
    loading: state.groupState.loading,
    error: state.groupState.error
  }
}

export default connect(
  mapStateToProps,
  { swiped, fetchGroup }
)(ReGroupView)
