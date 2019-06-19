import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import { swiped, fetchContact } from '../actions'

import ReContactProfile from './Contact/ReContactProfile'
import ReContactShares from './Contact/ReContactShares'
import ReContactUpdates from './Contact/ReContactUpdates'
import ReHeader from './Header/ReHeader'

const ReContactView = ({ loading, profile, swiped, fetchContact, match }) => {
  useEffect(() => {
    swiped(1)
    fetchContact(match.params.uuid)
  }, [swiped, fetchContact, match])

  if (loading || !profile) return 'loading'

  return (
    <div className="contact-container">
      <ReHeader menus={['Share', 'Contact', 'Updates']} exitRoute={'/'} />
      <div className="contact-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 1,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-nav-item-container">
            <ReContactShares />
          </div>
          <div className="swipe-nav-item-container">
            <ReContactProfile profile={profile} />
          </div>
          <div className="swipe-nav-item-container">
            <ReContactUpdates />
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
