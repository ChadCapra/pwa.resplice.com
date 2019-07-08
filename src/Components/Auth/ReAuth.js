import React from 'react'
import { Route } from 'react-router-dom'

import ReLogin from './ReLogin'
import ReCreateProfile from './ReBuildProfile'
import ReVerify from './ReVerify'

import './auth.scss'

const ReAuth = ({ match }) => {
  return (
    <>
      <Route path={`${match.path}/login`} component={ReLogin} />
      <Route
        path={`${match.path}/create-profile`}
        component={ReCreateProfile}
      />
      <Route path={`${match.path}/verify`} component={ReVerify} />
    </>
  )
}

export default ReAuth
