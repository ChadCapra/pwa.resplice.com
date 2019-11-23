import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { RespliceState, Session } from './store/store'
// import { loadApplication } from './state/actions'

import GlobalLoading from './components/skeleton/GlobalLoading'
import Auth from './components/auth/Auth'
import Main from './components/Main'

type Props = {
  session: Session | null
  loading: boolean
  error: Dictionary | null
}

const Resplice = ({ session, loading, error }: Props) => {
  useEffect(() => {
    // Call api
  })

  const isAuthorized = session && session.authenticated_at
  if (loading) return <GlobalLoading />

  return (
    <Router>
      <Switch>
        <Route
          path="/auth"
          render={props => (isAuthorized ? <Redirect to="/" /> : <Auth />)}
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
    session: state.authState.session,
    loading: state.utilState.globalLoading,
    error: state.utilState.globalError
  }
}

export default connect(mapStateToProps)(Resplice)
