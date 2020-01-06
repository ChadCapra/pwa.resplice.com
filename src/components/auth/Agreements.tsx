import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { acceptEula } from '../../store/auth/authActions'
import { RespliceState, Session } from '../../store/store'

import Flex from '../shared/layout/Flex'
import Card from '../shared/card/Card'
import Button from '../shared/button/Button'
import Checkbox from '../shared/form/Checkbox'

import styles from './Auth.module.scss'

type Props = {
  session: Session | null
  loading: boolean
  error: Dictionary<any> | null
  acceptEula: (locale: string) => Promise<void>
}

const Agreements = ({ session, loading, error, acceptEula }: Props) => {
  const [eulaAccepted, setEulaAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  if (!session) return <Redirect to="/auth/login" />
  if (!!session.user_uuid) return <Redirect to="/auth/register" />

  return (
    <Flex
      justify="start"
      align="center"
      direction="column"
      fill
      style={{ paddingBottom: '24px' }}
    >
      <div className={styles.AuthSubtitles}>
        <p>
          Please agree with our terms of service and security settings below
        </p>
      </div>

      <Card.Container className={styles.CardOverride}>
        <Card.Header className={styles.CardHeaderOverride}>
          <h1>EULA Agreement</h1>
          <p>
            EULA Agreement goes here... and says a bunch of stuff that sounds
            legit, but probably isn’t.
          </p>
          <p className={styles.CardCaption}>Read More</p>
        </Card.Header>
        <Card.Body
          className={styles.CardBodyOverride}
          onClick={() => setEulaAccepted(!eulaAccepted)}
        >
          <span>I agree to the terms</span>
          <Checkbox name="eula" checked={eulaAccepted} />
        </Card.Body>
      </Card.Container>

      <Card.Container className={styles.CardOverride}>
        <Card.Header className={styles.CardHeaderOverride}>
          <h1>Privacy Policy</h1>
          <p>Here lies the Resplice Privacy Policy</p>
          <p className={styles.CardCaption}>Read More</p>
        </Card.Header>
        <Card.Body
          className={styles.CardBodyOverride}
          onClick={() => setPrivacyAccepted(!privacyAccepted)}
        >
          <span>I agree to the terms</span>
          <Checkbox name="privacy" checked={privacyAccepted} />
        </Card.Body>
      </Card.Container>

      <Button
        variant="primary"
        disabled={!eulaAccepted || !privacyAccepted}
        loading={loading}
        onClick={() => acceptEula('en')}
      >
        Accept
      </Button>

      <div id="scroll-anchor" />
    </Flex>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    session: state.authState.session,
    loading: state.authState.loading,
    error: state.authState.error
  }
}

export default connect(mapStateToProps, { acceptEula })(Agreements)
