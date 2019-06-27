import React from 'react'
import PropTypes from 'prop-types'

import Identicon from 'react-identicons'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

const ContactProfilePic = ({ uuid, avatar }) => {
  return (
    <div className="profile-pic">
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}
      {/* Change to rank icons */}
      <Shield className="pic-upload-icon" />
    </div>
  )
}

ContactProfilePic.propTypes = {
  uuid: PropTypes.string.isRequired,
  avatar: PropTypes.string
}

export default ContactProfilePic
