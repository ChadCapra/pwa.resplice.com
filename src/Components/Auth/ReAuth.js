import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReSignIn from './ReLogin'
import ReSignUp from './ReSignUp'
import ReVerify from './ReVerify'
import ReResetPassword from './ReResetPassword'
// import ReContactUs from './ReContactUs'

const ReAuth = ({ match }) => {
  return (
    <>
      <Router>
        <>
          <Route path={`${match.path}/signin`} component={ReSignIn} />
          <Route path={`${match.path}/signup`} component={ReSignUp} />
          <Route path={`${match.path}/verify`} component={ReVerify} />
          <Route
            path={`${match.path}/reset-password`}
            component={ReResetPassword}
          />
          {/* <Route path={`${match.path}/contact`} component={ReContactUs} /> */}
        </>
      </Router>
    </>
  )
}

export default ReAuth
