import React from 'react'

import SwipeView from '../shared/layout/SwipeView'
import HomeHeader from '../home/HomeHeader'
import ContactList from '../contact/ContactList'
import GroupList from '../group/GroupList'

const Home = () => {
  return (
    <SwipeView navText={['Groups', 'Individuals']} header={<HomeHeader />}>
      <GroupList />
      <ContactList />
    </SwipeView>
  )
}

export default Home
