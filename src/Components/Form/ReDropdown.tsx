import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'

import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown'
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup'

type ListItem = import('react').ReactElement

interface Props {
  type?: 'primary'
  title: string
  list: ListItem[]
  onSelect: () => {}
}

const ReDropdown: FC<Props> = ({ type, title, list, onSelect }) => {
  const [listOpen, setListOpen] = useState(false)

  const toggleList = () => {
    setListOpen(!listOpen)
  }

  return (
    <div className="re-dropdown">
      <div
        className={`re-dropdown-title${type === 'primary' ? ' primary' : ''}`}
        onClick={toggleList}
      >
        {title}
        {listOpen ? (
          <MdArrowDropup
            fontSize="2em"
            color={type === 'primary' ? 'white' : ''}
          />
        ) : (
          <MdArrowDropdown
            fontSize="2em"
            color={type === 'primary' ? 'white' : ''}
          />
        )}
      </div>
      {listOpen && (
        <ul className="re-dropdown-list">
          {list.map((item, idx) => {
            return (
              <li key={idx} className="list-item">
                {item}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ReDropdown
