import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import ContactProfile from '../Contact/ContactProfile'
import ContactShares from '../Contact/ContactShares'

const ContactView = ({ match }) => {
  const [toContactList, setToContactList] = useState(false)
  if (toContactList) return <Redirect push to="/?swipeIndex=1" />

  return (
    <SwipeLayout swipeIndex={0} menus={['Contact', 'Shares']}>
      <SwipeLayout.Header>
        <Header icon="close" onIconClick={() => setToContactList(true)} />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <ContactProfile uuid={match.params.uuid} />
        <ContactShares uuid={match.params.uuid} />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default ContactView
