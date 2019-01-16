import React, { Component } from 'react'
import { connect } from 'react-redux'

import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import './profile.scss'

class ProfilePic extends Component {
  render() {
    return (
      <div className="profile-pic">
        <div
          className="pic"
          style={{ backgroundImage: `url(${this.props.avatar})` }}
        >
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

const mapStateToProps = state => {
  return { avatar: state.user.profile.avatar }
}

export default connect(mapStateToProps)(ProfilePic)
