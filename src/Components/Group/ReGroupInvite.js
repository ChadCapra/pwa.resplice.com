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

import { inviteMember } from '../../state/actions'

const ReGroupInvite = ({
  group,
  importingContacts,
  inviteMember,
  loading,
  match
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false)

  if (!group) return <Redirect to="/" />
  if (importingContacts)
    return <Redirect to={`/group/${match.params.uuid}/import`} />

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
              <ImportContact>
                <ImportContact.Google />
              </ImportContact>,
              <ImportContact>
                <ImportContact.Apple />
              </ImportContact>,
              <ImportContact>
                <ImportContact.Microsoft />
              </ImportContact>
            ]}
          />
        </div>
      </div>

      <ReQrCode uuid={match.params.uuid} />

      <ReModal show={showInviteModal} onClose={() => setShowInviteModal(false)}>
        <ReGroupInviteModal
          uuid={match.params.uuid}
          loading={loading}
          inviteMembers={inviteMember}
        />
      </ReModal>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.shareState.loading,
    group: state.groupState.groups[ownProps.match.params.uuid],
    importingContacts: state.groupState.importingContacts
  }
}

export default connect(
  mapStateToProps,
  { inviteMember }
)(ReGroupInvite)
