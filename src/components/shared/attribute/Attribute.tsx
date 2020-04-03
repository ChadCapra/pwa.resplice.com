import React from 'react'
import styled from 'styled-components'

import { IEntityAttributeWithType } from '../../../store/store'
import { formatAttributeValue } from '../../../helpers'

import Flex from '../layout/Flex'

type Props = {
  attribute: IEntityAttributeWithType
  leftIcon: React.ReactNode
  rightIcon: React.ReactNode
  onClick?: (e: React.PointerEvent<HTMLDivElement>) => void
}

const AttributeContainer = styled(Flex)`
  padding: 0.5em 0;
`

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  &:first-of-type {
    margin-right: 1em;
  }
  &:last-of-type {
    margin-left: 1em;
  }
`

const AttributeValues = styled(Flex)`
  overflow: hidden;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
`

const AttributeName = styled.p`
  width: 100%;
  font-size: 1.125em;
  line-height: 1.2;
  color: var(--text-secondary);
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const AttributeValue = styled.p`
  width: 100%;
  font-size: 1.125em;
  line-height: 1.2;
  color: var(--text);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Attribute = ({ attribute, leftIcon, rightIcon, onClick }: Props) => {
  return (
    <AttributeContainer justify="between" align="center">
      <IconContainer>{leftIcon}</IconContainer>
      <AttributeValues
        direction="column"
        justify="center"
        align="start"
        grow
        onClick={onClick}
      >
        <AttributeName>{attribute.name}</AttributeName>
        <AttributeValue>{formatAttributeValue(attribute.value)}</AttributeValue>
      </AttributeValues>
      <IconContainer>{rightIcon}</IconContainer>
    </AttributeContainer>
  )
}

export default Attribute
