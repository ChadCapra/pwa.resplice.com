import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import { swiped, fetchGroup } from '../../state/actions'

import ReProfileList from '../Profile/ReProfileList'
import ReGroupProfile from '../Group/ReGroupProfile'
import ReGroupShares from '../Group/ReGroupShares'
import ReHeader from '../Header/ReHeader'
import ReProfileError from '../Profile/ReProfileError'
import ReProfileLoading from '../Loading/ReProfileLoading'

import '../Group/group.scss'

const ReGroupView = ({ group, swiped, fetchGroup, match, loading, error }) => {
  useEffect(() => {
    swiped(1)
    fetchGroup(match.params.uuid)
  }, [swiped, fetchGroup, match])

  if (loading || !group.attributes) return <ReProfileLoading group />
  if (error) return <ReProfileError />

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
            {/* <ReProfileList listType="custom" list={group.members} /> */}
          </div>
          <div className="swipe-item-container">
            <ReGroupProfile profile={group} />
          </div>
          <div className="swipe-item-container">
            <ReGroupShares profile={group} />
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
