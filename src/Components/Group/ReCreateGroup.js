import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createGroup } from '../../state/actions'

import ReInput from '../Form/ReInput'
import ReButton from '../Button/ReButton'

const ReCreateGroup = ({ createGroup }) => {
  const [groupName, setGroupName] = useState('')

  const submitGroup = () => {
    createGroup({ name: groupName })
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

export default connect(
  null,
  { createGroup }
)(ReCreateGroup)
