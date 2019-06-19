import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Identicon from 'react-identicons'
import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import ReModal from '../Modals/ReModal'
import AvatarUpload from './ReAvatarUpload'

import './profile.scss'

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
        <AvatarUpload uuid={uuid} onComplete={() => setShowModal(false)} />
      </ReModal>
    </div>
  )
}

ProfilePic.propTypes = {
  uuid: PropTypes.string.isRequired,
  avatar: PropTypes.string
}

export default ProfilePic
