import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { RespliceState, Session } from '../../store/store'

import styles from './Auth.module.scss'
import Flex from '../shared/layout/Flex'
import InputCode from '../shared/form/InputCode'
import Button from '../shared/button/Button'
import Alert from '../shared/modal/Alert'

import { verifySession } from '../../store/auth/authActions'

type LoginValues = { phone: string; email: string }
type Props = {
  session: Session | null
  loginValues: LoginValues | null
  loading: boolean
  error: string | null
  verifySession: (code: string) => void
}

const Verify = ({
  session,
  loginValues,
  loading,
  error,
  verifySession
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
  if (session.authenticated_at && session.user_registered_at)
    return <Redirect to="/" />
  if (session.authenticated_at) return <Redirect to="/auth/create-profile" />
  if (session.email_verified_at && session.phone_verified_at)
    return <Redirect to="/auth/eula" />

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
      {/* {error && (
        <Alert type="danger" header={error.name} close={clearError}>
          {error.message}
        </Alert>
      )} */}
      <Flex
        direction="column"
        justify="start"
        align="center"
        style={{ height: '100%' }}
      >
        <div className={styles.AuthSubtitles}>{subtitles}</div>

        <Flex direction="column" justify="center" align="center">
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
                label="Verification Code #1"
                loading={loading}
                onComplete={verifySession}
              />
            </animated.div>
          )}
          <Button
            variant="secondary"
            loading={loading}
            // onClick={clearLogin}
            style={{ marginTop: '15%' }}
          >
            {loading ? 'Verifying' : 'Cancel'}
          </Button>
        </Flex>
      </Flex>
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

export default connect(mapStateToProps, {
  verifySession
})(Verify)
