import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ActionIcon from '../Util/ActionIcon'

class ReDropdown extends Component {
  componentWillMount() {
    // add event listener for clicks on the page
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    // remove event listener for clicks on the page
    document.removeEventListener('click', this.handleClick, false)
  }

  handleClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      // the click was outside of the dropdown, so handle closing here
      this.props.close()
    }
  }

  render() {
    const { onClick, close } = this.props
    const [, , ...actions] = this.props.items
    return (
      <div className="drop-down">
        {actions.map(item => {
          return (
            <div
              className="drop-down-item"
              key={item.id}
              onClick={() => {
                onClick(item.name)
                close()
              }}
            >
              <div className="drop-down-icon">
                <ActionIcon name={item.icon} fill="#1bbc9b" width="1.5em" />
              </div>
              <div className="drop-down-text">{item.name}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ReDropdown
