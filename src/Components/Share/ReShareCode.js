import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MdCamera from 'react-ionicons/lib/MdCamera'
import fakeQR from '../../assets/fakeQR.png'
import ReShareCamera from './ReShareCamera'

const ReShareCode = ({ qrCode }) => {
  const [showCamera, setShowCamera] = useState(false)

  const pin = 362096
  return showCamera ? (
    <ReShareCamera onClose={() => setShowCamera(false)} />
  ) : (
    <div className="qr-code">
      <div className="qr-camera-btn" onClick={() => setShowCamera(true)}>
        <MdCamera color="#fff" fontSize="3em" />
        <span>Scan Code</span>
      </div>
      <div
        className="qr-code-container"
        style={{ backgroundImage: `url(${fakeQR})` }}
      />
      <h1 className="qr-code-pin">
        {`${pin.toString().substring(0, 3)}-${pin.toString().substring(3)}`}
      </h1>
    </div>
  )
}

const mapStateToProps = state => {
  return { qrCode: state.userState.profile.qrCode }
}

ReShareCode.propTypes = {
  qrCode: PropTypes.string
}

export default connect(mapStateToProps)(ReShareCode)
