import React from 'react'
import { Route } from 'react-router-dom'

import ReHomeView from './components/ReHomeView'
import ReContactView from './components/ReContactView'
import ReUserView from './components/ReUserView'
import ReShareView from './components/ReShareView'
import ReGroupView from './components/ReGroupView'
import ReBulkShare from './components/Share/ReBulkShare'

import './App.scss'

const App = () => (
  <div className="App">
    <>
      <Route path="/" exact component={ReHomeView} />
      <Route path="/contact/:uuid" component={ReContactView} />
      <Route path="/profile" exact component={ReUserView} />
      <Route path="/share" exact component={ReShareView} />
      <Route path="/share/bulk" exact component={ReBulkShare} />
      <Route path="/group/:uuid" component={ReGroupView} />
    </>
  </div>
)

export default App
