import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSettings, fetchUserProfile } from './actions'

import App from './App'
import ReLogin from './components/Login/ReLogin'

class Secure extends Component {
  componentWillMount() {
    this.props.fetchSettings()
    this.props
      .fetchUserProfile()
      .then(() => {
        this.props.fetchUserAttributes()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
        <>
          <Route path="/" component={App} />
          <Route path="/login" component={ReLogin} />
        </>
      </Router>
    )
  }
}

export default connect(
  null,
  { fetchSettings, fetchUserProfile }
)(Secure)
