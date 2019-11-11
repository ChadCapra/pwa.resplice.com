import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MdAdd from 'react-ionicons/lib/MdAdd'
import RePill from './RePill'

const buildTags = (tags, selectedTags) => {
  const tagList = {}
  const newAllTags = [...tags, ...selectedTags]
  newAllTags.forEach(tag => {
    const found = selectedTags.find(
      sTag => sTag.toLowerCase() === tag.toLowerCase()
    )
    if (found) {
      tagList[tag] = true
    } else {
      tagList[tag] = false
    }
  })
  return tagList
}

const ReTags = ({ tags, selectedTags, onTagChange }) => {
  const [showCreateInput, setCreateInput] = useState(false)
  const [tagValue, setTagValue] = useState('')
  const [tagList, setTagList] = useState(buildTags(tags, selectedTags))

  useEffect(() => {
    setTagList(buildTags(tags, selectedTags))
  }, [tags, selectedTags])

  return (
    <div className="re-tags-container">
      {Object.entries(tagList).map(tag => (
        <RePill
          key={tag[0]}
          selected={tag[1]}
          onClick={() => onTagChange(tag[0])}
        >
          {tag[0]}
        </RePill>
      ))}
      {!showCreateInput && (
        <MdAdd
          color="#8A8A8A"
          fontSize="2.5em"
          onClick={() => setCreateInput(true)}
        />
      )}
      {showCreateInput && (
        <div className="create-tag-input active">
          <input
            type="text"
            label="Tag Name"
            value={tagValue}
            onChange={e => setTagValue(e.target.value)}
            onBlur={e => {
              if (tagValue) onTagChange(tagValue)
              setCreateInput(false)
              setTagValue('')
            }}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                onTagChange(tagValue)
                setCreateInput(false)
                setTagValue('')
              }
            }}
            autoFocus
            maxLength="16"
          />
        </div>
      )}
    </div>
  )
}

ReTags.propTypes = {
  // Array list of all available tags
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Currently Selected Tags, no-case
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagChange: PropTypes.func.isRequired
}

export default ReTags
