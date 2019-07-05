import React from 'react'

import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup'
import ReProfileItem from '../Profile/ReProfileItem'

const BulkShareDropdown = ({ shareList, onClose }) => {
  return (
    <>
      <div className="bulk-share-dropdown-header" onClick={onClose}>
        <MdArrowDropup size="4em" color="#1BBC9B" />
        <p>
          <span>{shareList.length}</span> items
        </p>
        <MdArrowDropup size="4em" color="#1BBC9B" />
      </div>

      <div className="bulk-share-dropdown-container">
        <div className="bulk-share-dropdown">
          {shareList.map(profile => (
            <ReProfileItem
              key={profile.uuid}
              contact={{
                uuid: profile.uuid,
                name: profile.name,
                avatar: profile.avatar
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default BulkShareDropdown
