import React from 'react'

import SwipeView from '../shared/layout/SwipeView'
import ViewHeader from '../shared/layout/ViewHeader'
import InviteCode from '../invite/Invite'
import InviteShares from '../invite/InviteShares'

const Invite = () => {
  return (
    <SwipeView
      navText={['Invite', 'Sharing']}
      header={<ViewHeader backRoute="/?page=2" />}
    >
      <InviteCode />
      <InviteShares />
    </SwipeView>
  )
}

export default Invite
