import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { createGroup } from '../../state/actions'

import ReInput from '../Form/ReInput'
import CardList from '../Card/CardList'
import ShareCard from '../Card/ShareCard'
import ReButton from '../Button/ReButton'

const checkCollections = collections => {
  const newCollections = { ...collections }
  Object.entries(newCollections).forEach(coll => {
    coll[1] = coll[1].map(attr => {
      attr.checked = false
      return attr
    })
  })
  return newCollections
}

const ReCreateGroup = ({ collections, createGroup }) => {
  const [groupName, setGroupName] = useState('')
  const [checkedCollections, setCheckedCollections] = useState(collections)
  const [attribute_uuids, setAttributeUuids] = useState([])

  useEffect(() => {})

  const toggleAttrbute = (val, uuid) => {
    let newUuids = [...attribute_uuids]
    let newCollections = { ...checkedCollections }
    if (val) {
      newUuids.push(uuid)
    } else {
      const uuidIdx = newUuids.findIndex(u => u === uuid)
      newUuids.splice(uuidIdx, 1)
    }

    let colName = '',
      idx = -1
    for (let name in newCollections) {
      const attrIdx = newCollections[name].findIndex(attr => attr.uuid === uuid)
      if (newCollections[name][attrIdx]) {
        colName = name
        idx = attrIdx
      }
    }
    newCollections[colName][idx].checked = val

    setCheckedCollections(newCollections)
    setAttributeUuids(newUuids)
  }

  const submitGroup = () => {
    createGroup({ name: groupName, attribute_uuids })
  }

  return (
    <div className="re-create-group">
      <div className="inputs">
        <ReInput
          type="text"
          input={{ value: groupName }}
          label="Group Name"
          meta={{}}
          onChange={e => setGroupName(e.target.value)}
        />
      </div>

      <h3>Select Shares</h3>

      <CardList
        type="user"
        Card={ShareCard}
        list={checkedCollections}
        toggleKey="checked"
        toggleAttribute={toggleAttrbute}
      />

      <ReButton type="primary" text="Create Group" onClick={submitGroup} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    collections: checkCollections(state.userState.collections)
  }
}

export default connect(
  mapStateToProps,
  { createGroup }
)(ReCreateGroup)
