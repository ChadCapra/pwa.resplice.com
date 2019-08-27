import React, { FC, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { verifyAttributes, clearLogin } from '../../state/actions'

import ReAuthHeader from './AuthHeader'
import ReInputCode from '../Form/ReInputCode'
import ReButton from '../Button/ReButton'

interface Props {
  login: Login | null
  verifyAttributes: AsyncAction
  clearLogin: Action
  verified: boolean
  loading: boolean
  verification: Verification | null
}

const ReVerify: FC<Props> = ({
  login,
  verifyAttributes,
  clearLogin,
  verification,
  verified,
  loading
}) => {
  const [tokenOne, setTokenOne] = useState()
  const [tokenTwo, setTokenTwo] = useState()

  if (!login) return <Redirect to="/auth/login" />
  if (verified) return <Redirect to="/auth/create-profile" />

  const onTokenOneComplete = (tokenStr: string) => {
    const token = parseInt(tokenStr)
    setTokenOne(token)
    verifyAttributes({
      login_uuid: login.login_uuid,
      verify_token_1: token,
      verify_token_2: tokenTwo
    })
  }

  const onTokenTwoComplete = (tokenStr: string) => {
    const token = parseInt(tokenStr)
    setTokenTwo(token)
    verifyAttributes({
      login_uuid: login.login_uuid,
      verify_token_1: tokenOne,
      verify_token_2: token
    })
  }

  let tokenOneVerified = false
  let tokenOneError = false
  let tokenTwoVerified = false
  let tokenTwoError = false

  if (verification) {
    tokenOneVerified = verification.token_1_valid
    tokenOneError = tokenOne && !verification.token_1_valid && !loading
    tokenTwoVerified = verification.token_2_valid
    tokenTwoError = tokenTwo && !verification.token_2_valid && !loading
  }

  return (
    <div className="re-verify">
      <ReAuthHeader>
        <h2>Verify</h2>
      </ReAuthHeader>

      <div className="form">
        <p>
          We just need to verify some info!
          <br />
          Please verify your attributes
          <br />
          {login.values.phone} & {login.values.email}
        </p>
        <div className="inputs">
          <ReInputCode
            name="phone_verify_token"
            label="Verification Code #1"
            onComplete={onTokenOneComplete}
            loading={tokenOne && loading && !tokenOneVerified}
            verified={tokenOneVerified}
            error={tokenOneError}
            focus
          />
          <ReInputCode
            name="email_verify_token"
            label="Verification Code #2"
            onComplete={onTokenTwoComplete}
            loading={tokenTwo && loading && !tokenTwoVerified}
            verified={tokenTwoVerified}
            error={tokenTwoError}
          />
        </div>
        <ReButton type="secondary" onClick={clearLogin}>
          Cancel
        </ReButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    login: state.authState.login,
    verification: state.authState.verification,
    verified: state.authState.isVerified,
    loading: state.authState.loading,
    authorized: state.authState.isAuthorized
  }
}

export default connect(
  mapStateToProps,
  { verifyAttributes, clearLogin }
)(ReVerify)
