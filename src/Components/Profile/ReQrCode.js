import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import fakeQR from '../../assets/fakeQR.png'

const QrLoading = ({ expiry }) => {
  return (
    <div className="qr-outer-loading">
      <div className="qr-inner-loading" />
    </div>
  )
}

const ReQrCode = ({ uuid, qrCode = fakeQR, qrPin = '236634' }) => {
  return (
    <div className="qr-code">
      <div
        className="qr-code-container"
        style={{ backgroundImage: `url(${qrCode})` }}
      />
      <h1 className="qr-code-pin">
        {`${qrPin.substring(0, 3)} ${qrPin.substring(3)}`}
        <QrLoading />
      </h1>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let profile = null
  if (ownProps.uuid) {
    profile = state.groupState.groups[ownProps.uuid]
  } else {
    profile = state.userState.profile
  }
  return {
    qrCode: profile.qr_code,
    qrPin: profile.qr_pin
  }
}

ReQrCode.propTypes = {
  uuid: PropTypes.string,
  qrCode: PropTypes.string,
  pin: PropTypes.string
}

export default connect(mapStateToProps)(ReQrCode)
