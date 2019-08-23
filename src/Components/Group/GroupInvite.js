import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import View from '../Layout/View'
import FlexBox from '../Layout/FlexBox'
import Header from '../Header/Header'
import ProfileSummary from '../Profile/ProfileSummary'
import ReDropdown from '../Form/ReDropdown'
import ImportContact from '../Util/ImportContact'
import GroupInviteModal from './ReGroupInviteModal'
import ReModal from '../Modal/ReModal'

import { inviteMember } from '../../state/actions'

const GroupInvite = ({
  loading,
  match,
  group,
  importingContacts,
  inviteMember
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [toGroup, setToGroup] = useState(false)

  if (!group) return <Redirect to="/" />
  if (importingContacts)
    return <Redirect to={`/group/${match.params.uuid}/import`} />
  if (toGroup)
    return <Redirect to={`/group/${match.params.uuid}?swipeIndex=0`} />

  return (
    <>
      <View>
        <View.Header>
          <Header icon="close" onIconClick={() => setToGroup(true)}>
            <ProfileSummary
              profile={group}
              handleSelect={() => {}}
              handleDeselect={() => {}}
              onClick={() => {}}
            />
          </Header>
        </View.Header>

        <View.Body>
          <FlexBox
            direction="column"
            justify="center"
            style={{ padding: '16px' }}
          >
            <ReDropdown
              type="primary"
              title="Import Contact Information"
              list={[
                <ImportContact>
                  <ImportContact.Google />
                </ImportContact>
              ]}
            />

            <p onClick={() => setShowInviteModal(true)}>
              Invite via phone or email
            </p>
          </FlexBox>
        </View.Body>
      </View>

      <ReModal
        show={showInviteModal}
        headerText="Invite"
        onClose={() => setShowInviteModal(false)}
      >
        <GroupInviteModal
          uuid={match.params.uuid}
          inviteMember={inviteMember}
          loading={loading}
        />
      </ReModal>
    </>
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
)(GroupInvite)
