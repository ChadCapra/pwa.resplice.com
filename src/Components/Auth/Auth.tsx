import React from 'react'
import { Route } from 'react-router-dom'

import View from '../Layout/View'
import AuthHeader from './AuthHeader'
import Login from './Login'
import ReCreateProfile from './ReCreateProfile'
import ReVerify from './ReVerify'

import './auth.scss'

type Props = {
  match: Match
}

const Auth = ({ match }: Props) => {
  return (
    <View>
      <View.Header>
        <AuthHeader />
      </View.Header>

      <View.Body>
        <Route path={`${match.path}/login`} component={Login} />
        <Route
          path={`${match.path}/create-profile`}
          component={ReCreateProfile}
        />
        <Route path={`${match.path}/verify`} component={ReVerify} />
      </View.Body>
    </View>
  )
}

export default Auth
