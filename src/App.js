import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAttributeTypes } from './actions'

import ReHome from './components/Home/ReHome'
import ReLogin from './components/Login/ReLogin'
import ReContactProfile from './components/Profile/ReContactProfile'
import ReUser from './components/Profile/ReUser'
import './App.scss'

class App extends Component {
  componentWillMount() {
    this.props.fetchAttributeTypes()
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
          </>
        </Router>
      </div>
    )
  }
}

export default connect(
  null,
  { fetchAttributeTypes }
)(App)
