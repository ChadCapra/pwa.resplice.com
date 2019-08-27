import React from 'react'

import styles from './Loading.module.scss'

type Props = {
  style?: object
}

const Ring = ({ style }: Props) => {
  return <div className={`${styles.Ring} ${styles.Spin}`} style={style} />
}

export default Ring
