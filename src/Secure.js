import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSettings, checkAuth } from './actions'

import App from './App'
import ReAuth from './components/Auth/ReAuth'
import GlobalLoading from './components/Loading/GlobalLoading'
import Offline from './components/Util/Offline'

const PrivateRoute = ({ authorized, ...rest }) => {
  // Check if user is authorized and then render the App component
  // Otherwise redirect to signin
  return (
    <Route
      {...rest}
      render={props =>
        authorized ? <App {...props} /> : <Redirect to="/auth/signin" />
      }
    />
  )
}

class Secure extends Component {
  componentWillMount() {
    // Component checks for auth_token and then fetches frontend settings
    this.props.checkAuth()
    this.props.fetchSettings()
  }

  render() {
    if (this.props.loading) {
      return <GlobalLoading />
    }

    if (this.props.offline) {
      return <Offline />
    }

    return (
      <Router>
        <Switch>
          <Route path="/auth" component={ReAuth} />
          <PrivateRoute path="/" authorized={this.props.isAuthorized} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.authState.isAuthorized,
    loading: state.utilState.loading,
    offline: state.utilState.offline
  }
}

export default connect(
  mapStateToProps,
  { fetchSettings, checkAuth }
)(Secure)
