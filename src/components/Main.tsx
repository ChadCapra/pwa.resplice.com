import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { fetchAttributeTypes } from '../store/util/utilActions'
import {
  fetchUserProfile,
  fetchUserAttributes
} from '../store/user/userActions'
import { fetchContacts } from '../store/contact/contactActions'
import { fetchGroups } from '../store/group/groupAction'

import HomeView from './views/HomeView'
import UserView from './views/UserView'
import GroupView from './views/GroupView'
import ContactView from './views/ContactView'
import InviteView from './views/InviteView'
import EntitySearchView from './views/EntitySearchView'

type Props = {
  fetchAttributeTypes: () => Promise<void>
  fetchUserProfile: () => Promise<void>
  fetchUserAttributes: () => Promise<void>
  fetchContacts: () => Promise<void>
  fetchGroups: () => Promise<void>
}

const Main = ({
  fetchAttributeTypes,
  fetchUserProfile,
  fetchUserAttributes,
  fetchContacts,
  fetchGroups
}: Props) => {
  const [, setError] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      try {
        await Promise.all([
          fetchAttributeTypes(),
          fetchUserProfile(),
          fetchUserAttributes(),
          fetchContacts(),
          fetchGroups()
        ])
      } catch (err) {
        setError(err)
      }
    }
    loadUser()
  }, [
    fetchAttributeTypes,
    fetchUserProfile,
    fetchUserAttributes,
    fetchContacts,
    fetchGroups
  ])

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
  fetchUserAttributes,
  fetchContacts,
  fetchGroups
})(Main)
