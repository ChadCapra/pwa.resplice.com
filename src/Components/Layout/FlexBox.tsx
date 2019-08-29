import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import styles from './FlexBox.module.scss'

type Props = {
  children: import('react').ReactChild | Array<import('react').ReactChild>
  className?: string
  fill?: boolean
  direction?: 'column' | 'row'
  justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
    | 'normal'
  align?: 'center' | 'start' | 'end' | 'stretch' | 'normal'
  [prop: string]: any
}

const FlexBox = ({
  children,
  className,
  fill,
  direction = 'row',
  justify = 'start',
  align = 'start',
  ...props
}: Props) => {
  const FlexStyle = cx(styles.FlexBox, className, {
    [styles.Fill]: fill,
    [styles.DirectionColumn]: direction === 'column',
    [styles.DirectionRow]: direction === 'row',
    [styles.JustifyCenter]: justify === 'center',
    [styles.JustifyStart]: justify === 'start',
    [styles.JustifyEnd]: justify === 'end',
    [styles.JustifyBetween]: justify === 'between',
    [styles.JustifyAround]: justify === 'around',
    [styles.JustifyEvenly]: justify === 'evenly',
    [styles.JustifyStretch]: justify === 'stretch',
    [styles.JustifyNormal]: justify === 'normal',
    [styles.AlignCenter]: align === 'center',
    [styles.AlignStart]: align === 'start',
    [styles.AlignEnd]: align === 'end',
    [styles.AlignStretch]: align === 'stretch',
    [styles.AlignNormal]: align === 'normal'
  })
  return (
    <div className={FlexStyle} {...props}>
      {children}
    </div>
  )
}

FlexBox.propTypes = {
  fill: PropTypes.bool,
  direction: PropTypes.oneOf(['column', 'row']),
  justify: PropTypes.oneOf([
    'center',
    'start',
    'end',
    'between',
    'around',
    'evenly',
    'stretch',
    'normal'
  ]),
  align: PropTypes.oneOf(['center', 'start', 'end', 'stretch', 'normal'])
}

export default FlexBox
