import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReButton from '../Buttons/ReButton'

class ReShareCode extends Component {
  render() {
    const { qrCode } = this.props
    return (
      <div className="qr-code">
        <h1 className="qr-code-header">Ask to Scan Code</h1>
        <div
          className="qr-code-container"
          style={{ backgroundImage: `url(${qrCode})` }}
        />
        <ReButton type="primary" text="Download Code" width="300px" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { qrCode: state.user.profile.qrCode }
}

export default connect(mapStateToProps)(ReShareCode)
