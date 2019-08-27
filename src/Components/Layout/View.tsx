import React, { Component } from 'react'

import styles from './Layout.module.scss'

type Props = {
  children: Array<React.ReactElement>
}

const Header: React.FC<{}> = () => null
const Body: React.FC<{}> = () => null

export default class ViewLayout extends Component<Props> {
  static Header = Header
  static Body = Body

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
