import React, { Component } from 'react'
import cx from 'classnames'

import styles from './Util.module.scss'

type Props = {
  type: 'info' | 'success' | 'warning' | 'danger'
  className?: string
  children: Array<React.ReactElement>
}

const Header: React.FC<{}> = () => null
const Body: React.FC<{}> = () => null

class Notification extends Component<Props> {
  static Header = Header
  static Body = Body

  render() {
    const { type, className, children } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)
    const NotificationStyle = cx(styles.Notification, className, {
      [styles.Info]: type === 'info',
      [styles.Success]: type === 'success',
      [styles.Warning]: type === 'warning',
      [styles.Danger]: type === 'danger'
    })

    return (
      <div className={NotificationStyle}>
        <div className={styles.Header}>{header!.props.children}</div>
        <div className={styles.Body}>{body!.props.children}</div>
      </div>
    )
  }
}

export default Notification
