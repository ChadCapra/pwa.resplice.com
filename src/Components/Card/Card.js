import React, { Component } from 'react'

import cx from 'classnames'
import styles from './Card.module.scss'

const Header = () => {}
const Body = () => {}

export default class CardLayout extends Component {
  static Header = Header
  static Body = Body

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { children, border } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)

    const headerStyle = cx(styles.CardHeader, {
      [styles.NoBorder]: !border
    })

    return (
      <div className={styles.Card}>
        {header ? (
          <div className={headerStyle}>{header.props.children}</div>
        ) : null}
        {body ? (
          <div className={styles.CardBody}>{body.props.children}</div>
        ) : null}
      </div>
    )
  }
}
