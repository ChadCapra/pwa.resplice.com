import React, { Component } from 'react'
import { connect } from 'react-redux'
import Identicon from 'react-identicons'

import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import './profile.scss'

class ProfilePic extends Component {
  render() {
    return (
      <div className="profile-pic">
        {this.props.avatar ? (
          <div
            className="pic"
            style={{ backgroundImage: `url(${this.props.avatar})` }}
          />
        ) : (
          <Identicon string={this.props.uuid} size={85} />
        )}
        <MdUpload
          color="#1bbc9b"
          fontSize="2.5em"
          className="pic-upload-icon"
        />
      </div>
    )
  }
}

// return (
//   <div className="profile-pic">
//     {this.props.avatar ? <div
//       className="pic"
//       style={{ backgroundImage: `url(${this.props.avatar})` }}
//     > : <div className="profile-pic">
//     <div className="pic" />
//   </div>}

//       <MdUpload
//         color="#1bbc9b"
//         fontSize="2.5em"
//         className="pic-upload-icon"
//       />
//     </div>
//   </div>
// )

const mapStateToProps = state => {
  return { avatar: state.user.profile.avatar, uuid: state.user.profile.uuid }
}

export default connect(mapStateToProps)(ProfilePic)
