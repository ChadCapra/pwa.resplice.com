import React from 'react'
import styled from 'styled-components'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_logo_alt.svg'

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: var(--brand-primary);
`

// TODO: Animate with react spring
const GlobalLoading = () => {
  return (
    <LoadingContainer>
      <RespliceLogo width="150" height="150" />
    </LoadingContainer>
  )
}

export default GlobalLoading
