import React, { Component } from 'react'

import QrReader from 'react-qr-reader'
import ReButton from '../Buttons/ReButton'

export default class ReShareCamera extends Component {
  state = {
    cameraSupported: false,
    startScan: false
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
    if (this.state.cameraSupported && this.state.startScan) {
      return (
        <div className="share-camera">
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100vw' }}
          />
        </div>
      )
    }

    return (
      <div className="share-camera">
        {!this.state.cameraSupported && (
          <h1 className="share-camera-header">
            Your device does not have a camera, you can upload a qr code instead
          </h1>
        )}
        {!this.state.startScan && (
          <ReButton
            type="primary"
            text="Start Scan"
            width="200px"
            onClick={() => this.setState({ startScan: true })}
          />
        )}
      </div>
    )
  }
}
