import React, { createRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Form.module.scss'

interface Props {
  parent: HTMLElement | null
  items: import('react').ReactElement[]
  xOffset?: number
  yOffset?: number
  close: () => {}
  onSelect: (idx: number) => {}
}

const dropdownRoot = document.querySelector('#dropdown-root') as HTMLElement

const Dropdown = ({
  parent,
  items,
  xOffset = 0,
  yOffset = 0,
  close,
  onSelect
}: Props) => {
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    window.addEventListener('scroll', close, true)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      window.removeEventListener('scroll', close, true)
    }
    // eslint-disable-next-line
  }, [])

  if (!parent) return null
  const dropdownNode = createRef<HTMLUListElement>()
  const pos = parent.getBoundingClientRect()
  const style = () => {
    const posBottom = window.innerHeight - (pos.top - window.pageYOffset)
    if (posBottom > 350) {
      return {
        top: pos.bottom + yOffset,
        left: pos.left + xOffset
      }
    } else {
      const top = pos.top - 200
      return {
        top: top + yOffset,
        left: pos.left + xOffset
      }
    }
  }

  const handleOutsideClick = (e: any) => {
    if (dropdownNode.current && !dropdownNode.current.contains(e.target)) {
      close()
    }
  }

  return ReactDOM.createPortal(
    items.length && (
      <ul className={styles.Dropdown} ref={dropdownNode} style={style()}>
        {items.map((item, idx) => (
          <li key={idx} onClick={() => onSelect(idx)}>
            {item}
          </li>
        ))}
      </ul>
    ),
    dropdownRoot
  )
}

export default Dropdown
