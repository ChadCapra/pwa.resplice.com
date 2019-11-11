import React from 'react'
import { connect } from 'react-redux'

import FlexBox from '../Layout/FlexBox'
import CardListLoading from '../Loading/ReCardListLoading'
import CardList from '../Share/CardList'
import ReButton from '../Button/ReButton'

import styles from '../Profile/Profile.module.scss'

import {
  addGroupShare,
  removeGroupShare,
  leaveGroup
} from '../../state/actions'

import { buildPendingAttributeValues } from '../../helpers'

const GroupShares = ({
  profile: { uuid, name, shares, attributes },
  userCollections,
  addGroupShare,
  removeGroupShare,
  leaveGroup
}) => {
  if (!attributes) return <CardListLoading />

  const toggleShare = (on, attribute_uuid, share_expiry) => {
    if (on) addGroupShare(uuid, { attribute_uuid, share_expiry })
    else removeGroupShare(uuid, { attribute_uuid, share_expiry })
  }

  const pendingValues = buildPendingAttributeValues(attributes)

  const shareCollections = Object.entries(userCollections).map(collection => {
    collection[1] = collection[1].map(a => {
      const attr = { ...a }
      const value = Object.values(attr.value)
        .map(value => value)
        .join('')
      if (pendingValues.length && !pendingValues.includes(value))
        attr.shareDisabled = true
      else attr.shareDisabled = false
      if (shares[attr.uuid]) attr.checked = true
      else attr.checked = false
      return attr
    })
    return collection
  })

  const numOfShares = Object.values(shares).length

  return (
    <FlexBox direction="column" align="center" style={{ padding: '16px 0' }}>
      <h3 className={styles.ProfileShareHeader}>
        <span>{numOfShares}</span> shares with {name}
      </h3>

      <CardList
        list={shareCollections}
        toggleKey="checked"
        toggleAttribute={toggleShare}
      />

      {!numOfShares && (
        <ReButton
          type="secondary"
          style={{ border: '1px solid #FF3860', color: '#FF3860' }}
          onClick={() => leaveGroup(uuid)}
        >
          Leave Group
        </ReButton>
      )}
    </FlexBox>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.groupState.groups[ownProps.uuid],
    userCollections: state.userState.collections
  }
}

export default connect(
  mapStateToProps,
  { addGroupShare, removeGroupShare, leaveGroup }
)(GroupShares)
