import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import HomeView from './Views/HomeView'
import ContactView from './Views/ContactView'
import UserView from './Views/UserView'
import ShareView from './Views/ShareView'
import ReGroupView from './Views/ReGroupView'
import ReGroupInvite from './Group/ReGroupInvite'
import ReImportInvite from './Group/ReImportInvite'

import './App.global.scss'

const App = _props => {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      console.log(e)

      // Show the prompt
      // e.prompt();
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', null)
    }
  }, [])
  return (
    <div className="App">
      <>
        <Route path="/" exact component={HomeView} />
        <Route path="/contact/:uuid" component={ContactView} />
        <Route path="/user" exact component={UserView} />
        <Route path="/share" exact component={ShareView} />
        <Route path="/group/:uuid" exact component={ReGroupView} />
        <Route path="/group/:uuid/invite" component={ReGroupInvite} />
        <Route path="/group/:uuid/import" component={ReImportInvite} />
      </>
    </div>
  )
}

export default App
