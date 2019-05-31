import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Identicon from 'react-identicons'

import ReModal from '../Modals/ReModal'
import MdUpload from 'react-ionicons/lib/MdCloudUpload'
import MdCamera from 'react-ionicons/lib/MdCamera'

import './profile.scss'

const AvatarUploadModal = ({ uuid }) => {
  const container = useRef()
  const [cameraSupported] = useState('mediaDevices' in navigator)

  const openCamera = () => {
    if (!cameraSupported) {
      return
    }

    // const player = document.getElementById('player');
    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext('2d');
    // const captureButton = document.getElementById('capture');

    navigator.mediaDevices.getUserMedia({ video: true })

    // Stop all video streams.
    // player.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  const uploadFile = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('hidden', '')
    input.addEventListener('change', e => {
      console.log(e.target.files)
    })
    container.current.appendChild(input)
    input.click()
    container.current.removeChild(input)
    console.log(input)
  }

  return (
    <div className="avatar-upload-container" ref={container}>
      <h3 className="avatar-upload-header">
        Adding a profile picture will help people recognize you!
      </h3>
      <div className="upload-option" onClick={openCamera}>
        <div className="upload-option-icon">
          <MdCamera color="#fff" fontSize="2.5em" />
        </div>
        {cameraSupported ? (
          <p>Take a selfie</p>
        ) : (
          <p style={{ color: 'red' }}>Camera not support on this device</p>
        )}
      </div>

      <div className="upload-option" onClick={uploadFile}>
        <div className="upload-option-icon">
          <MdUpload color="#fff" fontSize="2.5em" />
        </div>
        <p>Upload a picture</p>
      </div>

      <div className="upload-option">
        <div className="upload-option-icon">
          <Identicon string={uuid} size={40} fontSize="2.5em" />
        </div>
        <p>Use the identicon</p>
      </div>
    </div>
  )
}

const ProfilePic = ({ uuid, avatar }) => {
  const [showAvatarModal, setShowModal] = useState(false)

  return (
    <div className="profile-pic" onClick={() => setShowModal(true)}>
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}
      <MdUpload color="#1bbc9b" fontSize="2.5em" className="pic-upload-icon" />

      <ReModal
        show={showAvatarModal}
        headerText="Upload"
        onClose={() => setShowModal(false)}
      >
        <AvatarUploadModal uuid={uuid} />
      </ReModal>
    </div>
  )
}

ProfilePic.propTypes = {
  uuid: PropTypes.string.isRequired,
  avatar: PropTypes.string
}

export default ProfilePic
