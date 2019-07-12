import React, { Component } from 'react'

import QrReader from 'react-qr-reader'
import ReButton from '../Button/ReButton'

export default class ReShareCamera extends Component {
  state = {
    cameraSupported: false
  }

  componentDidMount() {
    this.setState({ cameraSupported: 'mediaDevices' in navigator })
  }

  handleScan = data => {
    if (data) {
      console.log(data)
    }
  }

  handleError = err => {
    console.log(err)
  }

  render() {
    if (this.state.cameraSupported) {
      return (
        <div className="share-camera">
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%', maxWidth: '575px' }}
          />
          <ReButton
            type="primary"
            onClick={this.props.onClose}
            style={{ marginTop: '25px' }}
          >
            Show QR Code
          </ReButton>
        </div>
      )
    } else {
      return (
        <div className="share-camera">
          <h1 className="share-camera-header">
            QR Code scanning not supported, either your device doesn't have a
            camera or you denied us access. You can still start a relationship
            by inviting with a phone number or an email.
          </h1>
        </div>
      )
    }
  }
}
