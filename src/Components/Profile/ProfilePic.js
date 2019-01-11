import React, { Component } from 'react'

import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import './profile.scss'

export default class ProfilePic extends Component {
  state = {
    user: {
      avatarUrl: ''
    }
  }

  render() {
    return (
      <div className="profile-pic">
        <div className="pic">
          <MdUpload
            color="#1bbc9b"
            fontSize="2.5rem"
            className="pic-upload-icon"
          />
        </div>
      </div>
    )
  }
}
