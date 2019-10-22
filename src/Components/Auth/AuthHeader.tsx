import React, { useEffect, useState } from 'react'
import cx from 'classnames'

import FlexBox from '../Layout/FlexBox'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_wide_logo.svg'
import styles from './Auth.module.scss'

const AuthHeader = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const target = document.querySelector('#scroll-anchor')
    if (target) {
      const observer = new IntersectionObserver(
        entries => setScrolled(entries[0].isIntersecting),
        {
          root: document.querySelector('#view')
        }
      )
      observer.observe(target)
    }
  }, [])

  const AuthHeaderStyle = cx(styles.AuthHeader, {
    [styles.AuthHeaderShadow]: scrolled
  })

  return (
    <FlexBox justify="center" align="center" className={AuthHeaderStyle}>
      <RespliceLogo />
    </FlexBox>
  )
}

export default AuthHeader
