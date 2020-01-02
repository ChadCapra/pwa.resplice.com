import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchAttributeTypes } from '../store/util/utilActions'
import { fetchUserProfile } from '../store/user/userActions'
import { fetchContacts } from '../store/contact/contactActions'

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

  return <div>Application</div>
}

export default connect(null, {
  fetchAttributeTypes,
  fetchUserProfile,
  fetchContacts
})(Main)
