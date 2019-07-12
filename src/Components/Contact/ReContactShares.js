import React from 'react'

import CardList from '../Card/CardList'
import ShareCard from '../Card/ShareCard'
import ReButton from '../Button/ReButton'

const ReContactShares = ({
  profile: { uuid, name, shares },
  collections,
  pendingValues,
  addShare,
  removeShare,
  deleteContact
}) => {
  const toggleShare = (on, attribute_uuid, share_expiry) => {
    if (on) addShare(uuid, { attribute_uuid, share_expiry })
    else removeShare(uuid, { attribute_uuid, share_expiry })
  }

  const shareCollections = Object.entries(collections).map(collection => {
    collection[1] = collection[1].map(attr => {
      const value = Object.values(attr.value)
        .map(value => value)
        .join('')
      if (pendingValues.length && !pendingValues.includes(value))
        attr.share_disabled = true
      if (shares[attr.uuid]) attr.checked = true
      else attr.checked = false
      return attr
    })
    return collection
  })

  const numOfShares = Object.values(shares).length

  return (
    <div className="re-contact-shares">
      <h3>
        <span>{numOfShares}</span> shares with {name}
      </h3>

      <CardList
        list={shareCollections}
        Card={ShareCard}
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
    </div>
  )
}

export default ReContactShares
