import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import { swiped, fetchContact } from '../actions'

import ReContactProfile from './Contact/ReContactProfile'
import ReContactShares from './Contact/ReContactShares'
import ReHeader from './Header/ReHeader'

const ReContactView = ({ loading, profile, swiped, fetchContact, match }) => {
  useEffect(() => {
    swiped(0)
    fetchContact(match.params.uuid)
  }, [swiped, fetchContact, match])

  if (loading || !profile) return 'loading'

  return (
    <div className="contact-container">
      <ReHeader menus={['Contact', 'Shares']} exitRoute={'/'} />
      <div className="contact-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-nav-item-container">
            <ReContactProfile profile={profile} />
          </div>
          <div className="swipe-nav-item-container">
            <ReContactShares profile={profile} />
          </div>
        </ReactSwipe>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.contactState.contacts[ownProps.match.params.uuid],
    loading: state.contactState.loading
  }
}

export default connect(
  mapStateToProps,
  { swiped, fetchContact }
)(ReContactView)
