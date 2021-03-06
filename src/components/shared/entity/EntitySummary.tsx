import React from 'react'
import styled from 'styled-components'

import Flex from '../layout/Flex'

type Props = {
  title: string
  subtitle: string
  thumbnail: React.ReactNode
  icon?: React.ReactNode
  style?: React.CSSProperties
}

const Title = styled.p`
  font-size: 1.125em;
  line-height: 1.2;
  font-weight: 500;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const Subtitle = styled.p`
  font-size: 1.125em;
  line-height: 1.2;
  font-weight: lighter;
  color: var(--dark-4);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const EntitySummary = ({ title, subtitle, thumbnail, icon, style }: Props) => {
  return (
    <Flex justify="start" style={style}>
      {thumbnail}
      <Flex
        direction="column"
        justify="center"
        grow
        style={{ marginLeft: '1em', overflow: 'hidden' }}
      >
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Flex>
      {icon}
    </Flex>
  )
}

export default EntitySummary
