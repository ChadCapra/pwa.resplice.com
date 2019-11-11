import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ProfileList from '../Profile/ProfileList'
import ProfileSummary from '../Profile/ProfileSummary'
import ReCreateGroup from './ReCreateGroup'
import RePlusFAB from '../Button/RePlusFAB'
import FABActionMenu from '../Util/FABActionMenu'
import ReBulkAction from '../Util/ReBulkAction'
import ReModal from '../Modal/ReModal'

import { alphabetSort, buildSelectedList } from '../../helpers'

const filterByQuery = (groups, query) => {
  if (!query) return groups
  return groups.filter(group => {
    // const searchable = [...group.searchable_values]
    const searchable = [group.name.toLowerCase()]
    return searchable.find(val => {
      return val.includes(query.toLowerCase())
    })
  })
}

const GroupList = ({ groups, search: { query } }) => {
  const [selectedUuids, setSelectedUuids] = useState([])
  const [groupList, setGroupList] = useState(
    buildSelectedList(groups, selectedUuids)
  )
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)
  const [groupUuid, setGroupUuid] = useState(false)
  const selecting = selectedUuids.length > 0

  const handleSelect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    newSelectedUuids.push(uuid)
    setSelectedUuids(newSelectedUuids)
    setGroupList(buildSelectedList(groups, newSelectedUuids))
  }

  const handleDeselect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    const idx = newSelectedUuids.findIndex(u => u === uuid)
    newSelectedUuids.splice(idx, 1)
    setSelectedUuids(newSelectedUuids)
    setGroupList(buildSelectedList(groups, newSelectedUuids))
  }

  const filteredGroups = filterByQuery(groupList, query)

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
        setGroupList(buildSelectedList(groups, []))
        break
      default:
    }
  }

  if (groupUuid) return <Redirect push to={`/group/${groupUuid}`} />

  return (
    <>
      <ProfileList list={filteredGroups}>
        <ProfileSummary
          pad
          handleSelect={handleSelect}
          handleDeselect={handleDeselect}
          onClick={uuid => setGroupUuid(uuid)}
        />
      </ProfileList>
      {selecting ? (
        <FABActionMenu count={selectedUuids.length} onClick={handleAction} />
      ) : (
        <RePlusFAB onClick={() => setShowCreateModal(true)} />
      )}

      <ReModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        headerText="Create Group"
      >
        <ReCreateGroup />
      </ReModal>

      <ReModal
        show={showBulkActionModal}
        onClose={() => setShowBulkActionModal(false)}
        headerText="Bulk Action"
      >
        <ReBulkAction list={groupList} selectedUuids={selectedUuids} />
      </ReModal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    groups: Object.values(state.groupState.groups).sort((a, b) =>
      alphabetSort(a.name, b.name)
    ),
    search: state.utilState.search
  }
}

export default connect(mapStateToProps)(GroupList)
