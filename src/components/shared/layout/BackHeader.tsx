import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import IosArrowBack from 'react-ionicons/lib/IosArrowBack'

const Header = styled.div`
  font-size: 1em;
  font-weight: bold;
  width: 100%;
  margin-top: -0.5em;
  margin-left: -0.5em;
  display: flex;
  align-items: center;
`

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`

type Props = {
  route: string
  text?: string
}

const BackHeader = ({ route, text = 'Back' }: Props) => {
  return (
    <Header>
      <BackLink to="/">
        <IosArrowBack fontSize="1.5em" /> {text}
      </BackLink>
    </Header>
  )
}

export default BackHeader
