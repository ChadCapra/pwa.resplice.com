import React, { useState } from 'react'

import ComingSoon from '../Util/ComingSoon'
import ReCreateGroup from './ReCreateGroup'
import RePlusFAB from '../Buttons/RePlusFAB'
import ReModal from '../Modals/ReModal'

import './group.scss'

const ReGroupList = () => {
  const [showCreateModal, setCreateModal] = useState(false)

  return (
    <div className="re-group-list">
      <ComingSoon name="Groups" />
      <RePlusFAB onClick={() => setCreateModal(true)} />

      <ReModal
        full
        show={showCreateModal}
        onClose={() => setCreateModal(false)}
        headerText="Create Group"
      >
        <ReCreateGroup />
      </ReModal>
    </div>
  )
}

export default ReGroupList
