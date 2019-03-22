import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions'

import ComingSoon from '../Util/ComingSoon'
import ReButton from '../Buttons/ReButton'

class ReUserSettings extends Component {
  render() {
    return (
      <div className="user-settings">
        <ComingSoon name="Settings" />
        <ReButton type="primary" text="Logout" onClick={this.props.logout} />
      </div>
    )
  }
}

export default connect(
  null,
  { logout }
)(ReUserSettings)
