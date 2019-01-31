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

const PrivateRoute = ({ component: Component, authorized, ...rest }) => {
  // Check if user is authorized and then render the App component
  // Otherwise redirect to signin
  return (
    <Route
      {...rest}
      render={props =>
        authorized ? <Component {...props} /> : <Redirect to="/auth/signin" />
      }
    />
  )
}

class Secure extends Component {
  state = { loading: true }
  componentWillMount() {
    // Component checks for auth_token and then fetches frontend settings
    this.props.fetchSettings()
    this.props.checkAuth().then(() => this.setState({ loading: false }))
  }

  render() {
    if (this.state.loading) {
      return <GlobalLoading />
    }

    return (
      <Router>
        <Switch>
          <Route path="/auth" component={ReAuth} />
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
  return { isAuthorized: state.auth.isAuthorized }
}

export default connect(
  mapStateToProps,
  { fetchSettings, checkAuth }
)(Secure)
