import React from 'react'
import PropTypes from 'prop-types'

import Identicon from 'react-identicons'

const ContactProfilePic = ({ uuid, avatar }) => {
  return (
    <div className="profile-pic">
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}
      {/* Change to rank icons */}
      {/* <MdUpload color="#1bbc9b" fontSize="2.5em" className="pic-upload-icon" /> */}
    </div>
  )
}

ContactProfilePic.propTypes = {
  uuid: PropTypes.string.isRequired,
  avatar: PropTypes.string
}

export default ContactProfilePic
