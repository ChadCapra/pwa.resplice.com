import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Columns from 'react-bulma-components/lib/components/columns'
import ReSearch from '../Input/ReSearch'
import SwipeNav from './SwipeNav'
import ReAvatar from '../Contact/ReAvatar'
import './header.scss'

const ReHeader = ({ user }) => {
  const [navigateToUser, setNavigateToUser] = useState(false)

  if (navigateToUser) return <Redirect push to="/profile" />
  return (
    <div className="home-header">
      <Columns breakpoint="mobile" gapless style={{ marginBottom: '0.5em' }}>
        <Columns.Column className="search-input">
          <ReSearch />
        </Columns.Column>
        <Columns.Column size={2} className="icon-right">
          <div onClick={() => setNavigateToUser(true)}>
            <ReAvatar avatar={user.avatar} uuid={user.uuid} />
          </div>
        </Columns.Column>
      </Columns>
      <SwipeNav menus={['Groups', 'Individuals']} active={0} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userState.profile
  }
}

export default connect(mapStateToProps)(ReHeader)
