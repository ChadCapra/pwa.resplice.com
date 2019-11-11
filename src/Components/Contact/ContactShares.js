import React from 'react'
import { connect } from 'react-redux'

import FlexBox from '../Layout/FlexBox'
import CardList from '../Share/CardList'
import ReButton from '../Button/ReButton'
import CardListLoading from '../Loading/ReCardListLoading'

import { getPendingValues } from '../../helpers'
import { addShare, removeShare, deleteContact } from '../../state/actions'

const ContactShares = ({
  profile: { uuid, name, shares, attributes },
  collections,
  addShare,
  removeShare,
  deleteContact
}) => {
  if (!attributes) return <CardListLoading />

  const toggleShare = (on, attribute_uuid, share_expiry) => {
    if (on) addShare(uuid, { attribute_uuid, share_expiry })
    else removeShare(uuid, { attribute_uuid, share_expiry })
  }

  const pendingValues = getPendingValues(attributes)

  const shareCollections = Object.entries(collections).map(collection => {
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
      <h3>
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
          onClick={() => deleteContact(uuid)}
        >
          Delete Contact
        </ReButton>
      )}
    </FlexBox>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    collections: state.userState.collections,
    profile: state.contactState.contacts[ownProps.uuid]
  }
}

export default connect(
  mapStateToProps,
  { addShare, removeShare, deleteContact }
)(ContactShares)
