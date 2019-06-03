import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReHomeView from './components/ReHomeView'
import ReContactView from './components/ReContactView'
import ReAddAttribute from './components/Profile/ReAddAttribute'
import ReUserView from './components/ReUserView'
import ReShareView from './components/ReShareView'
import ReShareAttributes from './components/Share/ReShareAttributes'
import ReCreateGroup from './components/Group/ReCreateGroup'
import ReGroupView from './components/ReGroupView'

import './App.scss'

const App = () => (
  <div className="App">
    <Router>
      <>
        <Route path="/" exact component={ReHomeView} />
        <Route path="/contact/:id" component={ReContactView} />
        <Route path="/profile" exact component={ReUserView} />
        <Route path="/profile/add-attribute" exact component={ReAddAttribute} />
        <Route path="/share" exact component={ReShareView} />
        <Route path="/share/attributes" component={ReShareAttributes} />
        <Route path="/group/create" component={ReCreateGroup} />
        <Route path="/group/:id" component={ReGroupView} />
      </>
    </Router>
  </div>
)

export default App
