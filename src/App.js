import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReHome from './Components/Home/ReHome'
import ReLogin from './Components/Login/ReLogin'
import ReContactProfile from './Components/Profile/ReContactProfile'
import ReUser from './Components/Profile/ReUser'
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
