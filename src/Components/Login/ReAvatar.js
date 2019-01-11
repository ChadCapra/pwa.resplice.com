import React, { Component } from 'react'

import './login.scss'

class ReAvatar extends Component {
  renderHeader() {
    return (
      <div className="login-header">
        <h1>
          Profile
          <br />
          Picture
        </h1>
      </div>
    )
  }

  render() {
    return (
      <div className="login-avatar">
        {this.renderHeader()}
        <p>
          Adding a profile picture will make it easier for people to recognize
          you!
        </p>
      </div>
    )
  }
}

export default ReAvatar
