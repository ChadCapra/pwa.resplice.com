import React, { useState } from 'react'
import { connect } from 'react-redux'

import ReProfileList from '../Profile/ReProfileList'
import ReCreateGroup from './ReCreateGroup'
import RePlusFAB from '../Button/RePlusFAB'
import FABActionMenu from '../Util/FABActionMenu'
import ReBulkShare from '../Share/ReBulkShare'
import ReModal from '../Modal/ReModal'

import { setBulkShares } from '../../state/actions'
import { alphabetSort } from '../../helpers'

const buildGroupList = (groups, selectedUuids) => {
  return groups.map(({ ...group }) => {
    const selected = selectedUuids.includes(group.uuid)
    group.selected = selected
    return group
  })
}

const ReGroupList = ({ groups, setBulkShares }) => {
  const [selectedUuids, setSelectedUuids] = useState([])
  const [groupList, setGroupList] = useState(
    buildGroupList(groups, selectedUuids)
  )
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showBulkShareModal, setShowBulkShareModal] = useState(false)
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)

  const selecting = selectedUuids.length > 0

  const handleAction = action => {
    switch (action) {
      case 'share':
        setBulkShares(this.props.groupList.filter(group => group.selected))
        setShowBulkShareModal(true)
        break
      case 'email':
        setShowBulkActionModal(true)
        break
      case 'sms':
        setShowBulkActionModal(true)
        break
      case 'clear':
        setSelectedUuids([])
        setGroupList(buildGroupList(groups, []))
        break
      default:
    }
  }

  const handleSelect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    newSelectedUuids.push(uuid)
    setSelectedUuids(newSelectedUuids)
    setGroupList(buildGroupList(groups, newSelectedUuids))
  }
  const handleDeselect = uuid => {
    const newSelectedUuids = [...selectedUuids]
    const idx = newSelectedUuids.findIndex(u => u === uuid)
    newSelectedUuids.splice(idx, 1)
    setSelectedUuids(newSelectedUuids)
    setGroupList(buildGroupList(groups, newSelectedUuids))
  }

  return (
    <>
      <ReProfileList
        list={groupList}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
      />
      {selecting ? (
        <FABActionMenu onClick={handleAction} />
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
    groups: Object.values(state.groupState.groups).sort((a, b) =>
      alphabetSort(a.name, b.name)
    )
  }
}

export default connect(
  mapStateToProps,
  { setBulkShares }
)(ReGroupList)
