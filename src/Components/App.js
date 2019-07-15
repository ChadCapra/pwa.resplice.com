import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import ReHomeView from './Views/ReHomeView'
import ReContactView from './Views/ReContactView'
import ReUserView from './Views/ReUserView'
import ReShareView from './Views/ReShareView'
import ReGroupView from './Views/ReGroupView'
import ReBulkShare from './Share/ReBulkShare'
import ReGroupInvite from './Group/ReGroupInvite'

import './App.scss'

const App = props => {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      console.log(e)

      // Show the prompt
      // e.prompt();
    })

    return () => {
      window.removeEventListener('beforeinstallprompt')
    }
  }, [])
  return (
    <div className="App">
      <>
        <Route path="/" exact component={ReHomeView} />
        <Route path="/contact/:uuid" component={ReContactView} />
        <Route path="/profile" exact component={ReUserView} />
        <Route path="/share" exact component={ReShareView} />
        <Route path="/share/bulk" exact component={ReBulkShare} />
        <Route path="/group/:uuid" component={ReGroupView} />
        <Route path="/group/:uuid/invite" component={ReGroupInvite} />
      </>
    </div>
  )
}

export default App
