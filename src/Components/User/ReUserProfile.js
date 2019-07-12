import React, { useState } from 'react'

import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'

import ReAvatar from '../Profile/Avatar/ReAvatar'
import ViewCard from '../Card/ViewCard'
import CardList from '../Card/CardList'
import ReUserRanks from './ReUserRanks'
import ReModal from '../Modal/ReModal'
import ReEditAttribute from '../Profile/ReEditAttribute'
import ReVerifyAttribute from '../Profile/ReVerifyAttribute'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import { handleAttributeAction } from '../../helpers'

const ReUserProfile = ({
  profile: { uuid, name, avatar, unique_contacts, total_shares },
  collections
}) => {
  const [showBadgeModal, setBadgeModal] = useState(false)
  const [actionAttributeId, setActionAttributeId] = useState(null)
  const [actionType, setActionType] = useState(null)

  const handleAction = (actionType, { uuid, value }) => {
    if (actionType === 'edit' || actionType === 'verify') {
      setActionAttributeId(uuid)
      setActionType(actionType)
    } else {
      handleAttributeAction(actionType, value)
    }
  }

  return (
    <div className="profile">
      <ReAvatar uuid={uuid} avatar={avatar} />
      <h1 className="profile-name">{name}</h1>
      <Level breakpoint="mobile" className="profile-stats">
        <Level.Item>
          <div className="profile-stat">
            <span className="stat">{unique_contacts}</span>
            <span className="stat-text">Contacts</span>
          </div>
        </Level.Item>
        <Level.Item onClick={() => setBadgeModal(true)}>
          <Icon size="large">
            <Shield />
          </Icon>
        </Level.Item>
        <Level.Item>
          <div className="profile-stat">
            <span className="stat">{total_shares}</span>
            <span className="stat-text">Shares</span>
          </div>
        </Level.Item>
      </Level>

      <CardList
        list={Object.entries(collections)}
        Card={ViewCard}
        handleAction={handleAction}
      />

      <ReModal show={showBadgeModal} onClose={() => setBadgeModal(false)}>
        <ReUserRanks totalShares={total_shares} />
      </ReModal>

      <ReModal
        full
        show={actionType === 'edit'}
        onClose={() => setActionType('')}
      >
        <ReEditAttribute
          uuid={actionAttributeId}
          onEdit={() => setActionType('')}
        />
      </ReModal>

      <ReModal
        full
        show={actionType === 'verify'}
        onClose={() => setActionType('')}
      >
        <ReVerifyAttribute
          uuid={actionAttributeId}
          onVerify={() => setActionType('')}
        />
      </ReModal>
    </div>
  )
}

export default ReUserProfile
