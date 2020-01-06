import React from 'react'

import cx from 'classnames'
import styles from './Card.module.scss'

type ContainerProps = {
  pending?: boolean
  className?: string
  children: React.ReactNode
}

type HeaderProps = {
  padding?: 'small' | 'regular' | 'large'
  className?: string
  children: React.ReactNode
}

type BodyProps = {
  padding?: 'small' | 'regular' | 'large'
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Header = ({ padding = 'regular', className, children }: HeaderProps) => {
  const HeaderStyle = cx(styles.CardHeader, className, {
    [styles.PaddingSmall]: padding === 'small',
    [styles.PaddingRegular]: padding === 'regular',
    [styles.PaddingLarge]: padding === 'large'
  })
  return <div className={HeaderStyle}>{children}</div>
}
const Body = ({
  padding = 'regular',
  className,
  children,
  onClick
}: BodyProps) => {
  const BodyStyle = cx(styles.CardBody, className, {
    [styles.PaddingSmall]: padding === 'small',
    [styles.PaddingRegular]: padding === 'regular',
    [styles.PaddingLarge]: padding === 'large'
  })
  return (
    <div className={BodyStyle} onClick={onClick}>
      {children}
    </div>
  )
}

const Container = ({ pending, className, children }: ContainerProps) => {
  const CardStyle = cx(styles.Card, className, {
    [styles.Pending]: pending
  })

  return <div className={CardStyle}>{children}</div>
}

export default {
  Container,
  Header,
  Body
}
