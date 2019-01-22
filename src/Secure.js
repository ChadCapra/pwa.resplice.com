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
import ReLogin from './components/Login/ReLogin'
import GlobalLoading from './components/Loading/GlobalLoading'

const PrivateRoute = ({ component: Component, authorized, ...rest }) => {
  // Check if user is authorized and then render the App component
  // Otherwise redirect to signin
  return (
    <Route
      {...rest}
      render={props =>
        authorized ? <Component {...props} /> : <Redirect to="/login/signin" />
      }
    />
  )
}

class Secure extends Component {
  componentWillMount() {
    // Component fetches frontend settings and then checks for auth_token
    this.props.fetchSettings()
    this.props.checkAuth()
  }

  render() {
    if (this.props.loading) {
      return <GlobalLoading />
    }

    return (
      <Router>
        <Switch>
          <Route path="/login" component={ReLogin} />
          <PrivateRoute
            path="/"
            component={App}
            authorized={this.props.isAuthorized}
          />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return { isAuthorized: state.auth.isAuthorized, loading: state.utils.loading }
}

export default connect(
  mapStateToProps,
  { fetchSettings, checkAuth }
)(Secure)
