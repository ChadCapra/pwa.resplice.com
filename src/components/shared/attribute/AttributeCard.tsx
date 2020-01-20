import React from 'react'
import styled from 'styled-components'
import { AttributeType } from '../../../store/util/types'

import Card from '../card/Card'
import Attribute from './Attribute'

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
}

const CardHeading = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  color: var(--brand-primary);
`

const AttributeCard = ({ attribute }: Props) => {
  return (
    <Card.Layout>
      <Card.Header>
        <CardHeading>{attribute.name}</CardHeading>
      </Card.Header>
      <Card.Body>
        <Attribute attribute={attribute} />
      </Card.Body>
    </Card.Layout>
  )
}

export default AttributeCard
