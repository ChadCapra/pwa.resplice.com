import React, { useState } from 'react'

import ReProfileList from '../Profile/ReProfileList'
import ReCreateGroup from './ReCreateGroup'
import RePlusFAB from '../Button/RePlusFAB'
import ReModal from '../Modal/ReModal'

const ReGroupList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selecting, setSelecting] = useState(false)

  return (
    <>
      <ReProfileList listType="groups" onSelecting={setSelecting} />
      {!selecting && <RePlusFAB onClick={() => setShowCreateModal(true)} />}

      <ReModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        headerText="Create Group"
      >
        <ReCreateGroup />
      </ReModal>
    </>
  )
}

export default ReGroupList
