import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import {
  swiped,
  fetchContact,
  addShare,
  removeShare,
  deleteContact,
  declinePending
} from '../../state/actions'

import ReContactProfile from '../Contact/ReContactProfile'
import ReContactShares from '../Contact/ReContactShares'
import ReHeader from '../Header/ReHeader'
import ReProfileLoading from '../Loading/ReProfileLoading'
import ReProfileError from '../Profile/ReProfileError'

import '../Contact/contact.scss'

const ReContactView = ({
  userCollections,
  profile,
  swiped,
  fetchContact,
  addShare,
  removeShare,
  deleteContact,
  declinePending,
  match,
  loading,
  error
}) => {
  useEffect(() => {
    swiped(0)
    fetchContact(match.params.uuid)
  }, [swiped, fetchContact, match])

  if (loading || !profile.attributes) return <ReProfileLoading />
  if (error) return <ReProfileError />

  const buildPendingAttributeValues = () => {
    const values = Object.values(profile.attributes).reduce((arr, attr) => {
      if (attr.pending_attribute_value) {
        const values = Object.values(attr.pending_attribute_value)
        arr.push(values.map(value => value))
      }
      return arr
    }, [])
    // Flatten, array, create a set to remove duplicates and return an array
    return [...new Set(values.flat())]
  }
  const pendingValues = buildPendingAttributeValues()

  return (
    <div className="view">
      <ReHeader menus={['Contact', 'Shares']} exitRoute={'/'} />
      <div className="view-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-item-container">
            <ReContactProfile
              profile={profile}
              pendingValues={pendingValues}
              declinePending={declinePending}
            />
          </div>
          <div className="swipe-item-container">
            <ReContactShares
              profile={profile}
              collections={userCollections}
              addShare={addShare}
              removeShare={removeShare}
              deleteContact={deleteContact}
              pendingValues={pendingValues}
            />
          </div>
        </ReactSwipe>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    userCollections: state.userState.collections,
    profile: state.contactState.contacts[ownProps.match.params.uuid],
    loading: state.contactState.loading,
    error: state.contactState.error
  }
}

export default connect(
  mapStateToProps,
  { swiped, fetchContact, addShare, removeShare, deleteContact, declinePending }
)(ReContactView)
