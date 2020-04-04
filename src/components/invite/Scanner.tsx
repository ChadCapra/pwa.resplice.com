import React, { useState, useEffect, useRef } from 'react'
import jsqr from 'jsqr'

const Scanner = () => {
  const [cameraError, setCameraError] = useState('')
  const stream = useRef<HTMLVideoElement>(null)
  const cameraSupported = 'mediaDevices' in navigator

  const initCamera = async () => {
    try {
      if (stream && stream.current) {
        const video = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment'
          },
          audio: false
        })
        stream.current.srcObject = video
        stream.current.play()
      }
    } catch (err) {
      setCameraError(err)
    }
  }
  const stopStream = () => {
    if (stream.current && stream.current.srcObject) {
      const player = stream.current.srcObject as MediaStream
      player.getVideoTracks().forEach(track => track.stop())
    }
  }

  useEffect(() => {
    if (cameraSupported) initCamera()
    else setCameraError('Camera not supported')
    return () => {
      stopStream()
    }
    // eslint-disable-next-line
  }, [])

  return cameraError ? (
    <p>cameraError</p>
  ) : (
    <video
      ref={stream}
      playsInline
      autoPlay
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      }}
    />
  )
}

export default Scanner
