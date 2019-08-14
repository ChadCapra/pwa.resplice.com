import React, { useState } from 'react'
import { connect } from 'react-redux'

import FlexBox from '../Layout/FlexBox'
import Avatar from '../Profile/Avatar/ReAvatar'
import styles from './User.module.scss'
import ViewCard from '../Card/ViewCard'
import CardList from '../Card/CardList'
import ReUserRanks from './ReUserRanks'
import ReModal from '../Modal/ReModal'
import ReEditAttribute from '../Profile/ReEditAttribute'
import ReVerifyAttribute from '../Profile/ReVerifyAttribute'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import { deleteAttribute } from '../../state/actions'
import { handleAttributeAction } from '../../helpers'

const UserProfile = ({
  profile: { uuid, name, avatar, unique_contacts, total_shares },
  collections,
  deleteAttribute
}) => {
  const [showBadgeModal, setBadgeModal] = useState(false)
  const [actionAttributeId, setActionAttributeId] = useState(null)
  const [actionType, setActionType] = useState(null)

  const handleAction = (actionType, { uuid, value }) => {
    switch (actionType) {
      case 'edit':
      case 'verify':
        setActionAttributeId(uuid)
        setActionType(actionType)
        break
      case 'delete':
        deleteAttribute(uuid)
        break
      default:
        handleAttributeAction(actionType, value)
    }
  }

  return (
    <>
      <FlexBox direction="column" align="center" style={{ paddingTop: '16px' }}>
        <Avatar uuid={uuid} avatar={avatar} />
        <h1 style={{ textAlign: 'center' }}>{name}</h1>
        <FlexBox className={styles.StatRow} direction="row" justify="around">
          <FlexBox
            className={styles.StatRowLeft}
            direction="column"
            justify="center"
            align="center"
          >
            <span className={styles.StatNumber}>{unique_contacts}</span>
            <span className={styles.StatText}>{`Contact${
              unique_contacts === 1 ? '' : 's'
            }`}</span>
          </FlexBox>
          <FlexBox
            className={styles.StatRowMiddle}
            direction="column"
            justify="center"
            align="center"
            onClick={() => setBadgeModal(true)}
          >
            <Shield />
          </FlexBox>
          <FlexBox
            className={styles.StatRowRight}
            direction="column"
            justify="center"
            align="center"
          >
            <span className={styles.StatNumber}>{total_shares}</span>
            <span className={styles.StatText}>{`Share${
              total_shares === 1 ? '' : 's'
            }`}</span>
          </FlexBox>
        </FlexBox>

        <CardList
          list={Object.entries(collections)}
          Card={ViewCard}
          handleAction={handleAction}
        />
      </FlexBox>

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
    </>
  )
}

const mapStateToProps = state => {
  return {
    profile: state.userState.profile,
    collections: state.userState.collections
  }
}

export default connect(
  mapStateToProps,
  { deleteAttribute }
)(UserProfile)
