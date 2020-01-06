import React, { Component } from 'react'

import cx from 'classnames'
import styles from './Card.module.scss'

type Props = {
  border?: 'small' | 'medium' | 'large'
  pending?: boolean
  className?: string
  children: Array<React.ReactElement>
}

type HeaderProps = {
  className?: string
}

type BodyProps = {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Header: React.FC<HeaderProps> = () => null
const Body: React.FC<BodyProps> = () => null

export default class Card extends Component<Props> {
  static Header = Header
  static Body = Body

  render() {
    const {
      children,
      pending,
      border = 'medium',
      className,
      ...props
    } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)

    const CardStyle = cx(styles.Card, className, {
      [styles.Pending]: pending,
      [styles.BorderSmall]: border === 'small',
      [styles.BorderMedium]: border === 'medium',
      [styles.BorderLarge]: border === 'large'
    })
    const HeaderStyle = cx(styles.CardHeader, {
      [styles.NoBorder]: !header
    })

    return (
      <div className={CardStyle} {...props}>
        {header ? (
          <div className={cx(HeaderStyle, header.props.className)}>
            {header.props.children}
          </div>
        ) : null}
        {body ? (
          <div
            className={cx(styles.CardBody, body.props.className)}
            onClick={body.props.onClick}
          >
            {body.props.children}
          </div>
        ) : null}
      </div>
    )
  }
}
