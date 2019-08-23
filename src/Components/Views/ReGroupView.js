import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import { swiped, fetchGroup } from '../../state/actions'

import ReGroupProfile from '../Group/ReGroupProfile'
import ReGroupShares from '../Group/GroupShares'
import ReHeader from '../Header/ReHeader'
import ReProfileError from '../Profile/ReProfileError'
import ReProfileLoading from '../Loading/ReProfileLoading'
import ReMemberList from '../Group/MemberList'

import '../Group/group.scss'

const ReGroupView = ({ loading, error, swiped, fetchGroup, match }) => {
  useEffect(() => {
    swiped(1)
    fetchGroup(match.params.uuid)
  }, [swiped, fetchGroup, match])

  if (loading) return <ReProfileLoading group />
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
            <ReMemberList ruuid={match.params.uuid} />
          </div>
          <div className="swipe-item-container">
            <ReGroupProfile ruuid={match.params.uuid} />
          </div>
          <div className="swipe-item-container">
            <ReGroupShares ruuid={match.params.uuid} />
          </div>
        </ReactSwipe>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.groupState.loading,
    error: state.groupState.error
  }
}

export default connect(
  mapStateToProps,
  { swiped, fetchGroup }
)(ReGroupView)
