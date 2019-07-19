import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import ReProfileList from '../Profile/ReProfileList'
import FABActionMenu from '../Util/FABActionMenu'
import RePlusFAB from '../Button/RePlusFAB'

const ReMemberList = ({ ruuid, members }) => {
  const [selectedUuids, setSelectedUuids] = useState([])
  const [toGroupInvite, setToGroupInvite] = useState(false)

  if (toGroupInvite) return <Redirect push to={`/group/${ruuid}/invite`} />

  const selected = selectedUuids.length > 0

  return (
    <>
      <ReProfileList
        list={members}
        selectedUuids={selectedUuids}
        handleSelect={() => {}}
        handleDeselect={() => {}}
      />

      {selected ? (
        <FABActionMenu onClick={() => {}} />
      ) : (
        <RePlusFAB onClick={() => setToGroupInvite(true)} />
      )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    members: Object.values(state.contactState.contacts).filter(
      contact =>
        contact.uuid !== state.userState.profile.uuid &&
        ownProps.memberUuids.includes(contact.uuid)
    )
  }
}

export default connect(mapStateToProps)(ReMemberList)
