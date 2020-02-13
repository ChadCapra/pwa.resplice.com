import React from 'react'

import SwipeView from '../shared/layout/SwipeView'
import ViewHeader from '../shared/layout/ViewHeader'
import UserProfile from '../user/UserProfile'
import UserSettings from '../user/UserSettings'

const UserView = () => {
  return (
    <SwipeView
      navText={['Profile', 'Settings']}
      header={<ViewHeader route="/" />}
    >
      <UserProfile />
      <UserSettings />
    </SwipeView>
  )
}

export default UserView
