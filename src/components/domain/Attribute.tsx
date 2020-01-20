import React from 'react'
import { AttributeType } from '../../store/util/types'
import styled from 'styled-components'

import { formatAttributeValue } from '../../helpers'

import Flex from '../shared/layout/Flex'
import ActionIcon from '../shared/util/ActionIcon'

type Props = {
  attribute: {
    uuid: string
    attribute_type: AttributeType
    name: string
    collection: string
    value_uuid: string
    value: Dictionary<string>
    verified_at: string
    expiry: string
  }
  rightOverride?: {
    component: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLElement>) => void
  }
}

const AttributeName = styled.p`
  font-size: 1.125em;
  color: var(--text-secondary);
  margin-bottom: 4px;
`
const AttributeValue = styled.p`
  font-size: 1.125em;
  color: var(--text);
`

const Attribute = ({ attribute, rightOverride }: Props) => {
  return (
    <Flex justify="between" align="center">
      <Flex justify="start" align="center">
        <ActionIcon
          name={attribute.attribute_type.actions[0].icon}
          width="2.5em"
          style={{ marginRight: '24px' }}
        />
        <Flex direction="column" justify="center" align="start">
          <AttributeName>{attribute.name}</AttributeName>
          <AttributeValue>
            {formatAttributeValue(attribute.value)}
          </AttributeValue>
        </Flex>
      </Flex>
      {rightOverride ? (
        rightOverride
      ) : (
        <ActionIcon width="2.5em" style={{ marginLeft: '24px' }} />
      )}
    </Flex>
  )
}

export default Attribute
