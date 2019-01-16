import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReHome from './components/Home/ReHome'
import ReLogin from './components/Login/ReLogin'
import ReContactProfile from './components/Profile/ReContactProfile'
import ReUser from './components/Profile/ReUser'
import './App.scss'

const App = () => {
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

export default App
