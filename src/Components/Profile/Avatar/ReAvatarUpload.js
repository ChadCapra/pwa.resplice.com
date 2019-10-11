import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import Identicon from 'react-identicons'
import MdCamera from 'react-ionicons/lib/MdCamera'
import MdUpload from 'react-ionicons/lib/MdCloudUpload'
import ReCropper from '../../Util/ReCropper'
import Button from '../../Button/Button'

const AvatarUploadModal = ({ uuid, onComplete, editAvatar }) => {
  const [imgData, setImgData] = useState(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const container = useRef(null)
  const player = useRef(null)
  const cameraSupported = 'mediaDevices' in navigator

  useEffect(() => {
    if (cameraOpen) {
      const openCamera = async () => {
        if (!cameraSupported) {
          return
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          })
          player.current.srcObject = stream
          player.current.play()
        } catch (err) {
          console.log(err)
        }
      }
      openCamera()
    }
  }, [cameraOpen, cameraSupported])

  const takePicture = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const { height, width } = player.current.getBoundingClientRect()
    canvas.height = height
    canvas.width = width
    context.drawImage(player.current, 0, 0, width, height)
    canvas.toBlob(blob => setImgData(blob))
    // Stop all video streams.
    player.current.srcObject.getVideoTracks().forEach(track => track.stop())
  }

  const uploadFile = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('hidden', '')
    input.setAttribute('style', 'display: none')
    input.addEventListener(
      'change',
      e => {
        e.preventDefault()
        setImgData(e.target.files[0])
      },
      false
    )
    container.current.appendChild(input)
    input.click()
    container.current.removeChild(input)
  }

  const onCrop = async blob => {
    try {
      await editAvatar(blob)
      onComplete()
    } catch (err) {
      console.log(err)
    }
  }

  if (imgData) return <ReCropper img={imgData} onCrop={onCrop} />

  if (cameraOpen) {
    return (
      <div className="flex-col--center camera ">
        <video
          ref={player}
          id="player"
          onCanPlay={() => {
            player.current.setAttribute('width', '100%')
            player.current.setAttribute('height', '100%')
          }}
        >
          Camera Stream not available
        </video>
        <Button
          style={{ position: 'absolute', bottom: '10px' }}
          variant="primary"
          onClick={takePicture}
        >
          Take Photo
        </Button>
      </div>
    )
  }

  return (
    <div className="avatar-upload-container">
      <h3 className="avatar-upload-header">
        Adding a profile picture will help people recognize you!
      </h3>
      <div
        className="upload-option"
        onClick={cameraSupported ? () => setCameraOpen(true) : null}
      >
        <div className="upload-option-icon">
          <MdCamera color="#fff" fontSize="2.5em" />
        </div>
        {cameraSupported ? (
          <p>Take a selfie</p>
        ) : (
          <p style={{ color: 'red' }}>Camera not support on this device</p>
        )}
      </div>

      <div className="upload-option" ref={container}>
        <div className="upload-option-icon" onClick={e => uploadFile()}>
          <MdUpload color="#fff" fontSize="2.5em" />
        </div>
        <p>Upload a picture</p>
      </div>

      <div className="upload-option">
        <div
          className="upload-option-icon"
          onClick={async () => {
            await editAvatar('')
            onComplete()
          }}
        >
          <Identicon string={uuid} size={40} fontSize="2.5em" />
        </div>
        <p>Use your identicon</p>
      </div>
    </div>
  )
}

AvatarUploadModal.propTypes = {
  uuid: PropTypes.string.isRequired,
  editAvatar: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
}

export default AvatarUploadModal
