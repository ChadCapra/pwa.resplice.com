import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReSignIn from './ReLogin'
import ReSignUp from './ReSignUp'
import ReVerify from './ReVerify'
// import ReContactUs from './ReContactUs'

const Login = ({ match }) => {
  return (
    <>
      <Router>
        <>
          <Route path={`${match.path}/signin`} component={ReSignIn} />
          <Route path={`${match.path}/signup`} component={ReSignUp} />
          <Route path={`${match.path}/verify`} component={ReVerify} />
          {/* <Route path={`${match.path}/contact`} component={ReContactUs} /> */}
        </>
      </Router>
    </>
  )
}

export default Login
