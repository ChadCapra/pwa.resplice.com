import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { fetchAttributeTypes } from '../store/util/utilActions'
import { fetchUserProfile } from '../store/user/userActions'
import { fetchContacts } from '../store/contact/contactActions'

import HomeView from './views/HomeView'
import UserView from './views/UserView'
import GroupView from './views/GroupView'
import ContactView from './views/ContactView'
import InviteView from './views/InviteView'
import EntitySearchView from './views/EntitySearchView'

type Props = {
  fetchAttributeTypes: () => Promise<void>
  fetchUserProfile: () => Promise<void>
  fetchContacts: () => Promise<void>
}

const Main = ({
  fetchAttributeTypes,
  fetchUserProfile,
  fetchContacts
}: Props) => {
  const [, setError] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      try {
        await Promise.all([
          fetchAttributeTypes(),
          fetchUserProfile(),
          fetchContacts()
        ])
      } catch (err) {
        setError(err)
      }
    }
    loadUser()
  })

  return (
    <>
      <Route path="/" exact component={HomeView} />
      <Route path="/user" component={UserView} />
      <Route path="/group/:uuid" component={GroupView} />
      <Route path="/contact/:uuid" component={ContactView} />
      <Route path="/invite" component={InviteView} />
      <Route path="/search" component={EntitySearchView} />
    </>
  )
}

export default connect(null, {
  fetchAttributeTypes,
  fetchUserProfile,
  fetchContacts
})(Main)
