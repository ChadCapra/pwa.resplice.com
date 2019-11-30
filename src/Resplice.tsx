import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { RespliceState, Session } from './store/store'
import { fetchAttributeTypes } from './store/util/utilActions'
import { fetchUserProfile } from './store/user/userActions'
import { fetchContacts } from './store/contact/contactActions'

import GlobalLoading from './components/skeleton/GlobalLoading'
import Auth from './components/auth/Auth'
import Main from './components/Main'

type Props = {
  session: Session | null
  fetchAttributeTypes: () => Promise<void>
  fetchUserProfile: () => Promise<void>
  fetchContacts: () => Promise<void>
}

const Resplice = ({
  session,
  fetchAttributeTypes,
  fetchContacts,
  fetchUserProfile
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)

  const loadResplice = async () => {
    setLoading(true)
    try {
      await fetchAttributeTypes()
      await fetchUserProfile()
      await fetchContacts()
    } catch (err) {
      setError(err)
      // console.log(err.response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResplice()
    // eslint-disable-next-line
  }, [])

  const isAuthorized =
    session && session.authenticated_at && session.user_registered_at
  if (loading) return <GlobalLoading />

  return (
    <Router>
      <Switch>
        <Route
          path="/auth"
          render={() => (isAuthorized ? <Redirect to="/" /> : <Auth />)}
        />
        <Route
          path="/"
          render={props =>
            isAuthorized ? <Main {...props} /> : <Redirect to="/auth" />
          }
        />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    session: state.authState.session
  }
}

export default connect(mapStateToProps, {
  fetchAttributeTypes,
  fetchUserProfile,
  fetchContacts
})(Resplice)
