import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchUserProfile,
  fetchUserAttributes,
  fetchContactList
} from './actions'

import ReHomeView from './components/ReHomeView'
import ReContactView from './components/ReContactView'
import ReCreateAttribute from './components/Profile/ReCreateAttribute'
import ReUserView from './components/ReUserView'
import ReShare from './components/ReShareView'
import ReCreateGroup from './components/Groups/ReCreateGroup'
import ReGroupView from './components/ReGroupView'

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
            <Route path="/" exact component={ReHomeView} />
            <Route path="/contact/:id" component={ReContactView} />
            <Route path="/profile" exact component={ReUserView} />
            <Route
              path="/profile/add-attribute"
              exact
              component={ReCreateAttribute}
            />
            <Route path="/share" component={ReShare} />
            <Route path="/group/create" component={ReCreateGroup} />
            <Route path="/group/:id" component={ReGroupView} />
          </>
        </Router>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    { fetchUserProfile, fetchUserAttributes, fetchContactList }
  )(App)
)
