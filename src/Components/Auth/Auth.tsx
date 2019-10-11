import React from 'react'
import { Route } from 'react-router-dom'

import View from '../Layout/View'
import AuthErrorBoundary from './AuthErrorBoundary'
import AuthHeader from './AuthHeader'
import Login from './Login'
import CreateProfile from './CreateProfile'
import Verify from './Verify'
import Agreements from './Agreements'

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
        <AuthErrorBoundary>
          <Route path={`${match.path}/login`} component={Login} />
          <Route path={`${match.path}/verify`} component={Verify} />
          <Route path={`${match.path}/eula`} component={Agreements} />
          <Route
            path={`${match.path}/create-profile`}
            component={CreateProfile}
          />
        </AuthErrorBoundary>
      </View.Body>
    </View>
  )
}

export default Auth
