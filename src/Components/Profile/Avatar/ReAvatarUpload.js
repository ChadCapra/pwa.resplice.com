import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editAvatar } from '../../../state/actions'
import Identicon from 'react-identicons'
import MdCamera from 'react-ionicons/lib/MdCamera'
import MdUpload from 'react-ionicons/lib/MdCloudUpload'

const AvatarUploadModal = ({ uuid, onComplete, editAvatar, uploaded }) => {
  if (uploaded) {
    onComplete()
  }
  const container = useRef()
  const cameraSupported = 'mediaDevices' in navigator

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
      editAvatar(e.target.files[0])
    })
    container.current.appendChild(input)
    input.click()
    container.current.removeChild(input)
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

AvatarUploadModal.propTypes = {
  uuid: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  uploaded: PropTypes.oneOfType([PropTypes.bool, PropTypes.symbol])
}

const mapStateToProps = state => {
  return {
    loading: state.userState.loading,
    uploaded: state.userState.profile.avatarUploaded
  }
}

export default connect(
  mapStateToProps,
  { editAvatar }
)(AvatarUploadModal)
