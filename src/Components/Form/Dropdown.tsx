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

const Dropdown = ({ parent, items, offset, close, onSelect }: Props) => {
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
        top: offset ? pos.bottom + offset : pos.bottom,
        left: pos.left
      }
    } else {
      const top = pos.top - 200
      return {
        top: offset ? top + offset : top,
        left: pos.left
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
