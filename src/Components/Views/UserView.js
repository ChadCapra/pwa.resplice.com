import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import UserProfile from '../User/ReUserProfile'
import UserSettings from '../User/ReUserSettings'
import RePlusFAB from '../Button/RePlusFAB'
import ReAddAttribute from '../Profile/ReAddAttribute'
import ReModal from '../Modal/ReModal'

const UserView = ({ profile, collections, types }) => {
  const [toHome, setToHome] = useState(false)
  const [showAddAttribute, setShowAddAttribute] = useState(false)

  if (toHome) return <Redirect push to="/" />

  return (
    <>
      <SwipeLayout swipeIndex={0} menus={['Profile', 'Settings']}>
        <SwipeLayout.Header>
          <Header icon="home" onIconClick={() => setToHome(true)} />
        </SwipeLayout.Header>

        <SwipeLayout.Body>
          <>
            <UserProfile
              profile={profile}
              collections={collections}
              deleteAttribute={() => {}}
            />
            <RePlusFAB onClick={() => setShowAddAttribute(true)} />
          </>
          <UserSettings />
        </SwipeLayout.Body>
      </SwipeLayout>

      <ReModal
        full
        show={showAddAttribute}
        onClose={() => setShowAddAttribute(false)}
      >
        <ReAddAttribute
          types={types}
          onAttributeAdd={() => setShowAddAttribute(false)}
        />
      </ReModal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    profile: state.userState.profile,
    collections: state.userState.collections,
    types: state.userState.types
  }
}

export default connect(mapStateToProps)(UserView)
