import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Flex from '../shared/layout/Flex'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_wide_logo.svg'

const StyledHeader = styled(Flex)`
  padding: 16px 0;
  flex: 0 0 150px;
  height: 125px;
  width: 100vw;
  align-self: flex-start;
  z-index: 10;
  ${props =>
    props.scrolled ? 'box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);' : ''}
`

const AuthHeader = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const target = document.querySelector('#scroll-anchor')
    if (!target) return
    const observer = new IntersectionObserver(
      entries => setScrolled(entries[0].isIntersecting),
      {
        root: document.querySelector('#view')
      }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <StyledHeader justify="center" align="center" scrolled={scrolled}>
      <RespliceLogo />
    </StyledHeader>
  )
}

export default AuthHeader
