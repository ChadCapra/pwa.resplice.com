import React, { Component } from 'react'

import styles from './Layout.module.scss'

const Header = () => {}
const Body = () => {}

export default class ViewLayout extends Component {
  static Header = Header
  static Body = Body

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { children } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)

    return (
      <div className={styles.view}>
        {header ? (
          <div className={styles.viewHeader}>{header.props.children}</div>
        ) : null}
        {body ? (
          <div className={styles.viewBody}>{body.props.children}</div>
        ) : null}
      </div>
    )
  }
}
