import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import RePlusFAB from '../Button/RePlusFAB'
import FABActionMenu from '../Util/FABActionMenu'
import ProfileList from '../Profile/ProfileList'
import ReBulkAction from '../Util/ReBulkAction'
import ReModal from '../Modal/ReModal'

import { alphabetSort, buildSelectedList } from '../../helpers'

const filterByQuery = (contacts, query) => {
  if (!query) return contacts
  return contacts.filter(contact => {
    const searchable = [
      contact.name.toLowerCase(),
      ...contact.searchable_values
    ]
    return searchable.find(val => {
      return val.includes(query.toLowerCase())
    })
  })
}

const filterByTags = (contacts, tags) => {
  if (tags.length <= 0) return contacts
  return contacts.filter(contact =>
    contact.tags.reduce((_bool, tag) => {
      return tags.includes(tag)
    }, false)
  )
}

const ReContactList = ({ contacts, search: { query, tags } }) => {
  const [toInvite, setToInvite] = useState(false)
  const [contactUuid, setContactUuid] = useState('')
  const [selectedUuids, setSelectedUuids] = useState([])
  const [contactList, setContactList] = useState(
    buildSelectedList(contacts, selectedUuids)
  )
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)

  const selecting = selectedUuids.length > 0

  const handleSelect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    newSelectedUuids.push(uuid)
    setSelectedUuids(newSelectedUuids)
    setContactList(buildSelectedList(contacts, newSelectedUuids))
  }

  const handleDeselect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    const idx = newSelectedUuids.findIndex(u => u === uuid)
    newSelectedUuids.splice(idx, 1)
    setSelectedUuids(newSelectedUuids)
    setContactList(buildSelectedList(contacts, newSelectedUuids))
  }

  const filteredContacts = () => {
    return filterByTags(filterByQuery(contactList, query), tags)
  }

  if (toInvite) return <Redirect push to="/invite" />
  if (contactUuid) return <Redirect push to={`/contact/${contactUuid}`} />

  const handleAction = action => {
    switch (action) {
      case 'email':
        setShowBulkActionModal(true)
        break
      case 'sms':
        setShowBulkActionModal(true)
        break
      case 'clear':
        setSelectedUuids([])
        setContactList(buildSelectedList(contacts, []))
        break
      default:
    }
  }

  return (
    <>
      <ProfileList
        list={filteredContacts()}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
        onClick={uuid => setContactUuid(uuid)}
      />
      {selecting ? (
        <FABActionMenu count={selectedUuids.length} onClick={handleAction} />
      ) : (
        <RePlusFAB onClick={() => setToInvite(true)} />
      )}

      <ReModal
        show={showBulkActionModal}
        onClose={() => setShowBulkActionModal(false)}
        headerText="Select Values"
      >
        <ReBulkAction list={contactList} selectedUuids={selectedUuids} />
      </ReModal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    contacts: Object.values(state.contactState.contacts).sort((a, b) =>
      alphabetSort(a.name, b.name)
    ),
    search: state.utilState.search
  }
}

export default connect(mapStateToProps)(ReContactList)
