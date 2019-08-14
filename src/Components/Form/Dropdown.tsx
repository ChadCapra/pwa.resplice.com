import React, { createRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Form.module.scss'

interface Props {
  parent: HTMLElement | null
  items: import('react').ReactElement[]
  offset?: number
  close: () => {}
  onSelect: (idx: number) => {}
}

const dropdownRoot = document.querySelector('#dropdown-root') as HTMLElement

const Dropdown = ({
  parent,
  items,
  offset,
  close,
  onSelect,
  ...props
}: Props) => {
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false)
    document.addEventListener('scroll', close, false)

    return () => {
      document.removeEventListener('click', handleOutsideClick, false)
      document.removeEventListener('scroll', close, false)
    }
    // eslint-disable-next-line
  }, [])

  if (!parent) return null
  const dropdownNode = createRef<HTMLUListElement>()
  const pos = parent.getBoundingClientRect()

  const handleOutsideClick = (e: any) => {
    if (dropdownNode.current && !dropdownNode.current.contains(e.target)) {
      close()
    }
  }

  return ReactDOM.createPortal(
    <ul
      className={styles.Dropdown}
      ref={dropdownNode}
      style={{
        top: offset ? pos.bottom + offset : pos.bottom,
        left: pos.left
      }}
    >
      {items.map((item, idx) => (
        <li key={idx} onClick={() => onSelect(idx)}>
          {item}
        </li>
      ))}
    </ul>,
    dropdownRoot
  )
}

export default Dropdown
