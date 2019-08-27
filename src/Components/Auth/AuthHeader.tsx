import React from 'react'

import FlexBox from '../Layout/FlexBox'

import RespliceLogo from '../../../assets/resplice_wide_logo.svg'
import styles from './Header.module.scss'

const AuthHeader = () => {
  return (
    <FlexBox justify="center" align="center" className={styles.AuthHeader}>
      <img src={RespliceLogo} alt="Resplice Logo" width="80px" />
    </FlexBox>
  )
}

export default AuthHeader
