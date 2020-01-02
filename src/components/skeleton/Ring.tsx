import React from 'react'
import cx from 'classnames'

import styles from './Loading.module.scss'

type Props = {
  className?: string
  style?: object
}

const Ring = ({ className, style }: Props) => {
  const RingStyle = cx(styles.Ring, styles.Spin, className)
  return <div className={RingStyle} style={style} />
}

export default Ring
