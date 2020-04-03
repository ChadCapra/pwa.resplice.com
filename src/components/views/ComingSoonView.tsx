import React from 'react'
import styled from 'styled-components'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_logo_alt.svg'

import Flex from '../shared/layout/Flex'

const Header = styled.h1`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 2em;
`

type Props = {
  name: string
}

const ComingSoon = ({ name }: Props) => {
  return (
    <Flex direction="column" fill justify="center" align="center">
      <Header>{name} Coming Soon</Header>
      <RespliceLogo height="175" width="175" />
    </Flex>
  )
}

export default ComingSoon
