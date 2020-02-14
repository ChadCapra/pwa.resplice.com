import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { RespliceState, Session } from './store/store'
import { getSession } from './store/auth/authActions'

import GlobalLoading from './components/skeleton/GlobalLoading'
import Auth from './components/auth/Auth'
import Main from './components/Main'
import Sandbox from './components/Sandbox'

type Props = {
  session: Session | null
  getSession: () => Promise<void>
}

const Resplice = ({ session, getSession }: Props) => {
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)

  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = getSession()
        setLoading(true)
        await session
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadSession()
    // eslint-disable-next-line
  }, [])

  const isAuthorized =
    session && session.authenticated_at && session.user_registered_at
  if (loading) return <GlobalLoading />

  return (
    <Router>
      <Switch>
        <Route path="/sandbox" component={Sandbox} />
        <Route
          path="/auth"
          render={() => (isAuthorized ? <Redirect to="/" /> : <Auth />)}
        />
        <Route
          path="/"
          render={props =>
            isAuthorized ? <Main {...props} /> : <Redirect to="/auth/login" />
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
  getSession
})(Resplice)
