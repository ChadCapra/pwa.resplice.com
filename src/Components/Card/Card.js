import React, { Component } from 'react'

import cx from 'classnames'
import styles from './Card.module.scss'

const Header = () => {}
const Body = () => {}

export default class Card extends Component {
  static Header = Header
  static Body = Body

  render() {
    const { children, pending, border } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)
    const CardStyle = cx(styles.Card, {
      [styles.Pending]: pending
    })

    const HeaderStyle = cx(styles.CardHeader, {
      [styles.NoBorder]: !border
    })

    return (
      <div className={CardStyle}>
        {header ? (
          <div className={HeaderStyle}>{header.props.children}</div>
        ) : null}
        {body ? (
          <div className={styles.CardBody}>{body.props.children}</div>
        ) : null}
      </div>
    )
  }
}
