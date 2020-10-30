import React, { useState } from 'react'
import styled from 'styled-components'

import Modal from '../shared/modal/Modal'
// TODO: Replace with rank icon component for dynamic icons
import { ReactComponent as ShieldIcon } from '../../assets/Copper_3.svg'

const Rank = styled(ShieldIcon)`
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`

const UserRanks = () => {
  const [showRanks, setShowRanks] = useState(false)

  return (
    <>
      <Rank onClick={() => setShowRanks(true)} />
      <Modal show={showRanks} onClose={() => setShowRanks(false)}>
        User Ranks
      </Modal>
    </>
  )
}

export default UserRanks
