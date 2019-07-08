import React from 'react'
import { Route } from 'react-router-dom'

import ReHomeView from './Views/ReHomeView'
import ReContactView from './Views/ReContactView'
import ReUserView from './Views/ReUserView'
import ReShareView from './Views/ReShareView'
import ReGroupView from './Views/ReGroupView'
import ReBulkShare from './Share/ReBulkShare'

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
