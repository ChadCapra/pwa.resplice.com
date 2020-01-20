import React from 'react'

import SwipeView from '../shared/layout/SwipeView'
import BackHeader from '../shared/layout/BackHeader'
import UserProfile from '../user/UserProfile'
import UserSettings from '../user/UserSettings'

const UserView = () => {
  return (
    <SwipeView
      navText={['Profile', 'Settings']}
      header={<BackHeader route="/" />}
    >
      <UserProfile />
      <UserSettings />
    </SwipeView>
  )
}

export default UserView
