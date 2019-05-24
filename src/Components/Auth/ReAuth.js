import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReLogin from './ReLogin'
import ReSignUp from './ReSignUp'
import ReVerify from './ReVerify'

import './auth.scss'

const ReAuth = ({ match }) => {
  return (
    <>
      <Router>
        <>
          <Route path={`${match.path}/login`} component={ReLogin} />
          <Route path={`${match.path}/signup`} component={ReSignUp} />
          <Route path={`${match.path}/verify`} component={ReVerify} />
        </>
      </Router>
    </>
  )
}

export default ReAuth
