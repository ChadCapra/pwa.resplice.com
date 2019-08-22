import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import api from '../../api'
import { differenceInMilliseconds } from 'date-fns'

import MdCamera from 'react-ionicons/lib/MdCamera'
import QRCode from 'react-qr-code'
import ShareCamera from './ShareCamera'
import ReModal from '../Modal/ReModal'
import ReInviteModal from './ReInviteModal'
import QrCodeUnlock from './QrCodeUnlock'
import FlexBox from '../Layout/FlexBox'

import styles from './Share.module.scss'

const CameraFab = ({ onClick }) => {
  return (
    <div className={styles.CameraFAB} onClick={onClick}>
      <MdCamera color="#fff" fontSize="3em" />
    </div>
  )
}

const QrCountdown = ({ timerPercentage }) => {
  return (
    <div className={styles.QrCountdownOuter}>
      <div
        className={styles.QrCountdownInner}
        style={{ width: `${timerPercentage}%` }}
      />
    </div>
  )
}

/**
 * Share list component to show current share list
 */
const Invite = ({ params, uuid }) => {
  const [showInvite, setShowInvite] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [showUnlock, setShowUnlock] = useState(params.contact ? true : false)
  const [scannedUuid, setScannedUuid] = useState(params.contact)
  const [qrCode, setQrCode] = useState('')
  const [timerPercentage, setTimerPercentage] = useState(100)

  const fetchQrCode = async () => {
    const response = await api.post('/user/generate_qr_pin')
    setQrCode(response.data.ok.qr_pin)
    return response.data.ok.qr_pin_expiry
  }

  const startQrCode = async () => {
    const qrExpiry = await fetchQrCode()
    const millisecondsBeforeRefresh = differenceInMilliseconds(
      new Date(qrExpiry),
      new Date()
    )

    const timers = {
      percentTimer: startTimer(millisecondsBeforeRefresh),
      fetchTimer: null
    }

    timers.fetchTimer = setInterval(() => {
      clearInterval(timers.percentTimer)
      setTimerPercentage(100)
      fetchQrCode()
      timers.percentTimer = startTimer(millisecondsBeforeRefresh)
    }, millisecondsBeforeRefresh)

    return timers
  }

  const startTimer = millisecondsBeforeRefresh => {
    const interval = millisecondsBeforeRefresh / 100
    return setInterval(() => {
      setTimerPercentage(timerPercentage => timerPercentage - 1)
    }, interval)
  }

  useEffect(() => {
    const timers = startQrCode()
    return () => {
      // This may introduce memory leaks despite the cleanup effort below
      clearInterval(timers.fetchTimer)
      clearInterval(timers.percentTimer)
    }
    // eslint-disable-next-line
  }, [])

  return showCamera ? (
    <ShareCamera
      onScan={uuid => {
        setShowCamera(false)
        setScannedUuid(uuid)
        setShowUnlock(true)
      }}
      onClose={() => setShowCamera(false)}
    />
  ) : (
    <>
      <FlexBox
        fill
        direction="column"
        style={{ postion: 'relative', padding: '16px 0' }}
      >
        <FlexBox direction="column" justify="center" align="center">
          <QRCode
            value={`https://app.resplice.com/invite?contact=${uuid}`}
            size={300}
          />
          <h1 className={styles.QrCodePin}>
            {qrCode
              ? `${qrCode
                  .toString()
                  .substring(0, 3)} ${qrCode.toString().substring(3)}`
              : '000 000'}
            <QrCountdown timerPercentage={timerPercentage} />
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

      <ReModal
        show={showUnlock}
        headerText="Unlock Contact"
        onClose={() => setShowUnlock(false)}
      >
        <QrCodeUnlock uuid={scannedUuid} />
      </ReModal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    uuid: state.userState.profile.uuid
  }
}

export default connect(mapStateToProps)(Invite)
