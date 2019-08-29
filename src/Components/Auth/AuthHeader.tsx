import React from 'react'

import FlexBox from '../Layout/FlexBox'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_wide_logo.svg'
import styles from './Auth.module.scss'

const AuthHeader = () => {
  return (
    <FlexBox justify="center" align="center" className={styles.AuthHeader}>
      <RespliceLogo />
    </FlexBox>
  )
}

export default AuthHeader
