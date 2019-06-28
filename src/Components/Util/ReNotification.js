import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Header = () => {}
const Body = () => {}

class ReNotification extends Component {
  static Header = Header
  static Body = Body

  render() {
    const { type, style, children } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)

    return (
      <div className={`re-notification ${type}`} style={style}>
        <div className="header">{header ? header.props.children : null}</div>
        <div className="body">{body ? body.props.children : null}</div>
      </div>
    )
  }
}

ReNotification.propTypes = {
  type: PropTypes.oneOf(['info', 'danger', 'success']).isRequired,
  style: PropTypes.object
}

export default ReNotification
