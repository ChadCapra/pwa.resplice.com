import React from 'react'

import SwipeLayout from '../Layout/SwipeLayout'
import HomeHeader from '../Header/HomeHeader'
import ReGroupList from '../Group/ReGroupList'
import ReContactList from '../Contact/ReContactList'

const HomeView = () => {
  return (
    <SwipeLayout swipeIndex={0} menus={['Groups', 'Individuals']}>
      <SwipeLayout.Header>
        <HomeHeader />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <ReGroupList />
        <ReContactList />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default HomeView
