import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MdClipboard from 'react-ionicons/lib/MdClipboard'
import MdNotifications from 'react-ionicons/lib/MdNotifications'
import MdCreate from 'react-ionicons/lib/MdCreate'

class ReDropdown extends Component {
  componentWillMount() {
    // add event listener for clicks outside of the dropdown
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    // remove event listener for clicks outside of the dropdown
    document.removeEventListener('click', this.handleClick, false)
  }

  handleClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      // the click was outside of the dropdown, so handle closing here
      this.props.close()
    }
  }

  render() {
    const { items, userAttribute, copy, edit } = this.props
    if (userAttribute) {
      return (
        <div className="drop-down">
          <div className="drop-down-item">
            <div className="drop-down-icon">
              <MdCreate color="#1bbc9b" />
            </div>
            <div className="drop-down-text" onClick={() => edit()}>
              Edit
            </div>
          </div>
          <div className="drop-down-item">
            <div className="drop-down-icon">
              <MdClipboard color="#1bbc9b" />
            </div>
            <div className="drop-down-text" onClick={() => copy()}>
              Copy to Clipboard
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="drop-down">
        <div className="drop-down-item">
          <div className="drop-down-icon">
            <MdClipboard color="#1bbc9b" />
          </div>
          <div className="drop-down-text" onClick={() => copy()}>
            Copy to Clipboard
          </div>
        </div>
        {items.map(item => {
          return (
            <div className="drop-down-item" key={item.text}>
              <div className="drop-down-icon">{item.icon}</div>
              <div className="drop-down-text">{item.text}</div>
            </div>
          )
        })}
        <div className="drop-down-item">
          <div className="drop-down-icon">
            <MdNotifications color="#1bbc9b" />
          </div>
          <div className="drop-down-text">Request Update</div>
        </div>
      </div>
    )
  }
}

export default ReDropdown
