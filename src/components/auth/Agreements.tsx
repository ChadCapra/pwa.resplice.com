import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Flex from '../shared/layout/Flex'
import Card from '../shared/card/Card'
import Button from '../shared/button/Button'
import Ring from '../skeleton/Ring'
import Checkbox from '../shared/form/Checkbox'

import styles from './Auth.module.scss'

// import { createUser } from '../../state/actions'

// type Props = {
//   loading: boolean
//   session: Session | null
//   user: UserProfile | null
//   error: ErrorObj | null
//   createUser: AsyncAction
// }

const Agreements = ({ loading, session, user, createUser }: any) => {
  const [eulaAccepted, setEulaAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  // if (!session) return <Redirect to="/auth/login" />
  // if (!!user) return <Redirect to="/auth/create-profile" />

  return (
    <Flex
      justify="start"
      align="center"
      direction="column"
      style={{ paddingBottom: '24px' }}
    >
      <div className={styles.AuthSubtitles}>
        <p>
          Please agree with our terms of service and security settings below
        </p>
      </div>

      <Card border className={styles.CardOverride}>
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
          <Checkbox checked={eulaAccepted} />
        </Card.Body>
      </Card>

      <Card border className={styles.CardOverride}>
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
          <Checkbox checked={privacyAccepted} />
        </Card.Body>
      </Card>

      <Button
        variant="primary"
        disabled={!eulaAccepted || !privacyAccepted}
        onClick={() =>
          createUser({
            eula_accepted: eulaAccepted,
            privacy_accepted: privacyAccepted
          })
        }
      >
        Accept
      </Button>

      <div id="scroll-anchor" />
    </Flex>
  )
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.authState.loading,
    session: state.authState.session,
    user: state.userState.profile,
    error: state.authState.error
  }
}

export default connect(
  mapStateToProps
  // { createUser }
)(Agreements)
