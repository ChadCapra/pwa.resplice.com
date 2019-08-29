import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticateSession, clearLogin } from '../../state/actions'

import FlexBox from '../Layout/FlexBox'
import ReInputCode from '../Form/ReInputCode'
import Button from '../Button/Button'

import styles from './Auth.module.scss'

type Props = {
  session: Session | null
  loginValues: LoginValues | null
  loading: boolean
  error: ErrorObj | null
  authenticateSession: AsyncAction
  clearLogin: Action
}

const Verify = ({
  session,
  loginValues,
  loading,
  error,
  authenticateSession,
  clearLogin
}: Props) => {
  const [secondCodeRequired, setSecondCodeRequired] = useState(false)
  if (!session || !loginValues) return <Redirect to="/auth/login" />
  if (session.authorized_at) return <Redirect to="/auth/create-profile" />

  const onCodeComplete = (code: string) => {
    authenticateSession({
      verify_token: code
    })
  }

  const subtitles = (() => {
    const secondAttribute = loginValues.email
    if (secondCodeRequired) {
      return <p>Please verify {secondAttribute}</p>
    }

    return (
      <p>
        Please verify <br />
        {loginValues.phone} or {loginValues.email}
      </p>
    )
  })()

  return (
    <FlexBox
      direction="column"
      justify="start"
      align="center"
      style={{ height: '100%' }}
    >
      <div className={styles.AuthSubtitles}>{subtitles}</div>

      <FlexBox direction="column" justify="center" align="center">
        <ReInputCode
          name="phone_verify_token"
          label={`Verification Code ${secondCodeRequired ? '#2' : '#1'}`}
          onComplete={onCodeComplete}
          loading={loading}
          verified={session.phone_verified_at}
          error={error}
          focus
        />

        <Button
          variant="secondary"
          onClick={clearLogin}
          style={{ marginTop: '15%' }}
        >
          Cancel
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    session: state.authState.session,
    loginValues: state.authState.loginValues,
    loading: state.authState.loading,
    error: state.authState.error
  }
}

export default connect(
  mapStateToProps,
  { authenticateSession, clearLogin }
)(Verify)
