import React, { useState } from 'react'
import { connect } from 'react-redux'

import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'

import ProfilePic from './ProfilePic'
import ViewCard from '../Cards/ViewCard'
import CardList from '../Cards/CardList'
import ReUserRanks from './ReUserRanks'
import ReModal from '../Modals/ReModal'
import ReEditAttribute from './ReEditAttribute'
import ReVerifyAttribute from './ReVerifyAttribute'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import { handleAttributeAction } from '../../helpers'

import './profile.scss'

const ReUserProfile = ({
  profile: { uuid, name, avatar, unique_contacts, total_shares }
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
    <div className="user-profile">
      <ProfilePic uuid={uuid} avatar={avatar} />
      <h1 className="user-profile-name">{name}</h1>
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

      <CardList type="user" Card={ViewCard} handleAction={handleAction} />

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
        <ReVerifyAttribute uuid={actionAttributeId} />
      </ReModal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    profile: state.userState.profile
  }
}

export default connect(mapStateToProps)(ReUserProfile)
