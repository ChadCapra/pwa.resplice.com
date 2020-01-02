import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import styles from './Devices.module.scss'

import MdCamera from 'react-ionicons/lib/MdCamera'
import MdReverseCamera from 'react-ionicons/lib/MdReverseCamera'
import MdClose from 'react-ionicons/lib/MdClose'

type Props = {
  onShot: (image: Blob | null) => void
  onClose: () => void
}

const Camera = ({ onShot, onClose }: Props) => {
  const [, setError] = useState(null)
  const [facingMode, setFacingMode] = useState('user')
  const stream = useRef<HTMLVideoElement>(null)
  const cameraSupported = 'mediaDevices' in navigator

  const toggleFacingMode = () => {
    if (facingMode === 'user') setFacingMode('environment')
    if (facingMode === 'environment') setFacingMode('user')
  }

  const initCamera = async () => {
    try {
      const video = await navigator.mediaDevices.getUserMedia({
        video: {
          height: { ideal: window.screen.height },
          width: { ideal: window.screen.width },
          facingMode
        },
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
  const stopStream = () => {
    if (stream.current && stream.current.srcObject) {
      const player: any = stream.current.srcObject
      player.getVideoTracks().forEach((track: any) => track.stop())
    }
  }
  const takePicture = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const { height, width } = stream.current!.getBoundingClientRect()
    canvas.height = height
    canvas.width = width
    context!.drawImage(stream.current!, 0, 0, width, height)
    canvas.toBlob(blob => onShot(blob))
    // Play snap sound
    onClose()
  }

  useEffect(() => {
    if (cameraSupported) initCamera()
    return () => {
      stopStream()
    }
    // eslint-disable-next-line
  }, [])

  return ReactDOM.createPortal(
    <div className={styles.CameraContainer}>
      <video ref={stream} playsInline autoPlay />

      <div className={styles.CameraControls}>
        <button className={styles.CameraControlButton}>
          <MdReverseCamera
            color="white"
            fontSize="2.5em"
            onClick={toggleFacingMode}
          />
        </button>
        <button className={styles.CameraControlButton} onClick={takePicture}>
          <MdCamera color="white" fontSize="2.5em" />
        </button>
        <button className={styles.CameraControlButton} onClick={onClose}>
          <MdClose color="white" fontSize="2.5em" />
        </button>
      </div>
    </div>,
    document.querySelector('#camera-root')!
  )
}

export default Camera
