import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import ProfileList from '../Profile/ProfileList'
import FABActionMenu from '../Util/FABActionMenu'
import FAB from '../Button/FAB'
import ProfileSummary from '../Profile/ProfileSummary'
import MemberEdit from './MemberEdit'

import { buildSelectedList } from '../../helpers'
import {
  addModerator,
  removeModerator,
  removeMember
} from '../../state/actions'

import styles from '../Button/Button.module.scss'

const ReMemberList = ({
  uuid,
  members,
  isModerator,
  addModerator,
  removeModerator,
  removeMember
}) => {
  const [selectedUuids, setSelectedUuids] = useState([])
  const [toGroupInvite, setToGroupInvite] = useState(false)
  const [memberUuid, setMemberUuid] = useState('')

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
      >
        <ProfileSummary
          pad
          handleSelect={handleSelect}
          handleDeselect={handleDeselect}
          rightChild={
            isModerator && (
              <MemberEdit
                addModerator={mUuid => addModerator(uuid, mUuid)}
                removeModerator={mUuid => removeModerator(uuid, mUuid)}
                removeMember={mUuid => removeMember(uuid, mUuid)}
              />
            )
          }
        />
      </ProfileList>

      {selecting ? (
        <FABActionMenu
          count={selectedUuids.length}
          onClick={() => setSelectedUuids([])}
        />
      ) : (
        <div className={styles.FABContainer}>
          <FAB type="add" onClick={() => setToGroupInvite(true)} />
        </div>
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
