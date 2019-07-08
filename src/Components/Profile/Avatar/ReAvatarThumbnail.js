import React from 'react'
import PropTypes from 'prop-types'
import Identicon from 'react-identicons'

import './profile.scss'

const ReAvatar = ({ avatar, uuid, ...props }) => {
  if (avatar) {
    return (
      <div
        className="avatar"
        style={{ backgroundImage: `url(${avatar})` }}
        {...props}
      />
    )
  } else {
    return (
      <div className="avatar" {...props}>
        <Identicon string={uuid} size={30} />
      </div>
    )
  }
}

ReAvatar.propTypes = {
  avatar: PropTypes.string,
  uuid: PropTypes.string.isRequired
}

export default ReAvatar
