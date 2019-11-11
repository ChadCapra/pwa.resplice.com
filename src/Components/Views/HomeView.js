import React from 'react'

import SwipeLayout from '../Layout/SwipeLayout'
import HomeHeader from '../Header/HomeHeader'
import GroupList from '../Group/GroupList'
import ContactList from '../Contact/ReContactList'

const HomeView = () => {
  return (
    <SwipeLayout swipeIndex={0} menus={['Groups', 'Individuals']}>
      <SwipeLayout.Header>
        <HomeHeader />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <GroupList />
        <ContactList />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default HomeView
