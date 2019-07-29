import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import RePlusFAB from '../Button/RePlusFAB'
import FABActionMenu from '../Util/FABActionMenu'
import ReProfileList from '../Profile/ReProfileList'
import ReBulkShare from '../Share/ReBulkShare'
import ReModal from '../Modal/ReModal'

import { setBulkShares } from '../../state/actions'
import {
  handleBulkAction,
  alphabetSort,
  buildSelectedList
} from '../../helpers'

const filterByQuery = (contacts, query) => {
  if (!query) return contacts
  return contacts.filter(contact =>
    contact.searchable_values.find(val => {
      return val.includes(query)
    })
  )
}

const filterByTags = (contacts, tags) => {
  if (tags.length <= 0) return contacts
  return contacts.filter(contact =>
    contact.tags.reduce((_bool, tag) => {
      return tags.includes(tag)
    }, false)
  )
}

const ReContactList = ({
  contacts,
  setBulkShares,
  search: { query, tags }
}) => {
  const [toShare, setToShare] = useState(false)
  const [selectedUuids, setSelectedUuids] = useState([])
  const [contactList, setContactList] = useState(
    buildSelectedList(contacts, selectedUuids)
  )
  const [showBulkShareModal, setShowBulkShareModal] = useState(false)
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

  if (toShare) return <Redirect push to="/share" />

  const handleAction = action => {
    switch (action) {
      case 'share':
        setBulkShares(
          this.props.contacts.filter(contact =>
            this.state.selectedUuids.includes(contact.uuid)
          )
        )
        setShowBulkShareModal(true)
        break
      case 'email':
        setShowBulkActionModal(true)
        // handleBulkAction(action, [])
        break
      case 'sms':
        setShowBulkActionModal(true)
        // handleBulkAction(action, [])
        break
      case 'clear':
        setSelectedUuids([])
        break
      default:
    }
  }

  return (
    <>
      <ReProfileList
        list={filteredContacts()}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
      />
      {selecting ? (
        <FABActionMenu onClick={handleAction} />
      ) : (
        <RePlusFAB onClick={() => setToShare(true)} />
      )}

      <ReModal
        show={showBulkShareModal}
        onClose={() => setShowBulkShareModal(false)}
        headerText="Bulk Share"
      >
        <ReBulkShare />
      </ReModal>
      <ReModal
        show={showBulkActionModal}
        onClose={() => setShowBulkActionModal(false)}
        headerText="Bulk Action"
      >
        Bulk Actions
        {/* <ReBulkAction /> */}
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

export default connect(
  mapStateToProps,
  { setBulkShares }
)(ReContactList)
