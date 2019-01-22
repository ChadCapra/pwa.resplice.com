import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchUserProfile,
  fetchUserAttributes,
  fetchContactList
} from './actions'

import ReHome from './components/Home/ReHome'
import ReLogin from './components/Login/ReLogin'
import ReContactProfile from './components/Profile/ReContactProfile'
import ReCreateAttribute from './components/Profile/ReCreateAttribute'
import ReUser from './components/Profile/ReUser'
import ReShare from './components/Share/ReShare'
import ReCreateGroup from './components/Groups/ReCreateGroup'

import './App.scss'

class App extends Component {
  componentWillMount() {
    this.props.fetchContactList()
    this.props
      .fetchUserProfile()
      .then(() => this.props.fetchUserAttributes())
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <>
            <Route path="/" exact component={ReHome} />
            <Route path="/login" component={ReLogin} />
            <Route path="/contact/:id" exact component={ReContactProfile} />
            <Route path="/profile" exact component={ReUser} />
            <Route
              path="/profile/add-attribute"
              exact
              component={ReCreateAttribute}
            />
            <Route path="/share" exact component={ReShare} />
            <Route path="/group/create" exact component={ReCreateGroup} />
          </>
        </Router>
      </div>
    )
  }
}

export default connect(
  null,
  { fetchUserProfile, fetchUserAttributes, fetchContactList }
)(App)
