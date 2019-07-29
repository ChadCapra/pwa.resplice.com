import React from 'react'
import RePill from './RePill'

const ReSearchTags = ({
  tags = ['Work', 'Friends', 'Family', 'Service', 'School'],
  selectedTags,
  onClick,
  ...props
}) => {
  return (
    <div className="re-search-tags" {...props}>
      {tags.map(tag => {
        const selected = selectedTags.includes(tag)
        return (
          <RePill key={tag} selected={selected} onClick={() => onClick(tag)}>
            {tag}
          </RePill>
        )
      })}
    </div>
  )
}

export default ReSearchTags
