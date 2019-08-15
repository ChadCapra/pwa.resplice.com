import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import UserProfile from '../User/UserProfile'
import UserSettings from '../User/ReUserSettings'
import RePlusFAB from '../Button/RePlusFAB'
import ReAddAttribute from '../Profile/ReAddAttribute'
import ReModal from '../Modal/ReModal'

const UserView = () => {
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
            <UserProfile />
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
        <ReAddAttribute onAttributeAdd={() => setShowAddAttribute(false)} />
      </ReModal>
    </>
  )
}

export default UserView
