import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import ProfileList from '../Profile/ProfileList'
import FABActionMenu from '../Util/FABActionMenu'
import ExpandableFAB from '../Button/ExpandableFAB'
import FAB from '../Button/FAB'

import { buildSelectedList } from '../../helpers'
import {
  removeMember,
  addModerator,
  removeModerator
} from '../../state/actions'

const ReMemberList = ({ uuid, members, isModerator }) => {
  const [selectedUuids, setSelectedUuids] = useState([])
  const [toGroupInvite, setToGroupInvite] = useState(false)
  const [memberUuid, setMemberUuid] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const memberList = buildSelectedList(members, selectedUuids)

  if (toGroupInvite) return <Redirect push to={`/group/${uuid}/invite`} />
  if (memberUuid) return <Redirect push to={`/contact/${memberUuid}`} />

  const selecting = selectedUuids.length > 0

  const handleSelect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    newSelectedUuids.push(uuid)
    setSelectedUuids(newSelectedUuids)
  }

  const handleDeselect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    const idx = newSelectedUuids.findIndex(u => u === uuid)
    newSelectedUuids.splice(idx, 1)
    setSelectedUuids(newSelectedUuids)
  }

  return (
    <>
      <ProfileList
        list={memberList}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
        onClick={uuid => setMemberUuid(uuid)}
        isEditing={isEditing}
        isRemoving={isRemoving}
      />

      {selecting ? (
        <FABActionMenu
          count={selectedUuids.length}
          onClick={() => setSelectedUuids([])}
        />
      ) : (
        <ExpandableFAB>
          <FAB
            type="edit"
            text="Edit Moderators"
            onClick={() => setIsEditing(true)}
          />
          <FAB
            type="remove"
            text="Remove Members"
            onClick={() => setIsRemoving(true)}
          />
          <FAB
            type="add"
            text="Add Members"
            onClick={() => setToGroupInvite(true)}
          />
        </ExpandableFAB>
      )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const group = state.groupState.groups[ownProps.uuid]
  return {
    members: group.member_uuids
      ? Object.values(state.contactState.contacts).filter(
          contact =>
            contact.uuid !== state.userState.profile.uuid &&
            group.member_uuids.includes(contact.uuid)
        )
      : [],
    isModerator: group.is_moderator
  }
}

export default connect(
  mapStateToProps,
  { removeMember, addModerator, removeModerator }
)(ReMemberList)
