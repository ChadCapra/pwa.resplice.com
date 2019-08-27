import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { loadApplication } from './state/actions'

import App from './components/App'
import Auth from './components/Auth/Auth'
import GlobalLoading from './components/Loading/GlobalLoading'
import Offline from './components/Util/Offline'

type Props = {
  isAuthorized: boolean
  loading?: boolean
  offline: boolean
  loadApplication: AsyncAction
}

const Secure = ({ isAuthorized, loading, offline, loadApplication }: Props) => {
  useEffect(() => {
    loadApplication()
  }, [loadApplication])

  if (loading) return <GlobalLoading />
  if (offline) return <Offline />

  return (
    <Router>
      <Switch>
        <Route
          path="/auth"
          render={props =>
            isAuthorized ? <Redirect to="/" /> : <Auth {...props} />
          }
        />
        <Route
          path="/"
          render={props =>
            isAuthorized ? <App {...props} /> : <Redirect to="/auth/login" />
          }
        />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    isAuthorized: state.authState.isAuthorized,
    loading: state.utilState.loading,
    offline: state.utilState.offline
  }
}

export default connect(
  mapStateToProps,
  { loadApplication }
)(Secure)
