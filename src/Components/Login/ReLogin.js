import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReSignIn from './ReSignIn'
import ReSignUp from './ReSignUp'
import ReVerify from './ReVerify'
import ReAttributes from './ReAttributes'
import ReAvatar from './ReAvatar'
import ReContactUs from './ReContactUs'

const Login = ({ match }) => {
  return (
    <>
      <Router>
        <>
          <Route path={`${match.path}/signin`} component={ReSignIn} />
          <Route path={`${match.path}/signup`} component={ReSignUp} />
          <Route path={`${match.path}/verify`} component={ReVerify} />
          <Route path={`${match.path}/attributes`} component={ReAttributes} />
          <Route path={`${match.path}/avatar`} component={ReAvatar} />
          <Route path={`${match.path}/contact`} component={ReContactUs} />
        </>
      </Router>
    </>
  )
}

export default Login
