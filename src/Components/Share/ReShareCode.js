import React, { Component } from 'react'
import { connect } from 'react-redux'

import AttributeCardList from '../Cards/AttributeCardList'
import AttributeSelectCard from '../Cards/AttributeSelectCard'

class ReShareCode extends Component {
  render() {
    const { qrCode } = this.props
    const pin = 362096
    return (
      <div className="qr-code">
        <h1 className="qr-code-header">Ask to Scan Code</h1>
        <div
          className="qr-code-container"
          style={{ backgroundImage: `url(${qrCode})` }}
        />
        <div className="qr-code-pin">{`${pin
          .toString()
          .substring(0, 3)}-${pin.toString().substring(3)}`}</div>
        <h1 className="qr-code-header">Auto Share Attributes</h1>
        <AttributeCardList user ListComponent={AttributeSelectCard} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { qrCode: state.userState.profile.qrCode }
}

export default connect(mapStateToProps)(ReShareCode)
