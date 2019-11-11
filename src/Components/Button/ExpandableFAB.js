import React, { useEffect, useState, useRef } from 'react'

import FAB from './FAB'

import cx from 'classnames'
import styles from './Button.module.scss'

const ExpandableFAB = ({ children }) => {
  const [expanded, setExpanded] = useState(false)
  const expandableNode = useRef()

  const handleOutsideClick = e => {
    if (expandableNode.current) {
      if (
        !expandableNode.current.contains(e.target) &&
        !(e.target instanceof SVGElement)
      ) {
        setExpanded(false)
        // animateAndClose()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  })

  const expandableStyles = cx(styles.ExpandableFABContainer, {
    [styles.Expanded]: expanded
  })

  return (
    <div className={expandableStyles} ref={expandableNode}>
      {expanded ? (
        children
      ) : (
        <FAB type="add" onClick={() => setExpanded(true)} />
      )}
    </div>
  )
}

export default ExpandableFAB
