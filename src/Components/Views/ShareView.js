import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import Invite from '../Share/Invite'
import ShareAttributes from '../Share/ShareAttributes'

import '../Share/share.scss'

const ShareView = () => {
  const [toHome, setToHome] = useState(false)

  if (toHome) return <Redirect push to="/" />

  return (
    <SwipeLayout swipeIndex={0} menus={['Invite', 'Shares']}>
      <SwipeLayout.Header>
        <Header icon="home" onIconClick={() => setToHome(true)} />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <Invite />
        <ShareAttributes />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default ShareView
