import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import FlexBox from '../Layout/FlexBox'
import Card from '../Card/Card'
import Button from '../Button/Button'
import Ring from '../Loading/Ring'
import Checkbox from '../Form/Checkbox'

import styles from './Auth.module.scss'

import { createUser } from '../../state/actions'

type Props = {
  loading: boolean
  session: Session | null
  user: UserProfile | null
  error: ErrorObj | null
  createUser: AsyncAction
}

const Agreements = ({ loading, session, user, createUser }: Props) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  const [fetchingPosition, setFetchingPosition] = useState(false)
  const [eulaAccepted, setEulaAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  if (!session) return <Redirect to="/auth/login" />
  if (!!user) return <Redirect to="/auth/create-profile" />

  const handleGeoError = (err: PositionError) => {
    console.log(err)
    setFetchingPosition(false)
  }

  const getLocation = () => {
    if (!currentPosition && 'geolocation' in navigator) {
      setFetchingPosition(true)
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log(pos)
          setCurrentPosition(pos)
          setFetchingPosition(false)
        },
        handleGeoError,
        { enableHighAccuracy: false }
      )
    }
  }

  const renderCheckbox = () => {
    if (fetchingPosition) return <Ring />
    return <Checkbox checked={!!currentPosition} />
  }

  return (
    <FlexBox
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

      <Card border className={styles.CardOverride}>
        <Card.Header className={styles.CardHeaderOverride}>
          <h1>Location-based Security</h1>
          <p>Protect my account even more by allowing access to my location</p>
        </Card.Header>
        <Card.Body className={styles.CardBodyOverride} onClick={getLocation}>
          <span>Allow access to my location</span>
          {renderCheckbox()}
        </Card.Body>
      </Card>

      <Button
        variant="primary"
        disabled={!eulaAccepted || !privacyAccepted}
        onClick={() =>
          createUser({
            eula_accepted: eulaAccepted,
            privacy_accepted: privacyAccepted,
            location_enabled: !!currentPosition
          })
        }
      >
        Accept
      </Button>
    </FlexBox>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    loading: state.authState.loading,
    session: state.authState.session,
    user: state.userState.profile,
    error: state.authState.error
  }
}

export default connect(
  mapStateToProps,
  { createUser }
)(Agreements)
