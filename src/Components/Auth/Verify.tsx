import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'

import styles from './Auth.module.scss'
import FlexBox from '../Layout/FlexBox'
import InputCode from '../Form/InputCode'
import Button from '../Button/Button'
import Alert from '../Modal/Alert'

import { verifySession, clearLogin, clearError } from '../../state/actions'

type Props = {
  session: Session | null
  loginValues: LoginValues | null
  loading: boolean
  error: ErrorObj | null
  verifySession: AsyncAction
  clearLogin: Action
  clearError: Action
}

const Verify = ({
  session,
  loginValues,
  loading,
  error,
  verifySession,
  clearLogin,
  clearError
}: Props) => {
  const [secondCodeRequired, setSecondCodeRequired] = useState(false)
  const animation = useSpring({
    from: { transform: 'translate(-350px)' },
    to: { transform: 'translate(0)' },
    config: { tension: 215 },
    reset: secondCodeRequired
  })

  const { phone_verified_at = '', email_verified_at = '' } = session || {}

  useEffect(() => {
    if (phone_verified_at || email_verified_at) {
      setSecondCodeRequired(true)
    }
  }, [session, phone_verified_at, email_verified_at])

  if (!session || !loginValues) return <Redirect to="/auth/login" />
  if (session.authenticated_at && session.profile_complete)
    return <Redirect to="/" />
  if (session.authenticated_at) return <Redirect to="/auth/eula" />

  const subtitles = (() => {
    if (secondCodeRequired) {
      const secondAttribute = phone_verified_at
        ? loginValues.email
        : loginValues.phone
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
    <>
      {error && (
        <Alert type="danger" header={error.name} close={clearError}>
          {error.message}
        </Alert>
      )}
      <FlexBox
        direction="column"
        justify="start"
        align="center"
        style={{ height: '100%' }}
      >
        <div className={styles.AuthSubtitles}>{subtitles}</div>

        <FlexBox direction="column" justify="center" align="center">
          {secondCodeRequired ? (
            <animated.div key="code2" style={animation}>
              <InputCode
                length={6}
                label="Verification Code #2"
                loading={loading}
                onComplete={verifySession}
              />
            </animated.div>
          ) : (
            <animated.div key="code1" style={animation}>
              <InputCode
                length={6}
                label={`Verification Code ${secondCodeRequired ? '#2' : '#1'}`}
                loading={loading}
                onComplete={verifySession}
              />
            </animated.div>
          )}
          <Button
            variant="secondary"
            loading={loading}
            onClick={clearLogin}
            style={{ marginTop: '15%' }}
          >
            {loading ? 'Verifying' : 'Cancel'}
          </Button>
        </FlexBox>
      </FlexBox>
    </>
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
  { verifySession, clearLogin, clearError }
)(Verify)
