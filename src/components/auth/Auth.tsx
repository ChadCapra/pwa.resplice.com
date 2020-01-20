import React from 'react'
import { Route } from 'react-router-dom'

import View from '../shared/layout/View'
import AuthHeader from './AuthHeader'
import Login from './Login'
import Verify from './Verify'
import Agreements from './Agreements'
import Register from './Register'

import './Auth.global.scss'

const Auth = () => {
  return (
    <View.Layout>
      <View.Header>
        <AuthHeader />
      </View.Header>
      <View.Body>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/verify" component={Verify} />
        <Route path="/auth/eula" component={Agreements} />
        <Route path="/auth/register" component={Register} />
      </View.Body>
    </View.Layout>
  )
}

export default Auth
