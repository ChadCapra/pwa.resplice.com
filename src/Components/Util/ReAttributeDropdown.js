import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import ActionIcon from '../Util/ActionIcon'

const ReAttributeDropdown = ({ onClick, close, items: [, , ...actions] }) => {
  useEffect(() => {
    const handleClick = e => {
      if (!ReactDOM.findDOMNode(dropdown.current).contains(e.target)) {
        // the click was outside of the dropdown, so handle closing here
        close()
      }
    }

    // add event listener for clicks on the page
    document.addEventListener('click', handleClick)

    return () => {
      // remove event listener for clicks on the page
      document.removeEventListener('click', handleClick)
    }
  }, [close])

  const dropdown = useRef(null)

  return (
    <div className="drop-down" ref={dropdown}>
      {actions.map((item, idx) => {
        return (
          <div
            className="drop-down-item"
            key={idx}
            onClick={() => onClick(item.name)}
          >
            <div className="drop-down-icon">
              <ActionIcon name={item.icon} fill="#1bbc9b" width="1.5em" />
            </div>
            <div className="drop-down-text">{item.display_name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ReAttributeDropdown
