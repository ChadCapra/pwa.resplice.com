import React from 'react'

import SwipeView from '../shared/layout/SwipeView'
import ViewHeader from '../shared/layout/ViewHeader'
import ContactList from '../contact/ContactList'
import GroupList from '../group/GroupList'

const Home = () => {
  return (
    <SwipeView
      navText={['Profile', 'Settings']}
      header={<ViewHeader route="/" />}
    >
      <ContactList />
      <GroupList />
    </SwipeView>
  )
}

export default Home
