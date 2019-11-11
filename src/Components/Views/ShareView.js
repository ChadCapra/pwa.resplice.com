import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'query-string'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import Invite from '../Share/Invite'
import ShareAttributes from '../Share/ShareAttributes'

import '../Share/share.scss'

const ShareView = ({ location }) => {
  const [toHome, setToHome] = useState(false)
  if (toHome) return <Redirect push to="/" />
  const params = qs.parse(location.search)

  return (
    <SwipeLayout swipeIndex={0} menus={['Invite', 'Shares']}>
      <SwipeLayout.Header>
        <Header icon="home" onIconClick={() => setToHome(true)} />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <Invite params={params} />
        <ShareAttributes />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default ShareView
