import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createGroup } from '../../state/actions'

import ReInput from '../Form/ReInput'
import ReButton from '../Button/ReButton'

const ReCreateGroup = ({ createGroup, createdGroupUuid }) => {
  const [toGroup, setToGroup] = useState(false)
  const [groupName, setGroupName] = useState('')

  if (toGroup && createdGroupUuid)
    return <Redirect push to={`/group/${createdGroupUuid}`} />

  const submitGroup = async () => {
    await createGroup({ name: groupName })
    setToGroup(true)
  }

  const pristine = groupName === ''

  return (
    <div className="re-create-group flex-col--center ">
      <div className="inputs" style={{ margin: '15px 0' }}>
        <ReInput
          type="text"
          input={{ value: groupName }}
          label="Group Name"
          meta={{}}
          onChange={e => setGroupName(e.target.value)}
          autoFocus
        />
      </div>

      <ReButton type="primary" onClick={submitGroup} disabled={pristine}>
        Create Group
      </ReButton>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    createdGroupUuid: state.groupState.createdGroupUuid
  }
}

export default connect(
  mapStateToProps,
  { createGroup }
)(ReCreateGroup)
