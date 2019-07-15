import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  logout,
  fetchSessions,
  deleteAccount,
  enableNotifications,
  disableNotifications,
  downloadData
} from '../../state/actions'

import MdArrowDropright from 'react-ionicons/lib/MdArrowDropright'
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown'
import ReModal from '../Modal/ReModal'
import ReSessions from '../Setting/ReSessions'
import DeleteAccount from '../Setting/DeleteAccount'
import DownloadData from '../Setting/DownloadData'
import ReSwitch from '../Form/ReSwitch'

const ReUserSettings = ({
  userLoading,
  authLoading,
  settings,
  userError,
  authError,
  enableNotifications,
  disableNotifications,
  fetchSessions,
  logout,
  deleteAccount,
  downloadData
}) => {
  const [showSessions, setShowSessions] = useState(false)
  const [showDeletePrompt, setShowDeletePrompt] = useState(false)
  const [showDownloadData, setShowDownloadData] = useState(false)

  return (
    <div className="re-user-settings">
      <div className="settings-group">
        <h1 className="settings-header">General</h1>
        <div className="setting">
          <span className="setting-text">App Notifications</span>
          <ReSwitch
            enabled={settings.notifications}
            disable={disableNotifications}
            enable={enableNotifications}
          />
        </div>
        <div className="setting">
          <span className="setting-text">Notification Value</span>
          <MdArrowDropdown />
        </div>
        {/* <div className="setting">
            <span className="setting-text">Language</span>
            <div className="setting-switch">
              <div className="setting-switch-inner" />
            </div>
          </div> */}
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
        {/* <div className="setting">
          <span className="setting-text">Privacy Policy</span>
          <MdArrowDropright />
        </div> */}
        <div className="setting" onClick={() => setShowDownloadData(true)}>
          <span className="setting-text">Download Data</span>
          <MdArrowDropright />
          <ReModal
            show={showDownloadData}
            headerText="Download Data"
            onClose={() => setShowDownloadData(false)}
          >
            <DownloadData downloadData={downloadData} />
          </ReModal>
        </div>
        <div className="setting" onClick={() => setShowSessions(true)}>
          <span className="setting-text">Logout</span>
          <MdArrowDropright />
          <ReModal
            show={showSessions}
            headerText="Devices & Logout"
            onClose={() => setShowSessions(false)}
          >
            <ReSessions
              sessions={settings.sessions}
              userLoading={userLoading}
              authLoading={authLoading}
              fetchSessions={fetchSessions}
              logout={logout}
            />
          </ReModal>
        </div>
        <div className="setting red" onClick={() => setShowDeletePrompt(true)}>
          <span className="setting-text">Delete Account</span>
          <MdArrowDropright />
          <ReModal
            show={showDeletePrompt}
            headerText="Delete Account"
            onClose={() => setShowDeletePrompt(false)}
          >
            <DeleteAccount deleteAccount={deleteAccount} />
          </ReModal>
        </div>
      </div>
      <div className="settings-group">
        <h1 className="settings-header">About</h1>
        <div className="setting">
          <span className="setting-text">Version 0.0.1</span>
        </div>
        {/* <div className="setting">
          <span className="setting-text">Changelog</span>
          <MdArrowDropright />
        </div>
        <div className="setting">
          <span className="setting-text">Acknowledgements</span>
          <MdArrowDropright />
        </div> */}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userLoading: state.userState.loading,
    authLoading: state.authState.loading,
    settings: state.userState.settings,
    userError: state.userState.error,
    authError: state.authState.error
  }
}

export default connect(
  mapStateToProps,
  {
    enableNotifications,
    disableNotifications,
    fetchSessions,
    logout,
    deleteAccount,
    downloadData
  }
)(ReUserSettings)
