import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import ReProfileList from '../Profile/ReProfileList'
import FABActionMenu from '../Util/FABActionMenu'
import RePlusFAB from '../Button/RePlusFAB'

import { buildSelectedList } from '../../helpers'

const ReMemberList = ({ ruuid, members }) => {
  const [selectedUuids, setSelectedUuids] = useState([])
  const [memberList, setMemberList] = useState(
    buildSelectedList(members, selectedUuids)
  )
  const [toGroupInvite, setToGroupInvite] = useState(false)

  if (toGroupInvite) return <Redirect push to={`/group/${ruuid}/invite`} />

  const selecting = selectedUuids.length > 0

  const handleSelect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    newSelectedUuids.push(uuid)
    setSelectedUuids(newSelectedUuids)
    setMemberList(buildSelectedList(members, newSelectedUuids))
  }

  const handleDeselect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    const idx = newSelectedUuids.findIndex(u => u === uuid)
    newSelectedUuids.splice(idx, 1)
    setSelectedUuids(newSelectedUuids)
    setMemberList(buildSelectedList(members, newSelectedUuids))
  }

  return (
    <>
      <ReProfileList
        list={memberList}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
      />

      {selecting ? (
        <FABActionMenu onClick={() => {}} />
      ) : (
        <RePlusFAB onClick={() => setToGroupInvite(true)} />
      )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const group = state.groupState.groups[ownProps.ruuid]
  return {
    members: group.member_uuids
      ? Object.values(state.contactState.contacts).filter(
          contact =>
            contact.uuid !== state.userState.profile.uuid &&
            group.member_uuids.includes(contact.uuid)
        )
      : []
  }
}

export default connect(mapStateToProps)(ReMemberList)
