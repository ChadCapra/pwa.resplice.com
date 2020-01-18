import React from 'react'
import styled from 'styled-components'

import styles from './Loading.module.scss'

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

const AvatarLoading = () => {
  return <Avatar className={styles.Skeleton} />
}

export default AvatarLoading
