import React, { useState } from 'react'

import MdAdd from 'react-ionicons/lib/MdAdd'
import RePill from './RePill'

const tags = [
  'Work',
  'Friend',
  'Family',
  'Service',
  'Neighbor',
  'School',
  'Happy'
]

const ReTags = () => {
  const [showCreateInput, setCreateInput] = useState(false)
  const [tagValue, setTagValue] = useState('')

  return (
    <div className="re-tags-container">
      {tags.map(tag => {
        return <RePill key={tag}>{tag}</RePill>
      })}
      <MdAdd
        color="#8A8A8A"
        fontSize="2.5em"
        onClick={() => setCreateInput(true)}
      />
      {showCreateInput && (
        <div className="create-tag-input">
          <input
            type="text"
            label="Tag Name"
            value={tagValue}
            onChange={e => setTagValue(e.target.value)}
            onBlur={e => {
              if (e.target.value) tags.push(e.target.value)
              setCreateInput(false)
              setTagValue('')
            }}
            autoFocus
            maxLength="16"
          />
        </div>
      )}
    </div>
  )
}

export default ReTags
