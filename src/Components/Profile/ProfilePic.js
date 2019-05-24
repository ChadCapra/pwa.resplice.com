import React from 'react'
import PropTypes from 'prop-types'
import Identicon from 'react-identicons'

import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import './profile.scss'

const ProfilePic = ({ uuid, avatar }) => {
  return (
    <div className="profile-pic">
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}
      <MdUpload color="#1bbc9b" fontSize="2.5em" className="pic-upload-icon" />
    </div>
  )
}

ProfilePic.propTypes = {
  uuid: PropTypes.string.isRequired,
  avatar: PropTypes.string
}

export default ProfilePic
