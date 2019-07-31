import React, { Component } from 'react'

import LogoGoogle from 'react-ionicons/lib/LogoGoogle'
import LogoApple from 'react-ionicons/lib/LogoApple'
import LogoWindows from 'react-ionicons/lib/LogoWindows'

const Google = () => {}
const Apple = () => {}
const Microsoft = () => {}

class ImportContact extends Component {
  static Google = Google
  static Apple = Apple
  static Microsoft = Microsoft

  render() {
    const { children } = this.props

    if (children.type === Google) {
      return (
        <>
          <LogoGoogle />
          <span>Google/Gmail</span>
        </>
      )
    } else if (children.type === Apple) {
      return (
        <>
          <LogoApple />
          <span>iOS</span>
        </>
      )
    } else if (children.type === Microsoft) {
      return (
        <>
          <LogoWindows />
          <span>Microsoft/Outlook</span>
        </>
      )
    } else {
      return null
    }
  }
}

export default ImportContact
