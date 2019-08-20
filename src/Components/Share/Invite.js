import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MdCamera from 'react-ionicons/lib/MdCamera'
import fakeQR from '../../assets/fakeQR.png'
import ReShareCamera from './ReShareCamera'
import ReModal from '../Modal/ReModal'
import ReInviteModal from './ReInviteModal'
import FlexBox from '../Layout/FlexBox'

import styles from './Share.module.scss'

const CameraFab = ({ onClick }) => {
  return (
    <div className={styles.CameraFAB} onClick={onClick}>
      <MdCamera color="#fff" fontSize="3em" />
    </div>
  )
}

const QrCountdown = ({ expiry }) => {
  return (
    <div className={styles.QrCountdownOuter}>
      <div className={styles.QrCountdownInner} />
    </div>
  )
}

/**
 * Share list component to show current share list
 */
const Invite = ({ qrCode }) => {
  const [showInvite, setShowInvite] = useState(false)
  const [showCamera, setShowCamera] = useState(false)

  const pin = 362096
  return showCamera ? (
    <ReShareCamera onClose={() => setShowCamera(false)} />
  ) : (
    <>
      <FlexBox fill direction="column" style={{ postion: 'relative' }}>
        <FlexBox direction="column" justify="center" align="center">
          <div
            className={styles.QrCodeContainer}
            style={{ backgroundImage: `url(${fakeQR})` }}
          />
          <h1 className={styles.QrCodePin}>
            {`${pin.toString().substring(0, 3)} ${pin.toString().substring(3)}`}
            <QrCountdown />
          </h1>
        </FlexBox>

        <span className={styles.InviteLink} onClick={() => setShowInvite(true)}>
          Invite via phone or email
        </span>

        <CameraFab onClick={() => setShowCamera(true)} />
      </FlexBox>

      <ReModal
        show={showInvite}
        onClose={() => setShowInvite(false)}
        headerText="Invite"
      >
        <ReInviteModal onInvite={() => setShowInvite(false)} />
      </ReModal>
    </>
  )
}

const mapStateToProps = state => {
  return { qrCode: state.userState.profile.qrCode }
}

Invite.propTypes = {
  qrCode: PropTypes.string
}

export default connect(mapStateToProps)(Invite)
