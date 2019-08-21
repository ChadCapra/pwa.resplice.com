import React, { useState, useEffect } from 'react'
import { mockApi } from '../../api'
import { differenceInMilliseconds, addMinutes } from 'date-fns'

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
const Invite = () => {
  const [showInvite, setShowInvite] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [timerPercentage, setTimerPercentage] = useState(100)

  const fetchQrCode = async () => {
    const response = await mockApi.post('/user/generate_qr_pin')
    setQrCode(response.data.ok.qr_pin)
  }

  const startQrCode = () => {
    fetchQrCode()

    // Replace with qr_pin_expiry when api is done
    const nowPlusFive = addMinutes(new Date(), 1)
    const millisecondsBeforeRefresh = differenceInMilliseconds(
      nowPlusFive,
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
      clearInterval(timers.fetchTimer)
      clearInterval(timers.percentTimer)
    }
  }, [])

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
    </>
  )
}

export default Invite
