import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions'

import MdArrowDropright from 'react-ionicons/lib/MdArrowDropright'

class ReUserSettings extends Component {
  render() {
    return (
      <div className="re-user-settings">
        <div className="settings-group">
          <h1 className="settings-header">General</h1>
          <div className="setting">
            <span className="setting-text">App Notifications</span>
            <div className="setting-switch">
              <div className="setting-switch-inner" />
            </div>
          </div>
          <div className="setting">
            <span className="setting-text">Language</span>
            <div className="setting-switch">
              <div className="setting-switch-inner" />
            </div>
          </div>
        </div>
        {/* <div className="settings-group">
          <h1 className="settings-header">Appearance</h1>
          <div className="setting">
            <span className="setting-text">Dark Mode</span>
            <div className="setting-switch">
              <div className="setting-switch-inner" />
            </div>
          </div>
          <div className="setting">
            <span className="setting-text">Theme Color</span>
            <div className="setting-switch">
              <div className="setting-switch-inner" />
            </div>
          </div>
        </div> */}
        <div className="settings-group">
          <h1 className="settings-header">Privacy & Security</h1>
          <div className="setting">
            <span className="setting-text">Privacy Policy</span>
            <MdArrowDropright />
          </div>
          <div className="setting">
            <span className="setting-text">Download Data</span>
            <MdArrowDropright />
          </div>
          <div className="setting">
            <span className="setting-text">Logout</span>
            <MdArrowDropright />
          </div>
          <div className="setting red">
            <span className="setting-text">Delete Account</span>
            <MdArrowDropright color="white" />
          </div>
        </div>
        <div className="settings-group">
          <h1 className="settings-header">About</h1>
          <div className="setting">
            <span className="setting-text">Version 0.0.1</span>
          </div>
          <div className="setting">
            <span className="setting-text">Changelog</span>
            <MdArrowDropright />
          </div>
          <div className="setting">
            <span className="setting-text">Acknowledgements</span>
            <MdArrowDropright />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { logout }
)(ReUserSettings)
