import React, { useState, useEffect, useRef } from 'react'

import styles from './Devices.module.scss'

import MdCamera from 'react-ionicons/lib/MdCamera'

const Camera = () => {
  const [error, setError] = useState(null)
  const [facingMode, setFacingMode] = useState('user')
  const stream = useRef<HTMLVideoElement>(null)
  const cameraSupported = 'mediaDevices' in navigator

  const initCamera = async () => {
    try {
      const video = await navigator.mediaDevices.getUserMedia({
        video: { height: { ideal: 1280 }, width: { ideal: 720 }, facingMode },
        audio: false
      })
      if (stream && stream.current) {
        stream.current.srcObject = video
        stream.current.play()
      }
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    if (cameraSupported) initCamera()
  }, [])

  return (
    <div className={styles.CameraContainer}>
      <video ref={stream} playsInline autoPlay />

      <div className={styles.CameraControls}>
        <MdCamera />
      </div>
    </div>
  )
}

export default Camera
