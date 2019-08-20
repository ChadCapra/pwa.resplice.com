import React from 'react'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import ContactProfile from '../Contact/ContactProfile'
import ContactShares from '../Contact/ContactShares'

const ContactView = ({ match }) => {
  return (
    <SwipeLayout swipeIndex={0} menus={['Contact', 'Shares']}>
      <SwipeLayout.Header>
        <Header icon="close" onIconClick={() => window.history.back()} />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <ContactProfile uuid={match.params.uuid} />
        <ContactShares uuid={match.params.uuid} />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default ContactView
