import React from 'react'
import RePill from './RePill'

import styles from './Util.module.scss'

const ReSearchTags = ({
  tags = ['Work', 'Friends', 'Family', 'Service', 'School'],
  selectedTags,
  onClick,
  ...props
}) => {
  return (
    <div className={styles.SearchTags} {...props}>
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
