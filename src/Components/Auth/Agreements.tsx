import React, { useState, useEffect } from 'react'

import FlexBox from '../Layout/FlexBox'
import Card from '../Card/Card'
import Button from '../Button/Button'
import Ring from '../Loading/Ring'

import styles from './Auth.module.scss'

const Agreements = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  const [fetchingPosition, setFetchingPosition] = useState(false)

  const handleGeoError = (err: any) => {
    console.log(err)
    setFetchingPosition(false)
  }

  const getLocation = () => {
    if (!currentPosition && 'geolocation' in navigator) {
      setFetchingPosition(true)
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCurrentPosition(pos)
          setFetchingPosition(false)
        },
        handleGeoError,
        { enableHighAccuracy: false }
      )
    }
  }

  const renderLocationCardText = () => {
    if (fetchingPosition) return <Ring />
    else if (currentPosition)
      return <span style={{ color: '#32393d' }}>Allowed</span>
    else return <span style={{ color: '#1bbc9b' }}>Allow Access</span>
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
          <h1 style={{ color: '#4F4F4F' }}>EULA Agreement</h1>
          <p>
            EULA Agreement goes here... and says a bunch of stuff that sounds
            legit, but probably isn’t.
          </p>
        </Card.Header>
        <Card.Body className={styles.CardBodyOverride}>
          <span style={{ color: '#1bbc9b' }}>Read More</span>
        </Card.Body>
      </Card>

      <Card border className={styles.CardOverride}>
        <Card.Header className={styles.CardHeaderOverride}>
          <h1 style={{ color: '#4F4F4F' }}>Location-based Security</h1>
          <p>Protect my account even more by allowing access to my location</p>
        </Card.Header>
        <Card.Body className={styles.CardBodyOverride} onClick={getLocation}>
          {renderLocationCardText()}
        </Card.Body>
      </Card>

      <Button variant="primary">Accept EULA</Button>
    </FlexBox>
  )
}

export default Agreements
