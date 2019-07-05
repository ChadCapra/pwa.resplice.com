import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown'
import CardList from '../Card/CardList'
import ShareCard from '../Card/ShareCard'
import ReButton from '../Button/ReButton'
import ReAvatar from '../Profile/ReAvatar'
import BulkShareDropdown from './BulkShareDropdown'
import ReExit from '../Util/ReExit'

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

const BulkShareHeader = ({ shareList, onClick }) => {
  return (
    <div className="bulk-share-header">
      <div
        className="flex--center"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <div className="bulk-share-stat">
          <p>
            <span>{shareList.length}</span>
          </p>
          <MdArrowDropdown size="3em" color="#1BBC9B" />
        </div>
        <div className="bulk-share-icons">
          {shareList.slice(0, 4).map(profile => (
            <div key={profile.uuid}>
              <ReAvatar avatar={profile.avatar} uuid={profile.uuid} />
            </div>
          ))}
        </div>
      </div>
      <ReExit exitRoute="/" style={{ cursor: 'pointer' }} />
    </div>
  )
}

const ReBulkShare = ({ shareList, collections }) => {
  const [expandShareList, setExpandShareList] = useState(false)
  const [checkedCollections, setCheckedCollections] = useState(collections)
  const [attributeUuids, setAttributeUuids] = useState([])

  const toggleAttribute = (val, uuid) => {
    let newUuids = [...attributeUuids]
    let newCollections = { ...checkedCollections }
    if (val) {
      newUuids.push(uuid)
    } else {
      const uuidIdx = newUuids.findIndex(u => u === uuid)
      newUuids.splice(uuidIdx, 1)
    }

    let colName = ''
    let idx = -1
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

  if (!shareList.length) return <Redirect push to="/" />

  return (
    <div className="re-bulk-share">
      {expandShareList ? (
        <BulkShareDropdown
          shareList={shareList}
          onClose={() => setExpandShareList(false)}
        />
      ) : (
        <BulkShareHeader
          shareList={shareList}
          onClick={() => setExpandShareList(true)}
        />
      )}
      <div className="bulk-share-body">
        <div className="bulk-share-card-container">
          <CardList
            type="user"
            Card={ShareCard}
            list={checkedCollections}
            toggleKey="checked"
            toggleAttribute={toggleAttribute}
          />
        </div>
      </div>
      <div className="bulk-share-footer">
        <ReButton
          type="primary"
          width="175px"
          onClick={() => console.log('sharing', attributeUuids)}
          disabled={!attributeUuids.length}
        >
          Share
        </ReButton>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    shareList: state.shareState.shareList,
    collections: checkCollections(state.userState.collections)
  }
}

export default connect(mapStateToProps)(ReBulkShare)
