import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import SwipeLayout from '../Layout/SwipeLayout'
import Header from '../Header/Header'
import MemberList from '../Group/MemberList'
import GroupProfile from '../Group/GroupProfile'
import GroupShares from '../Group/GroupShares'

const GroupView = ({ match }) => {
  const [toGroupList, setToGroupList] = useState(false)
  if (toGroupList) return <Redirect push to="/" />

  return (
    <SwipeLayout swipeIndex={1} menus={['Members', 'Group', 'Shares']}>
      <SwipeLayout.Header>
        <Header icon="close" onIconClick={() => setToGroupList(true)} />
      </SwipeLayout.Header>

      <SwipeLayout.Body>
        <MemberList uuid={match.params.uuid} />
        <GroupProfile uuid={match.params.uuid} />
        <GroupShares uuid={match.params.uuid} />
      </SwipeLayout.Body>
    </SwipeLayout>
  )
}

export default GroupView
