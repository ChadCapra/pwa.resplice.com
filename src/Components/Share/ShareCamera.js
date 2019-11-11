import React, { useState, useEffect } from 'react'
import qs from 'query-string'

import QrReader from 'react-qr-reader'
import ReButton from '../Button/ReButton'
import FlexBox from '../Layout/FlexBox'

const ShareCamera = ({ onScan, onClose }) => {
  const [cameraSupported, setCameraSupported] = useState(false)

  useEffect(() => {
    setCameraSupported('mediaDevices' in navigator)
  }, [])

  const handleScan = url => {
    if (url) {
      const { query } = qs.parseUrl(url)
      onScan(query.contact)
    }
  }

  const handleError = err => {
    console.log(err)
  }

  if (cameraSupported) {
    return (
      <FlexBox
        direction="column"
        justify="center"
        align="center"
        style={{ width: '100%', height: '100%', padding: '0' }}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%', maxWidth: '575px' }}
        />
        <ReButton
          type="primary"
          onClick={onClose}
          style={{ marginTop: '25px' }}
        >
          Show QR Code
        </ReButton>
      </FlexBox>
    )
  } else {
    return (
      <FlexBox justify="center" align="center">
        QR Code scanning not supported, either your device doesn't have a camera
        or you denied us access. You can still start a relationship by inviting
        with a phone number or an email.
      </FlexBox>
    )
  }
}

export default ShareCamera
