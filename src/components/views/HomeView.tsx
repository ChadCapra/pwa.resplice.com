import React from 'react'

import SwipeView from '../shared/layout/SwipeView'
import ContactList from '../contact/ContactList'
import GroupList from '../group/GroupList'

const Home = () => {
  return (
    <SwipeView navText={['Groups', 'Individuals']}>
      <GroupList />
      <ContactList />
    </SwipeView>
  )
}

export default Home
