import React, { Component } from 'react'
import { connect } from 'react-redux'

import LogoGoogle from 'react-ionicons/lib/LogoGoogle'
import LogoApple from 'react-ionicons/lib/LogoApple'
import LogoWindows from 'react-ionicons/lib/LogoWindows'

import { importGoogleContacts } from '../../state/actions'

const Google = () => {}
const Apple = () => {}
const Microsoft = () => {}

class ImportContact extends Component {
  static Google = Google
  static Apple = Apple
  static Microsoft = Microsoft

  render() {
    const { children, importGoogleContacts } = this.props

    if (children.type === Google) {
      return (
        <div
          className="flex--center"
          style={{ justifyContent: 'flex-start', padding: '16px' }}
          onClick={importGoogleContacts}
        >
          <LogoGoogle />
          <span>Google/Gmail</span>
        </div>
      )
    } else if (children.type === Apple) {
      return (
        <div
          className="flex--center"
          style={{ justifyContent: 'flex-start', padding: '16px' }}
        >
          <LogoApple />
          <span>iOS</span>
        </div>
      )
    } else if (children.type === Microsoft) {
      return (
        <div
          className="flex--center"
          style={{ justifyContent: 'flex-start', padding: '16px' }}
        >
          <LogoWindows />
          <span>Microsoft/Outlook</span>
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(
  null,
  { importGoogleContacts }
)(ImportContact)
