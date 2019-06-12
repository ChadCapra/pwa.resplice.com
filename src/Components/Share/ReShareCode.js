import React, { Component } from 'react'
import { connect } from 'react-redux'

import MdCamera from 'react-ionicons/lib/MdCamera'
import fakeQR from '../../assets/fakeQR.png'

class ReShareCode extends Component {
  render() {
    // const { qrCode } = this.props
    const pin = 362096
    return (
      <div className="qr-code">
        <div className="qr-camera-btn">
          <MdCamera color="#fff" fontSize="3em" />
          <span>Scan Code</span>
        </div>
        <div
          className="qr-code-container"
          style={{ backgroundImage: `url(${fakeQR})` }}
        />
        <div className="qr-code-pin">{`${pin
          .toString()
          .substring(0, 3)}-${pin.toString().substring(3)}`}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { qrCode: state.userState.profile.qrCode }
}

export default connect(mapStateToProps)(ReShareCode)
