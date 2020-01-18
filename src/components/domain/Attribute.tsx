import React from 'react'
import { AttributeType } from '../../store/util/types'
import styled from 'styled-components'

import Flex from '../shared/layout/Flex'

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

const AttributeContainer = styled.div``

const Attribute = ({ attribute, rightOverride }: Props) => {
  return (
    <Flex justify="between" align="center">
      Attribute
    </Flex>
  )
}

export default Attribute
