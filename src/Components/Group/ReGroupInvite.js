import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ReProfileHeaderSummary from '../Profile/ReProfileHeaderSummary'
import ReDropdown from '../Form/ReDropdown'
import ReQrCode from '../Profile/ReQrCode'
import ReExit from '../Util/ReExit'
import ImportContact from '../Util/ImportContact'
import ReGroupInviteModal from './ReGroupInviteModal'
import ReModal from '../Modal/ReModal'

import { inviteMembers } from '../../state/actions'

const ReGroupInvite = ({ group, inviteMembers, loading, match }) => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [importedContacts, setImportedContacts] = useState([])

  if (!group) return <Redirect to="/" />

  return (
    <div className="group-invite">
      <div className="group-invite-top">
        <div className="share-list-header">
          <ReProfileHeaderSummary profile={group} />
          <ReExit exitRoute={`/group/${match.params.uuid}`} />
        </div>

        <div style={{ width: '90%', maxWidth: '575px' }}>
          <ReDropdown
            type="primary"
            title="Import Contact Information"
            list={[
              <ImportContact onImport={setImportedContacts}>
                <ImportContact.Google />
              </ImportContact>,
              <ImportContact onImport={setImportedContacts}>
                <ImportContact.Apple />
              </ImportContact>,
              <ImportContact onImport={setImportedContacts}>
                <ImportContact.Microsoft />
              </ImportContact>
            ]}
            onSelect={id => console.log(id)}
          />
        </div>
      </div>

      <ReQrCode uuid={match.params.uuid} />

      {importedContacts.map(contact => (
        <span>{contact}</span>
      ))}

      <ReModal show={showInviteModal} onClose={() => setShowInviteModal(false)}>
        <ReGroupInviteModal
          uuid={match.params.uuid}
          loading={loading}
          inviteMembers={inviteMembers}
        />
      </ReModal>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.shareState.loading,
    group: state.groupState.groups[ownProps.match.params.uuid]
  }
}

export default connect(
  mapStateToProps,
  { inviteMembers }
)(ReGroupInvite)
