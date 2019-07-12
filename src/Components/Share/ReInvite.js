import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MdCamera from 'react-ionicons/lib/MdCamera'
import fakeQR from '../../assets/fakeQR.png'
import ReShareCamera from './ReShareCamera'
import ReModal from '../Modal/ReModal'
import ReInviteModal from './ReInviteModal'

const CameraFab = ({ onClick }) => {
  return (
    <div className="camera-fab" onClick={onClick}>
      <MdCamera color="#fff" fontSize="3em" />
    </div>
  )
}

const QrLoading = ({ expiry }) => {
  return (
    <div className="qr-outer-loading">
      <div className="qr-inner-loading" />
    </div>
  )
}

/**
 * Share list component to show current share list
 */
const ReInvite = ({ qrCode }) => {
  const [showInvite, setShowInvite] = useState(false)
  const [showCamera, setShowCamera] = useState(false)

  const pin = 362096
  return showCamera ? (
    <ReShareCamera onClose={() => setShowCamera(false)} />
  ) : (
    <div className="re-invite">
      <div className="qr-code">
        <div
          className="qr-code-container"
          style={{ backgroundImage: `url(${fakeQR})` }}
        />
        <h1 className="qr-code-pin">
          {`${pin.toString().substring(0, 3)} ${pin.toString().substring(3)}`}
          <QrLoading />
        </h1>
      </div>

      <div className="invite-attr-link" onClick={() => setShowInvite(true)}>
        Invite via phone or email
      </div>

      <CameraFab onClick={() => setShowCamera(true)} />

      <ReModal
        show={showInvite}
        onClose={() => setShowInvite(false)}
        headerText="Invite"
      >
        <ReInviteModal />
      </ReModal>
    </div>
  )
}

const mapStateToProps = state => {
  return { qrCode: state.userState.profile.qrCode }
}

ReInvite.propTypes = {
  qrCode: PropTypes.string
}

export default connect(mapStateToProps)(ReInvite)
